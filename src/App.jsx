import { useState, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";
import SectionSkeleton from "./components/SectionSkeleton";

// Lazy load particles background for better initial load
const ParticlesBackground = lazy(() => import("./components/ParticlesBackground"));

// Lazy load sections below the fold to reduce initial bundle size
const About = lazy(() => import("./sections/About"));
const Experience = lazy(() => import("./sections/Experience"));
const Skills = lazy(() => import("./sections/Skills"));
const Projects = lazy(() => import("./sections/Projects"));
const Testimonials = lazy(() => import("./sections/Testimonials"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

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
      <Suspense fallback={<SectionSkeleton className="min-h-screen py-20" />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionSkeleton className="min-h-screen py-20" />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionSkeleton className="min-h-screen py-20" />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionSkeleton className="min-h-screen py-20" />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionSkeleton className="min-h-screen py-20" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionSkeleton className="min-h-screen py-20" />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<div className="h-32" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
