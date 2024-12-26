import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const FloatingProgress = ({ progress, currentDay, onResume }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-8 left-8 bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 
        border border-slate-700/50 shadow-xl hidden md:block"
    >
      <div className="flex items-center gap-6">
        <div>
          <p className="text-sm text-slate-400 mb-1">Current Progress</p>
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-slate-800 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center 
                justify-center relative">
                <svg className="w-full h-full absolute" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#progress-gradient)"
                    strokeWidth="2"
                    strokeDasharray={`${progress}, 100`}
                  />
                </svg>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 
                  bg-clip-text text-transparent">
                  {progress}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white">{currentDay?.title}</p>
              <p className="text-xs text-slate-400">{currentDay?.duration}</p>
            </div>
          </div>
        </div>
        <div className="h-12 w-px bg-gradient-to-b from-blue-500/20 via-purple-500/20 
          to-transparent" />
        <div>
          <button
            onClick={onResume}
            className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
              rounded-lg text-white text-sm font-medium hover:from-blue-500/30 
              hover:to-purple-500/30 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
            Continue Learning
          </button>
        </div>
      </div>

      {/* Progress Gradient Definition */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

FloatingProgress.propTypes = {
  progress: PropTypes.number.isRequired,
  currentDay: PropTypes.shape({
    title: PropTypes.string,
    duration: PropTypes.string
  }),
  onResume: PropTypes.func.isRequired
};

export default FloatingProgress; 