import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const BackgroundEffects = ({ variant = 'default' }) => {
  const variants = {
    default: {
      elements: [
        { color: 'bg-blue-500/5', position: 'top-0 left-1/4' },
        { color: 'bg-purple-500/5', position: 'bottom-0 right-1/4' }
      ]
    },
    learning: {
      elements: [
        { color: 'bg-blue-500/5', position: 'top-0 left-0' },
        { color: 'bg-purple-500/5', position: 'bottom-0 right-0' },
        { color: 'bg-pink-500/5', position: 'top-1/2 left-1/2' }
      ]
    },
    minimal: {
      elements: [
        { color: 'bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5', position: 'top-0 left-0 right-0' }
      ]
    }
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {currentVariant.elements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.2 }}
          className={`absolute w-[40rem] h-[40rem] ${element.color} rounded-full blur-3xl ${element.position}`}
        />
      ))}
    </div>
  );
};

BackgroundEffects.propTypes = {
  variant: PropTypes.oneOf(['default', 'learning', 'minimal'])
};

export default BackgroundEffects; 