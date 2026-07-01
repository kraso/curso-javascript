import { Trophy, Star, Zap, Target, Award } from "lucide-react";
import { cn } from "../../lib/utils";

const insigniasConfig = {
  "Primeros-pasos": { icon: Star, color: "text-yellow-400", bg: "bg-yellow-400/10", label: "Primeros pasos" },
  "Cientifico-de-datos": { icon: Zap, color: "text-blue-400", bg: "bg-blue-400/10", label: "Científico de datos" },
  "Maestro-matematicas": { icon: Target, color: "text-green-400", bg: "bg-green-400/10", label: "Maestro matemáticas" },
  "Logica-pura": { icon: Award, color: "text-purple-400", bg: "bg-purple-400/10", label: "Lógica pura" },
  "Iterador-pro": { icon: Trophy, color: "text-orange-400", bg: "bg-orange-400/10", label: "Iterador Pro" },
};

export default function RewardBadge({ insigniaId, size = "md", unlocked = false }) {
  const config = insigniasConfig[insigniaId] || insigniasConfig["Primeros-pasos"];
  const Icon = config.icon;

  const sizes = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 36,
  };

  return (
    <div
      className={cn(
        "rounded-2xl flex items-center justify-center transition-all duration-300",
        sizes[size],
        unlocked ? config.bg : "bg-dark-700",
        unlocked && "animate-pulse-glow"
      )}
      title={config.label}
    >
      <Icon
        size={iconSizes[size]}
        className={cn(
          "transition-colors",
          unlocked ? config.color : "text-zinc-600"
        )}
      />
    </div>
  );
}
