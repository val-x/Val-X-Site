import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiPlay } from 'react-icons/fi';
import { formatTime } from '../../../utils/video';

const ChapterController = ({
  chapters,
  currentChapter,
  currentTime,
  duration,
  onChapterClick,
  showControls,
  isMobile = false,
  isTablet = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredChapter, setHoveredChapter] = useState(null);

  const getChapterProgress = (chapter, nextChapter) => {
    const chapterStart = chapter.time;
    const chapterEnd = nextChapter ? nextChapter.time : duration;
    const chapterDuration = chapterEnd - chapterStart;
    const chapterProgress = currentTime - chapterStart;
    return Math.max(0, Math.min(100, (chapterProgress / chapterDuration) * 100));
  };

  return (
    <AnimatePresence>
      {showControls && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`${
            isMobile || isTablet 
              ? 'w-full' 
              : 'w-full max-w-[400px] mx-auto'
          } z-20`}
        >
          <div className="relative">
            {/* Current Chapter Display */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-3 bg-slate-900/80 backdrop-blur-sm 
                border border-violet-500/20 shadow-lg shadow-violet-500/10
                hover:shadow-violet-500/20 hover:border-violet-500/30 transition-all duration-300
                group ${
                  isMobile 
                    ? 'rounded-xl px-3 py-2' 
                    : isTablet
                    ? 'rounded-xl px-3.5 py-2.5'
                    : 'rounded-2xl px-4 py-3'
                } w-full`}
            >
              {/* Chapter Progress */}
              <div className={`relative ${isMobile ? 'w-1 h-10' : 'w-1.5 h-12'}`}>
                <div className="absolute inset-0 flex flex-col">
                  {chapters.map((chapter, index) => {
                    const nextChapter = chapters[index + 1];
                    const progress = getChapterProgress(chapter, nextChapter);
                    const isCurrent = currentChapter?.id === chapter.id;
                    const isPast = currentTime >= (nextChapter?.time || duration);
                    
                    return (
                      <div 
                        key={chapter.id}
                        className="flex-1 relative"
                        style={{ opacity: isCurrent ? 1 : isPast ? 0.7 : 0.3 }}
                      >
                        <div className="absolute inset-0 bg-slate-700/50 rounded-full" />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 
                            to-fuchsia-500 rounded-full origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: progress / 100 }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col items-start min-w-0 flex-1">
                <span className={`font-medium text-slate-400 ${
                  isMobile ? 'text-[10px]' : isTablet ? 'text-xs' : 'text-sm'
                }`}>
                  Chapter {currentChapter?.id || 1} of {chapters.length}
                </span>
                <h3 className={`font-medium bg-gradient-to-r from-cyan-400 via-violet-400 
                  to-fuchsia-400 bg-clip-text text-transparent group-hover:from-cyan-300 
                  group-hover:via-violet-300 group-hover:to-fuchsia-300 transition-all duration-300
                  truncate w-full ${
                    isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-base'
                  }`}>
                  {currentChapter?.title || 'Introduction'}
                </h3>
              </div>

              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="ml-2 flex-shrink-0"
              >
                <FiChevronDown className={`text-slate-400 group-hover:text-white transition-colors
                  ${isMobile ? 'w-3.5 h-3.5' : isTablet ? 'w-4 h-4' : 'w-5 h-5'}`} />
              </motion.div>
            </motion.button>

            {/* Chapters List */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className={`absolute ${
                    isMobile 
                      ? 'top-full left-0 right-0 mt-2 max-h-[50vh]'
                      : isTablet
                      ? 'top-full left-0 right-0 mt-2 max-h-[60vh]'
                      : 'top-full left-0 right-0 mt-3 max-h-[400px]'
                  } bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-violet-500/20 
                    shadow-xl shadow-violet-500/10 overflow-hidden`}
                >
                  <div className="overflow-y-auto custom-scrollbar">
                    {chapters.map((chapter, index) => {
                      const nextChapter = chapters[index + 1];
                      const progress = getChapterProgress(chapter, nextChapter);
                      const isHovered = hoveredChapter?.id === chapter.id;
                      
                      return (
                        <motion.button
                          key={chapter.id}
                          onClick={() => {
                            onChapterClick(chapter);
                            setIsExpanded(false);
                          }}
                          onMouseEnter={() => setHoveredChapter(chapter)}
                          onMouseLeave={() => setHoveredChapter(null)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`w-full flex items-center gap-3 ${
                            isMobile ? 'p-2.5' : isTablet ? 'p-3' : 'p-4'
                          } hover:bg-white/5 transition-colors relative group ${
                            currentChapter?.id === chapter.id ? 'bg-violet-500/10' : ''
                          }`}
                        >
                          {/* Chapter Number with Progress Ring */}
                          <div className="relative flex-shrink-0">
                            <div className={`rounded-lg flex items-center justify-center 
                              text-xs font-medium ${
                              isMobile ? 'w-5 h-5' : 'w-6 h-6'
                            } ${
                              currentChapter?.id === chapter.id 
                                ? 'bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 text-white' 
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {chapter.id}
                            </div>
                            <svg className="absolute -inset-0.5 rotate-90" viewBox="0 0 32 32">
                              <circle
                                cx="16"
                                cy="16"
                                r="14"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                className="text-slate-700/30"
                              />
                              <motion.circle
                                cx="16"
                                cy="16"
                                r="14"
                                stroke="url(#progress-gradient)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray={88}
                                initial={{ strokeDashoffset: 88 }}
                                animate={{ 
                                  strokeDashoffset: 88 - (88 * progress / 100) 
                                }}
                                className="drop-shadow-glow"
                              />
                            </svg>
                          </div>

                          {/* Chapter Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-medium truncate ${
                              currentChapter?.id === chapter.id 
                                ? 'bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent' 
                                : 'text-slate-300'
                            } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              {chapter.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className="text-[10px] text-slate-400 flex-shrink-0">
                                {formatTime(chapter.time)}
                              </span>
                            </div>
                          </div>

                          {/* Play Icon on Hover */}
                          <AnimatePresence>
                            {!isMobile && isHovered && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="absolute right-3 text-white"
                              >
                                <FiPlay className="w-4 h-4" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress Gradient Definition */}
          <svg width="0" height="0">
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChapterController; 