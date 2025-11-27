import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaRocket, FaHeart } from 'react-icons/fa';
import avator from '../assets/avator.png';

const About = () => {
  const features = [
    {
      icon: FaCode,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code',
    },
    {
      icon: FaLaptopCode,
      title: 'Responsive Design',
      description: 'Creating beautiful UIs for all devices',
    },
    {
      icon: FaRocket,
      title: 'Fast Performance',
      description: 'Optimized applications for speed',
    },
    {
      icon: FaHeart,
      title: 'Passionate',
      description: 'Love what I do, do what I love',
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
    <section
      id="about"
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
            About Me
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center md:justify-start order-2 md:order-1"
          >
            <div className="relative w-full max-w-sm md:max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl blur-2xl opacity-30 transform rotate-6 -z-10" />
              <motion.img
                src={avator}
                alt="About Shahriar"
                className="relative rounded-2xl shadow-2xl border-4 border-white/20 w-full h-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6 order-1 md:order-2"
          >
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed"
            >
              I'm a passionate Full Stack Developer with a love for creating
              innovative web solutions. With expertise in modern technologies,
              I bring ideas to life through clean code and beautiful design.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed"
            >
              My journey in web development started with curiosity and has
              evolved into a career where I continuously learn and adapt to new
              technologies. I believe in writing code that not only works but
              also tells a story.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-3 sm:gap-4 mt-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <feature.icon className="text-2xl sm:text-3xl text-cyan-400 mb-2 sm:mb-3" />
                  <h3 className="text-base sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
