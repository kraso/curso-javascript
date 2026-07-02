import { motion, AnimatePresence } from "framer-motion";
import { Cloud, CloudOff, Check } from "lucide-react";

export default function SyncToast({ show, success = true }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          className="fixed top-20 left-1/2 z-50"
        >
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm ${
            success
              ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
              : "bg-amber-500/20 border border-amber-500/30 text-amber-400"
          }`}>
            {success ? (
              <>
                <Cloud size={14} />
                <span>Progreso guardado</span>
                <Check size={14} />
              </>
            ) : (
              <>
                <CloudOff size={14} />
                <span>Guardado local</span>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
