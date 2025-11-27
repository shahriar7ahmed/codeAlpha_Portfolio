import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="relative gradient-bg text-white min-h-screen">
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      <CustomCursor />
      <ParticlesBackground />
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
