import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className='xs:w-[250px] w-full'
  >
    <Tilt
      tiltMaxAngleX={45}
      tiltMaxAngleY={45}
      scale={1.05}
      transitionSpeed={450}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card hover:shadow-xl transition-shadow duration-300'
    >
      <div
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col hover:bg-[#1a1530] transition-colors duration-300'
      >
        <img
          src={icon}
          alt={title}
          className='w-16 h-16 object-contain transition-transform duration-300 hover:scale-110'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </Tilt>
  </motion.div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a passionate full-stack developer with expertise in modern web technologies 
        including React, Node.js, and TypeScript. I love creating innovative digital solutions 
        and transforming ideas into beautiful, functional applications. I'm a quick learner 
        and collaborate closely with clients to create efficient, scalable, and user-friendly 
        solutions that solve real-world problems. Let's work together to bring your ideas to life!
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
