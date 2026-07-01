import { cn } from "../../lib/utils";

export default function ProgressBar({ porcentaje = 0, showLabel = true, size = "md", className }) {
  const heights = {
    sm: "h-1.5",
    md: "h-3",
    lg: "h-4",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-400">Progreso</span>
          <span className="text-sm font-semibold text-primary">{porcentaje}%</span>
        </div>
      )}
      <div className={cn("w-full bg-dark-700 rounded-full overflow-hidden", heights[size])}>
        <div
          className="h-full bg-gradient-to-r from-primary-dark to-primary rounded-full transition-all duration-700 ease-out relative"
          style={{ width: `${porcentaje}%` }}
        >
          {porcentaje > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
