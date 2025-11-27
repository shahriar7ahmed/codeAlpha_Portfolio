import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import img1 from '../assets/img1.JPG';
import img2 from '../assets/img2.JPG';
import img3 from '../assets/img3.JPG';
import m1 from '../assets/m1.PNG';
import m2 from '../assets/m2.PNG';
import w1 from '../assets/w1.PNG';
import w2 from '../assets/w2.PNG';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.',
      image: img1,
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'Task Management App',
      description:
        'A collaborative task management application with real-time updates and team collaboration features.',
      image: img2,
      technologies: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'Social Media Dashboard',
      description:
        'Analytics dashboard for social media management with data visualization and insights.',
      image: img3,
      technologies: ['React', 'D3.js', 'Node.js', 'MongoDB'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'Mobile App',
      description:
        'Cross-platform mobile application with offline capabilities and push notifications.',
      image: m1,
      technologies: ['React Native', 'Firebase', 'Redux'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'Portfolio Website',
      description:
        'Modern portfolio website with animations, responsive design, and contact form integration.',
      image: w1,
      technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'Weather App',
      description:
        'Real-time weather application with location-based forecasts and beautiful UI.',
      image: w2,
      technologies: ['React', 'OpenWeather API', 'Chart.js'],
      github: 'https://github.com',
      live: 'https://example.com',
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="projects" className="relative min-h-screen flex items-center py-16 md:py-20 pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-400/20"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-cyan-400 transition-colors"
                  >
                    <FaGithub />
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-green-400 transition-colors"
                  >
                    <FaExternalLinkAlt />
                  </motion.a>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/70 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
