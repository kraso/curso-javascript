import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useOutletContext, useLoaderData } from "@remix-run/react";
import { ArrowLeft, ArrowRight, Clock, Trophy, CheckCircle2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import CodeEditor from "../components/course/CodeEditor";
import RewardBadge from "../components/course/RewardBadge";
import LessonComplete from "../components/course/LessonComplete";
import SyncToast from "../components/course/SyncToast";
import Button from "../components/ui/Button";
import { getLeccionPorId, getSiguienteLeccion, getLeccionAnterior } from "../data/lessons";
import { parseMarkdown } from "../utils/syntax";
import { isSupabaseConfigured } from "../lib/supabase";

export const loader = ({ params }) => {
  const leccion = getLeccionPorId(params.leccionId);
  if (!leccion) {
    throw new Response("Lección no encontrada", { status: 404 });
  }
  return { leccion };
};

export const meta = ({ data }) => {
  if (!data?.leccion) {
    return [{ title: "Lección no encontrada - JavaScript está en tus manos" }];
  }
  return [
    { title: `${data.leccion.titulo} - JavaScript está en tus manos` },
    { name: "description", content: data.leccion.descripcion },
    { property: "og:title", content: data.leccion.titulo },
    { property: "og:description", content: data.leccion.descripcion },
    { property: "og:type", content: "article" },
    { name: "robots", content: "index, follow" },
  ];
};

const fadeSlide = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

export default function LeccionRoute() {
  const { leccionId } = useParams();
  const { leccion } = useLoaderData();
  const { progreso, completarLeccion } = useOutletContext();
  const leccionesCompletadas = progreso?.leccionesCompletadas || [];

  const [showComplete, setShowComplete] = useState(false);
  const [showSync, setShowSync] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(true);

  if (!leccion) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-zinc-100 mb-4">Lección no encontrada</h1>
        <p className="text-zinc-500 mb-8">Esta lección no existe o ha sido movida.</p>
        <Link to="/curso">
          <Button>Volver al curso</Button>
        </Link>
      </div>
    );
  }

  const completada = leccionesCompletadas.includes(leccion.id);
  const siguiente = getSiguienteLeccion(leccion);
  const anterior = getLeccionAnterior(leccion);

  const handleResolver = useCallback(() => {
    const yaCompletada = leccionesCompletadas.includes(leccion.id);
    completarLeccion(leccion.id, leccion.recompensa?.insignia);

    if (!yaCompletada) {
      setShowComplete(true);
    }

    if (isSupabaseConfigured()) {
      setShowSync(true);
      setSyncSuccess(true);
      setTimeout(() => setShowSync(false), 2500);
    }
  }, [leccion.id, leccion.recompensa, completarLeccion, leccionesCompletadas]);

  const handleDismissComplete = useCallback(() => {
    setShowComplete(false);
  }, []);

  return (
    <>
      <SyncToast show={showSync} success={syncSuccess} />

      <motion.div
        key={leccionId}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <motion.div custom={0} variants={fadeSlide}>
          <Link
            to="/curso"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-100 text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Volver al curso
          </Link>
        </motion.div>

        {showComplete && (
          <LessonComplete
            insignia={leccion.recompensa?.insignia}
            puntos={leccion.recompensa?.puntos}
            siguiente={siguiente}
            onDismiss={handleDismissComplete}
          />
        )}

        {/* Cabecera de la lección */}
        <motion.div custom={1} variants={fadeSlide} className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <BookOpen size={12} />
              Módulo {leccion.modulo} · {leccion.moduloNombre}
            </span>
            <span className="flex items-center gap-1 text-zinc-500 text-sm">
              <Clock size={14} />
              {leccion.duracion}
            </span>
            {completada && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <CheckCircle2 size={12} />
                Completada
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-3 tracking-tight">
            {leccion.titulo}
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">{leccion.descripcion}</p>
        </motion.div>

        {/* Recompensa */}
        {leccion.recompensa && (
          <motion.div custom={2} variants={fadeSlide} className={`flex items-center gap-4 p-4 rounded-xl border mb-8 transition-colors ${
            completada
              ? "bg-primary/5 border-primary/30"
              : "bg-dark-800 border-zinc-700/50"
          }`}>
            <RewardBadge insigniaId={leccion.recompensa.insignia} unlocked={completada} />
            <div>
              <p className="text-sm text-zinc-400">Recompensa al completar</p>
              <p className={`font-semibold ${completada ? "text-primary" : "text-zinc-100"}`}>
                Insignia &ldquo;{leccion.recompensa.insignia.replace(/-/g, " ")}&rdquo; · +{leccion.recompensa.puntos} puntos
              </p>
            </div>
            {completada && (
              <div className="ml-auto">
                <span className="flex items-center gap-1 text-emerald-400 text-sm">
                  <CheckCircle2 size={14} />
                  Obtenida
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* Contenido de la lección */}
        <motion.div custom={3} variants={fadeSlide} className="bg-dark-800 rounded-2xl border border-zinc-700/50 p-6 sm:p-8 mb-8">
          <div
            className="lesson-content"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(leccion.contenido) }}
          />
        </motion.div>

        {/* Ejercicio interactivo */}
        <motion.div custom={4} variants={fadeSlide} className="bg-dark-800 rounded-2xl border border-zinc-700/50 p-6 sm:p-8 mb-8">
          <CodeEditor ejercicio={leccion.ejercicio} onResolver={handleResolver} />
        </motion.div>

        {/* Navegación */}
        <motion.div custom={5} variants={fadeSlide} className="flex items-center justify-between gap-4">
          {anterior ? (
            <Link to={`/curso/${anterior.id}`}>
              <Button variant="ghost">
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">{anterior.titulo}</span>
                <span className="sm:hidden">Anterior</span>
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {siguiente ? (
            <Link to={`/curso/${siguiente.id}`}>
              <Button>
                <span className="hidden sm:inline">{siguiente.titulo}</span>
                <span className="sm:hidden">Siguiente</span>
                <ArrowRight size={16} />
              </Button>
            </Link>
          ) : (
            <Link to="/curso">
              <Button>
                <Trophy size={16} />
                Curso completado
              </Button>
            </Link>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
