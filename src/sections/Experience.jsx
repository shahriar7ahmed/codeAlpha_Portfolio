import { motion } from 'framer-motion'
import { FaBriefcase, FaGraduationCap, FaTrophy } from 'react-icons/fa'

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const timelineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: (side) => ({
    opacity: 0,
    x: side === 'left' ? -50 : 50,
    y: 30,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const iconVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: 'easeOut',
    },
  },
}

const Experience = () => {
  const experiences = [
    {
      type: 'education',
      title: 'Bachelor of Science in Computer  And Engineering',
      company: 'International Islamic University Chittagong',
      location: 'Chittagong, Bangladesh',
      period: '2023 - Present',
      description: [
        'Undergoing undergraduate studies in Computer and Engineering',
        'Relevant coursework: Data Structures, Algorithms, Web Development',
      ],
    },
    {
      type: 'hackathon',
      title: 'NextGen Hackathon',
      company: 'Team 3Zeros',
      location: 'Chittagong, Bangladesh',
      period: '2025',
      description: [
        'Runner-up among 50+ teams (140+ participants) in a 24-hour national hackathon.',
        'Architected "Upscale", an AI-powered career platform integrating Gemini 2.0 and Vapi Voice AI under strict deadlines.',
      ],
    },
    {
      type: 'hackathon',
      title: 'Intra Department Tech Hackathon',
      company: 'International Islamic University Chittagong',
      location: 'Chittagong, Bangladesh',
      period: '2025',
      description: [
        'Champion with "FarmLink", a multi-role agricultural marketplace.',
        'Delivered full-stack architecture with a price freshness algorithm and role-based access control.',
      ],
    },
    {
      type: 'hackathon',
      title: 'NASA International Space Apps Challenge',
      company: 'Hylsha Hyperdrive',
      location: 'Global Nominee',
      period: '2025',
      description: [
        'Developed a web tool leveraging NASA WorldPop data and OpenStreetMap to evaluate urban readiness.',
        'Helped planners and policymakers make data-driven infrastructure, health, and sustainability decisions with Earth observation data.',
      ],
    },
  ]

  return (
    <section id="experience" className="section py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#e94560] to-transparent mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#e94560] to-[#0f3460] transform md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
          />

          <motion.div
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-12"
          >
            {experiences.map((exp, index) => {
              const side = index % 2 === 0 ? 'left' : 'right'

              return (
                <motion.div
                  key={index}
                  custom={side}
                  variants={cardVariants}
                  className={`relative flex items-start gap-6 ${
                    side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      variants={iconVariants}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e94560] to-[#0f3460] flex items-center justify-center shadow-lg"
                    >
                      {exp.type === 'work' ? (
                        <FaBriefcase size={24} className="text-white" />
                      ) : exp.type === 'hackathon' ? (
                        <FaTrophy size={24} className="text-white" />
                      ) : (
                        <FaGraduationCap size={24} className="text-white" />
                      )}
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    className={`flex-1 glass rounded-xl p-6 ${
                      side === 'left' ? 'md:mr-auto md:max-w-md' : 'md:ml-auto md:max-w-md'
                    }`}
                    whileHover={{ scale: 1.02, x: side === 'left' ? 5 : -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-semibold gradient-text">
                        {exp.title}
                      </h3>
                      <span className="text-sm text-gray-400 mt-1 md:mt-0">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-lg text-gray-300 mb-2">
                      {exp.company} • {exp.location}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 mt-4">
                      {exp.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Experience
