-- ============================================
-- Migración: Tabla progreso_usuario
-- javascript-learning-app.dev
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================

-- 1. Crear tabla (ignorar si ya existe)
CREATE TABLE IF NOT EXISTS progreso_usuario (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  leccion_id TEXT NOT NULL,
  insignias  TEXT[] DEFAULT '{}',
  puntos     INTEGER DEFAULT 0,
  tiempo_total INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, leccion_id)
);

-- 2. Índices para queries rápidas
CREATE INDEX IF NOT EXISTS idx_progreso_user_id ON progreso_usuario(user_id);
CREATE INDEX IF NOT EXISTS idx_progreso_user_leccion ON progreso_usuario(user_id, leccion_id);

-- 3. Row Level Security (RLS)
ALTER TABLE progreso_usuario ENABLE ROW LEVEL SECURITY;

-- Eliminar política existente si la hay, y recrearla
DROP POLICY IF EXISTS "Usuarios ven su propio progreso" ON progreso_usuario;

CREATE POLICY "Usuarios ven su propio progreso"
  ON progreso_usuario
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
