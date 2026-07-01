import { Code2, Trophy, Zap, BookOpen, Brain, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Editor interactivo",
    description: "Escribe y ejecuta código directamente en el navegador con resaltado de sintaxis y tests automáticos.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: Trophy,
    title: "Sistema de logros",
    description: "Desbloquea insignias y gana puntos mientras avanzas. Cada lección completada es una recompensa.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Progreso automático",
    description: "Tu avance se guarda instantáneamente. Continúa desde donde lo dejaste en cualquier dispositivo.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: BookOpen,
    title: "Contenido estructurado",
    description: "23 lecciones en 4 módulos progresivos. Desde fundamentos hasta conceptos avanzados.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    icon: Brain,
    title: "Aprendizaje activo",
    description: "No solo leas: resuelve ejercicios reales que refuerzan cada concepto aprendido.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Globe,
    title: "100% gratuito",
    description: "Todo el contenido accesible sin registro. Sin muros de pago ni suscripciones ocultas.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

export default function Features() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-700/50 border border-zinc-700/50 text-zinc-400 text-sm font-medium mb-6">
            <Shield size={14} className="text-primary" />
            Diseñado para ti
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            Todo lo que necesitas
            <br />
            <span className="text-gradient">en un solo lugar</span>
          </h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            Herramientas y características diseñadas para que aprendas
            JavaScript de forma efectiva y sin fricciones.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-dark-800/60 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300 hover:bg-dark-800/80"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-11 h-11 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} className={feature.color} />
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
