import { useState, useCallback, useRef } from "react";
import { Play, RotateCcw, CheckCircle2, XCircle, Terminal } from "lucide-react";
import Button from "../ui/Button";
import { highlightCode } from "../../utils/syntax";
import { cn } from "../../lib/utils";

export default function CodeEditor({ ejercicio, onResolver }) {
  const [codigo, setCodigo] = useState(ejercicio.codigoInicial);
  const [resultado, setResultado] = useState(null);
  const [ejecutando, setEjecutando] = useState(false);
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const linesRef = useRef(null);

  const lineCount = codigo.split("\n").length;

  const syncScroll = useCallback(() => {
    const ta = textareaRef.current;
    const hl = highlightRef.current;
    const ln = linesRef.current;
    if (ta && hl) {
      hl.scrollTop = ta.scrollTop;
      hl.scrollLeft = ta.scrollLeft;
    }
    if (ta && ln) {
      ln.scrollTop = ta.scrollTop;
    }
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = textareaRef.current;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newCode = codigo.substring(0, start) + "  " + codigo.substring(end);
      setCodigo(newCode);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
  }, [codigo]);

  const ejecutarTests = useCallback(() => {
    setEjecutando(true);
    setResultado(null);

    setTimeout(() => {
      try {
        const testResults = ejercicio.tests.map((test) => {
          try {
            const wrappedCode = `
              var __logs = [];
              var __origLog = console.log;
              console.log = function() { __logs.push(Array.from(arguments).map(String).join(" ")); __origLog.apply(console, arguments); };
              ${codigo}
              console.log = __origLog;
              return (function() { return ${test.codigo}; })();
            `;
            const fn = new Function(wrappedCode);
            const pass = fn();
            return { ...test, pass: !!pass };
          } catch (error) {
            let hint = null;
            if (error instanceof TypeError) {
              if (error.message.includes("is not a function")) {
                hint = "No se encontró la función. Asegúrate de que esté definida.";
              }
            }
            return { ...test, pass: false, error: error.message, hint };
          }
        });

        const todosPasaron = testResults.every((r) => r.pass);
        setResultado({ tests: testResults, todosPasaron });

        if (todosPasaron && onResolver) {
          onResolver();
        }
      } catch (error) {
        setResultado({
          tests: [],
          todosPasaron: false,
          error: error.message,
        });
      } finally {
        setEjecutando(false);
      }
    }, 300);
  }, [codigo, ejercicio, onResolver]);

  const resetear = () => {
    setCodigo(ejercicio.codigoInicial);
    setResultado(null);
  };

  return (
    <div className="space-y-5">
      {/* Descripción del ejercicio */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-2 flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
            ?
          </span>
          Ejercicio
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{ejercicio.descripcion}</p>
      </div>

      {/* Editor de código */}
      <div className="editor-container">
        <div className="editor-header">
          <div className="flex items-center gap-3">
            <div className="code-block-dots">
              <span style={{ background: "#ff5f57" }} />
              <span style={{ background: "#febc2e" }} />
              <span style={{ background: "#28c840" }} />
            </div>
            <span className="code-block-lang">editor.js</span>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={resetear} variant="ghost" size="sm">
              <RotateCcw size={13} />
            </Button>
            <Button onClick={ejecutarTests} disabled={ejecutando} size="sm">
              {ejecutando ? (
                <span className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 border-2 border-dark-900 border-t-transparent rounded-full animate-spin" />
                  Ejecutando...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Play size={13} />
                  Ejecutar
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="editor-body">
          {/* Números de línea */}
          <div className="editor-lines" ref={linesRef}>
            {Array.from({ length: lineCount }, (_, i) => (
              <span key={i + 1}>{i + 1}</span>
            ))}
          </div>

          {/* Área de edición con overlay de sintaxis */}
          <div className="editor-code-area">
            <div
              ref={highlightRef}
              className="editor-highlight"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: highlightCode(codigo) + "\n" }}
            />
            <textarea
              ref={textareaRef}
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              onScroll={syncScroll}
              onKeyDown={handleKeyDown}
              className="editor-textarea"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              data-gramm="false"
              aria-label="Editor de código JavaScript"
            />
          </div>
        </div>
      </div>

      {/* Resultados */}
      {resultado && (
        <div
          className={cn(
            "rounded-xl border overflow-hidden animate-slide-up",
            resultado.todosPasaron
              ? "bg-emerald-500/5 border-emerald-500/20"
              : "bg-red-500/5 border-red-500/20"
          )}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
            <Terminal size={15} className={resultado.todosPasaron ? "text-emerald-400" : "text-red-400"} />
            <span className={cn(
              "text-sm font-medium",
              resultado.todosPasaron ? "text-emerald-400" : "text-red-400"
            )}>
              {resultado.todosPasaron
                ? "Todos los tests pasaron"
                : "Algunos tests fallaron"}
            </span>
          </div>

          <div className="p-4 space-y-1">
            {resultado.tests.map((test, i) => (
              <div key={i} className="test-result">
                {test.pass ? (
                  <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <span className={test.pass ? "text-zinc-300" : "text-red-300"}>
                    {test.descripcion}
                  </span>
                  {test.hint && (
                    <p className="text-amber-400/80 text-xs mt-1">{test.hint}</p>
                  )}
                  {test.error && !test.hint && (
                    <p className="text-red-400/70 text-xs mt-1 font-mono">{test.error}</p>
                  )}
                </div>
              </div>
            ))}

            {resultado.error && !resultado.tests.length && (
              <div className="flex items-start gap-2 text-sm text-red-300">
                <XCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                <span className="font-mono text-xs">{resultado.error}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
