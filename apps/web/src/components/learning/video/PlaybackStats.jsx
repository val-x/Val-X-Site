import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { formatTime } from '../../../utils/dateUtils';

const PlaybackStats = ({
  show,
  analytics,
  networkStats,
  playbackStats,
  gradientClasses
}) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute top-20 right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg 
        border border-violet-500/20 p-4 space-y-2 text-sm w-72"
    >
      <div className="flex items-center justify-between">
        <h4 className={`font-medium ${gradientClasses.text}`}>Analytics</h4>
        <div className="text-xs text-slate-400">
          Session: {formatTime((Date.now() - analytics.startTime) / 1000)}
        </div>
      </div>

      <div className="space-y-3">
        {/* Playback Stats */}
        <StatsSection title="Playback">
          <StatItem label="Play Count" value={analytics.playCount} />
          <StatItem label="Pause Count" value={analytics.pauseCount} />
          <StatItem 
            label="Watch Time" 
            value={formatTime(analytics.totalPlayTime)} 
          />
          <StatItem 
            label="Average Speed" 
            value={`${analytics.averagePlaybackSpeed.toFixed(2)}x`} 
          />
        </StatsSection>

        {/* Network Stats */}
        <StatsSection title="Network">
          <StatItem 
            label="Connection" 
            value={networkStats.effectiveType.toUpperCase()} 
          />
          <StatItem 
            label="Bandwidth" 
            value={`${networkStats.downlink.toFixed(1)} Mbps`} 
          />
          <StatItem label="Latency" value={`${networkStats.rtt}ms`} />
        </StatsSection>

        {/* Buffer Stats */}
        <StatsSection title="Buffer">
          <StatItem 
            label="Events" 
            value={playbackStats.bufferingEvents} 
          />
          <StatItem 
            label="Quality Changes" 
            value={playbackStats.qualityChanges} 
          />
        </StatsSection>
      </div>
    </motion.div>
  );
};

const StatsSection = ({ title, children }) => (
  <div className="space-y-1">
    <h5 className="text-xs font-medium text-slate-400">{title}</h5>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

const StatItem = ({ label, value }) => (
  <div className="flex items-center justify-between text-xs">
    <span className="text-slate-400">{label}</span>
    <span className="text-white font-medium">{value}</span>
  </div>
);

PlaybackStats.propTypes = {
  show: PropTypes.bool.isRequired,
  analytics: PropTypes.shape({
    startTime: PropTypes.number.isRequired,
    playCount: PropTypes.number.isRequired,
    pauseCount: PropTypes.number.isRequired,
    totalPlayTime: PropTypes.number.isRequired,
    averagePlaybackSpeed: PropTypes.number.isRequired
  }).isRequired,
  networkStats: PropTypes.shape({
    effectiveType: PropTypes.string.isRequired,
    downlink: PropTypes.number.isRequired,
    rtt: PropTypes.number.isRequired
  }).isRequired,
  playbackStats: PropTypes.shape({
    bufferingEvents: PropTypes.number.isRequired,
    qualityChanges: PropTypes.number.isRequired
  }).isRequired,
  gradientClasses: PropTypes.object.isRequired
};

StatsSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

StatItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

export default PlaybackStats; 