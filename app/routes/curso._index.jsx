import { Link, useOutletContext } from "@remix-run/react";
import { BookOpen, Clock, Trophy, AlertTriangle, Award } from "lucide-react";
import { motion } from "framer-motion";
import LessonCard from "../components/course/LessonCard";
import SidebarNavigation from "../components/course/SidebarNavigation";
import ProgressBar from "../components/ui/ProgressBar";
import { lecciones, modulos, getProgresoTotal, getExamenRequisito, getLeccionPorId, isCursoCompletado } from "../data/lessons";
import { pageMeta, PROJECT_URL } from "../utils/meta";

export const meta = () => pageMeta({
  title: "Curso - JavaScript está en tus manos",
  description: "27 lecciones de JavaScript organizadas en 4 módulos. Aprende desde fundamentos hasta conceptos avanzados.",
  url: `${PROJECT_URL}/curso`,
});

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
};

export default function CursoIndex() {
  const { progreso } = useOutletContext();
  const leccionesCompletadas = progreso?.leccionesCompletadas || [];
  const porcentaje = getProgresoTotal(leccionesCompletadas);
  const cursoCompletado = isCursoCompletado(leccionesCompletadas);

  let cardIndex = 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">
          JavaScript <span className="text-primary">está en tus manos</span>
        </h1>
        <p className="text-zinc-500">
          Completa las lecciones para dominar JavaScript
        </p>
      </motion.div>

      <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp} className="mb-8">
        <ProgressBar porcentaje={porcentaje} />
      </motion.div>

      {cursoCompletado && (
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="mb-6">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <Award size={18} className="text-emerald-400 shrink-0" />
            <p className="text-emerald-300 font-medium text-sm">
              ¡Felicidades! Has aprobado todos los exámenes y completado el curso.
            </p>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {modulos.map((modulo, mi) => {
            const modLecciones = lecciones
              .filter((l) => l.modulo === modulo.id)
              .sort((a, b) => a.orden - b.orden);

            const examenId = getExamenRequisito(modulo.id);
            const examenAprobado = examenId ? leccionesCompletadas.includes(examenId) : true;
            const examen = examenId ? getLeccionPorId(examenId) : null;

            return (
              <motion.div
                key={modulo.id}
                custom={mi + 2}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mb-8"
              >
                {!examenAprobado && examen && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-4">
                    <AlertTriangle size={18} className="text-amber-400 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <p className="text-amber-300 font-medium">
                        Recomendamos aprobar el examen anterior para continuar
                      </p>
                      <p className="text-zinc-400 mt-1">
                        Completa <Link to={`/curso/${examenId}`} className="text-primary hover:underline">{examen.titulo}</Link> antes de avanzar a este módulo.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen size={20} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-zinc-100">Módulo {modulo.id}: {modulo.nombre}</h2>
                    <p className="text-sm text-zinc-500">{modulo.descripcion}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {modLecciones.map((leccion) => {
                    const idx = cardIndex++;
                    return (
                      <LessonCard
                        key={leccion.id}
                        leccion={leccion}
                        completada={leccionesCompletadas.includes(leccion.id)}
                        index={idx}
                      />
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        <SidebarNavigation leccionesCompletadas={leccionesCompletadas} />
      </div>
    </div>
  );
}
