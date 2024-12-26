import { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ControlButton = memo(({ 
  onClick, 
  icon: Icon, 
  active = false,
  tooltip = '',
  className = ''
}) => (
  <motion.button
    onClick={onClick}
    className={`p-2 rounded-lg transition-all duration-300 ${
      active 
        ? 'bg-violet-500/20 text-violet-400' 
        : 'text-white/90 hover:bg-white/10'
    } ${className}`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    title={tooltip}
  >
    <Icon className="w-5 h-5" />
  </motion.button>
));

ControlButton.displayName = 'ControlButton';

ControlButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired,
  active: PropTypes.bool,
  tooltip: PropTypes.string,
  className: PropTypes.string
};

export default ControlButton;