import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiPlay, FiClock } from 'react-icons/fi';
import { formatTime } from '../../../utils/dateUtils';

const PlaylistDrawer = ({
  playlist,
  currentIndex,
  onNavigate,
  isFullscreenMode,
  showPlaylist,
  title
}) => {
  const gradientClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500',
    text: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400',
    border: 'border-violet-500/30',
    glow: 'shadow-lg shadow-violet-500/20'
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ 
        width: showPlaylist ? (isFullscreenMode ? 400 : 320) : 0,
        opacity: showPlaylist ? 1 : 0
      }}
      transition={{ type: "spring", bounce: 0.2 }}
      className="h-full overflow-hidden"
    >
      <div className={`h-full bg-slate-900/90 backdrop-blur-lg border-l border-violet-500/20`}>
        <div className="p-4 border-b border-violet-500/20">
          <h3 className={`text-lg font-semibold ${gradientClasses.text}`}>
            {title}
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            {currentIndex + 1} of {playlist.length} videos
          </p>
        </div>
        <div className="overflow-y-auto custom-scrollbar h-[calc(100%-5rem)]">
          {playlist.map((item, index) => (
            <PlaylistItem
              key={item.id}
              item={item}
              index={index}
              currentIndex={currentIndex}
              onClick={() => onNavigate(index)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const PlaylistItem = ({ item, index, currentIndex, onClick }) => {
  const isActive = index === currentIndex;

  return (
    <motion.button
      onClick={onClick}
      className={`w-full p-4 flex items-start gap-3 hover:bg-slate-800/50 
        transition-all duration-300 group ${
        isActive ? 'bg-violet-500/10 border-l-2 border-violet-500' : ''
      }`}
      whileHover={{ x: 4 }}
    >
      <div className="relative flex-shrink-0 w-24 aspect-video bg-slate-800 
        rounded-lg overflow-hidden border border-violet-500/20 group-hover:border-violet-500/40 
        transition-colors"
      >
        {item.thumbnail ? (
          <img 
            src={item.thumbnail} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300
              group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 
            group-hover:text-violet-400 transition-colors">
            <FiPlay className="w-6 h-6" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />
        <div className="absolute bottom-1 right-1 bg-black/80 rounded-md px-1.5 py-0.5 
          text-[10px] font-medium text-slate-300 flex items-center gap-1 backdrop-blur-sm">
          <FiClock className="w-3 h-3" />
          {formatTime(item.duration)}
        </div>
      </div>
      <div className="flex-1 text-left min-w-0">
        <h4 className={`font-medium truncate ${
          isActive ? 'text-violet-400' : 'text-white group-hover:text-violet-400'
        } transition-colors`}>
          {item.title}
        </h4>
        {item.description && (
          <p className="text-sm text-slate-400 mt-1 line-clamp-2 group-hover:text-slate-300
            transition-colors">
            {item.description}
          </p>
        )}
      </div>
    </motion.button>
  );
};

PlaylistDrawer.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    description: PropTypes.string
  })).isRequired,
  currentIndex: PropTypes.number.isRequired,
  onNavigate: PropTypes.func.isRequired,
  isFullscreenMode: PropTypes.bool.isRequired,
  showPlaylist: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

PlaylistItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PlaylistDrawer; 