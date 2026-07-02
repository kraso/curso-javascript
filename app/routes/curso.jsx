import { Outlet } from "@remix-run/react";
import SkipLink from "../components/SkipLink";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useProgress } from "../hooks/useProgress";

export default function CursoLayout() {
  const progress = useProgress();

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <SkipLink />
      <Navbar />
      <main id="main-content" className="flex-1 pt-16">
        <Outlet context={progress} />
      </main>
      <Footer />
    </div>
  );
}
