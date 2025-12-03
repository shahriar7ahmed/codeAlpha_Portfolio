import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { getProjects } from '../utils/dataManager'

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // Load projects from localStorage
    const data = getProjects()
    setProjects(data)
  }, [])

  // Listen for storage changes to update projects when admin makes changes
  useEffect(() => {
    const handleStorageChange = () => {
      const data = getProjects()
      setProjects(data)
    }

    window.addEventListener('storage', handleStorageChange)
    // Also check periodically (for same-tab updates)
    const interval = setInterval(() => {
      const data = getProjects()
      if (JSON.stringify(data) !== JSON.stringify(projects)) {
        setProjects(data)
      }
    }, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [projects])

  return (
    <section id="projects" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#e94560] to-transparent mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A collection of projects I've worked on, showcasing my skills and
            creativity
          </p>
        </motion.div>

        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
            <motion.div
              key={project.id || project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-[#e94560] to-[#0f3460] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback to gradient if image fails to load
                    e.target.style.display = 'none'
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #e94560 0%, #0f3460 100%)'
                  }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 backdrop-blur-md rounded-lg hover:bg-[#e94560] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub size={20} />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 backdrop-blur-md rounded-lg hover:bg-[#e94560] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt size={20} />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 gradient-text">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#e94560]/20 text-[#e94560] rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects

