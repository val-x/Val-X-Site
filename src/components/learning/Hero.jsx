import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

const Hero = ({ 
  badge = "Transform Your Future",
  title = "Learn and Grow with Us",
  description = "Comprehensive learning programs to help you succeed in tech and business.",
  videoUrl = "#"
}) => {
  return (
    <div className="relative">
      {/* Main Content */}
      <div className="relative z-10">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 
            border border-blue-500/20 rounded-full text-blue-400 backdrop-blur-sm"
        >
          {badge}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Master the Skills of
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Tomorrow, Today
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl 
              font-medium text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300
              flex items-center gap-2"
          >
            Get Started
            <FiArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm rounded-xl font-medium text-white 
              hover:bg-slate-800 transition-all duration-300 border border-slate-700/50
              flex items-center gap-2"
            onClick={() => window.open(videoUrl, '_blank')}
          >
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <FiPlay className="w-4 h-4 text-blue-400" />
            </div>
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "10K+", label: "Active Learners" },
            { number: "95%", label: "Success Rate" },
            { number: "200+", label: "Expert Mentors" },
            { number: "50+", label: "Premium Courses" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 
                text-transparent bg-clip-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
      </div>
    </div>
  );
};

Hero.propTypes = {
  badge: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  videoUrl: PropTypes.string
};

export default Hero; 