import { supabase, isSupabaseConfigured } from "./supabase";
import { APP_ID } from "./constants";

const STORAGE_KEY = "curso-js-progress";

// ===== LOCAL STORAGE =====

export function getProgresoLocal() {
  if (typeof window === "undefined") return { leccionesCompletadas: [], insignias: [], tiempoTotal: 0 };

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error al leer progreso:", error);
  }

  return { leccionesCompletadas: [], insignias: [], tiempoTotal: 0 };
}

export function saveProgresoLocal(progreso) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso));
  } catch (error) {
    console.error("Error al guardar progreso:", error);
  }
}

// ===== SUPABASE SYNC =====

export async function syncProgresoFromSupabase(userId) {
  if (!isSupabaseConfigured() || !userId) return null;

  try {
    const { data, error } = await supabase
      .from("progreso_usuario")
      .select("leccion_id, insignias, puntos, tiempo_total")
      .eq("user_id", userId)
      .eq("app_id", APP_ID);

    if (error) throw error;

    const leccionesCompletadas = data.map((r) => r.leccion_id);
    const insignias = [...new Set(data.flatMap((r) => r.insignias || []))];
    const puntos = data.reduce((sum, r) => sum + (r.puntos || 0), 0);
    const tiempoTotal = data.reduce((sum, r) => sum + (r.tiempo_total || 0), 0);

    const progreso = { leccionesCompletadas, insignias, puntos, tiempoTotal };
    saveProgresoLocal(progreso);
    return progreso;
  } catch (error) {
    console.error("Error sync Supabase:", error);
    return null;
  }
}

export async function syncLeccionToSupabase(userId, leccionId, insignia) {
  if (!isSupabaseConfigured() || !userId) return;

  try {
    const { error } = await supabase.from("progreso_usuario").upsert(
      {
        user_id: userId,
        app_id: APP_ID,
        leccion_id: leccionId,
        insignias: insignia ? [insignia] : [],
        puntos: insignia ? 10 : 5,
      },
      { onConflict: "user_id,app_id,leccion_id" }
    );

    if (error) throw error;
  } catch (error) {
    console.error("Error guardando en Supabase:", error);
  }
}

// ===== MIGRATION: localStorage → Supabase =====

export async function migrarProgresoLocalASupabase(userId) {
  if (!isSupabaseConfigured() || !userId) return false;

  try {
    const local = getProgresoLocal();
    if (!local.leccionesCompletadas.length) return false;

    const { data: existing, error: checkErr } = await supabase
      .from("progreso_usuario")
      .select("leccion_id")
      .eq("user_id", userId)
      .eq("app_id", APP_ID);

    if (checkErr) throw checkErr;

    const existingIds = new Set(existing.map((r) => r.leccion_id));
    const toMigrate = local.leccionesCompletadas.filter((id) => !existingIds.has(id));

    if (!toMigrate.length) return false;

    const rows = toMigrate.map((leccionId) => ({
      user_id: userId,
      app_id: APP_ID,
      leccion_id: leccionId,
      insignias: local.insignias.includes(leccionId) ? [leccionId] : [],
      puntos: local.insignias.includes(leccionId) ? 10 : 5,
      tiempo_total: Math.floor(local.tiempoTotal / local.leccionesCompletadas.length),
    }));

    const { error: insertErr } = await supabase
      .from("progreso_usuario")
      .upsert(rows, { onConflict: "user_id,app_id,leccion_id" });

    if (insertErr) throw insertErr;

    console.log(`Migradas ${rows.length} lecciones a Supabase`);
    return true;
  } catch (error) {
    console.error("Error migrando progreso:", error);
    return false;
  }
}

// ===== MAIN FUNCTIONS =====

export function marcarLeccionCompletada(leccionId, insignia, userId) {
  const progreso = getProgresoLocal();

  if (!progreso.leccionesCompletadas.includes(leccionId)) {
    progreso.leccionesCompletadas.push(leccionId);
  }

  if (insignia && !progreso.insignias.includes(insignia)) {
    progreso.insignias.push(insignia);
  }

  saveProgresoLocal(progreso);

  if (userId) {
    syncLeccionToSupabase(userId, leccionId, insignia);
  }

  return progreso;
}

export function estaLeccionCompletada(leccionId) {
  const progreso = getProgresoLocal();
  return progreso.leccionesCompletadas.includes(leccionId);
}

export function getInsignias() {
  const progreso = getProgresoLocal();
  return progreso.insignias;
}

export function getTiempoTotal() {
  const progreso = getProgresoLocal();
  return progreso.tiempoTotal;
}

export function actualizarTiempo(segundos) {
  const progreso = getProgresoLocal();
  progreso.tiempoTotal += segundos;
  saveProgresoLocal(progreso);
  return progreso.tiempoTotal;
}

export function reiniciarProgreso() {
  saveProgresoLocal({ leccionesCompletadas: [], insignias: [], tiempoTotal: 0 });
}

// ===== SYNC ON LOGOUT =====

export async function sincronizarProgresoASupabase(userId) {
  if (!isSupabaseConfigured() || !userId) return false;

  try {
    const local = getProgresoLocal();
    if (!local.leccionesCompletadas.length) return true;

    const rows = local.leccionesCompletadas.map((leccionId) => ({
      user_id: userId,
      app_id: APP_ID,
      leccion_id: leccionId,
      insignias: local.insignias.includes(leccionId) ? [leccionId] : [],
      puntos: local.insignias.includes(leccionId) ? 10 : 5,
      tiempo_total: Math.floor(local.tiempoTotal / local.leccionesCompletadas.length),
    }));

    const { error } = await supabase
      .from("progreso_usuario")
      .upsert(rows, { onConflict: "user_id,app_id,leccion_id" });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error sincronizando progreso al cerrar sesión:", error);
    return false;
  }
}

export function limpiarProgresoLocal() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error limpiando progreso local:", error);
  }
}
