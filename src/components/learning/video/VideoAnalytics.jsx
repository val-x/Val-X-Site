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
      {/* Chapter Markers */}
      <div className="absolute bottom-20 left-0 right-0 px-6">
        <div className="relative h-1 bg-slate-700/50 rounded-full">
          {chapters.map((chapter) => (
            <motion.button
              key={chapter.id}
              className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full 
                ${currentChapter?.id === chapter.id ? 'bg-violet-400' : 'bg-slate-400'}`}
              style={{ left: `${(chapter.time / duration) * 100}%` }}
              whileHover={{ scale: 1.5 }}
              onClick={() => onChapterClick(chapter)}
            >
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 
                  group-hover:opacity-100 pointer-events-none whitespace-nowrap"
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg px-2 py-1 
                  border border-violet-500/20">
                  <div className="text-xs font-medium text-white">
                    {chapter.title}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {formatTime(chapter.time)}
                  </div>
                </div>
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Analytics Panel */}
      {showSettings && (
        <div className="absolute top-20 right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg 
          border border-violet-500/20 p-4 space-y-2 text-sm w-72">
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
        </div>
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