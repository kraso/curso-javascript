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

-- ============================================
-- Storage: Bucket avatars
-- ============================================

-- Crear bucket público para avatares
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Política: usuarios autenticados pueden subir avatares
DROP POLICY IF EXISTS "Usuarios suben su avatar" ON storage.objects;
CREATE POLICY "Usuarios suben su avatar"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = 'avatars'
  );

-- Política: cualquiera puede ver avatares (bucket público)
DROP POLICY IF EXISTS "Avatar publicly readable" ON storage.objects;
CREATE POLICY "Avatar publicly readable"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'avatars');

-- Política: usuarios pueden actualizar su propio avatar
DROP POLICY IF EXISTS "Usuarios actualizan su avatar" ON storage.objects;
CREATE POLICY "Usuarios actualizan su avatar"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars')
  WITH CHECK (bucket_id = 'avatars');

-- Política: usuarios pueden eliminar su propio avatar
DROP POLICY IF EXISTS "Usuarios eliminan su avatar" ON storage.objects;
CREATE POLICY "Usuarios eliminan su avatar"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatars');
