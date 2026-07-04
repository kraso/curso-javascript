import { ExternalLink, BookOpen, GraduationCap } from "lucide-react";

const documentos = [
  {
    title: "MDN Web Docs — JavaScript",
    description: "La referencia definitiva de JavaScript, traducida al castellano por la comunidad Mozilla.",
    href: "https://developer.mozilla.org/es/docs/Web/JavaScript",
    color: "text-emerald-400",
  },
  {
    title: "JavaScript.info",
    description: "Tutorial moderno y completo con explicaciones detalladas y ejemplos interactivos.",
    href: "https://es.javascript.info/",
    color: "text-sky-400",
  },
  {
    title: "W3Schools — JavaScript",
    description: "Referencia práctica con ejemplos editables en línea. Ideal para consultar sintaxis rápida.",
    href: "https://www.w3schools.com/js/js_es.asp",
    color: "text-amber-400",
  },
  {
    title: "Eloquent JavaScript",
    description: "Libro gratuito en línea de Marijn Haverbeke. Clásico para aprender los fundamentos en profundidad.",
    href: "https://eloquentjavascript.net/",
    color: "text-violet-400",
  },
  {
    title: "ECMAScript Specification",
    description: "El estándar oficial de ECMAScript (el lenguaje detrás de JavaScript). Para quien quiera ir al origen.",
    href: "https://tc39.es/ecma262/",
    color: "text-rose-400",
  },
  {
    title: "Node.js — Documentación",
    description: "Si quieres llevar JavaScript más allá del navegador. Guías oficiales en castellano.",
    href: "https://nodejs.org/es/docs/",
    color: "text-cyan-400",
  },
];

const cursos = [
  {
    title: "FreeCodeCamp — JavaScript",
    description: "Certificación completa de Algoritmos y Estructuras de Datos. Proyectos prácticos y certificado gratuito.",
    href: "https://www.freecodecamp.org/espanol/learn/javascript-algorithms-and-data-structures-v8/",
    color: "text-emerald-400",
  },
  {
    title: "JavaScript30",
    description: "30 proyectos en 30 días sin frameworks. Crea apps reales con JavaScript puro. De Wes Bos.",
    href: "https://javascript30.com/",
    color: "text-amber-400",
  },
  {
    title: "Fundación JS",
    description: "Comunidad hispanohablante con tutoriales, retos y recursos gratuitos para aprender JavaScript.",
    href: "https://www.fundacionjs.com/",
    color: "text-violet-400",
  },
  {
    title: "Platzi — JavaScript",
    description: "Cursos gratuitos de JavaScript moderno, ES6+ y programación funcional en español.",
    href: "https://platzi.com/clases-de-javascript/",
    color: "text-sky-400",
  },
  {
    title: "Codecademy — Learn JavaScript",
    description: "Curso interactivo paso a paso con ejercicios en el navegador. Básico gratuito.",
    href: "https://www.codecademy.com/learn/learn-javascript",
    color: "text-rose-400",
  },
  {
    title: "The Odin Project",
    description: "Currículo completo y gratuito de desarrollo web. JavaScript vanilla con proyectos reales.",
    href: "https://www.theodinproject.com/paths/foundations/courses/foundations",
    color: "text-cyan-400",
  },
];

function ResourceCard({ resource }) {
  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative p-5 rounded-xl bg-dark-800/60 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300 hover:bg-dark-800/80 flex flex-col"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className={`text-sm font-semibold ${resource.color} group-hover:underline leading-snug`}>
          {resource.title}
        </h3>
        <ExternalLink size={14} className="text-zinc-600 group-hover:text-zinc-400 shrink-0 mt-0.5 transition-colors" />
      </div>
      <p className="text-zinc-500 text-xs leading-relaxed flex-1">
        {resource.description}
      </p>
    </a>
  );
}

export default function Resources() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Documentación y Recursos */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-700/50 border border-zinc-700/50 text-zinc-400 text-sm font-medium mb-6">
            <BookOpen size={14} className="text-primary" />
            Documentación y recursos
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            Documentación oficial
            <br />
            <span className="text-gradient">y recursos esenciales</span>
          </h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            Las mejores referencias para consultar, profundizar y resolver dudas
            mientras aprendes JavaScript.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {documentos.map((doc, i) => (
            <ResourceCard key={i} resource={doc} />
          ))}
        </div>

        {/* Cursos Gratuitos */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-700/50 border border-zinc-700/50 text-zinc-400 text-sm font-medium mb-6">
            <GraduationCap size={14} className="text-primary" />
            Aprendizaje complementario
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            Cursos gratuitos
            <br />
            <span className="text-gradient">recomendados</span>
          </h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            Complementa este curso con otros recursos gratuitos de la comunidad.
            Todo lo que necesitas para seguir creciendo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cursos.map((curso, i) => (
            <ResourceCard key={i} resource={curso} />
          ))}
        </div>
      </div>
    </section>
  );
}
