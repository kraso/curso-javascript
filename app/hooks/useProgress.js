import { useState, useEffect, useCallback } from "react";
import {
  getProgresoLocal,
  marcarLeccionCompletada,
  getInsignias,
  getTiempoTotal,
  actualizarTiempo,
  syncProgresoFromSupabase,
  migrarProgresoLocalASupabase,
} from "../lib/progress";
import { lecciones, getProgresoTotal } from "../data/lessons";

export function useProgress(userId) {
  const [progreso, setProgreso] = useState({
    leccionesCompletadas: [],
    insignias: [],
    tiempoTotal: 0,
  });

  useEffect(() => {
    setProgreso(getProgresoLocal());
  }, []);

  // Sync from Supabase when userId changes — merge with localStorage
  useEffect(() => {
    if (userId) {
      syncProgresoFromSupabase(userId).then((supabaseData) => {
        if (!supabaseData) return;

        if (supabaseData.leccionesCompletadas.length === 0) {
          migrarProgresoLocalASupabase(userId);
          return;
        }

        setProgreso((local) => ({
          leccionesCompletadas: [
            ...new Set([
              ...local.leccionesCompletadas,
              ...supabaseData.leccionesCompletadas,
            ]),
          ],
          insignias: [
            ...new Set([...local.insignias, ...supabaseData.insignias]),
          ],
          tiempoTotal: Math.max(local.tiempoTotal, supabaseData.tiempoTotal),
        }));
      });
    }
  }, [userId]);

  const completarLeccion = useCallback(
    (leccionId, insignia) => {
      const nuevoProgreso = marcarLeccionCompletada(leccionId, insignia, userId);
      setProgreso({ ...nuevoProgreso });
      return nuevoProgreso;
    },
    [userId]
  );

  const estaCompletada = useCallback(
    (leccionId) => {
      return progreso.leccionesCompletadas.includes(leccionId);
    },
    [progreso.leccionesCompletadas]
  );

  const porcentajeProgreso = useCallback(() => {
    return getProgresoTotal(progreso.leccionesCompletadas);
  }, [progreso.leccionesCompletadas]);

  const tieneInsignia = useCallback(
    (insignia) => {
      return progreso.insignias.includes(insignia);
    },
    [progreso.insignias]
  );

  const registrarTiempo = useCallback((segundos) => {
    const nuevoTiempo = actualizarTiempo(segundos);
    setProgreso((prev) => ({ ...prev, tiempoTotal: nuevoTiempo }));
  }, []);

  return {
    progreso,
    completarLeccion,
    estaCompletada,
    porcentajeProgreso,
    tieneInsignia,
    registrarTiempo,
    totalLecciones: lecciones.length,
  };
}
