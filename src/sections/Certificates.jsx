import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCertificate, FaExternalLinkAlt, FaSearch, FaTimes } from 'react-icons/fa'
import { getCertificates } from '../utils/dataManager'

const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [certificates, setCertificates] = useState([])

  useEffect(() => {
    // Load certificates from localStorage
    const data = getCertificates()
    setCertificates(data)
  }, [])

  // Listen for storage changes to update certificates when admin makes changes
  useEffect(() => {
    const handleStorageChange = () => {
      const data = getCertificates()
      setCertificates(data)
    }

    window.addEventListener('storage', handleStorageChange)
    // Also check periodically (for same-tab updates)
    const interval = setInterval(() => {
      const data = getCertificates()
      if (JSON.stringify(data) !== JSON.stringify(certificates)) {
        setCertificates(data)
      }
    }, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [certificates])

  const categories = ['all', 'hackathon', 'course', 'certification']

  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory
      const matchesSearch =
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery, certificates])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <section id="certificates" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Certificates & <span className="gradient-text">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#e94560] to-transparent mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A showcase of my certifications, hackathon achievements, and learning milestones
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6 max-w-md mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
              aria-label="Search certificates"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#e94560] text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
                aria-label={`Filter by ${category}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Certificates Grid */}
        {filteredCertificates.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedCertificate(certificate)}
              >
                {/* Certificate Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#e94560] to-[#0f3460] overflow-hidden">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.style.background =
                        'linear-gradient(135deg, #e94560 0%, #0f3460 100%)'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute top-4 right-4">
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                      <FaCertificate className="text-white" size={20} />
                    </div>
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold gradient-text flex-1">
                      {certificate.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{certificate.issuer}</p>
                  <p className="text-gray-400 text-xs mb-4">{formatDate(certificate.issueDate)}</p>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {certificate.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {certificate.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-[#e94560]/20 text-[#e94560] rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {certificate.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs">
                        +{certificate.skills.length - 3}
                      </span>
                    )}
                  </div>
                  {certificate.verificationLink && (
                    <a
                      href={certificate.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm text-[#e94560] hover:text-[#ff6b7a] transition-colors flex items-center gap-2"
                    >
                      <FaExternalLinkAlt size={12} />
                      Verify Certificate
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No certificates found matching your criteria.</p>
          </motion.div>
        )}
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="relative">
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-[#e94560] transition-colors"
                    aria-label="Close modal"
                  >
                    <FaTimes className="text-white" size={20} />
                  </button>
                  <div className="relative h-64 md:h-96 bg-gradient-to-br from-[#e94560] to-[#0f3460]">
                    <img
                      src={selectedCertificate.image}
                      alt={selectedCertificate.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.style.background =
                          'linear-gradient(135deg, #e94560 0%, #0f3460 100%)'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-3xl font-bold mb-2 gradient-text">
                      {selectedCertificate.title}
                    </h3>
                    <p className="text-gray-300 text-lg mb-2">{selectedCertificate.issuer}</p>
                    <p className="text-gray-400 mb-4">Issued on {formatDate(selectedCertificate.issueDate)}</p>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {selectedCertificate.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-gray-300">Skills & Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCertificate.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-[#e94560]/20 text-[#e94560] rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedCertificate.verificationLink && (
                      <a
                        href={selectedCertificate.verificationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#e94560] text-white rounded-lg hover:bg-[#ff6b7a] transition-colors"
                      >
                        <FaExternalLinkAlt />
                        Verify Certificate
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Certificates

