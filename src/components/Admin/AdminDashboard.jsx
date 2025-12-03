import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaFolder, FaCertificate, FaTrophy, FaCog, FaSignOutAlt, FaFileExport, FaFileImport } from 'react-icons/fa'
import ProjectsManager from './ProjectsManager'
import CertificatesManager from './CertificatesManager'
import AchievementsManager from './AchievementsManager'
import { exportAllData, importAllData } from '../../utils/dataManager'

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('projects')

  const tabs = [
    { id: 'projects', label: 'Projects', icon: FaFolder },
    { id: 'certificates', label: 'Certificates', icon: FaCertificate },
    { id: 'achievements', label: 'Achievements', icon: FaTrophy },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ]

  const handleExport = () => {
    const data = exportAllData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result)
            if (importAllData(data)) {
              alert('Data imported successfully! Please refresh the page.')
              window.location.reload()
            } else {
              alert('Error importing data. Please check the file format.')
            }
          } catch (error) {
            alert('Error reading file. Please ensure it is a valid JSON file.')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e]">
      {/* Header */}
      <div className="bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 flex items-center gap-2 transition-colors"
                aria-label="Export data"
              >
                <FaFileExport />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 flex items-center gap-2 transition-colors"
                aria-label="Import data"
              >
                <FaFileImport />
                <span className="hidden sm:inline">Import</span>
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-[#e94560] hover:bg-[#ff6b7a] rounded-lg text-white flex items-center gap-2 transition-colors"
                aria-label="Logout"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 flex items-center gap-2 font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-[#e94560] border-[#e94560]'
                    : 'text-gray-400 border-transparent hover:text-gray-300'
                }`}
              >
                <Icon />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'certificates' && <CertificatesManager />}
          {activeTab === 'achievements' && <AchievementsManager />}
          {activeTab === 'settings' && (
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Settings</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-300">Data Management</h3>
                  <p className="text-gray-400 mb-4">
                    Export your data to create a backup or import previously exported data.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={handleExport}
                      className="px-6 py-3 bg-[#e94560] hover:bg-[#ff6b7a] rounded-lg text-white flex items-center gap-2 transition-colors"
                    >
                      <FaFileExport />
                      Export Data
                    </button>
                    <button
                      onClick={handleImport}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 flex items-center gap-2 transition-colors"
                    >
                      <FaFileImport />
                      Import Data
                    </button>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-lg font-semibold mb-2 text-gray-300">About</h3>
                  <p className="text-gray-400">
                    This admin panel allows you to manage your portfolio content. All data is stored locally in your
                    browser's localStorage.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard

