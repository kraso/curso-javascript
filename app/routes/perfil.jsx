import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "@remix-run/react";
import {
  ArrowLeft, User, Mail, Save, BookOpen,
  Trophy, Clock, AlertCircle, CheckCircle2, Camera,
  Key, Shield
} from "lucide-react";
import SkipLink from "../components/SkipLink";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { useProgress } from "../hooks/useProgress";
import { supabase } from "../lib/supabase";

export default function Perfil() {
  const { user, loading } = useAuth();
  const { progreso } = useProgress(user?.id);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [savedPassword, setSavedPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState(null);

  const [newEmail, setNewEmail] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);
  const [savedEmail, setSavedEmail] = useState(false);
  const [errorEmail, setErrorEmail] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      setNombre(user.user_metadata?.nombre || "");
      setAvatarUrl(user.user_metadata?.avatar_url || null);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const userName = user.user_metadata?.nombre || "Usuario";
  const userInitial = userName.charAt(0).toUpperCase();
  const totalLecciones = progreso?.leccionesCompletadas?.length || 0;
  const totalInsignias = progreso?.insignias?.length || 0;

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("La imagen no debe superar 2 MB");
      return;
    }

    setUploadingAvatar(true);
    setError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      if (updateError) throw updateError;

      await supabase.auth.getUser();

      setAvatarUrl(publicUrl);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError("Error al subir imagen: " + err.message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const { error: updateError } = await supabase.auth.updateUser({
      data: { nombre },
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }

    setSaving(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErrorPassword(null);
    setSavedPassword(false);

    if (newPassword.length < 6) {
      setErrorPassword("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorPassword("Las contraseñas no coinciden");
      return;
    }

    setSavingPassword(true);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setErrorPassword(error.message);
    } else {
      setSavedPassword(true);
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSavedPassword(false), 3000);
    }

    setSavingPassword(false);
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setErrorEmail(null);
    setSavedEmail(false);

    if (!newEmail.includes("@") || !newEmail.includes(".")) {
      setErrorEmail("Email inválido");
      return;
    }

    if (newEmail === user.email) {
      setErrorEmail("El email es el mismo que el actual");
      return;
    }

    setSavingEmail(true);

    const { error } = await supabase.auth.updateUser({ email: newEmail });

    if (error) {
      setErrorEmail(error.message);
    } else {
      setSavedEmail(true);
      setNewEmail("");
      setTimeout(() => setSavedEmail(false), 5000);
    }

    setSavingEmail(false);
  };

  return (
    <div id="main-content" className="min-h-screen bg-dark-900 pt-20 pb-12">
      <SkipLink />
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link
          to="/curso"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-100 text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al curso
        </Link>

        {/* Profile header */}
        <div className="bg-dark-800 rounded-2xl border border-zinc-700/50 p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative group">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="w-16 h-16 rounded-xl object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-dark-900 font-bold text-2xl shrink-0">
                  {userInitial}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute inset-0 rounded-xl bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                aria-label="Cambiar avatar"
              >
                {uploadingAvatar ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera size={20} className="text-white" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-100">{userName}</h1>
              <p className="text-zinc-500 text-sm">{user.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-dark-700/50">
              <BookOpen size={20} className="text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-zinc-100">{totalLecciones}</p>
              <p className="text-xs text-zinc-500">Lecciones</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-dark-700/50">
              <Trophy size={20} className="text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-zinc-100">{totalInsignias}</p>
              <p className="text-xs text-zinc-500">Insignias</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-dark-700/50">
              <Clock size={20} className="text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-zinc-100">
                {progreso?.tiempoTotal ? Math.floor(progreso.tiempoTotal / 60) : 0}
              </p>
              <p className="text-xs text-zinc-500">Minutos</p>
            </div>
          </div>
        </div>

        {/* Edit profile */}
        <div className="bg-dark-800 rounded-2xl border border-zinc-700/50 p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <User size={18} className="text-primary" />
            Personalizar perfil
          </h2>

          <form onSubmit={handleSave} className="space-y-5">
            {error && (
              <div role="alert" className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {saved && (
              <div role="status" aria-live="polite" className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                <CheckCircle2 size={16} />
                Perfil actualizado correctamente
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
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={saving} size="md">
                {saving ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full animate-spin" />
                    Guardando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save size={16} />
                    Guardar cambios
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Change email */}
        <div className="bg-dark-800 rounded-2xl border border-zinc-700/50 p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <Mail size={18} className="text-primary" />
            Cambiar email
          </h2>

          <form onSubmit={handleChangeEmail} className="space-y-5">
            {errorEmail && (
              <div role="alert" className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle size={16} />
                {errorEmail}
              </div>
            )}

            {savedEmail && (
              <div role="status" aria-live="polite" className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                <CheckCircle2 size={16} />
                Se ha enviado un email de confirmación a tu nueva dirección
              </div>
            )}

            <div>
              <label htmlFor="email-actual" className="block text-sm font-medium text-zinc-300 mb-2">
                Email actual
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  id="email-actual"
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-zinc-700 rounded-xl text-zinc-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email-nuevo" className="block text-sm font-medium text-zinc-300 mb-2">
                Nuevo email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  id="email-nuevo"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-zinc-600 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="nuevo@email.com"
                  required
                />
              </div>
              <p className="text-xs text-zinc-600 mt-1">Recibirás un email de confirmación en ambas direcciones</p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={savingEmail} size="md">
                {savingEmail ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Mail size={16} />
                    Cambiar email
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Change password */}
        <div className="bg-dark-800 rounded-2xl border border-zinc-700/50 p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <Key size={18} className="text-primary" />
            Cambiar contraseña
          </h2>

          <form onSubmit={handleChangePassword} className="space-y-5">
            {errorPassword && (
              <div role="alert" className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle size={16} />
                {errorPassword}
              </div>
            )}

            {savedPassword && (
              <div role="status" aria-live="polite" className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                <CheckCircle2 size={16} />
                Contraseña actualizada correctamente
              </div>
            )}

            <div>
              <label htmlFor="password-nuevo" className="block text-sm font-medium text-zinc-300 mb-2">
                Nueva contraseña
              </label>
              <div className="relative">
                <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  id="password-nuevo"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-zinc-600 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
              <p className="text-xs text-zinc-600 mt-1">Mínimo 6 caracteres</p>
            </div>

            <div>
              <label htmlFor="password-confirmar" className="block text-sm font-medium text-zinc-300 mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Shield size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  id="password-confirmar"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-zinc-600 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={savingPassword} size="md">
                {savingPassword ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full animate-spin" />
                    Actualizando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Key size={16} />
                    Cambiar contraseña
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Insignias */}
        {totalInsignias > 0 && (
          <div className="bg-dark-800 rounded-2xl border border-zinc-700/50 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <Trophy size={18} className="text-primary" />
              Insignias desbloqueadas
            </h2>
            <div className="flex flex-wrap gap-2">
              {progreso.insignias.map((insignia) => (
                <span
                  key={insignia}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium"
                >
                  {insignia.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
