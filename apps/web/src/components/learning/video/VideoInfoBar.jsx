import { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';
import { formatTime } from '../../../utils/video';
import { motion, AnimatePresence } from 'framer-motion';
import ChapterController from './ChapterController';

const VideoInfoBar = ({
  title,
  currentTime = 0,
  duration = 0,
  networkStats = {
    effectiveType: '4g',
    downlink: 0,
    rtt: 0
  },
  selectedQuality = 'auto',
  currentChapter,
  chapters,
  isWatchLater = false,
  onWatchLater,
  showControls = true,
  onChapterClick,
  isMobile = false
}) => {
  // Add responsive breakpoints state
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AnimatePresence>
      {showControls && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`absolute ${
            screenSize.isMobile 
              ? 'top-2 left-2 right-2 flex-col gap-2' 
              : screenSize.isTablet
              ? 'top-3 left-3 right-3 flex-row items-start gap-3'
              : 'top-4 inset-x-0 max-w-[1200px] mx-auto px-4 flex-row items-center'
          } flex justify-between z-20`}
        >
          {/* Left Side - Title */}
          <motion.div 
            className={`flex items-center bg-slate-900/80 backdrop-blur-sm rounded-2xl 
              border border-violet-500/20 shadow-lg shadow-violet-500/10
              hover:shadow-violet-500/20 hover:border-violet-500/30 transition-all duration-300
              ${screenSize.isMobile 
                ? 'flex-1 px-3 py-2' 
                : screenSize.isTablet
                ? 'px-3.5 py-2.5'
                : 'px-4 py-2.5 max-w-[300px]'
              }`}
          >
            <div className={`flex flex-col ${
              screenSize.isMobile 
                ? 'w-full' 
                : screenSize.isTablet
                ? 'max-w-[200px]'
                : 'max-w-[300px]'
            }`}>
              <h2 className={`font-medium bg-gradient-to-r from-cyan-400 via-violet-400 
                to-fuchsia-400 bg-clip-text text-transparent truncate
                ${screenSize.isMobile 
                  ? 'text-xs' 
                  : screenSize.isTablet
                  ? 'text-sm'
                  : 'text-sm'
                }`}>
                {title || 'Untitled'}
              </h2>
              <span className="text-[10px] text-slate-400 font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </motion.div>

          {/* Center - Chapter Controller */}
          <div className={`${
            screenSize.isMobile 
              ? 'w-full' 
              : screenSize.isTablet
              ? 'flex-1 mx-4'
              : 'w-[500px] mx-4'
          }`}>
            <ChapterController
              chapters={chapters}
              currentChapter={currentChapter}
              currentTime={currentTime}
              duration={duration}
              onChapterClick={onChapterClick}
              showControls={showControls}
              isMobile={screenSize.isMobile}
              isTablet={screenSize.isTablet}
            />
          </div>

          {/* Right Side - Stats and Watch Later */}
          <motion.div className="flex items-center gap-2">
            {/* Stats Container */}
            {!screenSize.isMobile && (
              <div className={`flex items-center bg-slate-900/80 backdrop-blur-sm rounded-2xl 
                border border-violet-500/20 shadow-lg shadow-violet-500/10
                hover:shadow-violet-500/20 hover:border-violet-500/30 transition-all duration-300
                ${screenSize.isTablet ? 'px-3 py-2' : 'px-4 py-2.5'} gap-2`}
              >
                {/* Network Quality Indicator */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className={`w-2 h-2 rounded-full ${
                      networkStats?.effectiveType === '4g' && networkStats?.downlink > 5 ? 'bg-green-400' :
                      networkStats?.effectiveType === '4g' || networkStats?.downlink > 2 ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`} />
                    <div className={`absolute inset-0 rounded-full animate-ping ${
                      networkStats?.effectiveType === '4g' && networkStats?.downlink > 5 ? 'bg-green-400/40' :
                      networkStats?.effectiveType === '4g' || networkStats?.downlink > 2 ? 'bg-yellow-400/40' :
                      'bg-red-400/40'
                    }`} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-medium bg-gradient-to-r from-cyan-400 via-violet-400 
                      to-fuchsia-400 bg-clip-text text-transparent
                      ${screenSize.isTablet ? 'text-xs' : 'text-sm'}`}>
                      {selectedQuality === 'auto' ? 'AUTO' : selectedQuality}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {networkStats?.downlink?.toFixed(1) || '0.0'} Mbps
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Watch Later Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onWatchLater}
              className={`${
                screenSize.isMobile 
                  ? 'p-1.5' 
                  : screenSize.isTablet
                  ? 'p-2'
                  : 'p-2.5'
              } rounded-xl bg-slate-900/80 backdrop-blur-sm border 
                transition-all duration-300 shadow-lg ${
                isWatchLater 
                  ? 'border-violet-500/40 text-violet-400 shadow-violet-500/20' 
                  : 'border-violet-500/20 text-white/90 hover:border-violet-500/40 shadow-violet-500/10'
              }`}
            >
              <FiClock className={`${
                screenSize.isMobile 
                  ? 'w-4 h-4' 
                  : screenSize.isTablet
                  ? 'w-4 h-4'
                  : 'w-5 h-5'
              }`} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoInfoBar; 