import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiX, FiCommand } from 'react-icons/fi';

const ShortcutsModal = ({ onClose, position }) => {
  const gradientClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500',
    text: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400',
    border: 'border-violet-500/30',
    glow: 'shadow-lg shadow-violet-500/20'
  };

  const shortcuts = [
    { key: 'Space/K', action: 'Play/Pause', category: 'Playback' },
    { key: 'M', action: 'Toggle Mute', category: 'Audio' },
    { key: '↑/↓', action: 'Volume Up/Down', category: 'Audio' },
    { key: '←/→', action: 'Seek ±10s', category: 'Navigation' },
    { key: 'J/L', action: 'Seek ±5s', category: 'Navigation' },
    { key: 'Home/End', action: 'Start/End', category: 'Navigation' },
    { key: ',/.', action: 'Speed ±0.25x', category: 'Playback' },
    { key: 'F', action: 'Fullscreen', category: 'View' },
    { key: 'P', action: 'Picture in Picture', category: 'View' },
    { key: 'C', action: 'Captions', category: 'Subtitles' },
    { key: '[/]', action: 'Previous/Next', category: 'Playlist' },
    { key: 'Esc', action: 'Exit', category: 'View' }
  ];

  const categories = [...new Set(shortcuts.map(s => s.category))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`absolute ${position} bg-slate-900/95 backdrop-blur-lg rounded-2xl 
        border border-violet-500/20 ${gradientClasses.glow} overflow-hidden shadow-xl z-50`}
    >
      <div className="flex items-center justify-between p-4 border-b border-violet-500/20">
        <div className="flex items-center gap-2">
          <FiCommand className="w-5 h-5 text-violet-400" />
          <h3 className={`font-medium ${gradientClasses.text}`}>Keyboard Shortcuts</h3>
        </div>
        <motion.button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 
            transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiX className="w-5 h-5" />
        </motion.button>
      </div>
      <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
        {categories.map(category => (
          <div key={category} className="mb-6 last:mb-0">
            <h4 className="text-sm font-medium text-slate-400 mb-3">{category}</h4>
            <div className="space-y-2">
              {shortcuts
                .filter(s => s.category === category)
                .map(({ key, action }) => (
                  <div key={key} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      {key.split('/').map((k, i) => (
                        <kbd key={i} className="px-2.5 py-1.5 bg-slate-800 rounded-lg text-sm 
                          text-slate-300 border border-violet-500/20 
                          group-hover:border-violet-500/40 transition-colors">
                          {k}
                        </kbd>
                      ))}
                    </div>
                    <span className="text-sm text-slate-400 group-hover:text-violet-400 
                      transition-colors">
                      {action}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-violet-500/20 bg-slate-900/50">
        <p className="text-xs text-slate-400 text-center">
          Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-xs 
          border border-violet-500/20">?</kbd> to toggle shortcuts
        </p>
      </div>
    </motion.div>
  );
};

ShortcutsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired
};

export default ShortcutsModal; 