import { useState, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";

// Lazy load particles background for better initial load
const ParticlesBackground = lazy(() => import("./components/ParticlesBackground"));

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="relative gradient-bg text-white min-h-screen">
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      <CustomCursor />
      <Suspense fallback={<div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 bg-gradient-to-br from-[#302b63]/20 via-[#00bf8f]/10 to-[#1cd8d2]/20" />}>
        <ParticlesBackground />
      </Suspense>
      <Navbar />
      <Home />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
