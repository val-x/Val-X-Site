import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Features = ({ features }) => {
  return (
    <div className="relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 
          border border-blue-500/20 rounded-full text-blue-400 backdrop-blur-sm">
          Why Choose Us
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Features that Set Us
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Apart from Others
          </span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Experience a revolutionary learning platform designed to accelerate your growth and transform your skills.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative p-8 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 
              border border-slate-700/50 hover:border-slate-600 transition-all duration-300
              hover:shadow-lg hover:shadow-blue-500/10"
          >
            {/* Icon Background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-500/5 to-purple-500/5 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className="mb-6 relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                  flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.IconComponent className="w-7 h-7 text-blue-400 group-hover:text-blue-300 
                    transition-colors duration-300" />
                </div>
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                  blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 
                transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 
                transition-colors duration-300">
                {feature.description}
              </p>

              {/* Learn More Link */}
              <div className="mt-6 inline-flex items-center gap-2 text-blue-400 
                group-hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                <span className="text-sm font-medium">Learn More</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
              <div className="absolute top-0 right-0 w-[140%] h-[140%] bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                -rotate-45 transform origin-top-right scale-0 group-hover:scale-100 transition-transform duration-300" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

Features.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      IconComponent: PropTypes.elementType.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Features; 