import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiMessageCircle, FiStar } from 'react-icons/fi';

const Testimonials = ({ testimonials }) => {
  return (
    <div className="relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 
          border border-purple-500/20 rounded-full text-purple-400 backdrop-blur-sm">
          Success Stories
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white">
            What Our Students
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
            Say About Us
          </span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Discover how our programs have helped students achieve their career goals and transform their lives.
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative"
          >
            {/* Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 
              border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300
              hover:shadow-lg hover:shadow-purple-500/10">
              
              {/* Quote Icon */}
              <div className="mb-6 relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 
                  flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FiMessageCircle className="w-7 h-7 text-purple-400 group-hover:text-purple-300 
                    transition-colors duration-300" />
                </div>
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                  blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Quote */}
              <blockquote className="mb-6">
                <p className="text-slate-300 leading-relaxed group-hover:text-white 
                  transition-colors duration-300">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-xl object-cover group-hover:scale-110 
                      transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                    blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white group-hover:text-purple-300 
                    transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <div className="text-sm text-slate-400">
                    <p className="group-hover:text-slate-300 transition-colors duration-300">
                      {testimonial.role}
                    </p>
                    <p className="text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-pink-500/5 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      quote: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Testimonials; 