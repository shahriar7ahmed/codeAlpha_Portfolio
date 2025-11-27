import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Company',
      location: 'Remote',
      period: '2022 - Present',
      description: [
        'Led development of multiple web applications using React, Node.js, and modern frameworks',
        'Collaborated with cross-functional teams to deliver high-quality products',
        'Mentored junior developers and conducted code reviews',
        'Implemented CI/CD pipelines and improved deployment processes',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup Inc',
      location: 'San Francisco, CA',
      period: '2020 - 2022',
      description: [
        'Developed and maintained web applications using React and Express.js',
        'Built RESTful APIs and integrated third-party services',
        'Optimized application performance and improved user experience',
        'Participated in agile development processes',
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency',
      location: 'New York, NY',
      period: '2018 - 2020',
      description: [
        'Created responsive web designs using HTML, CSS, and JavaScript',
        'Worked with design teams to implement pixel-perfect UIs',
        'Improved website performance and SEO',
        'Maintained and updated existing client websites',
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="experience"
      className="relative min-h-screen flex items-center py-12 md:py-16 lg:py-20 pt-20 md:pt-24 lg:pt-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-green-400 transform md:-translate-x-1/2 hidden md:block" />
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-green-400 md:hidden" />

          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 sm:left-8 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full border-3 sm:border-4 border-[#302b63] transform md:-translate-x-1/2 z-10 shadow-lg shadow-cyan-400/50" />

                {/* Content Card */}
                <div
                  className={`w-full md:w-5/12 ml-8 sm:ml-10 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-4 sm:p-5 md:p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-lg"
                  >
                    <div className="flex items-center gap-2 text-cyan-400 mb-2 sm:mb-3">
                      <FaBriefcase className="text-xs sm:text-sm md:text-base flex-shrink-0" />
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
                        {exp.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-white/70 mb-3 sm:mb-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-1.5">
                        <FaBuilding className="text-cyan-400" />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaMapMarkerAlt className="text-green-400" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.description.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-white/80 flex items-start gap-2"
                        >
                          <span className="text-cyan-400 mt-1">▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
