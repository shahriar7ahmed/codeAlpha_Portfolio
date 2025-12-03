import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa'
import {
  getAchievements,
  addAchievement,
  updateAchievement,
  deleteAchievement,
} from '../../utils/dataManager'

const AchievementsManager = () => {
  const [achievements, setAchievements] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState(null)
  const [formData, setFormData] = useState({
    type: 'hackathon',
    title: '',
    company: '',
    location: '',
    period: '',
    description: '',
  })

  useEffect(() => {
    loadAchievements()
  }, [])

  const loadAchievements = () => {
    const data = getAchievements()
    setAchievements(data)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDescriptionChange = (index, value) => {
    const descriptions = formData.description.split('\n').filter(Boolean)
    descriptions[index] = value
    setFormData((prev) => ({ ...prev, description: descriptions.join('\n') }))
  }

  const handleAddDescriptionLine = () => {
    setFormData((prev) => ({
      ...prev,
      description: prev.description ? prev.description + '\n' : '',
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const achievementData = {
      ...formData,
      description: formData.description.split('\n').filter(Boolean),
    }

    if (editingAchievement) {
      updateAchievement(editingAchievement.id, achievementData)
    } else {
      addAchievement(achievementData)
    }

    loadAchievements()
    resetForm()
  }

  const handleEdit = (achievement) => {
    setEditingAchievement(achievement)
    setFormData({
      type: achievement.type || 'hackathon',
      title: achievement.title || '',
      company: achievement.company || '',
      location: achievement.location || '',
      period: achievement.period || '',
      description: Array.isArray(achievement.description)
        ? achievement.description.join('\n')
        : achievement.description || '',
    })
    setIsFormOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      deleteAchievement(id)
      loadAchievements()
    }
  }

  const resetForm = () => {
    setFormData({
      type: 'hackathon',
      title: '',
      company: '',
      location: '',
      period: '',
      description: '',
    })
    setEditingAchievement(null)
    setIsFormOpen(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">Achievements Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFormOpen(true)}
          className="px-6 py-3 bg-[#e94560] hover:bg-[#ff6b7a] rounded-lg text-white flex items-center gap-2 transition-colors"
        >
          <FaPlus />
          Add Achievement
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
                    {editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                    >
                      <option value="hackathon">Hackathon</option>
                      <option value="work">Work Experience</option>
                      <option value="education">Education</option>
                      <option value="award">Award</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                      placeholder="Achievement Title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company/Organization *</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                        placeholder="Location"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Period *</label>
                    <input
                      type="text"
                      name="period"
                      value={formData.period}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                      placeholder="2023 - Present or 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description (one line per bullet point) *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all resize-none"
                      placeholder="First achievement point&#10;Second achievement point&#10;Third achievement point"
                    />
                    <p className="text-xs text-gray-500 mt-1">Each line will be displayed as a bullet point</p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3 bg-[#e94560] hover:bg-[#ff6b7a] rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <FaSave />
                      {editingAchievement ? 'Update Achievement' : 'Add Achievement'}
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

      {/* Achievements List */}
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 gradient-text">{achievement.title}</h3>
                <p className="text-gray-300 mb-1">
                  {achievement.company} {achievement.location && `• ${achievement.location}`}
                </p>
                <p className="text-gray-400 text-sm mb-2">{achievement.period}</p>
                <span className="inline-block px-2 py-1 bg-[#e94560]/20 text-[#e94560] rounded-full text-xs">
                  {achievement.type}
                </span>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(achievement)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 flex items-center gap-2 transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(achievement.id)}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 flex items-center gap-2 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {Array.isArray(achievement.description) && achievement.description.length > 0 && (
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                {achievement.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>

      {achievements.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No achievements yet. Add your first achievement!</p>
        </div>
      )}
    </div>
  )
}

export default AchievementsManager

