import { Link } from "@remix-run/react";
import { ArrowRight, Rocket } from "lucide-react";
import Button from "../ui/Button";

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-dark-800/60 border border-zinc-700/40 rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Rocket size={14} />
            Empieza hoy
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            Tu viaje con JavaScript
            <br />
            <span className="text-gradient">comienza aquí</span>
          </h2>

          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            No necesitas experiencia previa. Solo ganas de aprender
            y un navegador web.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/registro">
              <Button size="lg" className="text-base sm:text-lg px-8">
                Comenzar gratis
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/curso">
              <Button variant="secondary" size="lg" className="text-base sm:text-lg px-8">
                Explorar lecciones
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-zinc-600">
            Sin registro requerido · Acceso inmediato · 100% gratis
          </p>
        </div>
      </div>
    </section>
  );
}
