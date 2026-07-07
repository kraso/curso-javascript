import { useState } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { Code2, Mail, Lock, ArrowRight, AlertCircle, AlertTriangle } from "lucide-react";
import SkipLink from "../components/SkipLink";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { pageMeta } from "../utils/meta";

export const meta = () => pageMeta({
  title: "Iniciar sesión - JavaScript está en tus manos",
  description: "Accede a tu cuenta para continuar con el curso de JavaScript.",
  url: "https://javascript-learning-app.dev/login",
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(null);
  const { signIn, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning(null);
    try {
      const err = await signIn(email, password);
      if (err) {
        setWarning(err);
        return;
      }
      navigate("/curso");
    } catch {
      setWarning("Error inesperado. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div id="main-content" className="min-h-screen bg-dark-900 flex items-center justify-center gradient-bg dot-pattern px-4">
      <SkipLink />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Code2 size={22} className="text-dark-900" />
            </div>
            <span className="font-bold text-xl text-zinc-100">
              JS<span className="text-primary">Course</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-zinc-100">Iniciar sesión</h1>
          <p className="text-zinc-500 mt-2">Accede a tu curso de JavaScript</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-dark-800 border border-zinc-700 rounded-2xl p-8 space-y-5">
          {error && (
            <div role="alert" className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {warning && (
            <div role="alert" className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
              <AlertTriangle size={16} />
              {warning}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-zinc-600 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-zinc-600 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full animate-spin" />
                Iniciando sesión...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Iniciar sesión
                <ArrowRight size={18} />
              </span>
            )}
          </Button>
        </form>

        <p className="text-center mt-6 text-zinc-500 text-sm">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-primary hover:text-primary-dark transition-colors font-medium">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
