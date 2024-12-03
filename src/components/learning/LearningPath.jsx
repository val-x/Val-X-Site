import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const LearningPath = ({ steps }) => {
  return (
    <div className="mt-32 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-purple-400">
          Your Learning Path
        </span>
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white mb-4">
          Your Journey to Success
        </h2>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto">
          Follow our comprehensive roadmap to transform from a beginner to a successful startup founder
        </p>
      </motion.div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 transform -translate-y-1/2 hidden md:block" />

        {/* Roadmap Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                <div className={`w-12 h-12 ${step.bgColor} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <span className="text-xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{step.description}</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {step.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2">
                      <span className={`w-1 h-1 ${step.dotColor} rounded-full`}></span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

LearningPath.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      topics: PropTypes.arrayOf(PropTypes.string).isRequired,
      bgColor: PropTypes.string.isRequired,
      dotColor: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LearningPath; 