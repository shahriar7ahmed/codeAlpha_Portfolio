import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa'
import {
  getCertificates,
  addCertificate,
  updateCertificate,
  deleteCertificate,
} from '../../utils/dataManager'

const CertificatesManager = () => {
  const [certificates, setCertificates] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCertificate, setEditingCertificate] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    description: '',
    image: '',
    verificationLink: '',
    category: 'hackathon',
    skills: '',
  })

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = () => {
    const data = getCertificates()
    setCertificates(data)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const certificateData = {
      ...formData,
      skills: formData.skills.split(',').map((skill) => skill.trim()).filter(Boolean),
      verificationLink: formData.verificationLink || null,
    }

    if (editingCertificate) {
      updateCertificate(editingCertificate.id, certificateData)
    } else {
      addCertificate(certificateData)
    }

    loadCertificates()
    resetForm()
  }

  const handleEdit = (certificate) => {
    setEditingCertificate(certificate)
    setFormData({
      title: certificate.title || '',
      issuer: certificate.issuer || '',
      issueDate: certificate.issueDate || '',
      description: certificate.description || '',
      image: certificate.image || '',
      verificationLink: certificate.verificationLink || '',
      category: certificate.category || 'hackathon',
      skills: certificate.skills?.join(', ') || '',
    })
    setIsFormOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      deleteCertificate(id)
      loadCertificates()
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      issuer: '',
      issueDate: '',
      description: '',
      image: '',
      verificationLink: '',
      category: 'hackathon',
      skills: '',
    })
    setEditingCertificate(null)
    setIsFormOpen(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">Certificates Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFormOpen(true)}
          className="px-6 py-3 bg-[#e94560] hover:bg-[#ff6b7a] rounded-lg text-white flex items-center gap-2 transition-colors"
        >
          <FaPlus />
          Add Certificate
        </motion.button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold gradient-text">
                    {editingCertificate ? 'Edit Certificate' : 'Add New Certificate'}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Close form"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                      placeholder="Certificate Title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Issuer *</label>
                      <input
                        type="text"
                        name="issuer"
                        value={formData.issuer}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                        placeholder="Organization Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Issue Date *</label>
                      <input
                        type="date"
                        name="issueDate"
                        value={formData.issueDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all resize-none"
                      placeholder="Certificate description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                      >
                        <option value="hackathon">Hackathon</option>
                        <option value="course">Course</option>
                        <option value="certification">Certification</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Image URL *</label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                        placeholder="/image.png or https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Skills (comma-separated) *</label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Verification Link (optional)</label>
                    <input
                      type="url"
                      name="verificationLink"
                      value={formData.verificationLink}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                      placeholder="https://verify.example.com/..."
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3 bg-[#e94560] hover:bg-[#ff6b7a] rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <FaSave />
                      {editingCertificate ? 'Update Certificate' : 'Add Certificate'}
                    </motion.button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Certificates List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate, index) => (
          <motion.div
            key={certificate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 gradient-text">{certificate.title}</h3>
              <p className="text-gray-400 text-sm mb-1">{certificate.issuer}</p>
              <p className="text-gray-500 text-xs">{formatDate(certificate.issueDate)}</p>
              <span className="inline-block mt-2 px-2 py-1 bg-[#e94560]/20 text-[#e94560] rounded-full text-xs">
                {certificate.category}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(certificate)}
                className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 flex items-center justify-center gap-2 transition-colors"
              >
                <FaEdit />
                Edit
              </button>
              <button
                onClick={() => handleDelete(certificate.id)}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 flex items-center justify-center gap-2 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No certificates yet. Add your first certificate!</p>
        </div>
      )}
    </div>
  )
}

export default CertificatesManager

