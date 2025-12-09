import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { getProjects } from "../utils/dataManager";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  demo_link,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1.02}
        transitionSpeed={450}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full shadow-card'
        style={{ 
          willChange: "transform, box-shadow",
          transition: "box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = ""}
      >
        <div className='relative w-full h-[230px] overflow-hidden rounded-2xl'>
          {!imageLoaded && !imageError && (
            <div className='absolute inset-0 bg-gradient-to-br from-[#915EFF] to-[#bf61ff] animate-pulse flex items-center justify-center'>
              <div className='w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
            </div>
          )}
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover rounded-2xl ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              transition: "opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transform: "translateZ(0)"
            }}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              setImageError(true);
              e.target.style.display = 'none';
            }}
            loading="lazy"
          />
          {imageError && (
            <div className='absolute inset-0 bg-gradient-to-br from-[#915EFF] to-[#bf61ff] flex items-center justify-center'>
              <span className='text-white text-2xl'>🚀</span>
            </div>
          )}

          <div 
            className='absolute inset-0 flex justify-end m-3 card-img_hover opacity-0'
            style={{ 
              transition: "opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              willChange: "opacity"
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "0"}
          >
            {source_code_link && (
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
                style={{ 
                  transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  transform: "translateZ(0)",
                  willChange: "transform"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1) translateZ(0)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) translateZ(0)"}
                aria-label="View source code"
              >
                <img
                  src={github}
                  alt='source code'
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            )}
            {demo_link && (
              <div
                onClick={() => window.open(demo_link, "_blank")}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer ml-2'
                style={{ 
                  transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  transform: "translateZ(0)",
                  willChange: "transform"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1) translateZ(0)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) translateZ(0)"}
                aria-label="View live demo"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 11L11 1M11 1H1M11 1V11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag}`}
              className={`text-[14px] ${
                index % 4 === 0 ? "blue-text-gradient" :
                index % 4 === 1 ? "green-text-gradient" :
                index % 4 === 2 ? "pink-text-gradient" :
                "orange-text-gradient"
              }`}
            >
              #{tag}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const data = getProjects();
    setProjects(data);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const data = getProjects();
      setProjects(data);
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(() => {
      const data = getProjects();
      if (JSON.stringify(data) !== JSON.stringify(projects)) {
        setProjects(data);
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [projects]);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${project.id || index}`}
            index={index}
            name={project.title}
            description={project.description}
            tags={project.tags || []}
            image={project.image}
            source_code_link={project.github}
            demo_link={project.demo}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
