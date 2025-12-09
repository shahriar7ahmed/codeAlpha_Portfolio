import React from "react";
import { motion } from "framer-motion";

import { BallCanvas } from "../components/canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { textVariant, fadeIn } from "../utils/motion";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I know</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>

      <motion.div 
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-20 flex flex-row flex-wrap justify-center gap-10'
      >
        {technologies.map((technology, index) => (
          <motion.div
            key={technology.name}
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            className='w-28 h-28 group relative'
          >
            <BallCanvas icon={technology.icon} />
            {/* Tooltip on hover */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none z-10'
            >
              <div className='bg-black-100/95 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-medium whitespace-nowrap shadow-lg border border-[#915EFF]/30'>
                {technology.name}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Tech, "technologies");

