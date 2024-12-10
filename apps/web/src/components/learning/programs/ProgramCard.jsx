import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProgressBar from '../ProgressBar';

const ProgramCard = ({ 
  program, 
  isEnrolled, 
  onEnroll, 
  onViewCurriculum,
  progress = null 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-gradient-to-b from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold text-white">{program.title}</h3>
          <div className="text-right">
            <span className="text-lg font-bold text-green-400">{program.price}</span>
            {program.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                {program.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <p className="text-gray-400">{program.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-purple-400">Level:</span>
            <span className="text-sm text-gray-100">{program.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-purple-400">Duration:</span>
            <span className="text-sm text-gray-100">{program.duration}</span>
          </div>
          {program.nextStart && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-purple-400">Next Start:</span>
              <span className="text-sm text-gray-100">{program.nextStart}</span>
            </div>
          )}
        </div>

        {isEnrolled && progress !== null && (
          <div className="mt-4">
            <ProgressBar
              progress={progress.completed}
              total={progress.total}
              label="Course Progress"
              variant={progress.completed === progress.total ? 'success' : 'default'}
            />
          </div>
        )}

        {program.topics && (
          <div className="pt-4">
            <h4 className="text-sm font-medium text-purple-400 mb-2">What you'll learn:</h4>
            <ul className="grid grid-cols-2 gap-2">
              {program.topics.map((topic) => (
                <li key={topic} className="text-sm text-gray-100 flex items-center gap-1">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-4 mt-6">
          {isEnrolled ? (
            <Link
              to={`/program/${program.id}/materials`}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
            >
              Continue Learning
            </Link>
          ) : (
            <button 
              onClick={() => onEnroll(program)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              Enroll Now
            </button>
          )}
          {program.curriculum && (
            <button 
              onClick={() => onViewCurriculum(program)}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-300"
            >
              View Curriculum
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

ProgramCard.propTypes = {
  program: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    originalPrice: PropTypes.string,
    nextStart: PropTypes.string,
    topics: PropTypes.arrayOf(PropTypes.string),
    curriculum: PropTypes.bool
  }).isRequired,
  isEnrolled: PropTypes.bool.isRequired,
  onEnroll: PropTypes.func.isRequired,
  onViewCurriculum: PropTypes.func.isRequired,
  progress: PropTypes.shape({
    completed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  })
};

export default ProgramCard; 