import { useState } from "react";
import { Link } from "@remix-run/react";
import { Code2, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import SkipLink from "../components/SkipLink";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

export const meta = () => [
  { title: "Crear cuenta - JavaScript está en tus manos" },
  {
    name: "description",
    content: "Regístrate gratis y empieza a aprender JavaScript hoy.",
  },
];

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [registered, setRegistered] = useState(false);
  const [warning, setWarning] = useState(null);
  const { signUp, loading, error } = useAuth();

  const validar = () => {
    const newErrors = {};
    if (nombre.length < 2) newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    if (!email.includes("@")) newErrors.email = "Email inválido";
    if (password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;
    setWarning(null);
    try {
      const result = await signUp(email, password, { data: { full_name: nombre } });
      if (typeof result === "string") {
        setWarning(result);
        return;
      }
      if (typeof result === "object" && result !== null) {
        if (result.needsConfirmation) {
          setRegistered(true);
        } else {
          window.location.href = "/curso";
        }
      }
    } catch {
      setWarning("Error inesperado. Inténtalo de nuevo más tarde.");
    }
  };

  if (registered) {
    return (
      <div id="main-content" className="min-h-screen bg-dark-900 flex items-center justify-center gradient-bg dot-pattern px-4">
        <SkipLink />
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-100 mb-3">Revisa tu email</h1>
          <p className="text-zinc-400 mb-8">
            Hemos enviado un enlace de confirmación a <span className="text-zinc-200 font-medium">{email}</span>.
            Haz clic en el enlace para activar tu cuenta.
          </p>
          <Link to="/login">
            <Button size="lg">
              Ir a iniciar sesión
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-zinc-100">Crear cuenta</h1>
          <p className="text-zinc-500 mt-2">Empieza a aprender JavaScript hoy</p>
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
            <label htmlFor="nombre" className="block text-sm font-medium text-zinc-300 mb-2">
              Nombre
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-zinc-600 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors"
                placeholder="Tu nombre"
                required
              />
            </div>
            {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
          </div>

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
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
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
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full animate-spin" />
                Creando cuenta...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Crear cuenta
                <ArrowRight size={18} />
              </span>
            )}
          </Button>
        </form>

        <p className="text-center mt-6 text-zinc-500 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-primary hover:text-primary-dark transition-colors font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
