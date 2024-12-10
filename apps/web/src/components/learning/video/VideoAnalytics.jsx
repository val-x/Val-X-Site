import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { formatTime } from '../../../utils/dateUtils';

const VideoAnalytics = ({
  showSettings,
  analytics,
  networkStats,
  playbackStats,
  chapters,
  currentTime,
  duration,
  currentChapter,
  onChapterClick,
  gradientClasses
}) => {
  return (
    <>
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute bottom-24 right-4 p-4 bg-slate-900/90 backdrop-blur-sm
            rounded-2xl border border-violet-500/20 shadow-xl shadow-violet-500/20
            w-80 max-h-[calc(100vh-200px)] overflow-y-auto"
        >
          <div className="space-y-6">
            {/* Network Stats */}
            <StatsSection title="Network">
              <StatItem 
                label="Connection" 
                value={networkStats.effectiveType?.toUpperCase() || 'Unknown'} 
              />
              <StatItem 
                label="Bandwidth" 
                value={`${networkStats.downlink?.toFixed(1) || 0} Mbps`} 
              />
              <StatItem 
                label="Latency" 
                value={`${networkStats.rtt || 0}ms`} 
              />
            </StatsSection>

            {/* Playback Stats */}
            <StatsSection title="Playback">
              <StatItem 
                label="Total Time" 
                value={formatTime(analytics.totalPlayTime)} 
              />
              <StatItem 
                label="Avg Speed" 
                value={`${analytics.averagePlaybackSpeed.toFixed(1)}x`} 
              />
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

            {/* Chapter Progress */}
            {currentChapter && (
              <StatsSection title="Current Chapter">
                <div className="text-sm text-white">
                  {currentChapter.title}
                </div>
                <div className="mt-1 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${gradientClasses.primary}`}
                    style={{ 
                      width: `${((currentTime - currentChapter.time) / 
                        (duration - currentChapter.time)) * 100}%` 
                    }}
                  />
                </div>
              </StatsSection>
            )}
          </div>
        </motion.div>
      )}
    </>
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

VideoAnalytics.propTypes = {
  showSettings: PropTypes.bool.isRequired,
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
  chapters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired
  })).isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  currentChapter: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired
  }),
  onChapterClick: PropTypes.func.isRequired,
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

export default VideoAnalytics; 