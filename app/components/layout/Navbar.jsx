import { Link, useLocation, useNavigate } from "@remix-run/react";
import { useState, useRef, useEffect } from "react";
import {
  Menu, X, User, Code2, LogOut,
  BookOpen, ChevronDown, Trophy, Sun, Moon,
  Home, Layers, FolderOpen, Rocket
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../hooks/useAuth";
import { useProgress } from "../../hooks/useProgress";
import { useTheme } from "../../hooks/useTheme";
import { sincronizarProgresoASupabase, limpiarProgresoLocal } from "../../lib/progress";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { progreso } = useProgress(user?.id);
  const { theme, toggleTheme } = useTheme();

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Cerrar dropdown al cambiar de ruta
  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    if (user?.id) {
      await sincronizarProgresoASupabase(user.id);
    }
    limpiarProgresoLocal();
    await signOut();
    setDropdownOpen(false);
    window.location.href = "/";
  };

  const scrollToSection = (sectionId) => {
    setMobileOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const userName = user?.user_metadata?.nombre || user?.email?.split("@")[0] || "Usuario";
  const userEmail = user?.email || "";
  const userInitial = userName.charAt(0).toUpperCase();
  const totalLecciones = progreso?.leccionesCompletadas?.length || 0;
  const totalInsignias = progreso?.insignias?.length || 0;

  const isLanding = location.pathname === "/";

  const navLinks = [
    { label: "Inicio", icon: Home, onClick: () => scrollToSection("inicio"), active: isLanding },
    { label: "Características", icon: Layers, onClick: () => scrollToSection("caracteristicas"), active: isLanding },
    { label: "Temario", icon: FolderOpen, onClick: () => scrollToSection("temario"), active: isLanding },
    { label: "Curso", to: "/curso", icon: BookOpen },
  ];

  return (
    <nav aria-label="Navegación principal" className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center group-hover:glow transition-shadow">
              <Code2 size={20} className="text-dark-900" />
            </div>
            <span className="font-bold text-lg text-zinc-100 hidden sm:block">
              JS<span className="text-primary">Course</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    location.pathname.startsWith(link.to)
                      ? "bg-dark-700 text-primary"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-dark-700/50"
                  )}
                >
                  <link.icon size={15} />
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={link.onClick}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    "text-zinc-400 hover:text-zinc-100 hover:bg-dark-700/50"
                  )}
                >
                  <link.icon size={15} />
                  {link.label}
                </button>
              )
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-dark-700/50 transition-colors ml-2"
              aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* CTA Empezar Curso */}
            <Link
              to="/curso"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary hover:bg-primary-dark text-dark-900 transition-colors ml-2"
            >
              <Rocket size={15} />
              Empezar Curso
            </Link>

            {/* Usuario no logueado */}
            {!loading && !user && (
              <div className="flex items-center gap-2 ml-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-dark-700/50 transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/registro"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-primary hover:bg-primary-dark text-dark-900 transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}

            {/* Usuario logueado - dropdown */}
            {!loading && user && (
              <div className="relative ml-2" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-dark-700/50 transition-colors group"
                >
                  {/* Avatar */}
                  {user?.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt={userName}
                      className="w-8 h-8 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-dark-900 font-bold text-sm shrink-0">
                      {userInitial}
                    </div>
                  )}
                  <div className="hidden lg:flex flex-col items-start">
                    <span className="text-sm font-medium text-zinc-200 leading-tight">
                      {userName}
                    </span>
                    <span className="text-xs text-zinc-500 leading-tight">
                      {totalLecciones} lecciones
                    </span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={cn(
                      "text-zinc-500 transition-transform hidden lg:block",
                      dropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-dark-800 border border-zinc-700/60 rounded-xl shadow-2xl shadow-black/40 overflow-hidden animate-slide-up">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-zinc-700/50">
                      <div className="flex items-center gap-3">
                        {user?.user_metadata?.avatar_url ? (
                          <img
                            src={user.user_metadata.avatar_url}
                            alt={userName}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-dark-900 font-bold text-base shrink-0">
                            {userInitial}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-zinc-100 truncate">
                            {userName}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">
                            {userEmail}
                          </p>
                        </div>
                      </div>
                      {/* Quick stats */}
                      <div className="flex gap-4 mt-3">
                        <div className="flex items-center gap-1.5">
                          <BookOpen size={12} className="text-primary" />
                          <span className="text-xs text-zinc-400">
                            <span className="font-semibold text-zinc-200">{totalLecciones}</span> lecciones
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Trophy size={12} className="text-primary" />
                          <span className="text-xs text-zinc-400">
                            <span className="font-semibold text-zinc-200">{totalInsignias}</span> insignias
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="p-1.5">
                      <Link
                        to="/perfil"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-zinc-100 hover:bg-dark-700/60 transition-colors"
                      >
                        <User size={16} className="text-zinc-500" />
                        Mi perfil
                      </Link>
                      <Link
                        to="/curso"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-zinc-100 hover:bg-dark-700/60 transition-colors"
                      >
                        <BookOpen size={16} className="text-zinc-500" />
                        Continuar aprendiendo
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="p-1.5 border-t border-zinc-700/50">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut size={16} />
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2.5 rounded-lg hover:bg-dark-700 text-zinc-400"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-800 animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {/* User info mobile */}
            {!loading && user && (
              <div className="flex items-center gap-3 px-4 py-3 mb-2">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={userName}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-dark-900 font-bold text-base shrink-0">
                    {userInitial}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-zinc-100">{userName}</p>
                  <p className="text-xs text-zinc-500">{userEmail}</p>
                </div>
              </div>
            )}

            {/* Theme toggle mobile */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-dark-700/50 transition-colors"
              aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "dark" ? "Modo claro" : "Modo oscuro"}
            </button>

            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    location.pathname.startsWith(link.to)
                      ? "bg-dark-700 text-primary"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-dark-700/50"
                  )}
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={link.onClick}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full text-left",
                    "text-zinc-400 hover:text-zinc-100 hover:bg-dark-700/50"
                  )}
                >
                  <link.icon size={16} />
                  {link.label}
                </button>
              )
            )}

            {/* CTA Empezar Curso mobile */}
            <Link
              to="/curso"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium bg-primary text-dark-900 text-center mt-2"
            >
              <Rocket size={16} />
              Empezar Curso
            </Link>

            {!loading && !user && (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-dark-700/50 transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/registro"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium bg-primary text-dark-900 text-center mt-2"
                >
                  Registrarse
                </Link>
              </>
            )}

            {!loading && user && (
              <>
                <Link
                  to="/perfil"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-dark-700/50 transition-colors"
                >
                  <User size={16} />
                  Mi perfil
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={16} />
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
