import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import { github } from "../assets";

const ProjectDetailModal = ({ isOpen, onClose, project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-5xl">
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

        {/* Project Image */}
        <div className="relative w-full h-[300px] sm:h-[400px] mb-6 rounded-xl overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF] to-[#bf61ff] animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={project.image}
            alt={project.name || project.title}
            className={`w-full h-full object-cover ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transition: "opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>

        {/* Project Details */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-white text-3xl sm:text-4xl font-bold mb-2">
              {project.name || project.title}
            </h2>
          </div>

          {/* Description */}
          <div>
            <p className="text-white-100 text-base sm:text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <h3 className="text-white text-lg font-semibold mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      index % 4 === 0
                        ? "blue-text-gradient"
                        : index % 4 === 1
                        ? "green-text-gradient"
                        : index % 4 === 2
                        ? "pink-text-gradient"
                        : "orange-text-gradient"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            {project.source_code_link || project.github ? (
              <motion.a
                href={project.source_code_link || project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-black-100 hover:bg-black-200 rounded-lg text-white font-medium transition-colors duration-300"
              >
                <img src={github} alt="GitHub" className="w-5 h-5" />
                View Source Code
              </motion.a>
            ) : null}

            {project.demo_link || project.demo ? (
              <motion.a
                href={project.demo_link || project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-[#915EFF] hover:bg-[#a575ff] rounded-lg text-white font-medium transition-colors duration-300"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 12 12"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11L11 1M11 1H1M11 1V11"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                View Live Demo
              </motion.a>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectDetailModal;

