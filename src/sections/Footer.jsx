import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/shahriar7ahmed/', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/shahriar-ahmed-405261347/', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:ahmedshahriar948@gmail.com', label: 'Email' },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm"
          >
            © {currentYear} Portfolio. All rights reserved.
          </motion.p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-[#e94560] transition-colors"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>

          {/* Made with */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm"
          >
            Made with <span className="text-[#e94560]">♥</span> using React
          </motion.p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

