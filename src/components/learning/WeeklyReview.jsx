import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiTarget, FiTrendingUp, FiAward } from 'react-icons/fi';

const WeeklyReview = ({ weekData, feedback }) => {
  if (!weekData) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No weekly review data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Completed</p>
              <p className="text-2xl font-semibold text-white">{weekData.completed}%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <FiTarget className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Progress</p>
              <p className="text-2xl font-semibold text-white">+{weekData.progress}%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <FiAward className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Focus Areas</p>
              <p className="text-2xl font-semibold text-white">{weekData.focusAreas}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Achievements */}
      <div className="bg-slate-800/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Achievements</h3>
        <ul className="space-y-2">
          {weekData.achievements?.map((achievement, index) => (
            <li key={index} className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              {achievement}
            </li>
          ))}
        </ul>
      </div>

      {/* Areas for Improvement */}
      <div className="bg-slate-800/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Areas for Improvement</h3>
        <ul className="space-y-2">
          {weekData.improvements?.map((improvement, index) => (
            <li key={index} className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              {improvement}
            </li>
          ))}
        </ul>
      </div>

      {/* Mentor Feedback */}
      {feedback && feedback.length > 0 && (
        <div className="bg-slate-800/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Mentor Feedback</h3>
          <div className="space-y-4">
            {feedback.map((item, index) => (
              <div key={index} className="flex gap-4">
                <img
                  src={item.mentor.avatar}
                  alt={item.mentor.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-white">{item.mentor.name}</p>
                    <span className="text-sm text-slate-400">{item.date}</span>
                  </div>
                  <p className="text-slate-300">{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
  )
};

export default WeeklyReview; 