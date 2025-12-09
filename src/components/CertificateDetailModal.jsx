import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";

const CertificateDetailModal = ({ isOpen, onClose, certificate }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!certificate) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl">
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

        {/* Certificate Image */}
        <div className="relative w-full mb-6 rounded-xl overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF] to-[#bf61ff] animate-pulse flex items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={certificate.image}
            alt={certificate.title}
            className={`w-full h-auto object-contain ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transition: "opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>

        {/* Certificate Details */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-white text-3xl sm:text-4xl font-bold mb-2">
              {certificate.title}
            </h2>
            <p className="text-secondary text-xl font-semibold">
              {certificate.issuer}
            </p>
          </div>

          {/* Date */}
          {certificate.issueDate && (
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
              <span className="text-white-100 text-lg">
                {new Date(certificate.issueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          )}

          {/* Description */}
          {certificate.description && (
            <div>
              <h3 className="text-white text-lg font-semibold mb-3">Description</h3>
              <p className="text-white-100 text-base leading-relaxed">
                {certificate.description}
              </p>
            </div>
          )}

          {/* Skills */}
          {certificate.skills && certificate.skills.length > 0 && (
            <div>
              <h3 className="text-white text-lg font-semibold mb-3">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, index) => (
                  <span
                    key={skill}
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
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CertificateDetailModal;

