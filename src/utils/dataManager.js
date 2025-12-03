// Data Manager Utility for localStorage-based data management

const STORAGE_KEYS = {
  PROJECTS: 'portfolio_projects',
  CERTIFICATES: 'portfolio_certificates',
  ACHIEVEMENTS: 'portfolio_achievements',
}

// Projects Management
export const getProjects = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROJECTS)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading projects:', error)
    return []
  }
}

export const saveProjects = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects))
    return true
  } catch (error) {
    console.error('Error saving projects:', error)
    return false
  }
}

export const addProject = (project) => {
  const projects = getProjects()
  const newProject = {
    ...project,
    id: project.id || `project-${Date.now()}`,
  }
  projects.push(newProject)
  return saveProjects(projects)
}

export const updateProject = (id, updatedProject) => {
  const projects = getProjects()
  const index = projects.findIndex((p) => p.id === id)
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updatedProject }
    return saveProjects(projects)
  }
  return false
}

export const deleteProject = (id) => {
  const projects = getProjects()
  const filtered = projects.filter((p) => p.id !== id)
  return saveProjects(filtered)
}

// Certificates Management
export const getCertificates = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CERTIFICATES)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading certificates:', error)
    return []
  }
}

export const saveCertificates = (certificates) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates))
    return true
  } catch (error) {
    console.error('Error saving certificates:', error)
    return false
  }
}

export const addCertificate = (certificate) => {
  const certificates = getCertificates()
  const newCertificate = {
    ...certificate,
    id: certificate.id || `cert-${Date.now()}`,
  }
  certificates.push(newCertificate)
  return saveCertificates(certificates)
}

export const updateCertificate = (id, updatedCertificate) => {
  const certificates = getCertificates()
  const index = certificates.findIndex((c) => c.id === id)
  if (index !== -1) {
    certificates[index] = { ...certificates[index], ...updatedCertificate }
    return saveCertificates(certificates)
  }
  return false
}

export const deleteCertificate = (id) => {
  const certificates = getCertificates()
  const filtered = certificates.filter((c) => c.id !== id)
  return saveCertificates(filtered)
}

// Achievements Management
export const getAchievements = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading achievements:', error)
    return []
  }
}

export const saveAchievements = (achievements) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements))
    return true
  } catch (error) {
    console.error('Error saving achievements:', error)
    return false
  }
}

export const addAchievement = (achievement) => {
  const achievements = getAchievements()
  const newAchievement = {
    ...achievement,
    id: achievement.id || `achievement-${Date.now()}`,
  }
  achievements.push(newAchievement)
  return saveAchievements(achievements)
}

export const updateAchievement = (id, updatedAchievement) => {
  const achievements = getAchievements()
  const index = achievements.findIndex((a) => a.id === id)
  if (index !== -1) {
    achievements[index] = { ...achievements[index], ...updatedAchievement }
    return saveAchievements(achievements)
  }
  return false
}

export const deleteAchievement = (id) => {
  const achievements = getAchievements()
  const filtered = achievements.filter((a) => a.id !== id)
  return saveAchievements(filtered)
}

// Export/Import functionality
export const exportAllData = () => {
  return {
    projects: getProjects(),
    certificates: getCertificates(),
    achievements: getAchievements(),
    exportedAt: new Date().toISOString(),
  }
}

export const importAllData = (data) => {
  try {
    if (data.projects) saveProjects(data.projects)
    if (data.certificates) saveCertificates(data.certificates)
    if (data.achievements) saveAchievements(data.achievements)
    return true
  } catch (error) {
    console.error('Error importing data:', error)
    return false
  }
}

// Initialize with default data if empty
export const initializeDefaultData = () => {
  // Initialize projects if empty
  if (getProjects().length === 0) {
    const defaultProjects = [
      {
        id: '1',
        title: 'Upscale — Career Platform',
        description:
          'A full-stack career acceleration platform built with Next.js that helps professionals discover learning resources, generate tailored roadmaps, run AI-powered mock interviews, and collaborate with mentors and recruiters.',
        tags: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'NextAuth', 'Google Gemini', 'Vercel', 'RapidAPI'],
        github: 'https://github.com/shahriar7ahmed/upScale_nextGen_hackaThon',
        demo: 'https://up-scale-next-gen-hacka-thon-6xhl.vercel.app/',
        image: '/upscale.png',
      },
      {
        id: '2',
        title: 'FarmLink — Krishi Marketplace',
        description:
          'A comprehensive marketplace connecting farmers with buyers, featuring automatic price freshness discounts, multi-role verification workflows, admin analytics, real-time notifications, and a community Q&A forum.',
        tags: ['Next.js', 'Node.js', 'MongoDB', 'Realtime', 'bKash/Nagad/Rocket (dummy)', 'Admin Dashboard', 'Vercel'],
        github: 'https://github.com/mrmushii/krishi',
        demo: 'https://krishi-ten.vercel.app/',
        image: '/krishi.png',
      },
      {
        id: '3',
        title: 'Better Blocks — Urban Planning Assistant',
        description:
          "A web-based urban planning tool (NASA Space Apps 2025) using NASA WorldPop and OpenStreetMap to compute real population counts, infrastructure density, readiness scores, and 5/10-year growth projections for a user-drawn region (optimized for Bangladesh).",
        tags: ['React', 'Vite', 'Leaflet', 'OpenStreetMap', 'NASA WorldPop', 'CSV Parsing', 'Client-side Analytics', 'Vercel'],
        github: 'https://github.com/shahriar7ahmed/Hilshsa-Nasa',
        demo: 'https://better-blocks.vercel.app/',
        image: '/betterblocks.png',
      },
    ]
    saveProjects(defaultProjects)
  }

  // Initialize certificates if empty
  if (getCertificates().length === 0) {
    const defaultCertificates = [
      {
        id: '1',
        title: 'NASA International Space Apps Challenge',
        issuer: 'NASA',
        issueDate: '2025-01-01',
        description: 'Global nominee for developing a web tool leveraging NASA WorldPop data and OpenStreetMap to evaluate urban readiness.',
        image: '/NASA Space Apps Challenge Certificate-1.png',
        verificationLink: null,
        category: 'hackathon',
        skills: ['React', 'Leaflet', 'Data Analysis', 'OpenStreetMap', 'NASA WorldPop'],
      },
      {
        id: '2',
        title: 'Full Stack Development with MERN',
        issuer: 'Course Provider',
        issueDate: '2024-12-01',
        description: 'Completed comprehensive full-stack development course covering MongoDB, Express, React, and Node.js technologies.',
        image: '/certificate-full-stack-development-with-mern.jpg',
        verificationLink: null,
        category: 'course',
        skills: ['MongoDB', 'Express', 'React', 'Node.js', 'Full Stack', 'REST API'],
      },
      {
        id: '3',
        title: 'Frontend Developer - React',
        issuer: 'Course Provider',
        issueDate: '2024-11-01',
        description: 'Completed frontend development specialization focusing on React.js, component architecture, and modern UI/UX practices.',
        image: '/frontend_developer_react certificate-1.png',
        verificationLink: null,
        category: 'course',
        skills: ['React', 'JavaScript', 'Frontend Development', 'UI/UX', 'Component Architecture'],
      },
      {
        id: '4',
        title: 'Canva for Presentations',
        issuer: 'Canva',
        issueDate: '2024-10-01',
        description: 'Mastered Canva for creating professional presentations and visual designs.',
        image: '/certificate-canva-for-presentations.jpg',
        verificationLink: null,
        category: 'certification',
        skills: ['Canva', 'Design', 'Presentations', 'Visual Design'],
      },
      {
        id: '5',
        title: 'NextGen Hackathon Runner-up',
        issuer: 'NextGen Hackathon',
        issueDate: '2025-01-15',
        description: 'Achieved runner-up position among 50+ teams (140+ participants) in a 24-hour national hackathon with "Upscale" career platform.',
        image: '/upscale.png',
        verificationLink: null,
        category: 'hackathon',
        skills: ['Next.js', 'TypeScript', 'MongoDB', 'AI Integration', 'Google Gemini'],
      },
      {
        id: '6',
        title: 'Intra Department Tech Hackathon Champion',
        issuer: 'International Islamic University Chittagong',
        issueDate: '2025-02-10',
        description: 'Won first place with "FarmLink", a multi-role agricultural marketplace featuring real-time features and admin analytics.',
        image: '/krishi.png',
        verificationLink: null,
        category: 'hackathon',
        skills: ['Next.js', 'Node.js', 'MongoDB', 'Full Stack', 'Real-time Systems'],
      },
    ]
    saveCertificates(defaultCertificates)
  }
}

