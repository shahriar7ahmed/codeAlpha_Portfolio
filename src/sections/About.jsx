import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon, description }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.15, 0.75)}
    className="w-full sm:w-[280px]"
  >
    <Tilt
      options={{
        max: 25,
        scale: 1,
        speed: 450,
      }}
      className="card-premium p-6 rounded-2xl h-full group"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Icon with gradient background */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-primary/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <img
              src={icon}
              alt={title}
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white text-xl font-bold text-center group-hover:text-gradient-primary transition-all">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-text-tertiary text-sm text-center leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </Tilt>
  </motion.div>
);

const SkillBar = ({ skill, level, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="mb-6"
  >
    <div className="flex justify-between items-center mb-2">
      <span className="text-white font-medium">{skill}</span>
      <span className="text-text-tertiary text-sm">{level}%</span>
    </div>
    <div className="h-2 bg-tertiary rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
        className="h-full bg-gradient-primary rounded-full relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </motion.div>
    </div>
  </motion.div>
);

const About = () => {
  const skills = [
    { skill: "React & Next.js", level: 90 },
    { skill: "Node.js & Express", level: 85 },
    { skill: "TypeScript", level: 80 },
    { skill: "MongoDB & PostgreSQL", level: 85 },
    { skill: "Tailwind CSS", level: 92 },
    { skill: "REST & GraphQL APIs", level: 88 },
  ];

  const enhancedServices = [
    {
      ...services[0],
      description: "Building responsive, modern web applications with cutting-edge technologies",
    },
    {
      ...services[1],
      description: "End-to-end development from database to user interface",
    },
    {
      ...services[2],
      description: "Creating robust APIs and server-side architectures",
    },
    {
      ...services[3],
      description: "Designing intuitive and engaging user experiences",
    },
  ];

  const quickFacts = [
    { label: "Location", value: "Bangladesh" },
    { label: "Availability", value: "Open to Work" },
    { label: "Work Style", value: "Remote/Hybrid" },
    { label: "Languages", value: "English, Bengali" },
  ];

  return (
    <>
      {/* Section Header */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      {/* Two Column Layout */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Summary & Quick Facts */}
        <motion.div
          variants={fadeIn("right", "", 0.1, 1)}
          className="flex flex-col gap-6"
        >
          {/* Professional Summary */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-2xl font-bold text-gradient-primary mb-4">
              Who I Am
            </h3>
            <p className="text-text-secondary text-base leading-relaxed mb-4">
              I'm a passionate <span className="text-white font-semibold">full-stack developer</span> specializing in React, Node.js, and TypeScript.
              I design and build <span className="text-white font-semibold">scalable web applications</span>, reliable APIs, and end-to-end digital products
              that transform ideas into functional, user-friendly solutions.
            </p>
            <p className="text-text-secondary text-base leading-relaxed">
              With a strong foundation in both frontend and backend technologies, I focus on creating
              <span className="text-white font-semibold"> performant, accessible, and maintainable</span> code that delivers exceptional user experiences.
            </p>
          </div>

          {/* Quick Facts */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Quick Facts</h3>
            <div className="grid grid-cols-2 gap-4">
              {quickFacts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col gap-1"
                >
                  <span className="text-text-tertiary text-xs uppercase tracking-wide">
                    {fact.label}
                  </span>
                  <span className="text-white font-medium text-sm">
                    {fact.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Resume Download */}
          <motion.a
            href="/Shahriar Ahmed Resume.pdf"
            download
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary flex items-center justify-center gap-3 w-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-bold">Download Resume</span>
            <span className="text-xs opacity-75">(PDF, 250KB)</span>
          </motion.a>
        </motion.div>

        {/* Right Column - Skills Visualization */}
        <motion.div
          variants={fadeIn("left", "", 0.1, 1)}
          className="flex flex-col gap-6"
        >
          {/* Technical Skills */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-2xl font-bold text-gradient-accent mb-6">
              Technical Skills
            </h3>
            <div className="space-y-2">
              {skills.map((item, index) => (
                <SkillBar
                  key={item.skill}
                  skill={item.skill}
                  level={item.level}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Expertise Areas */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">
              Core Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "Node.js",
                "TypeScript",
                "MongoDB",
                "Express",
                "Next.js",
                "Tailwind",
                "REST APIs",
                "Git",
                "Docker",
                "AWS",
                "Agile",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 bg-gradient-primary/10 border border-purple-500/30 rounded-full text-sm text-white hover:border-purple-500/50 hover:shadow-glow-purple transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* What I Do - Service Cards */}
      <motion.div
        variants={textVariant()}
        className="mt-16"
      >
        <h3 className="text-3xl font-bold text-gradient-primary mb-2">
          What I Do
        </h3>
        <p className="text-text-tertiary">
          Transforming ideas into digital reality through comprehensive development services
        </p>
      </motion.div>

      <div className="mt-10 flex flex-wrap justify-center gap-8">
        {enhancedServices.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            {...service}
          />
        ))}
      </div>

      {/* Additional Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-16 glass-card p-8 rounded-2xl text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-4">
          Let's Build Something Amazing Together
        </h3>
        <p className="text-text-secondary max-w-2xl mx-auto mb-6">
          I'm always excited to collaborate on innovative projects and bring creative ideas to life.
          Whether you need a full-stack application, responsive frontend, or robust backend solution,
          I'm here to help.
        </p>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-outline inline-flex items-center gap-2"
        >
          <span className="font-bold">Start a Conversation</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </motion.div>
    </>
  );
};

export default SectionWrapper(About, "about");
