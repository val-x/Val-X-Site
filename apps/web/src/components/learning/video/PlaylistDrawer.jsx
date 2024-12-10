import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlay, FiPause, FiClock } from 'react-icons/fi';
import { formatTime } from '../../../utils/video';

const PlaylistDrawer = ({
  playlist,
  currentIndex,
  onNavigate,
  isFullscreenMode,
  showPlaylist,
  setShowPlaylist,
  title,
  isMobile,
  currentTime,
  duration,
  isPlaying
}) => {
  const handleClose = () => {
    setShowPlaylist(false);
  };

  return (
    <AnimatePresence>
      {showPlaylist && (
        <motion.div
          initial={isMobile ? { y: '100%' } : { x: '100%' }}
          animate={isMobile ? { y: 0 } : { x: 0 }}
          exit={isMobile ? { y: '100%' } : { x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`${
            isMobile 
              ? 'fixed bottom-0 left-0 right-0 h-[70vh] rounded-t-3xl' 
              : 'w-[400px] min-w-[400px]'
          } bg-slate-900/95 backdrop-blur-xl border-l border-violet-500/20 flex flex-col z-30`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-violet-500/20">
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 via-violet-400 
                to-fuchsia-400 bg-clip-text text-transparent">
                Playlist
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentIndex + 1} / {playlist.length} videos
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="p-2 rounded-xl bg-slate-800/50 border border-violet-500/20 
                hover:border-violet-500/40 transition-colors"
            >
              <FiX className="w-5 h-5 text-slate-400" />
            </motion.button>
          </div>

          {/* Playlist Items */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {playlist.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`w-full p-4 flex gap-4 group relative ${
                  currentIndex === index 
                    ? 'bg-violet-500/10 hover:bg-violet-500/20' 
                    : 'hover:bg-white/5'
                } transition-colors duration-300`}
              >
                {/* Thumbnail */}
                <div className="relative w-32 aspect-video rounded-xl overflow-hidden 
                  bg-slate-800 border border-violet-500/20">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {currentIndex === index && (
                    <div className="absolute inset-0 flex items-center justify-center 
                      bg-black/50 backdrop-blur-sm">
                      {isPlaying ? (
                        <FiPause className="w-6 h-6 text-white" />
                      ) : (
                        <FiPlay className="w-6 h-6 text-white" />
                      )}
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md 
                    bg-black/70 backdrop-blur-sm text-[10px] font-medium text-slate-300">
                    {formatTime(item.duration)}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col items-start text-left">
                  <h4 className={`font-medium truncate w-full ${
                    currentIndex === index 
                      ? 'bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent' 
                      : 'text-slate-300'
                  }`}>
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  {currentIndex === index && (
                    <div className="mt-2 w-full bg-slate-800/50 rounded-full h-1">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Playing Indicator */}
                {currentIndex === index && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 
                    bg-gradient-to-b from-cyan-500 via-violet-500 to-fuchsia-500 rounded-r-full" 
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-violet-500/20 bg-slate-900/50">
            <div className="text-xs text-slate-400">
              Total Duration: {formatTime(playlist.reduce((acc, item) => acc + item.duration, 0))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlaylistDrawer; 