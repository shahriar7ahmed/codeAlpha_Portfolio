import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Spam protection
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errors, setErrors] = useState({})

  // EmailJS configuration - get from environment variables
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      return
    }

    if (!validateForm()) {
      return
    }

    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'ahmedshahriar948@gmail.com',
      }

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)

      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '', honeypot: '' })
      setErrors({})

      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'ahmedshahriar948@gmail.com',
      link: 'mailto:ahmedshahriar948@gmail.com',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+880-17758-32948',
      link: 'tel:+8801775832948',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Chittagong, Bangladesh',
      link: null,
    },
  ]

  return (
    <section id="contact" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#e94560] to-transparent mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's talk!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4 gradient-text">
                Let's Connect
              </h3>
              <p className="text-gray-400 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions. Feel free to reach out
                through any of the channels below.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="text-[#e94560] text-2xl">
                    <info.icon />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{info.label}</p>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-white hover:text-[#e94560] transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-white/10 border ${
                    errors.name ? 'border-red-500' : 'border-white/20'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all`}
                  placeholder="Your Name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-white/10 border ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all`}
                  placeholder="your.email@example.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message * <span className="text-gray-500 text-xs">(10-1000 characters)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 bg-white/10 border ${
                    errors.message ? 'border-red-500' : 'border-white/20'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all resize-none`}
                  placeholder="Your message..."
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <p id="message-error" className="text-sm text-red-400" role="alert">
                      {errors.message}
                    </p>
                  ) : (
                    <span></span>
                  )}
                  <span className="text-xs text-gray-500">
                    {formData.message.length}/1000
                  </span>
                </div>
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400"
                  role="alert"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400"
                  role="alert"
                >
                  Failed to send message. Please try again later or contact me directly at ahmedshahriar948@gmail.com
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-[#e94560] to-[#ff6b7a] text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
