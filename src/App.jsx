import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

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
      <div className="fixed inset-0 bg-primary flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-white">Loading...</p>
        </div>
      </div>
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
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          <About />
          <Tech />
          <Experience />
          <Projects />
          <Certificates />
          <div className="relative z-0 min-h-screen">
            <Contact />
            <StarsCanvas />
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
