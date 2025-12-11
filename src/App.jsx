import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Tech from "./sections/Tech";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Certificates from "./sections/Certificates";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import Admin from "./pages/Admin";
import { StarsCanvas } from "./components/canvas";
import { initializeDefaultData } from "./utils/dataManager";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if we're on admin route
    const path = window.location.pathname;
    if (path === "/admin" || path === "/admin/") {
      setIsAdmin(true);
    }

    // Initialize default data
    initializeDefaultData();

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 bg-primary flex items-center justify-center z-50"
        >
          <div className="text-center">
            <span className="canvas-loader mx-auto block mb-8"></span>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontSize: 14,
                color: "#F1F1F1",
                fontWeight: 800,
              }}
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Render admin page if on admin route
  if (isAdmin) {
    return (
      <ErrorBoundary>
        <Admin />
      </ErrorBoundary>
    );
  }

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="relative z-0 bg-primary">
          <StarsCanvas />
          <Navbar />
          <div className="pt-20">
            <Hero />
            <About />
            <Tech />
            <Experience />
            <Projects />
            <Certificates />
            <Contact />
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
