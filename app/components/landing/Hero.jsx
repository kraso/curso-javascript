import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-700/50 border border-zinc-700/50 text-zinc-400 text-sm font-medium mb-8 animate-fade-in">
          <Sparkles size={14} className="text-primary" />
          Curso 100% interactivo y gratuito
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.05] tracking-tight animate-slide-up text-balance">
          <span className="text-zinc-100">JavaScript</span>
          <br />
          <span className="text-gradient">está en tus manos</span>
        </h1>

        {/* Video preview */}
        <div className="max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <div className="relative rounded-2xl overflow-hidden border border-zinc-700/50 shadow-2xl shadow-primary/5 group">
            <video
              src="/curso-js.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block"
              preload="metadata"
            />
            {/* Glow overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/5" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up text-balance" style={{ animationDelay: "0.1s" }}>
          Aprende el lenguaje más popular del mundo de forma interactiva.
          Escribe código, resuelve ejercicios y avanza a tu ritmo.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Link to="/registro">
            <Button size="lg" className="text-base sm:text-lg px-8">
              Empezar ahora
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/curso">
            <Button variant="secondary" size="lg" className="text-base sm:text-lg px-8">
              <Play size={16} />
              Ver lecciones
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-6 sm:gap-8 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-gradient">23</p>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">Lecciones</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-gradient">4</p>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">Módulos</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-gradient">100%</p>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">Gratis</p>
          </div>
        </div>

        {/* Code preview floating */}
        <div className="mt-16 max-w-md mx-auto animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="bg-dark-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-700/50">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-zinc-600 font-mono ml-2">lesson.js</span>
            </div>
            <div className="p-4 text-left">
              <pre className="text-sm font-mono leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-violet-400">const</span>{" "}
                  <span className="text-zinc-300">curso</span>{" "}
                  <span className="text-zinc-500">=</span>{" "}
                  <span className="text-emerald-400">&quot;JavaScript&quot;</span>
                  <span className="text-zinc-500">;</span>
                  {"\n"}
                  <span className="text-zinc-500">{"\n"}</span>
                  <span className="text-violet-400">function</span>{" "}
                  <span className="text-amber-300">aprender</span>
                  <span className="text-zinc-500">(</span>
                  <span className="text-orange-300">tema</span>
                  <span className="text-zinc-500">) {"{"}</span>
                  {"\n"}
                  {"  "}
                  <span className="text-violet-400">return</span>{" "}
                  <span className="text-emerald-400">`Dominé ${"{ tema }"}`</span>
                  <span className="text-zinc-500">;</span>
                  {"\n"}
                  <span className="text-zinc-500">{"}"}</span>
                  {"\n"}
                  {"\n"}
                  <span className="text-zinc-500">{"// "}</span>
                  <span className="text-zinc-600 italic">¡Empieza tu viaje!</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
