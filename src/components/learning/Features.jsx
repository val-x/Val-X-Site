import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Features = ({ features }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
        >
          <feature.IconComponent className="w-12 h-12 mx-auto text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
          <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
          <p className="text-sm text-slate-300">{feature.description}</p>
        </motion.div>
      ))}
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