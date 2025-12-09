import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { getCertificates } from "../utils/dataManager";
import CertificateDetailModal from "../components/CertificateDetailModal";

const CertificateCard = ({ index, certificate, onCardClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <motion.div
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
        }}
      >
        <Tilt
          tiltMaxAngleX={45}
          tiltMaxAngleY={45}
          scale={1.03}
          transitionSpeed={450}
          className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full min-h-[500px] flex flex-col shadow-card cursor-pointer'
          style={{ 
            willChange: "transform, box-shadow",
            transition: "box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(145, 94, 255, 0.25), 0 20px 25px -5px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.border = "1px solid rgba(145, 94, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "";
            e.currentTarget.style.border = "1px solid transparent";
          }}
          onClick={() => onCardClick && onCardClick()}
        >
        <div className='relative w-full h-[230px] mb-4 overflow-hidden rounded-2xl'>
          {!imageLoaded && !imageError && (
            <div className='absolute inset-0 bg-gradient-to-br from-[#915EFF] to-[#bf61ff] animate-pulse flex items-center justify-center'>
              <div className='w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
            </div>
          )}
          <img
            src={certificate.image}
            alt={certificate.title}
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
              <span className='text-white text-2xl'>🏆</span>
            </div>
          )}
        </div>

        <div className='flex-1 flex flex-col'>
          <h3 className='text-white font-bold text-[24px] mb-2'>{certificate.title}</h3>
          <p className='text-secondary text-[16px] font-semibold mb-2'>{certificate.issuer}</p>
          {certificate.issueDate && (
            <p className='text-secondary text-[14px] mb-4'>
              📅 {new Date(certificate.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
          <p className='text-white-100 text-[14px] mb-4 leading-relaxed'>
            {certificate.description}
          </p>
          
          {certificate.skills && certificate.skills.length > 0 && (
            <div className='mt-auto flex flex-wrap gap-2'>
              {certificate.skills.slice(0, 4).map((skill) => (
                <p
                  key={`${certificate.id}-${skill}`}
                  className={`text-[12px] ${
                    index % 4 === 0 ? "blue-text-gradient" :
                    index % 4 === 1 ? "green-text-gradient" :
                    index % 4 === 2 ? "pink-text-gradient" :
                    "orange-text-gradient"
                  }`}
                >
                  #{skill}
                </p>
              ))}
            </div>
          )}
        </div>
      </Tilt>
      </motion.div>
    </motion.div>
  );
};

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const data = getCertificates();
    setCertificates(data);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const data = getCertificates();
      setCertificates(data);
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(() => {
      const data = getCertificates();
      if (JSON.stringify(data) !== JSON.stringify(certificates)) {
        setCertificates(data);
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [certificates]);

  const handleCardClick = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My achievements</p>
        <h2 className={styles.sectionHeadText}>Certificates.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          A collection of my certificates, hackathon achievements, and learning milestones
          that showcase my commitment to continuous learning and professional growth.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {certificates.map((certificate, index) => (
          <CertificateCard
            key={`certificate-${certificate.id || index}`}
            index={index}
            certificate={certificate}
            onCardClick={() => handleCardClick(certificate)}
          />
        ))}
      </div>

      <CertificateDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        certificate={selectedCertificate}
      />
    </>
  );
};

export default SectionWrapper(Certificates, "certificates");
