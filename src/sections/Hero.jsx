import { motion } from "framer-motion";

import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto flex items-center justify-center overflow-hidden`}>
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
              Welcome to my Portfolio
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
            I develop 3D visuals, user <br className='sm:block hidden' />
            interfaces and web applications
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 sm:mt-8"
          >
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-[#915EFF] to-[#bf61ff] rounded-full"></div>
              <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-[#bf61ff] to-[#f272c8] rounded-full"></div>
              <div className="h-1 w-6 sm:w-8 bg-gradient-to-r from-[#f272c8] to-[#915EFF] rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle background glow effect */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] bg-[#915EFF]/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
