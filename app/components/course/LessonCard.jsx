import { Link } from "@remix-run/react";
import { CheckCircle2, Clock, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export default function LessonCard({ leccion, completada, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: "easeOut" }}
    >
      <Link
        to={`/curso/${leccion.id}`}
        className={cn(
          "group block p-4 rounded-xl border transition-all duration-300",
          completada
            ? "bg-primary/5 border-primary/30 hover:border-primary/50"
            : "bg-dark-800 border-zinc-700/50 hover:border-zinc-600 hover:bg-dark-700"
        )}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-0.5">
            {completada ? (
              <CheckCircle2 size={24} className="text-primary" />
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-zinc-600 group-hover:border-primary flex items-center justify-center transition-colors">
                <span className="text-xs font-bold text-zinc-500 group-hover:text-primary">{leccion.orden}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-semibold mb-1 truncate",
              completada ? "text-primary" : "text-zinc-100 group-hover:text-primary transition-colors"
            )}>
              {leccion.titulo}
            </h3>
            <p className="text-sm text-zinc-500 line-clamp-2 mb-2">
              {leccion.descripcion}
            </p>
            <div className="flex items-center gap-4 text-xs text-zinc-600">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {leccion.duracion}
              </span>
              {leccion.recompensa && (
                <span className="flex items-center gap-1 text-primary/70">
                  <Trophy size={12} />
                  +{leccion.recompensa.puntos} pts
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
