import React from "react";
import { motion } from "framer-motion";

import { BallCanvas } from "../components/canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I know</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>

      <div className='mt-20 flex flex-row flex-wrap justify-center gap-7 sm:gap-10'>
        {technologies.map((technology) => (
          <div 
            className='w-20 h-20 sm:w-28 sm:h-28 relative group' 
            key={technology.name}
            title={technology.name}
            aria-label={technology.name}
          >
            <BallCanvas icon={technology.icon} />
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50'>
              <div className='bg-black-100 px-3 py-1 rounded-lg text-white text-xs sm:text-sm whitespace-nowrap shadow-lg'>
                {technology.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");

