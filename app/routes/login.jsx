import { useState } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { Code2, Mail, Lock, ArrowRight, AlertCircle, AlertTriangle } from "lucide-react";
import SkipLink from "../components/SkipLink";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { pageMeta, PROJECT_URL } from "../utils/meta";

export const meta = () => pageMeta({
  title: "Iniciar sesión - JavaScript está en tus manos",
  description: "Accede a tu cuenta para continuar con el curso de JavaScript.",
  url: `${PROJECT_URL}/login`,
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(null);
  const { signIn, signInWithOAuth, loading, error } = useAuth();
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

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-dark-800 text-zinc-500">o</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => signInWithOAuth("google")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-3 bg-dark-700 border border-zinc-600 rounded-xl text-zinc-300 text-sm font-medium hover:bg-dark-600 hover:border-zinc-500 transition-colors disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar con Google
          </button>
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
