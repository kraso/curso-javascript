import SkipLink from "../components/SkipLink";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AnimatedBackground from "../components/landing/AnimatedBackground";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import CourseOutline from "../components/landing/CourseOutline";
import Resources from "../components/landing/Resources";
import CTA from "../components/landing/CTA";
import JsonLd from "../components/JsonLd";

export const meta = () => {
  return [
    { title: "JavaScript está en tus manos - Curso Interactivo" },
    {
      name: "description",
      content:
        "Aprende JavaScript de forma interactiva con ejercicios prácticos, un editor de código en el navegador y un sistema de progreso gamificado.",
    },
  ];
};

const cursoSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "JavaScript está en tus manos",
  description:
    "Aprende JavaScript de forma interactiva con ejercicios prácticos, un editor de código en el navegador y un sistema de progreso gamificado.",
  provider: {
    "@type": "Organization",
    name: "Marcos Calabrés Ibáñez",
  },
  isAccessibleForFree: true,
  numberOfLessons: 23,
  educationalLevel: "Beginner to Advanced",
  inLanguage: "es",
  url: "https://javascript-learning-app.dev",
};

export default function Index() {
  return (
    <div className="min-h-screen bg-dark-900">
      <JsonLd datos={cursoSchema} />
      <SkipLink />
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <main id="main-content">
          <Hero />
          <Features />
          <CourseOutline />
          <Resources />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
