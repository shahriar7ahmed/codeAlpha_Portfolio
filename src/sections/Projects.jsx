import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const Projects = () => {
  const projects = [
    {
      title: 'Upscale — Career Platform',
    description:
      'A full-stack career acceleration platform built with Next.js that helps professionals discover learning resources, generate tailored roadmaps, run AI-powered mock interviews, and collaborate with mentors and recruiters.',
    tags: [
      'Next.js',
      'TypeScript',
      'MongoDB',
      'Tailwind CSS',
      'NextAuth',
      'Google Gemini',
      'Vercel',
      'RapidAPI'
    ],
    github: 'https://github.com/shahriar7ahmed/upScale_nextGen_hackaThon',
    demo: 'https://up-scale-next-gen-hacka-thon-6xhl.vercel.app/',
      image: '/upscale.png'
  },

  {
    title: 'FarmLink — Krishi Marketplace',
    description:
      'A comprehensive marketplace connecting farmers with buyers, featuring automatic price freshness discounts, multi-role verification workflows, admin analytics, real-time notifications, and a community Q&A forum.',
    tags: [
      'Next.js',
      'Node.js',
      'MongoDB',
      'Realtime',
      'bKash/Nagad/Rocket (dummy)',
      'Admin Dashboard',
      'Vercel'
    ],
    github: 'https://github.com/mrmushii/krishi',
    demo: 'https://krishi-ten.vercel.app/',
      image: '/krishi.png'
    },
    {
      title: 'Better Blocks — Urban Planning Assistant',
    description:
      "A web-based urban planning tool (NASA Space Apps 2025) using NASA WorldPop and OpenStreetMap to compute real population counts, infrastructure density, readiness scores, and 5/10-year growth projections for a user-drawn region (optimized for Bangladesh).",
    tags: [
      'React',
      'Vite',
      'Leaflet',
      'OpenStreetMap',
      'NASA WorldPop',
      'CSV Parsing',
      'Client-side Analytics',
      'Vercel'
    ],
    github: 'https://github.com/shahriar7ahmed/Hilshsa-Nasa',
    demo: 'https://better-blocks.vercel.app/',
      image: '/betterblocks.png'
    },
    {
      title: 'Social Media Analytics',
      description:
        'Analytics platform for tracking social media metrics with data visualization and reporting.',
      tags: ['Next.js', 'Python', 'Chart.js'],
      github: 'https://github.com',
      demo: 'https://example.com',
      image: '/api/placeholder/600/400',
    },
  ]

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

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
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
      </div>
    </section>
  )
}

export default Projects

