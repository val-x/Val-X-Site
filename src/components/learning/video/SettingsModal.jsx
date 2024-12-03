import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiX } from 'react-icons/fi';
import { useEffect } from 'react';

const SettingsModal = ({ 
  onClose, 
  position,
  tracks,
  selectedAudio,
  setSelectedAudio,
  selectedSubtitle,
  setSelectedSubtitle,
  playbackSpeed,
  setPlaybackSpeed,
  selectedQuality,
  setSelectedQuality,
  qualityOptions,
  videoRef
}) => {
  const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  const gradientClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500',
    text: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400',
    border: 'border-violet-500/30',
    glow: 'shadow-lg shadow-violet-500/20'
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef?.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`absolute ${position} bg-slate-900/95 backdrop-blur-lg rounded-2xl 
        border border-violet-500/20 ${gradientClasses.glow} overflow-hidden shadow-xl z-50 
        max-h-[80vh] flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-violet-500/20">
        <h3 className={`font-medium ${gradientClasses.text}`}>Settings</h3>
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
      
      <div className="overflow-y-auto custom-scrollbar">
        {/* Audio Tracks */}
        <SettingsSection title="Audio">
          {tracks.audio.map(track => (
            <SettingsButton
              key={track.id}
              onClick={() => setSelectedAudio(track.id)}
              active={selectedAudio === track.id}
              label={track.label}
            />
          ))}
        </SettingsSection>

        {/* Subtitles */}
        <SettingsSection title="Subtitles">
          {tracks.subtitles.map(track => (
            <SettingsButton
              key={track.id}
              onClick={() => setSelectedSubtitle(track.id)}
              active={selectedSubtitle === track.id}
              label={track.label}
            />
          ))}
        </SettingsSection>

        {/* Playback Speed */}
        <SettingsSection title="Playback Speed">
          <div className="grid grid-cols-4 gap-2">
            {speeds.map(speed => (
              <SpeedButton
                key={speed}
                speed={speed}
                active={playbackSpeed === speed}
                onClick={() => handleSpeedChange(speed)}
              />
            ))}
          </div>
        </SettingsSection>

        {/* Quality Settings */}
        <SettingsSection title="Quality" noBorder>
          {qualityOptions.map(quality => (
            <SettingsButton
              key={quality.id}
              onClick={() => setSelectedQuality(quality.id)}
              active={selectedQuality === quality.id}
              label={quality.label}
              subtitle={quality.resolution}
            />
          ))}
        </SettingsSection>
      </div>
    </motion.div>
  );
};

const SettingsSection = ({ title, children, noBorder = false }) => (
  <div className={`p-4 ${!noBorder && 'border-b border-violet-500/20'}`}>
    <h4 className="text-sm text-slate-400 mb-2">{title}</h4>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

const SettingsButton = ({ onClick, active, label, subtitle }) => (
  <motion.button
    onClick={onClick}
    className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-300 ${
      active 
        ? 'bg-violet-500/20 text-violet-400' 
        : 'text-white hover:bg-white/5'
    }`}
    whileHover={{ x: 4 }}
  >
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span>{label}</span>
        {subtitle && (
          <span className="text-xs text-slate-400">{subtitle}</span>
        )}
      </div>
      {active && (
        <motion.div
          layoutId="selectedOption"
          className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
        />
      )}
    </div>
  </motion.button>
);

const SpeedButton = ({ speed, active, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
      active 
        ? 'bg-violet-500/20 text-violet-400' 
        : 'text-white hover:bg-white/5'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {speed}x
  </motion.button>
);

SettingsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  tracks: PropTypes.shape({
    audio: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired
    })).isRequired,
    subtitles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
  selectedAudio: PropTypes.string.isRequired,
  setSelectedAudio: PropTypes.func.isRequired,
  selectedSubtitle: PropTypes.string.isRequired,
  setSelectedSubtitle: PropTypes.func.isRequired,
  playbackSpeed: PropTypes.number.isRequired,
  setPlaybackSpeed: PropTypes.func.isRequired,
  selectedQuality: PropTypes.string.isRequired,
  setSelectedQuality: PropTypes.func.isRequired,
  qualityOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    resolution: PropTypes.string.isRequired
  })).isRequired,
  videoRef: PropTypes.object
};

export default SettingsModal; 