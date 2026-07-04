import { Code2, Heart, ExternalLink, Mail, Github } from "lucide-react";
import { Link } from "@remix-run/react";

const PROJECT_URL = "https://javascript-learning-app.dev";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-dark-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code2 size={18} className="text-dark-900" />
              </div>
              <span className="font-bold text-lg text-zinc-100">
                JS<span className="text-primary">Course</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Aprende JavaScript de forma interactiva con ejercicios prácticos y un sistema de progreso gamificado.
            </p>
          </div>

          <div>
            <h3 className="text-zinc-100 font-semibold mb-4">Curso</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/curso" className="text-zinc-500 hover:text-primary text-sm transition-colors">
                  Todas las lecciones
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-zinc-500 hover:text-primary text-sm transition-colors">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link to="/registro" className="text-zinc-500 hover:text-primary text-sm transition-colors">
                  Crear cuenta
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-zinc-100 font-semibold mb-4">Recursos</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://developer.mozilla.org/es/docs/Web/JavaScript"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-500 hover:text-primary text-sm transition-colors"
              >
                MDN Web Docs
                <ExternalLink size={11} />
              </a>
              <a
                href="https://github.com/kraso"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-500 hover:text-primary text-sm transition-colors"
              >
                GitHub
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-zinc-100 font-semibold mb-4">Contacto</h3>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:marcoscalabresibaniez@gmail.com"
                className="flex items-center gap-2 text-zinc-500 hover:text-primary text-sm transition-colors"
              >
                <Mail size={14} />
                marcoscalabresibaniez@gmail.com
              </a>
              <a
                href="https://github.com/kraso"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-500 hover:text-primary text-sm transition-colors"
              >
                <Github size={14} />
               github.com/kraso
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <p className="text-zinc-600 text-sm" suppressHydrationWarning>
              &copy; {new Date().getFullYear()} javascript-learning-app.dev · Marcos Calabrés Ibáñez. Todos los derechos reservados.
            </p>
            <p className="text-zinc-600 text-sm flex items-center gap-1">
              Hecho con <Heart size={14} className="text-red-500 fill-red-500" /> para la comunidad
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-zinc-600">
            <a href="/Privacidad.md" className="hover:text-primary transition-colors">Política de Privacidad</a>
            <span>·</span>
            <a href="/Terminos.md" className="hover:text-primary transition-colors">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
