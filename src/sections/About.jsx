import { motion } from 'framer-motion'
import { FaCode, FaLaptopCode, FaRocket, FaFilePdf, FaDownload } from 'react-icons/fa'

const About = () => {
  const skills = [
    {
      icon: FaCode,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code following best practices',
    },
    {
      icon: FaLaptopCode,
      title: 'Modern Tech',
      description: 'Using the latest technologies and frameworks to build amazing products',
    },
    {
      icon: FaRocket,
      title: 'Performance',
      description: 'Optimizing applications for speed and efficiency',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="about" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#e94560] to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4 gradient-text">
                Who I Am
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                I'm a passionate full-stack developer with a love for creating
                innovative digital solutions. With expertise in modern web
                technologies, I transform ideas into beautiful, functional
                applications.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <motion.a
                  href="/Shahriar Ahmed Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-[#e94560] text-white rounded-lg font-medium hover:bg-[#ff6b7a] transition-colors flex items-center justify-center gap-2 text-sm"
                  onClick={(e) => {
                    // Open in new tab without triggering download manager
                    e.stopPropagation()
                  }}
                >
                  <FaFilePdf /> View Resume
                </motion.a>
                <motion.a
                  href="/Shahriar Ahmed Resume.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border-2 border-[#e94560] text-[#e94560] rounded-lg font-medium hover:bg-[#e94560] hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
                  onClick={(e) => {
                    // Force download programmatically
                    e.preventDefault()
                    const link = document.createElement('a')
                    link.href = '/Shahriar Ahmed Resume.pdf'
                    link.download = 'Shahriar_Ahmed_Resume.pdf'
                    link.style.display = 'none'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                >
                  <FaDownload /> Download
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="glass rounded-xl p-6 flex items-start gap-4"
              >
                <div className="text-[#e94560] text-3xl">
                  <skill.icon />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">{skill.title}</h4>
                  <p className="text-gray-400">{skill.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
