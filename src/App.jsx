import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Certificates from './sections/Certificates'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'
import Admin from './pages/Admin'
import { initializeDefaultData } from './utils/dataManager'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if we're on admin route
    const path = window.location.pathname
    if (path === '/admin' || path === '/admin/') {
      setIsAdmin(true)
    }

    // Initialize default data
    initializeDefaultData()

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#e94560] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold gradient-text">Loading...</p>
        </div>
      </div>
    )
  }

  // Render admin page if on admin route
  if (isAdmin) {
    return (
      <ErrorBoundary>
        <Admin />
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]">
        {/* Skip to content link for accessibility */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#e94560] focus:text-white focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
        <Footer />
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  )
}

export default App

