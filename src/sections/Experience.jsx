import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { getAchievements } from "../utils/dataManager";
import ExperienceDetailModal from "../components/ExperienceDetailModal";

const ExperienceCard = ({ experience, index, onCardClick }) => {
  const getIconBg = (type) => {
    if (type === "hackathon") return "#915EFF";
    if (type === "education") return "#00cea8";
    return "#e94560";
  };

  const getIcon = (type) => {
    if (type === "hackathon") return "🏆";
    if (type === "education") return "🎓";
    return "💼";
  };

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
        transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transform: "translateZ(0)",
        willChange: "transform",
        backfaceVisibility: "hidden",
        cursor: "pointer",
        padding: 0,
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.period}
      iconStyle={{ 
        background: getIconBg(experience.type || "work"),
        transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transform: "translateZ(0)",
        willChange: "transform",
        cursor: "pointer",
      }}
      icon={
        <div className='flex justify-center items-center w-full h-full text-2xl'>
          {getIcon(experience.type || "work")}
        </div>
      }
      className="cursor-pointer"
      style={{ transform: "translateZ(0)" }}
    >
      <div 
        onClick={() => onCardClick && onCardClick()}
        className="p-6 hover:bg-black-100/50 transition-colors duration-300 rounded-lg"
      >
        <div>
          <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
          <p
            className='text-secondary text-[16px] font-semibold'
            style={{ margin: 0 }}
          >
            {experience.company}
          </p>
          {experience.location && (
            <p className='text-secondary text-[14px]' style={{ margin: "4px 0 0 0" }}>
              {experience.location}
            </p>
          )}
        </div>

        <ul className='mt-5 list-disc ml-5 space-y-2'>
          {experience.description && Array.isArray(experience.description) ? (
            experience.description.slice(0, 3).map((point, index) => (
              <li
                key={`experience-point-${index}`}
                className='text-white-100 text-[14px] pl-1 tracking-wider'
              >
                {point}
              </li>
            ))
          ) : (
            <li className='text-white-100 text-[14px] pl-1 tracking-wider'>
              {experience.description || "No description available"}
            </li>
          )}
          {experience.description && Array.isArray(experience.description) && experience.description.length > 3 && (
            <li className='text-[#915EFF] text-[14px] pl-1 tracking-wider font-semibold'>
              Click to see more...
            </li>
          )}
        </ul>
      </div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const achievements = getAchievements();
    setExperiences(achievements);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const achievements = getAchievements();
      setExperiences(achievements);
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(() => {
      const achievements = getAchievements();
      if (JSON.stringify(achievements) !== JSON.stringify(experiences)) {
        setExperiences(achievements);
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [experiences]);

  const handleCardClick = (experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${experience.id || index}`}
              experience={experience}
              index={index}
              onCardClick={() => handleCardClick(experience)}
            />
          ))}
        </VerticalTimeline>
      </div>

      <ExperienceDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        experience={selectedExperience}
      />
    </>
  );
};

export default SectionWrapper(Experience, "experience");
