import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Doe',
      role: 'CEO, Tech Startup',
      content:
        'Shahriar delivered an exceptional project that exceeded our expectations. His attention to detail and technical expertise are outstanding.',
      rating: 5,
      avatar: 'JD',
    },
    {
      name: 'Jane Smith',
      role: 'Product Manager',
      content:
        'Working with Shahriar was a pleasure. He understands requirements quickly and delivers high-quality code on time.',
      rating: 5,
      avatar: 'JS',
    },
    {
      name: 'Mike Johnson',
      role: 'CTO, Digital Agency',
      content:
        'Shahriar is a talented developer who brings creativity and technical skills to every project. Highly recommended!',
      rating: 5,
      avatar: 'MJ',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="testimonials"
      className="relative min-h-screen flex items-center py-12 md:py-16 lg:py-20 pt-20 md:pt-24 lg:pt-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Testimonials
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="p-4 sm:p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 text-cyan-400/20">
                <FaQuoteLeft className="text-3xl sm:text-4xl" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm sm:text-base" />
                ))}
              </div>

              {/* Content */}
              <p className="text-white/80 mb-4 sm:mb-6 leading-relaxed relative z-10 text-sm sm:text-base">
                {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    {testimonial.name}
                  </h4>
                  <p className="text-white/60 text-xs sm:text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
