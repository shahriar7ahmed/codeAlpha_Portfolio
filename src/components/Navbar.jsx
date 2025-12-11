import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / windowHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Update active section based on scroll position
      const sections = navLinks.map(link => {
        const element = document.getElementById(link.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: link.id,
            title: link.title,
            top: rect.top + window.scrollY,
            bottom: rect.bottom + window.scrollY,
          };
        }
        return null;
      }).filter(Boolean);

      const currentSection = sections.find(section => {
        return window.scrollY >= section.top - 200 && window.scrollY < section.bottom - 200;
      });

      if (currentSection) {
        setActive(currentSection.title);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && toggle) {
        setToggle(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && toggle) {
        setToggle(false);
      }
    };

    if (toggle) {
      // Support both mouse and touch events
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [toggle]);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#915EFF]/30 z-[9997] transition-opacity duration-300"
        style={{ 
          width: `${scrollProgress}%`,
          opacity: scrollProgress > 5 ? 1 : 0,
          transition: "width 0.1s ease-out, opacity 0.3s ease-out"
        }}
      >
        <div 
          className="h-full bg-gradient-to-r from-[#915EFF] via-[#bf61ff] to-[#f272c8]"
          style={{
            boxShadow: "0 0 10px rgba(145, 94, 255, 0.5)"
          }}
        />
      </div>

      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`${
          styles.paddingX
        } w-full flex items-center py-5 fixed top-0 z-[9999] ${
          scrolled ? "bg-primary backdrop-blur-sm bg-opacity-90" : "bg-transparent"
        }`}
        style={{ 
          transition: "background-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), backdrop-filter 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "background-color"
        }}
      >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            Shahriar &nbsp;
            <span className='sm:block hidden'> | Portfolio</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10' role="menubar">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              role="none"
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer transition-colors duration-300 relative`}
              onClick={() => setActive(nav.title)}
            >
              <a 
                href={`#${nav.id}`}
                role="menuitem"
                aria-current={active === nav.title ? "page" : undefined}
                className="relative focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:ring-offset-2 focus:ring-offset-primary rounded px-2 py-1"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(nav.id);
                  if (element) {
                    // Responsive offset: larger on desktop, smaller on mobile
                    const isMobile = window.innerWidth < 640;
                    const offset = isMobile ? 100 : 120;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                  setActive(nav.title);
                }}
              >
                {nav.title}
                {active === nav.title && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#915EFF]" aria-hidden="true"></span>
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center' ref={menuRef}>
          <motion.button
            type="button"
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            aria-controls="mobile-menu"
            className='w-[28px] h-[28px] flex items-center justify-center cursor-pointer z-[10000] relative focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:ring-offset-2 focus:ring-offset-primary rounded'
            onClick={() => setToggle(!toggle)}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={toggle ? close : menu}
              alt={toggle ? 'Close menu' : 'Open menu'}
              className='w-full h-full object-contain'
            />
          </motion.button>

          {/* Backdrop */}
          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                onClick={() => setToggle(false)}
              />
            )}
          </AnimatePresence>

          {/* Mobile Menu */}
          <AnimatePresence>
            {toggle && (
              <motion.div
                id="mobile-menu"
                role="menu"
                aria-label="Mobile navigation menu"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ 
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className='fixed top-0 right-0 h-full w-64 p-6 black-gradient z-[9999] shadow-2xl overflow-y-auto'
              >
                <ul className='list-none flex flex-col gap-6 mt-20' role="menubar">
                  {navLinks.map((nav, index) => (
                    <motion.li
                      key={nav.id}
                      role="none"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        delay: index * 0.1,
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className={`font-poppins font-medium cursor-pointer text-[18px] ${
                        active === nav.title ? "text-white" : "text-secondary"
                      }`}
                      onClick={() => {
                        setToggle(false);
                        setActive(nav.title);
                        // Smooth scroll to section with responsive offset
                        setTimeout(() => {
                          const element = document.getElementById(nav.id);
                          if (element) {
                            const isMobile = window.innerWidth < 640;
                            const offset = isMobile ? 100 : 120;
                            const elementPosition = element.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - offset;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        }, 100);
                      }}
                      whileHover={{ x: 10, color: "#fff" }}
                      style={{ transition: "color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                    >
                      <a 
                        href={`#${nav.id}`} 
                        role="menuitem"
                        aria-current={active === nav.title ? "page" : undefined}
                        className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:ring-offset-2 focus:ring-offset-black-100 rounded px-2 py-1"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            const element = document.getElementById(nav.id);
                            if (element) {
                              const isMobile = window.innerWidth < 640;
                              const offset = isMobile ? 100 : 120;
                              const elementPosition = element.getBoundingClientRect().top;
                              const offsetPosition = elementPosition + window.pageYOffset - offset;
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              });
                              setToggle(false);
                              setActive(nav.title);
                            }
                          }
                        }}
                      >
                        {active === nav.title && (
                          <span className="w-2 h-2 rounded-full bg-[#915EFF]" aria-hidden="true"></span>
                        )}
                        {nav.title}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
