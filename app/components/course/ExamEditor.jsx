import { useState, useCallback } from "react";
import { Play, RotateCcw, CheckCircle2, XCircle, Terminal, CircleDot } from "lucide-react";
import Button from "../ui/Button";
import { highlightCode } from "../../utils/syntax";
import { cn } from "../../lib/utils";

export default function ExamEditor({ ejercicio, onResolver }) {
  const [respuestas, setRespuestas] = useState(() =>
    ejercicio.preguntas.map((p) =>
      p.tipo === "opcion" ? null : p.codigoInicial || ""
    )
  );
  const [resultados, setResultados] = useState(null);
  const [ejecutando, setEjecutando] = useState(false);

  const actualizarRespuesta = (index, value) => {
    const nuevas = [...respuestas];
    nuevas[index] = value;
    setRespuestas(nuevas);
  };

  const seleccionarOpcion = (index, opcionIndex) => {
    const nuevas = [...respuestas];
    nuevas[index] = opcionIndex;
    setRespuestas(nuevas);
  };

  const ejecutarExamen = useCallback(() => {
    setEjecutando(true);
    setResultados(null);

    setTimeout(() => {
      try {
        const results = ejercicio.preguntas.map((pregunta, i) => {
          if (pregunta.tipo === "opcion") {
            return {
              pregunta: pregunta.pregunta,
              tipo: "opcion",
              correcta: respuestas[i] === pregunta.respuesta,
              seleccionada: respuestas[i],
              respuestaEsperada: pregunta.respuesta,
              opciones: pregunta.opciones,
            };
          }

          // Ejercicio de código
          try {
            const wrappedCode = `
              var __logs = [];
              var __origLog = console.log;
              console.log = function() { __logs.push(Array.from(arguments).map(String).join(" ")); __origLog.apply(console, arguments); };
              var __sourceCode = ${JSON.stringify(respuestas[i])};
              ${respuestas[i]}
              console.log = __origLog;
              return (function() { return ${"{TEST_CODE}"}; })();
            `;

            const testResults = pregunta.tests.map((test) => {
              try {
                const fn = new Function(wrappedCode.replace("{TEST_CODE}", test.codigo));
                const result = fn();
                if (result && typeof result.then === "function") {
                  return { ...test, pass: false, async: true, promise: result };
                }
                return { ...test, pass: !!result };
              } catch (error) {
                return { ...test, pass: false, error: error.message };
              }
            });

            const asyncTests = testResults.filter((r) => r.async);
            if (asyncTests.length > 0) {
              return Promise.all(
                testResults.map((r) =>
                  r.async
                    ? r.promise.then(
                        (val) => ({ ...r, pass: !!val, async: false }),
                        () => ({ ...r, pass: false, async: false })
                      )
                    : r
                )
              ).then((resolved) => {
                const allPassed = resolved.every((r) => r.pass);
                return {
                  pregunta: pregunta.descripcion,
                  tipo: "codigo",
                  correcta: allPassed,
                  tests: resolved,
                };
              });
            }

            const allPassed = testResults.every((r) => r.pass);
            return {
              pregunta: pregunta.descripcion,
              tipo: "codigo",
              correcta: allPassed,
              tests: testResults,
            };
          } catch (error) {
            return {
              pregunta: pregunta.descripcion,
              tipo: "codigo",
              correcta: false,
              tests: [{ descripcion: "Error", pass: false, error: error.message }],
            };
          }
        });

        Promise.all(results).then((resolved) => {
          const totalCorrectas = resolved.filter((r) => r.correcta).length;
          const totalPreguntas = resolved.length;
          const porcentaje = Math.round((totalCorrectas / totalPreguntas) * 100);
          const aprobado = porcentaje >= 70;

          setResultados({
            preguntas: resolved,
            totalCorrectas,
            totalPreguntas,
            porcentaje,
            aprobado,
          });

          if (aprobado && onResolver) {
            onResolver();
          }
          setEjecutando(false);
        });
      } catch (error) {
        setResultados({
          preguntas: [],
          totalCorrectas: 0,
          totalPreguntas: 0,
          porcentaje: 0,
          aprobado: false,
          error: error.message,
        });
        setEjecutando(false);
      }
    }, 300);
  }, [ejercicio, respuestas, onResolver]);

  const reiniciar = () => {
    setRespuestas(ejercicio.preguntas.map((p) => (p.tipo === "opcion" ? null : p.codigoInicial || "")));
    setResultados(null);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-2 flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
            <CircleDot size={14} />
          </span>
          Examen del módulo
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{ejercicio.descripcion}</p>
      </div>

      {ejercicio.preguntas.map((pregunta, i) => (
        <div
          key={i}
          className="bg-dark-700 rounded-xl border border-zinc-600/50 p-5"
        >
          <div className="flex items-start gap-3 mb-3">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </span>
            <div className="flex-1">
              <p className="text-zinc-200 text-sm font-medium mb-1">
                {pregunta.tipo === "opcion" ? pregunta.pregunta : pregunta.descripcion}
              </p>
              <span className="text-xs text-zinc-500 uppercase tracking-wide">
                {pregunta.tipo === "opcion" ? "Opción múltiple" : "Ejercicio de código"}
              </span>
            </div>
          </div>

          {pregunta.tipo === "opcion" ? (
            <div className="space-y-2 ml-9">
              {pregunta.opciones.map((opcion, j) => {
                const seleccionada = respuestas[i] === j;
                const resultado = resultados?.preguntas[i];
                const esCorrecta = j === pregunta.respuesta;
                const mostrarResultado = !!resultado;

                return (
                  <button
                    key={j}
                    onClick={() => seleccionarOpcion(i, j)}
                    disabled={!!resultados}
                    className={cn(
                      "w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all border",
                      !mostrarResultado && seleccionada && "bg-primary/10 border-primary/40 text-zinc-100",
                      !mostrarResultado && !seleccionada && "bg-dark-800 border-zinc-600/30 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200",
                      mostrarResultado && esCorrecta && "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
                      mostrarResultado && !esCorrecta && seleccionada && "bg-red-500/10 border-red-500/30 text-red-300",
                      mostrarResultado && !esCorrecta && !seleccionada && "bg-dark-800 border-zinc-600/30 text-zinc-500",
                    )}
                  >
                    <span className="font-mono mr-2">{String.fromCharCode(65 + j)}.</span>
                    {opcion}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="ml-9">
              <div className="editor-container">
                <div className="editor-header">
                  <div className="flex items-center gap-3">
                    <div className="code-block-dots">
                      <span style={{ background: "#ff5f57" }} />
                      <span style={{ background: "#febc2e" }} />
                      <span style={{ background: "#28c840" }} />
                    </div>
                    <span className="code-block-lang">ejercicio-{i + 1}.js</span>
                  </div>
                </div>
                <div className="editor-body">
                  <div className="editor-code-area">
                    <div
                      className="editor-highlight"
                      aria-hidden="true"
                      dangerouslySetInnerHTML={{ __html: highlightCode(respuestas[i] || "") + "\n" }}
                    />
                    <textarea
                      value={respuestas[i] || ""}
                      onChange={(e) => actualizarRespuesta(i, e.target.value)}
                      className="editor-textarea"
                      spellCheck={false}
                      autoCapitalize="off"
                      autoComplete="off"
                      autoCorrect="off"
                      data-gramm="false"
                      aria-label={`Código ejercicio ${i + 1}`}
                    />
                  </div>
                </div>
              </div>

              {resultados?.preguntas[i]?.tests && (
                <div className="mt-3 space-y-1">
                  {resultados.preguntas[i].tests.map((test, ti) => (
                    <div key={ti} className="flex items-center gap-2 text-sm">
                      {test.pass ? (
                        <CheckCircle2 size={14} className="text-emerald-400" />
                      ) : (
                        <XCircle size={14} className="text-red-400" />
                      )}
                      <span className={test.pass ? "text-zinc-300" : "text-red-300"}>
                        {test.descripcion}
                      </span>
                      {test.error && (
                        <span className="text-red-400/70 text-xs font-mono ml-1">({test.error})</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {resultados && (
        <div
          className={cn(
            "rounded-xl border overflow-hidden animate-slide-up",
            resultados.aprobado
              ? "bg-emerald-500/5 border-emerald-500/20"
              : "bg-red-500/5 border-red-500/20"
          )}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
            <Terminal size={15} className={resultados.aprobado ? "text-emerald-400" : "text-red-400"} />
            <span className={cn("text-sm font-medium", resultados.aprobado ? "text-emerald-400" : "text-red-400")}>
              {resultados.aprobado
                ? `¡Aprobado! ${resultados.totalCorrectas}/${resultados.totalPreguntas} (${resultados.porcentaje}%)`
                : `No aprobado: ${resultados.totalCorrectas}/${resultados.totalPreguntas} (${resultados.porcentaje}%) — Necesitas 70%`}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button onClick={ejecutarExamen} disabled={ejecutando} size="md">
          {ejecutando ? (
            <span className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 border-2 border-dark-900 border-t-transparent rounded-full animate-spin" />
              Evaluando...
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Play size={13} />
              Entregar examen
            </span>
          )}
        </Button>
        <Button onClick={reiniciar} variant="ghost" size="md">
          <RotateCcw size={13} />
          Reiniciar
        </Button>
      </div>
    </div>
  );
}
