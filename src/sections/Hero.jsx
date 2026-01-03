import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Full Stack Developer",
    "React Specialist",
    "Node.js Expert",
    "UI/UX Enthusiast",
    "Problem Solver"
  ];

  // Typing effect
  useEffect(() => {
    const role = roles[currentRole];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === role) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          isDeleting
            ? role.substring(0, displayText.length - 1)
            : role.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "15+", label: "Projects Completed" },
    { value: "10+", label: "Technologies" },
    { value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <section className={`relative w-full h-screen mx-auto flex items-center justify-center overflow-hidden`}>
      {/* Enhanced animated background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Gradient mesh */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] opacity-30">
          <motion.div
            className="absolute top-0 left-0 w-full h-full rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, transparent 70%)' }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/4 right-0 w-3/4 h-3/4 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, transparent 70%)' }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.35, 0.25],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/4 w-2/3 h-2/3 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className={`relative max-w-7xl mx-auto ${styles.paddingX} flex flex-col lg:flex-row items-center gap-12 w-full`}>
        {/* Decorative element */}
        <div className='hidden lg:flex flex-col justify-center items-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='w-5 h-5 rounded-full shadow-glow-purple'
            style={{ background: 'linear-gradient(135deg, #915EFF 0%, #7C3AED 100%)' }}
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "320px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className='w-1 violet-gradient'
          />
        </div>

        {/* Main content */}
        <motion.div
          variants={textVariant(0.1)}
          initial="hidden"
          animate="show"
          className="flex-1"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full glass-strong border border-purple-500/30"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-text-secondary text-sm font-medium">Available for opportunities</span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className={`${styles.heroHeadText} text-white leading-tight mb-2`}>
              Hi, I'm <span className='text-gradient-primary'>Shahriar</span>
            </h1>
          </motion.div>

          {/* Typing animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-6 h-12 flex items-center"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-accent">
              {displayText}
              <span className="animate-pulse">|</span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`${styles.heroSubText} mt-4 text-text-secondary max-w-2xl leading-relaxed`}
          >
            I design and build performant web applications, reliable APIs, and end-to-end digital products that help teams move faster and smarter.
          </motion.p>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-4 rounded-xl text-center transition-all duration-300 hover:shadow-glow-purple"
              >
                <div className="text-2xl sm:text-3xl font-bold text-gradient-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-text-tertiary font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2 justify-center group"
            >
              <span className="relative z-10 font-bold">View My Work</span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline flex items-center gap-2 justify-center"
            >
              <span className="relative z-10 font-bold">Get in Touch</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.a>

            <motion.a
              href="/Shahriar Ahmed Resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center gap-2 justify-center"
            >
              <span className="relative z-10 font-bold">Resume</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-8 flex gap-4"
          >
            <motion.a
              href="https://github.com/shahriar7ahmed/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full glass-strong border border-purple-500/30 flex items-center justify-center text-white hover:text-purple-400 hover:border-purple-500/50 transition-all duration-300 hover:shadow-glow-purple"
              aria-label="GitHub"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/shahriar-ahmed-405261347/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full glass-strong border border-cyan-500/30 flex items-center justify-center text-white hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-glow-cyan"
              aria-label="LinkedIn"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>

            <motion.a
              href="mailto:ahmedshahriar948@gmail.com"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full glass-strong border border-indigo-500/30 flex items-center justify-center text-white hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-glow-indigo"
              aria-label="Email"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
        >
          <span className="text-text-tertiary text-sm mb-2 group-hover:text-purple-400 transition-colors">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex justify-center p-2 group-hover:border-purple-400 transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-gradient-purple"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
