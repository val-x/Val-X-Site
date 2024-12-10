import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { formatTime } from '../../../utils/video';

const ChapterMarkers = ({ chapters, duration }) => {
  return (
    <>
      {chapters.map((chapter, index) => (
        <div
          key={chapter.time}
          className="absolute top-1/2 -translate-y-1/2 group/marker"
          style={{ 
            left: `${(chapter.time / duration) * 100}%`,
            zIndex: 20
          }}
        >
          {/* Marker Line Container */}
          <div className="relative">
            {/* Glow Base */}
            <div className="absolute -translate-x-1/2 w-1 h-8 md:h-10
              bg-gradient-to-b from-violet-500/20 to-transparent blur-sm
              group-hover/marker:from-violet-400/30 group-hover/marker:blur-md
              transition-all duration-300" />

            {/* Main Marker Line */}
            <div className="absolute -translate-x-1/2 w-0.5 h-8 md:h-10
              bg-gradient-to-b from-cyan-500 via-violet-500 to-transparent
              group-hover/marker:from-cyan-400 group-hover/marker:via-violet-400
              transition-all duration-300">
              {/* Animated Pulse Effect */}
              <div className="absolute inset-0 animate-pulse
                bg-gradient-to-b from-white/20 to-transparent" />
            </div>

            {/* Marker Dot Container */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 w-4 h-4 rounded-full
                bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20
                blur-md group-hover/marker:blur-lg group-hover/marker:scale-150
                transition-all duration-300" />

              {/* Main Dot */}
              <div className="relative w-3 h-3 rounded-full
                bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500
                border border-white/30 shadow-lg shadow-violet-500/30
                group-hover/marker:scale-125 group-hover/marker:shadow-violet-500/50
                group-hover/marker:border-white/50
                transition-all duration-300">
                {/* Inner Glow */}
                <div className="absolute inset-[2px] rounded-full
                  bg-gradient-to-r from-cyan-200/10 via-violet-200/10 to-fuchsia-200/10
                  group-hover/marker:from-cyan-200/20 group-hover/marker:via-violet-200/20 
                  group-hover/marker:to-fuchsia-200/20
                  transition-all duration-300" />
              </div>
            </div>

            {/* Chapter Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3
              opacity-0 group-hover/marker:opacity-100 transition-all duration-300
              pointer-events-none transform group-hover/marker:-translate-y-1"
            >
              <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-lg
                border border-violet-500/20 shadow-xl shadow-violet-500/20
                p-3 whitespace-nowrap"
              >
                {/* Chapter Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2
                  px-2 py-0.5 rounded-full text-xs font-medium
                  bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500
                  text-white border border-white/20 shadow-lg shadow-violet-500/20">
                  Chapter {index + 1}
                </div>

                {/* Chapter Title */}
                <div className="text-sm font-medium bg-gradient-to-r from-cyan-200 via-violet-200 to-fuchsia-200
                  bg-clip-text text-transparent mb-1">
                  {chapter.title}
                </div>
                
                {/* Chapter Time */}
                <div className="text-xs text-slate-300 opacity-80">
                  {formatTime(chapter.time)}
                </div>

                {/* Tooltip Arrow */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2
                  w-3 h-3 bg-slate-900/90 border-r border-b border-violet-500/20
                  transform rotate-45" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

ChapterMarkers.propTypes = {
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  duration: PropTypes.number.isRequired
};

export default ChapterMarkers; 