import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowRight, PartyPopper } from "lucide-react";
import Button from "../ui/Button";
import { Link } from "@remix-run/react";

const AUTO_DISMISS_MS = 6000;

export default function LessonComplete({ insignia, puntos, siguiente, onDismiss }) {
  const dismissed = useRef(false);

  const handleDismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    onDismiss();
  }, [onDismiss]);

  useEffect(() => {
    const autoTimer = setTimeout(handleDismiss, AUTO_DISMISS_MS);

    const handleInteraction = () => handleDismiss();

    const setupTimer = setTimeout(() => {
      window.addEventListener("scroll", handleInteraction, { once: true, passive: true });
      window.addEventListener("keydown", handleInteraction, { once: true });
      window.addEventListener("mousedown", handleInteraction, { once: true });
    }, 800);

    return () => {
      clearTimeout(autoTimer);
      clearTimeout(setupTimer);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("mousedown", handleInteraction);
    };
  }, [handleDismiss]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -20, height: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="mb-6"
      >
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center shrink-0"
            >
              <PartyPopper size={26} className="text-dark-900" />
            </motion.div>

            {/* Text + reward */}
            <div className="flex-1 min-w-0">
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-bold text-zinc-100 mb-1"
              >
                ¡Lección completada!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-zinc-400"
              >
                Has superado todos los ejercicios
              </motion.p>

              {insignia && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 }}
                  className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20"
                >
                  <Trophy size={14} className="text-primary" />
                  <span className="text-xs font-medium text-primary">
                    {insignia.replace(/-/g, " ")} · +{puntos} pts
                  </span>
                </motion.div>
              )}
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 shrink-0"
            >
              {siguiente ? (
                <Link to={`/curso/${siguiente.id}`}>
                  <Button size="md">
                    Siguiente
                    <ArrowRight size={14} />
                  </Button>
                </Link>
              ) : (
                <Link to="/curso">
                  <Button size="md">
                    <Trophy size={14} />
                    Curso completado
                  </Button>
                </Link>
              )}
              <button
                onClick={handleDismiss}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Cerrar
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
