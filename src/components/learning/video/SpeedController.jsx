import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiCheck, FiClock } from 'react-icons/fi';

const SpeedController = ({
  speeds,
  currentSpeed,
  onSpeedChange,
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
        <div className="flex items-center gap-2">
          <FiClock className="w-5 h-5 text-violet-400" />
          <h3 className={`font-medium ${gradientClasses.text}`}>Playback Speed</h3>
        </div>
      </div>
      <div className="p-2 grid grid-cols-3 gap-2">
        {speeds.map((speed) => (
          <motion.button
            key={speed}
            onClick={() => onSpeedChange(speed)}
            className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 
              ${currentSpeed === speed 
                ? 'bg-violet-500/20 text-violet-400' 
                : 'text-white hover:bg-white/5'
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {speed}x
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

SpeedController.propTypes = {
  speeds: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentSpeed: PropTypes.number.isRequired,
  onSpeedChange: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  gradientClasses: PropTypes.object.isRequired
};

export default SpeedController; 