import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';

const QualitySelector = ({
  qualities,
  selectedQuality,
  onQualityChange,
  position,
  gradientClasses
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className={`absolute ${position} bg-slate-900/95 backdrop-blur-lg rounded-xl 
        border border-violet-500/20 ${gradientClasses.glow} overflow-hidden z-50`}
    >
      <div className="p-4 border-b border-violet-500/20">
        <h3 className={`font-medium ${gradientClasses.text}`}>Video Quality</h3>
      </div>
      <div className="p-2">
        {qualities.map((quality) => (
          <motion.button
            key={quality.id}
            onClick={() => onQualityChange(quality.id)}
            className={`w-full px-4 py-2 flex items-center justify-between rounded-lg
              ${selectedQuality === quality.id 
                ? 'bg-violet-500/20 text-violet-400' 
                : 'text-white hover:bg-white/5'
              } transition-colors`}
            whileHover={{ x: 4 }}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{quality.label}</span>
              <span className="text-xs text-slate-400">{quality.resolution}</span>
            </div>
            {selectedQuality === quality.id && (
              <FiCheck className="w-5 h-5" />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

QualitySelector.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    resolution: PropTypes.string.isRequired
  })).isRequired,
  selectedQuality: PropTypes.string.isRequired,
  onQualityChange: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  gradientClasses: PropTypes.object.isRequired
};

export default QualitySelector; 