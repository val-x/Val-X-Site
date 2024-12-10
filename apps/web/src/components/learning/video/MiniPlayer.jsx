import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiX } from 'react-icons/fi';
import { formatTime } from '../../../utils/video';

const MiniPlayer = ({
  videoRef,
  videoUrl,
  title,
  isMiniPlayer,
  miniPlayerRef,
  onClose,
  showPreview,
  previewImage,
  previewTime,
  previewPosition,
  duration
}) => {
  // Preview Player
  if (showPreview && previewImage) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute w-64 md:w-80"
        style={{
          left: `${previewPosition.x}px`,
          transform: 'translateX(-50%)',
          bottom: '100%',
          marginBottom: '16px',
          zIndex: 50
        }}
      >
        {/* Preview Container */}
        <div className="relative">
          {/* Preview Thumbnail */}
          <div className="relative rounded-xl overflow-hidden bg-slate-900/90 backdrop-blur-sm 
            border border-violet-500/20 shadow-xl shadow-violet-500/20">
            <div className="aspect-video relative">
              <img 
                src={previewImage} 
                alt="Preview"
                className="w-full h-full object-cover"
              />
              
              {/* Time Indicator */}
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg 
                bg-black/70 backdrop-blur-sm text-xs font-medium text-white">
                {formatTime(previewTime)}
              </div>

              {/* Progress Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500"
                  style={{ width: `${(previewTime / duration) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Arrow Indicator */}
          <div className="absolute left-1/2 bottom-0 w-4 h-4 -mb-2
            transform -translate-x-1/2 rotate-45
            bg-slate-900/90 backdrop-blur-sm
            border-r border-b border-violet-500/20" />
        </div>
      </motion.div>
    );
  }

  // Regular Mini Player
  if (!isMiniPlayer) return null;

  return (
    <motion.div
      ref={miniPlayerRef}
      drag
      dragConstraints={{
        left: 0,
        top: 0,
        right: window.innerWidth - 320,
        bottom: window.innerHeight - 180
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-4 right-4 w-80 rounded-2xl overflow-hidden 
        bg-slate-900 shadow-xl border border-violet-500/20 z-50"
    >
      <video
        ref={videoRef}
        className="w-full aspect-video object-cover"
        src={videoUrl}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h4 className="text-sm font-medium text-white truncate">{title}</h4>
      </div>
      <motion.button
        onClick={onClose}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white 
          hover:bg-black/70 transition-colors border border-white/10 backdrop-blur-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiX className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};

MiniPlayer.propTypes = {
  videoRef: PropTypes.object.isRequired,
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isMiniPlayer: PropTypes.bool.isRequired,
  miniPlayerRef: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  showPreview: PropTypes.bool,
  previewImage: PropTypes.string,
  previewTime: PropTypes.number,
  previewPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  duration: PropTypes.number
};

export default MiniPlayer; 