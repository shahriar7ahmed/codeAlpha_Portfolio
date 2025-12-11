import { motion } from "framer-motion";

import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto flex items-center justify-center overflow-hidden pt-20 sm:pt-0`}>
      <div
        className={`relative max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-center gap-8 sm:gap-12`}
      >
        {/* Decorative vertical line with dot */}
        <div className='flex flex-col justify-center items-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className='w-5 h-5 rounded-full bg-[#915EFF] shadow-lg shadow-[#915EFF]/50'
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className='w-1 sm:h-80 h-40 violet-gradient'
          />
        </div>

        {/* Main content */}
        <motion.div 
          variants={textVariant(0.1)} 
          initial="hidden" 
          animate="show"
          className="flex-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-[#915EFF] font-medium text-sm sm:text-base mb-2 sm:mb-4 tracking-wider uppercase">
              Full Stack Developer Portfolio
            </p>
          </motion.div>
          
          <h1 className={`${styles.heroHeadText} text-white leading-tight`}>
            Hi, I'm <span className='text-[#915EFF]'>Shahriar</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`${styles.heroSubText} mt-4 sm:mt-6 text-white-100 max-w-2xl`}
          >
            I design and build performant web applications, reliable APIs, and end-to-end digital products that help teams move faster and smarter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
          >
            {/* CTA Buttons */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative px-8 py-3 bg-[#915EFF] text-white font-bold rounded-lg overflow-hidden group"
              style={{
                transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transform: "translateZ(0)",
                willChange: "transform"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05) translateZ(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(145, 94, 255, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateZ(0)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <span className="relative z-10">Get in Touch</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#bf61ff] to-[#f272c8] opacity-0 group-hover:opacity-100"
                style={{ transition: "opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
              />
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative px-8 py-3 bg-transparent border-2 border-[#915EFF] text-white font-bold rounded-lg overflow-hidden group"
              style={{
                transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transform: "translateZ(0)",
                willChange: "transform"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05) translateZ(0)";
                e.currentTarget.style.borderColor = "#bf61ff";
                e.currentTarget.style.backgroundColor = "rgba(145, 94, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateZ(0)";
                e.currentTarget.style.borderColor = "#915EFF";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span className="relative z-10">Download Resume</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 sm:mt-8 flex gap-4"
          >
            <motion.a
              href="https://github.com/shahriar7ahmed/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-white hover:text-[#915EFF] transition-colors duration-300"
              aria-label="GitHub"
              style={{ transform: "translateZ(0)" }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/shahriar-ahmed-405261347/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-white hover:text-[#915EFF] transition-colors duration-300"
              aria-label="LinkedIn"
              style={{ transform: "translateZ(0)" }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
        >
          <span className="text-secondary text-sm mb-2">Scroll</span>
          <div className="w-6 h-10 border-2 border-secondary rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-[#915EFF] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle background glow effect */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] bg-[#915EFF]/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
