import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

function mapAuthError(message) {
  if (message.includes("already registered")) return "Este email ya está registrado.";
  if (message.includes("valid email")) return "El email no es válido.";
  if (message.includes("at least 6")) return "La contraseña debe tener al menos 6 caracteres.";
  if (message.includes("Password")) return "La contraseña no cumple los requisitos de seguridad.";
  if (message.includes("rate")) return "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.";
  return message || "Ha ocurrido un error inesperado.";
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "USER_UPDATED" || event === "SIGNED_IN") {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user ?? session?.user ?? null);
      } else {
        setUser(session?.user ?? null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!isSupabaseConfigured()) {
      const msg = "Supabase no está configurado. Revisa las variables de entorno.";
      setError(msg);
      return msg;
    }
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        const msg = mapAuthError(error.message);
        setError(msg);
        return msg;
      }
      return null;
    } catch (e) {
      setLoading(false);
      const msg = "Error de red. Comprueba tu conexión a internet.";
      setError(msg);
      return msg;
    }
  }, []);

  const signUp = useCallback(async (email, password, options) => {
    if (!isSupabaseConfigured()) {
      const msg = "Supabase no está configurado. Revisa las variables de entorno.";
      setError(msg);
      return msg;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          ...options,
          emailRedirectTo: typeof window !== "undefined"
            ? `${window.location.origin}/curso`
            : undefined,
        },
      });
      setLoading(false);
      if (error) {
        const msg = mapAuthError(error.message);
        setError(msg);
        return msg;
      }
      if (!data.user) {
        const msg = "No se pudo crear la cuenta. Inténtalo de nuevo.";
        setError(msg);
        return msg;
      }
      return { needsConfirmation: !data.session };
    } catch (e) {
      setLoading(false);
      const msg = "Error de red. Comprueba tu conexión a internet.";
      setError(msg);
      return msg;
    }
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured()) return;
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!isSupabaseConfigured()) return;
    const { data: { user: freshUser } } = await supabase.auth.getUser();
    if (freshUser) setUser({ ...freshUser });
  }, []);

  return { user, loading, error, signIn, signUp, signOut, refreshUser };
}
