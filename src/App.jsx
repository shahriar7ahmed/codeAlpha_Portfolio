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

export default function App() {
  return <div className="relative gradient-bg text-white">
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
  </div>;
}
