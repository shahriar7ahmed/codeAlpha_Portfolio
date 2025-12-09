import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "../components/canvas";
import { textVariant } from "../utils/motion";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className='w-5 h-5 rounded-full bg-[#915EFF]'
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className='w-1 sm:h-80 h-40 violet-gradient'
          />
        </div>

        <motion.div variants={textVariant(0.1)} initial="hidden" animate="show">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Shahriar</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`${styles.heroSubText} mt-2 text-white-100`}
          >
            I develop 3D visuals, user <br className='sm:block hidden' />
            interfaces and web applications
          </motion.p>
        </motion.div>
      </div>

      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about' aria-label="Scroll to about section">
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-[#915EFF] flex justify-center items-start p-2 hover:border-[#a575ff] transition-colors duration-300 cursor-pointer'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className='w-3 h-3 rounded-full bg-[#915EFF] mb-1'
              style={{ willChange: "transform" }}
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
