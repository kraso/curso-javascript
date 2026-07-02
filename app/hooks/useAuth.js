import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

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
      setError("Supabase no está configurado");
      return "Supabase no está configurado";
    }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return error.message;
    }
    return null;
  }, []);

  const signUp = useCallback(async (email, password, options) => {
    if (!isSupabaseConfigured()) {
      setError("Supabase no está configurado");
      return "Supabase no está configurado";
    }
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return error.message;
    }
    return { needsConfirmation: !data.session };
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
