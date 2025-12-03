import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa'
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from '../../utils/dataManager'

const ProjectsManager = () => {
  const [projects, setProjects] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    github: '',
    demo: '',
    image: '',
  })

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = () => {
    const data = getProjects()
    setProjects(data)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const projectData = {
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    }

    if (editingProject) {
      updateProject(editingProject.id, projectData)
    } else {
      addProject(projectData)
    }

    loadProjects()
    resetForm()
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      title: project.title || '',
      description: project.description || '',
      tags: project.tags?.join(', ') || '',
      github: project.github || '',
      demo: project.demo || '',
      image: project.image || '',
    })
    setIsFormOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id)
      loadProjects()
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      tags: '',
      github: '',
      demo: '',
      image: '',
    })
    setEditingProject(null)
    setIsFormOpen(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">Projects Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFormOpen(true)}
          className="px-6 py-3 bg-[#e94560] hover:bg-[#ff6b7a] rounded-lg text-white flex items-center gap-2 transition-colors"
        >
          <FaPlus />
          Add Project
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
                    {editingProject ? 'Edit Project' : 'Add New Project'}
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
                      placeholder="Project Title"
                    />
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
                      placeholder="Project description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma-separated) *</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Demo URL</label>
                      <input
                        type="url"
                        name="demo"
                        value={formData.demo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                        placeholder="https://example.com"
                      />
                    </div>
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

                  <div className="flex gap-4 pt-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3 bg-[#e94560] hover:bg-[#ff6b7a] rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <FaSave />
                      {editingProject ? 'Update Project' : 'Add Project'}
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

      {/* Projects List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 gradient-text">{project.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-1 bg-[#e94560]/20 text-[#e94560] rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 flex items-center justify-center gap-2 transition-colors"
              >
                <FaEdit />
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 flex items-center justify-center gap-2 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No projects yet. Add your first project!</p>
        </div>
      )}
    </div>
  )
}

export default ProjectsManager

