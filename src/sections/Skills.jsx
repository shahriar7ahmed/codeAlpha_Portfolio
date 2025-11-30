import { motion } from 'framer-motion'
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNode,
  FaPython,
  FaGitAlt,
  FaDocker,
} from 'react-icons/fa'
import {
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiNextdotjs,
} from 'react-icons/si'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'HTML5', icon: FaHtml5, color: '#e34c26' },
        { name: 'CSS3', icon: FaCss3Alt, color: '#264de4' },
        { name: 'JavaScript', icon: FaJs, color: '#f7df1e' },
        { name: 'TypeScript', icon: SiTypescript, color: '#007acc' },
        { name: 'React', icon: FaReact, color: '#61dafb' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: FaNode, color: '#339933' },
        { name: 'Python', icon: FaPython, color: '#3776ab' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#316192' },
        { name: 'Firebase', icon: SiFirebase, color: '#ffca28' },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', icon: FaGitAlt, color: '#f05032' },
        { name: 'Docker', icon: FaDocker, color: '#0db7ed' },
      ],
    },
  ]

  return (
    <section id="skills" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#e94560] to-transparent mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-center">
                {category.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: categoryIndex * 0.2 + index * 0.1,
                    }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="glass rounded-xl p-6 flex flex-col items-center gap-3 min-w-[120px] group cursor-pointer"
                  >
                    <skill.icon
                      size={40}
                      style={{ color: skill.color }}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm font-medium text-gray-300">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

