import { Link } from "@remix-run/react";
import { ArrowRight, CheckCircle2, BookOpen, Code2, Cpu, Boxes, Rocket } from "lucide-react";
import { useProgress } from "../../hooks/useProgress";
import { lecciones, modulos } from "../../data/lessons";

const moduleIcons = {
  1: BookOpen,
  2: Code2,
  3: Cpu,
  4: Boxes,
};

const moduleColors = {
  1: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", glow: "rgba(245, 158, 11, 0.08)" },
  2: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", glow: "rgba(16, 185, 129, 0.08)" },
  3: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", glow: "rgba(139, 92, 246, 0.08)" },
  4: { bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-400", glow: "rgba(244, 63, 94, 0.08)" },
};

export default function CourseOutline() {
  const { progreso } = useProgress();
  const leccionesCompletadas = progreso?.leccionesCompletadas || [];

  const totalLecciones = lecciones.length;
  const completadas = leccionesCompletadas.length;
  const porcentaje = totalLecciones > 0 ? Math.round((completadas / totalLecciones) * 100) : 0;

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-700/50 border border-zinc-700/50 text-zinc-400 text-sm font-medium mb-6">
            <Boxes size={16} className="text-primary" />
            Programa completo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            Domina JavaScript
            <br />
            <span className="text-gradient">paso a paso</span>
          </h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            {totalLecciones} lecciones organizadas en {modulos.length} módulos progresivos.
            Cada módulo construye sobre el anterior.
          </p>

          {/* Progress bar */}
          {completadas > 0 && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">Tu progreso</span>
                <span className="text-primary font-semibold">{porcentaje}%</span>
              </div>
              <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-amber-400 rounded-full transition-all duration-700"
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
              <p className="text-zinc-600 text-xs mt-2">
                {completadas} de {totalLecciones} lecciones completadas
              </p>
            </div>
          )}
        </div>

        {/* Module grid - masonry style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {modulos.map((modulo, index) => {
            const ModuleIcon = moduleIcons[modulo.id] || BookOpen;
            const colors = moduleColors[modulo.id] || moduleColors[1];
            const modLecciones = lecciones.filter((l) => l.modulo === modulo.id);
            const modCompletadas = modLecciones.filter((l) =>
              leccionesCompletadas.includes(l.id)
            ).length;
            const modPorcentaje =
              modLecciones.length > 0
                ? Math.round((modCompletadas / modLecciones.length) * 100)
                : 0;
            const isComplete = modCompletadas === modLecciones.length && modLecciones.length > 0;

            return (
              <div
                key={modulo.id}
                className={`group relative rounded-2xl border transition-all duration-500 hover:scale-[1.01] ${
                  isComplete
                    ? "bg-dark-800/80 border-primary/20"
                    : "bg-dark-800/60 border-zinc-700/40 hover:border-zinc-600/60"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  boxShadow: isComplete ? `0 0 40px ${colors.glow}` : "none",
                }}
              >
                {/* Module header */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center`}
                      >
                        <ModuleIcon size={22} className={colors.text} />
                      </div>
                      <div>
                        <span className={`text-xs font-semibold ${colors.text} uppercase tracking-wider`}>
                          Nivel {modulo.id}
                        </span>
                        <h3 className="text-xl font-bold text-zinc-100">{modulo.nombre}</h3>
                      </div>
                    </div>
                    {isComplete && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                        <CheckCircle2 size={14} className="text-primary" />
                        <span className="text-xs font-semibold text-primary">Completado</span>
                      </div>
                    )}
                  </div>

                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                    {modulo.descripcion}
                  </p>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-zinc-500">
                        {modCompletadas} de {modLecciones.length} lecciones
                      </span>
                      <span className={`font-semibold ${colors.text}`}>{modPorcentaje}%</span>
                    </div>
                    <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isComplete
                            ? "bg-gradient-to-r from-primary to-amber-400"
                            : `bg-gradient-to-r ${
                                modulo.id === 1
                                  ? "from-amber-500 to-amber-400"
                                  : modulo.id === 2
                                  ? "from-emerald-500 to-emerald-400"
                                  : modulo.id === 3
                                  ? "from-violet-500 to-violet-400"
                                  : "from-rose-500 to-rose-400"
                              }`
                        }`}
                        style={{ width: `${modPorcentaje}%` }}
                      />
                    </div>
                  </div>

                  {/* Lessons list */}
                  <div className="space-y-1">
                    {modLecciones.map((leccion, li) => {
                      const isLessonComplete = leccionesCompletadas.includes(leccion.id);
                      return (
                        <Link
                          key={leccion.id}
                          to={`/curso/${leccion.id}`}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-dark-700/50 transition-colors group/item"
                        >
                          <span className="text-xs text-zinc-600 w-5 text-right font-mono">
                            {String(li + 1).padStart(2, "0")}
                          </span>
                          {isLessonComplete ? (
                            <CheckCircle2 size={15} className="text-primary flex-shrink-0" />
                          ) : (
                            <div className="w-[15px] h-[15px] rounded-full border border-zinc-700 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${isLessonComplete ? "text-zinc-300" : "text-zinc-500"} group-hover/item:text-zinc-100 transition-colors flex-1`}>
                            {leccion.titulo}
                          </span>
                          <span className="text-xs text-zinc-600">{leccion.duracion}</span>
                          <ArrowRight size={14} className="text-zinc-700 group-hover/item:text-zinc-500 transition-colors" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Module footer accent */}
                <div
                  className={`h-1 rounded-b-2xl ${
                    isComplete
                      ? "bg-gradient-to-r from-primary via-amber-400 to-primary"
                      : modulo.id === 1
                      ? "bg-gradient-to-r from-amber-500/40 to-transparent"
                      : modulo.id === 2
                      ? "bg-gradient-to-r from-emerald-500/40 to-transparent"
                      : modulo.id === 3
                      ? "bg-gradient-to-r from-violet-500/40 to-transparent"
                      : "bg-gradient-to-r from-rose-500/40 to-transparent"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/curso"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-dark-900 font-semibold text-lg transition-all duration-200 hover:glow-lg active:scale-95"
          >
            <Rocket size={20} />
            Comenzar a aprender
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
