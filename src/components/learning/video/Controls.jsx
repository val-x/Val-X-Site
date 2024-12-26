import { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiVolume2, FiVolume1, FiVolumeX } from 'react-icons/fi';

const Controls = memo(({
  isPlaying,
  isMuted,
  volume,
  currentTime,
  duration,
  onPlay,
  onSkip,
  onVolumeChange,
  onToggleMute,
  onShowVolumeSlider,
  timeDisplayRef,
  formatTime
}) => {
  return (
    <div className="flex items-center gap-4">
      <ControlButton onClick={onPlay} icon={isPlaying ? FiPause : FiPlay} />
      <ControlButton onClick={() => onSkip(-10)} icon={FiSkipBack} />
      <ControlButton onClick={() => onSkip(10)} icon={FiSkipForward} />
      
      <div className="relative group"
        onMouseEnter={onShowVolumeSlider}
        onMouseLeave={onShowVolumeSlider}
      >
        <ControlButton 
          onClick={onToggleMute}
          icon={volume === 0 || isMuted ? FiVolumeX : volume < 0.5 ? FiVolume1 : FiVolume2}
        />
      </div>

      <div className="text-white/90 text-sm font-medium tracking-wide">
        <span ref={timeDisplayRef}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
});

Controls.displayName = 'Controls';

Controls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onPlay: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  onToggleMute: PropTypes.func.isRequired,
  onShowVolumeSlider: PropTypes.func.isRequired,
  timeDisplayRef: PropTypes.object.isRequired,
  formatTime: PropTypes.func.isRequired
};

export default Controls; 