import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer(0.1, 0.2)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.15 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        style={{ 
          willChange: "transform, opacity",
          scrollMarginTop: "100px"
        }}
      >
        <span 
          className='hash-span' 
          id={idName} 
          style={{ 
            scrollMarginTop: "120px"
          }}
          aria-hidden="true"
        >
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;

