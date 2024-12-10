import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiArrowRight } from 'react-icons/fi';

const LearningPath = ({ steps }) => {
  return (
    <div className="relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 
          border border-purple-500/20 rounded-full text-purple-400 backdrop-blur-sm">
          Your Learning Journey
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white">
            Clear Path to
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
            Professional Growth
          </span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Follow our structured learning path designed to take you from beginner to expert with clear milestones and achievements.
        </p>
      </motion.div>

      {/* Steps Timeline */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/20 via-pink-500/20 to-red-500/20 
          hidden lg:block" />

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col lg:flex-row gap-8 items-center ${
                index % 2 === 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 
                    border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300
                    hover:shadow-lg hover:shadow-purple-500/10 relative group"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 
                    flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 
                      transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 mb-6 group-hover:text-slate-300 transition-colors duration-300">
                      {step.description}
                    </p>

                    {/* Topics */}
                    <div className="space-y-3">
                      {step.topics.map((topic, topicIndex) => (
                        <div
                          key={topicIndex}
                          className="flex items-center gap-3 text-slate-300 group-hover:text-slate-200 
                            transition-colors duration-300"
                        >
                          <div className={`w-2 h-2 rounded-full ${step.dotColor}`} />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>

                    {/* Learn More Link */}
                    <div className="mt-6 inline-flex items-center gap-2 text-purple-400 
                      group-hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                      <span className="text-sm font-medium">Explore Step</span>
                      <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Background Gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-pink-500/5 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>

              {/* Timeline Connector for Desktop */}
              <div className="hidden lg:flex items-center justify-center w-32">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                  shadow-lg shadow-purple-500/50" />
              </div>

              {/* Image/Icon Section */}
              <div className="flex-1">
                <div className={`w-full aspect-video rounded-2xl ${step.bgColor} p-8 
                  flex items-center justify-center relative group overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <step.IconComponent className="w-20 h-20 text-white opacity-75 
                    group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
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
      IconComponent: PropTypes.elementType.isRequired,
    })
  ).isRequired,
};

export default LearningPath; 