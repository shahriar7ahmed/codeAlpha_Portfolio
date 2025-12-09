import React from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";

const ExperienceDetailModal = ({ isOpen, onClose, experience }) => {
  if (!experience) return null;

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
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">
      <div className="p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black-100 hover:bg-black-200 text-white transition-colors duration-300 z-10"
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
            style={{ backgroundColor: getIconBg(experience.type || "work") }}
          >
            {getIcon(experience.type || "work")}
          </div>
          <div className="flex-1">
            <h2 className="text-white text-3xl sm:text-4xl font-bold mb-2">
              {experience.title}
            </h2>
            <p className="text-secondary text-xl font-semibold mb-1">
              {experience.company}
            </p>
            {experience.location && (
              <p className="text-white-100 text-base">{experience.location}</p>
            )}
          </div>
        </div>

        {/* Period */}
        <div className="mb-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="text-[#915EFF]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-white-100 text-lg font-medium">
              {experience.period}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Details</h3>
          {experience.description && Array.isArray(experience.description) ? (
            <ul className="space-y-3">
              {experience.description.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-white-100 text-base leading-relaxed"
                >
                  <span className="text-[#915EFF] mt-2 flex-shrink-0">▸</span>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-white-100 text-base leading-relaxed">
              {experience.description || "No description available"}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ExperienceDetailModal;

