import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Hero = ({ 
  badge = "Transform Your Future",
  title = "Learn and Grow with Us",
  description = "Comprehensive learning programs to help you succeed in tech and business."
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center relative"
    >
      <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-400">
        {badge}
      </span>
      <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white mb-6">
        {title}
      </h1>
      <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
};

Hero.propTypes = {
  badge: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Hero; 