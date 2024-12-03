import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ProgramCard from './ProgramCard';
import { getUserProgress } from '../../utils/enrollment';

const Programs = ({ 
  activeTab, 
  onTabChange, 
  tabContent, 
  onEnroll, 
  onViewCurriculum,
  isEnrolled 
}) => {
  return (
    <div className="relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-400">
          Our Programs
        </span>
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white mb-4">
          Choose Your Learning Path
        </h2>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-12">
        {Object.entries(tabContent).map(([key, content]) => (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === key
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
            }`}
          >
            {content.title}
          </button>
        ))}
      </div>

      {/* Programs Grid */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {tabContent[activeTab].programs.map((program) => {
          const enrolled = isEnrolled(program.id);
          const progress = enrolled ? getUserProgress(program.id) : null;
          
          return (
            <ProgramCard
              key={program.id}
              program={program}
              isEnrolled={enrolled}
              onEnroll={onEnroll}
              onViewCurriculum={onViewCurriculum}
              progress={progress}
            />
          );
        })}
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
    </div>
  );
};

Programs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  tabContent: PropTypes.object.isRequired,
  onEnroll: PropTypes.func.isRequired,
  onViewCurriculum: PropTypes.func.isRequired,
  isEnrolled: PropTypes.func.isRequired
};

export default Programs; 