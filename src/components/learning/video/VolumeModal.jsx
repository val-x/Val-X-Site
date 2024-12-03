import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiVolume2, FiVolumeX, FiVolume1 } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';

const VolumeModal = ({ 
  position, 
  volume, 
  onVolumeChange 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const sliderRef = useRef(null);
  const tooltipRef = useRef(null);

  const gradientClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500',
    text: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400',
    border: 'border-violet-500/30',
    glow: 'shadow-lg shadow-violet-500/20'
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <FiVolumeX className="w-5 h-5" />;
    if (volume < 0.5) return <FiVolume1 className="w-5 h-5" />;
    return <FiVolume2 className="w-5 h-5" />;
  };

  const handleSliderClick = (e) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      onVolumeChange(Math.max(0, Math.min(1, percentage)));
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      onVolumeChange(Math.max(0, Math.min(1, percentage)));
    }

    // Update tooltip position
    if (tooltipRef.current && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width;
      const clampedPercentage = Math.max(0, Math.min(1, percentage));
      tooltipRef.current.style.left = `${clampedPercentage * 100}%`;
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => {
      setIsDragging(false);
      setShowTooltip(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDragging]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className={`absolute ${position} bg-slate-900/95 backdrop-blur-lg rounded-xl 
        border border-violet-500/20 ${gradientClasses.glow} z-50 p-4 min-w-[200px]
        sm:min-w-[240px] md:min-w-[280px]`}
    >
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-slate-400 hover:text-violet-400 transition-colors p-1"
          onClick={() => onVolumeChange(volume === 0 ? 1 : 0)}
        >
          {getVolumeIcon()}
        </motion.button>

        <div className="flex-1 relative group"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => !isDragging && setShowTooltip(false)}
        >
          <div 
            ref={sliderRef}
            className="relative w-full h-8 flex items-center cursor-pointer"
            onClick={handleSliderClick}
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMouseMove(e);
            }}
            onMouseMove={handleMouseMove}
          >
            <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${gradientClasses.primary}`}
                style={{ width: `${volume * 100}%` }}
                layoutId="volumeTrack"
              />
            </div>

            <motion.div
              className={`absolute h-4 w-4 -ml-2 rounded-full ${gradientClasses.primary} 
                border-2 border-white shadow-lg cursor-grab active:cursor-grabbing
                transition-transform hover:scale-110`}
              style={{ left: `${volume * 100}%` }}
              layoutId="volumeHandle"
            />
          </div>

          {/* Volume Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                ref={tooltipRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute -top-8 -translate-x-1/2 pointer-events-none"
              >
                <div className="bg-slate-900/90 backdrop-blur-sm rounded-md px-2 py-1 
                  border border-violet-500/20">
                  <span className="text-xs font-medium text-white">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`min-w-[48px] text-right text-sm font-medium ${gradientClasses.text}`}>
          {Math.round(volume * 100)}%
        </div>
      </div>
    </motion.div>
  );
};

VolumeModal.propTypes = {
  position: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
  onVolumeChange: PropTypes.func.isRequired
};

export default VolumeModal; 