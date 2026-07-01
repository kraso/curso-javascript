import { Link, useLocation } from "@remix-run/react";
import { ChevronDown, ChevronRight, CheckCircle2, BookOpen, Brain } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { modulos, getLeccionesPorModulo } from "../../data/lessons";

const iconMap = {
  BookOpen,
  Brain,
};

export default function SidebarNavigation({ leccionesCompletadas }) {
  const location = useLocation();
  const [modulosAbiertos, setModulosAbiertos] = useState(modulos.map((m) => m.id));

  const toggleModulo = (id) => {
    setModulosAbiertos((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <div className="sticky top-20 space-y-2">
        {modulos.map((modulo) => {
          const lecciones = getLeccionesPorModulo(modulo.id);
          const completadasEnModulo = lecciones.filter((l) =>
            leccionesCompletadas.includes(l.id)
          ).length;
          const isOpen = modulosAbiertos.includes(modulo.id);
          const Icon = iconMap[modulo.icono] || BookOpen;

          return (
            <div key={modulo.id} className="bg-dark-800 rounded-xl border border-zinc-700/50 overflow-hidden">
              <button
                onClick={() => toggleModulo(modulo.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-dark-700 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-zinc-100">{modulo.nombre}</p>
                    <p className="text-xs text-zinc-500">
                      {completadasEnModulo}/{lecciones.length} lecciones
                    </p>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronDown size={16} className="text-zinc-500" />
                ) : (
                  <ChevronRight size={16} className="text-zinc-500" />
                )}
              </button>

              {isOpen && (
                <div className="px-2 pb-2 space-y-0.5">
                  {lecciones.map((leccion) => {
                    const completada = leccionesCompletadas.includes(leccion.id);
                    const isActive = location.pathname === `/curso/${leccion.id}`;

                    return (
                      <Link
                        key={leccion.id}
                        to={`/curso/${leccion.id}`}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-zinc-400 hover:text-zinc-100 hover:bg-dark-700"
                        )}
                      >
                        {completada ? (
                          <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                        ) : (
                          <span className="w-5 text-center text-xs font-mono text-zinc-600 flex-shrink-0">
                            {leccion.orden}
                          </span>
                        )}
                        <span className="truncate">{leccion.titulo}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
