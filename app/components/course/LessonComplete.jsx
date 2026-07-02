import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, ArrowRight, PartyPopper } from "lucide-react";
import Button from "../ui/Button";
import { Link } from "@remix-run/react";

export default function LessonComplete({ insignia, puntos, siguiente, onDismiss }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        onClick={onDismiss}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-dark-800 border border-zinc-700/50 rounded-3xl p-8 sm:p-10 max-w-md w-full text-center shadow-2xl shadow-primary/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Confetti icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center"
          >
            <PartyPopper size={36} className="text-dark-900" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-zinc-100 mb-2"
          >
            ¡Lección completada!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-400 text-sm mb-6"
          >
            Has superado todos los ejercicios
          </motion.p>

          {/* Reward */}
          {insignia && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-primary/10 border border-primary/20 mb-6"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Trophy size={20} className="text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs text-zinc-400">Insignia desbloqueada</p>
                <p className="text-sm font-semibold text-primary">
                  {insignia.replace(/-/g, " ")} · +{puntos} pts
                </p>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3"
          >
            {siguiente ? (
              <Link to={`/curso/${siguiente.id}`}>
                <Button className="w-full" size="lg">
                  Siguiente lección
                  <ArrowRight size={16} />
                </Button>
              </Link>
            ) : (
              <Link to="/curso">
                <Button className="w-full" size="lg">
                  <Trophy size={16} />
                  Curso completado
                </Button>
              </Link>
            )}
            <button
              onClick={onDismiss}
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
