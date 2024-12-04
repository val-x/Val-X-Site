import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';

const CurriculumModal = ({ program, onClose }) => {
  if (!program || !program.curriculum) {
    return null;
  }

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
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
      </div>

      {/* Curriculum Content */}
      <div className="space-y-6">
        {program.curriculum.map((week, index) => (
          <div
            key={week.week || index}
            className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center font-semibold">
                {week.week || index + 1}
              </span>
              <h4 className="text-lg font-semibold text-white">{week.title}</h4>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {week.topics && week.topics.map((topic, topicIndex) => (
                <li key={topicIndex} className="flex items-start gap-2 text-slate-300">
                  <FiCheck className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
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
      </div>
    </div>
  );
};

CurriculumModal.propTypes = {
  program: PropTypes.shape({
    title: PropTypes.string,
    duration: PropTypes.string,
    level: PropTypes.string,
    curriculum: PropTypes.arrayOf(
      PropTypes.shape({
        week: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        title: PropTypes.string,
        topics: PropTypes.arrayOf(PropTypes.string)
      })
    )
  }),
  onClose: PropTypes.func.isRequired
};

export default CurriculumModal; 