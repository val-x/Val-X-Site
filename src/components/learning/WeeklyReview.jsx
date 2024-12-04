import { motion } from 'framer-motion';
import { FiCheckCircle, FiTrendingUp, FiAlertCircle, FiMessageCircle } from 'react-icons/fi';
import PropTypes from 'prop-types';

const WeeklyReview = ({ weekData, feedback }) => {
  return (
    <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-700/50">
      <h2 className="text-2xl font-bold text-white mb-6">Weekly Review</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <FiCheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-sm font-medium text-slate-400">Completed</span>
              </div>
              <div className="text-2xl font-bold text-white">{weekData.completed}%</div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <FiTrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-sm font-medium text-slate-400">Progress</span>
              </div>
              <div className="text-2xl font-bold text-white">+{weekData.progress}%</div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <FiAlertCircle className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-sm font-medium text-slate-400">Focus Areas</span>
              </div>
              <div className="text-2xl font-bold text-white">{weekData.focusAreas}</div>
            </div>
          </div>

          {/* Weekly Achievements */}
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Weekly Achievements</h3>
            <ul className="space-y-3">
              {weekData.achievements.map((achievement, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-300">
                  <FiCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Focus Areas</h3>
            <ul className="space-y-3">
              {weekData.improvements.map((improvement, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-300">
                  <FiAlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mentor Feedback */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Mentor Feedback</h3>
            <div className="space-y-6">
              {feedback.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.mentor.avatar} 
                      alt={item.mentor.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-white">{item.mentor.name}</div>
                      <div className="text-sm text-slate-400">{item.date}</div>
                    </div>
                  </div>
                  <p className="text-slate-300 pl-13">{item.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 
                transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FiMessageCircle className="w-5 h-5" />
              Request Feedback
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

WeeklyReview.propTypes = {
  weekData: PropTypes.shape({
    completed: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    focusAreas: PropTypes.number.isRequired,
    achievements: PropTypes.arrayOf(PropTypes.string).isRequired,
    improvements: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      mentor: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
      }).isRequired,
      date: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired
    })
  ).isRequired
};

export default WeeklyReview; 