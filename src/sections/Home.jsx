import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDownload } from 'react-icons/fa';
import { HiCode } from 'react-icons/hi';
import myimg from '../assets/myimg.jpeg';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com', color: 'hover:text-gray-300', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com', color: 'hover:text-blue-400', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com', color: 'hover:text-sky-400', label: 'Twitter' },
    { icon: FaEnvelope, href: 'mailto:your.email@example.com', color: 'hover:text-green-400', label: 'Email' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center w-full"
        >
          {/* Left Side - Text Content */}
          <div className="text-center md:text-left order-2 md:order-1 z-10">
            <motion.div variants={itemVariants} className="mb-5 sm:mb-6 md:mb-7">
              <motion.span 
                className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 backdrop-blur-lg rounded-full text-cyan-300 text-sm sm:text-base font-semibold border border-cyan-400/50 shadow-lg shadow-cyan-500/30"
                whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 0.7)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <HiCode className="inline mr-2 text-lg" />
                Full Stack Developer
              </motion.span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 sm:mb-5 md:mb-6 leading-[1.1] tracking-tight"
            >
              <span className="block bg-gradient-to-r from-cyan-300 via-green-300 to-cyan-300 bg-clip-text text-transparent">
                Hi, I'm
              </span>
              <motion.span 
                className="block mt-2 sm:mt-3 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  backgroundSize: '200% auto',
                }}
              >
                Shahriar Ahmed
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/85 mb-6 sm:mb-8 md:mb-10 leading-relaxed font-normal max-w-2xl mx-auto md:mx-0"
            >
              I craft beautiful, functional, and user-friendly web applications
              that make a <span className="text-cyan-300 font-semibold">difference</span>.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center md:justify-start mb-8 md:mb-10"
            >
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-white text-base sm:text-lg overflow-hidden shadow-[0_10px_40px_rgba(6,182,212,0.4)] hover:shadow-[0_20px_60px_rgba(6,182,212,0.6)] transition-all duration-300"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-400"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
                
                {/* Text */}
                <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
                  Get In Touch
                </span>
              </motion.a>
              
              <motion.a
                href="/Shahriar-Ahmed-CV.pdf"
                download="Shahriar-Ahmed-CV.pdf"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-white text-base sm:text-lg overflow-hidden backdrop-blur-lg border-2 border-white/30 bg-white/10 hover:bg-white/25 hover:border-white/60 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.4)] flex items-center justify-center gap-2.5"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
                
                {/* Icon and Text */}
                <FaDownload className="relative z-10 text-lg group-hover:translate-y-[-2px] transition-transform duration-300" />
                <span className="relative z-10 font-medium">Download CV</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 sm:gap-5 justify-center md:justify-start"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className={`group relative text-xl sm:text-2xl text-white/70 ${social.color} transition-all duration-300 p-3 rounded-full hover:bg-white/15 backdrop-blur-md border border-white/10 hover:border-white/30`}
                  aria-label={social.label}
                >
                  <social.icon />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center md:justify-end order-1 md:order-2 mb-8 md:mb-0 z-10"
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Enhanced Glow effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-green-500 to-cyan-500 rounded-full blur-3xl opacity-50 animate-pulse -z-10 w-full h-full scale-110"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-cyan-500 to-green-500 rounded-full blur-2xl opacity-30 -z-10 w-full h-full scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full blur-xl opacity-20 -z-10 w-full h-full scale-115"></div>
              
              {/* Image container */}
              <motion.div
                className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] rounded-full overflow-hidden border-4 border-white/40 shadow-2xl backdrop-blur-sm"
                style={{
                  transform: typeof window !== 'undefined' && window.innerWidth >= 768
                    ? `perspective(1000px) rotateY(${
                        (mousePosition.x - window.innerWidth / 2) / 50
                      }deg) rotateX(${
                        -(mousePosition.y - window.innerHeight / 2) / 50
                      }deg)`
                    : 'none',
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-transparent to-green-500/30 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                
                {/* Image */}
                <img
                  src={myimg}
                  alt="Shahriar Ahmed - Full Stack Developer"
                  className="w-full h-full object-cover scale-110"
                  loading="eager"
                />
              </motion.div>
              
              {/* Enhanced decorative circles */}
              <motion.div 
                className="absolute -top-6 -right-6 w-28 h-28 bg-cyan-400/25 rounded-full blur-2xl -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.25, 0.4, 0.25],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-6 -left-6 w-36 h-36 bg-green-400/25 rounded-full blur-2xl -z-10"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.25, 0.4, 0.25],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              ></motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-md bg-white/10 hover:bg-white/20 transition-colors duration-300"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-white/90 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
