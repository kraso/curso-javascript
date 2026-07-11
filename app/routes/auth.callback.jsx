import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { supabase } from "../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // Supabase processes the hash automatically
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        navigate("/curso");
      } else {
        // Try to exchange the code
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.hash);
        if (!error) {
          navigate("/curso");
        } else {
          console.error("OAuth callback error:", error);
          navigate("/login");
        }
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center gradient-bg dot-pattern px-4">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
        <p className="text-zinc-400">Iniciando sesion...</p>
      </div>
    </div>
  );
}
