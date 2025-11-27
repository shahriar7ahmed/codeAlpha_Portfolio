import React from 'react';
import { motion } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaAws,
  FaDocker,
  FaDatabase,
} from 'react-icons/fa';
import { SiMongodb, SiPostgresql, SiTypescript, SiTailwindcss, SiExpress } from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: FaReact, level: 90, color: 'from-cyan-400 to-blue-500' },
        { name: 'JavaScript', icon: FaJs, level: 95, color: 'from-yellow-400 to-yellow-600' },
        { name: 'TypeScript', icon: SiTypescript, level: 85, color: 'from-blue-400 to-blue-600' },
        { name: 'HTML5', icon: FaHtml5, level: 95, color: 'from-orange-400 to-orange-600' },
        { name: 'CSS3', icon: FaCss3Alt, level: 90, color: 'from-blue-400 to-blue-600' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 88, color: 'from-cyan-400 to-teal-500' },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: FaNodeJs, level: 90, color: 'from-green-400 to-green-600' },
        { name: 'Express.js', icon: SiExpress, level: 88, color: 'from-gray-400 to-gray-600' },
        { name: 'Python', icon: FaPython, level: 85, color: 'from-yellow-400 to-blue-500' },
        { name: 'MongoDB', icon: SiMongodb, level: 85, color: 'from-green-400 to-green-600' },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 80, color: 'from-blue-400 to-blue-600' },
        { name: 'Database', icon: FaDatabase, level: 85, color: 'from-purple-400 to-purple-600' },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', icon: FaGitAlt, level: 90, color: 'from-orange-400 to-red-500' },
        { name: 'Docker', icon: FaDocker, level: 75, color: 'from-blue-400 to-cyan-500' },
        { name: 'AWS', icon: FaAws, level: 70, color: 'from-orange-400 to-yellow-500' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="skills" className="relative min-h-screen flex items-center py-20 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div key={categoryIndex} variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center mb-4">
                      <skill.icon
                        className={`text-4xl mb-3 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
                      />
                      <h4 className="text-white font-semibold text-center">
                        {skill.name}
                      </h4>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                    <p className="text-white/70 text-sm text-center mt-2">
                      {skill.level}%
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
