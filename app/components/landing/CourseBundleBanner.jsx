import { useState, useCallback } from "react";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { getAuthRedirectUrl } from "../../lib/auth-bridge";
import { supabase } from "../../lib/supabase";

const COURSES = [
  {
    id: "js",
    name: "JavaScript",
    url: "https://javascript-learning-app.dev/curso",
    image: "https://javascript-learning-app.dev/og-image.png",
    color: "from-amber-500 to-yellow-400",
    borderColor: "border-amber-500/30",
    glowColor: "hover:shadow-amber-500/10",
  },
  {
    id: "react",
    name: "React",
    url: "https://react-learning-app.dev",
    image: "https://react-learning-app.dev/og-image.png",
    color: "from-indigo-500 to-violet-400",
    borderColor: "border-indigo-500/30",
    glowColor: "hover:shadow-indigo-500/10",
  },
  {
    id: "ts",
    name: "TypeScript",
    url: "https://typescript.javascript-learning-app.dev/curso",
    image: "https://typescript.javascript-learning-app.dev/og-image.svg",
    color: "from-sky-500 to-cyan-400",
    borderColor: "border-sky-500/30",
    glowColor: "hover:shadow-sky-500/10",
  },
];

export default function CourseBundleBanner({ currentCourse = "js" }) {
  const [hovered, setHovered] = useState(null);

  const handleNavigate = useCallback(async (url) => {
    const redirectUrl = await getAuthRedirectUrl(supabase, url);
    window.location.href = redirectUrl;
  }, []);

  return (
    <section className="w-full border-y border-zinc-800/50 bg-dark-800/30">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-10 sm:pt-20 sm:pb-12">
        <p className="text-center text-sm sm:text-base text-zinc-400 mb-8 sm:mb-10">
          <span className="text-zinc-300 font-medium">Una sola cuenta.</span>{" "}
          Tres cursos gratuitos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {COURSES.map((course) => {
            const isActive = course.id === currentCourse;
            return (
              <button
                key={course.id}
                onClick={() => !isActive && handleNavigate(course.url)}
                onMouseEnter={() => setHovered(course.id)}
                onMouseLeave={() => setHovered(null)}
                disabled={isActive}
                className={`
                  group relative w-full text-left rounded-2xl overflow-hidden
                  border transition-all duration-300
                  ${isActive
                    ? `border-transparent bg-gradient-to-r ${course.color} p-[2px]`
                    : `border-zinc-700/50 bg-dark-800 hover:border-zinc-600 ${course.glowColor} hover:shadow-lg hover:-translate-y-1`
                  }
                `}
              >
                {isActive ? (
                  <div className="relative rounded-2xl bg-dark-800 overflow-hidden">
                    <div className="relative aspect-video">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-dark-900/20" />
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-900/80 border border-zinc-700/50">
                        <CheckCircle2 size={12} className="text-primary" />
                        <span className="text-xs font-medium text-zinc-300">Estás aquí</span>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <span className="text-sm font-semibold text-zinc-100">{course.name}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative aspect-video">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-dark-900/10 group-hover:bg-dark-900/0 transition-colors" />
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-900/80 border border-zinc-700/50">
                        <span className="text-xs font-medium text-zinc-300">Gratuito</span>
                      </div>
                      {hovered === course.id && (
                        <div className="absolute inset-0 flex items-center justify-center bg-dark-900/40 transition-opacity">
                          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-900/90 border border-zinc-700/50 text-sm font-medium text-zinc-200">
                            <ExternalLink size={14} />
                            Ir al curso
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4 text-center">
                      <span className="text-sm font-semibold text-zinc-100">{course.name}</span>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
