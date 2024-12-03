import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const CurriculumModal = ({ program, onClose }) => {
  if (!program) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{program.title}</h3>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  {program.duration}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  {program.level}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Curriculum Content */}
          <div className="space-y-6">
            {program.curriculum?.map((week) => (
              <div
                key={week.week}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center font-semibold">
                    {week.week}
                  </span>
                  <h4 className="text-lg font-semibold text-white">{week.title}</h4>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {week.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-slate-300">
                      <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-white font-semibold border border-slate-700 hover:bg-slate-800 transition-all duration-300"
            >
              Close
            </button>
            <button
              className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              Enroll Now
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

CurriculumModal.propTypes = {
  program: PropTypes.shape({
    title: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    curriculum: PropTypes.arrayOf(
      PropTypes.shape({
        week: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        topics: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ).isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default CurriculumModal; 