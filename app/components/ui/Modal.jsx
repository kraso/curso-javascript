import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Modal({ isOpen, onClose, children, title, className }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          "relative bg-dark-800 border border-zinc-700 rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto animate-slide-up",
          className
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-700">
          <h2 className="text-xl font-bold text-zinc-100">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-dark-700 text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
