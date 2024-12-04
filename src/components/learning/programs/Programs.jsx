import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import { FiArrowRight, FiClock, FiStar, FiUsers, FiBook, FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { applyFilters } from './FiltersPanel';

const Programs = ({ 
  activeTab, 
  onTabChange, 
  tabContent, 
  onEnroll, 
  onViewCurriculum,
  isEnrolled,
  viewMode,
  searchQuery,
  filters
}) => {
  const navigate = useNavigate();

  // Handle enrollment
  const handleEnroll = (program) => {
    console.log('Enrolling in program:', program.title);
    if (onEnroll) {
      onEnroll(program);
    }
  };

  // Handle continue learning
  const handleContinueLearning = (program) => {
    console.log('Continuing program:', program.title);
    navigate(`/program/${program.id}/materials`, {
      state: {
        program: {
          id: program.id,
          title: program.title,
          level: program.level,
          duration: program.duration,
          curriculum: program.curriculum
        }
      }
    });
  };

  // Handle view details
  const handleViewDetails = (program) => {
    console.log('Viewing details for:', program.title);
    if (onViewCurriculum) {
      onViewCurriculum(program);
    }
  };

  // Get filtered programs using the centralized filter logic
  const filteredPrograms = useMemo(() => {
    const programs = tabContent[activeTab].programs;
    return applyFilters(programs, filters, searchQuery);
  }, [activeTab, tabContent, searchQuery, filters]);

  // Program Card Component
  const ProgramCard = ({ program, isListView }) => {
    const enrolled = isEnrolled ? isEnrolled(program.id) : false;
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`group relative ${
          isListView 
            ? 'flex flex-col md:flex-row gap-6 items-start'
            : 'flex flex-col'
        }`}
      >
        <div className={`flex flex-col ${isListView ? 'flex-1 w-full' : 'h-full'} p-6 sm:p-8 rounded-2xl 
          bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 
          hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10`}>
          
          {/* Program Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className={`px-4 py-1.5 text-sm font-medium rounded-full 
              ${enrolled ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
              {enrolled ? 'Enrolled' : program.level}
            </span>
            {program.featured && (
              <span className="px-4 py-1.5 text-sm font-medium rounded-full 
                bg-purple-500/20 text-purple-400">
                Featured
              </span>
            )}
          </div>

          {/* Title & Description */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-blue-400 
            transition-colors duration-300">
            {program.title}
          </h3>
          <p className="text-base text-slate-400 mb-8 flex-grow group-hover:text-slate-300 
            transition-colors duration-300">
            {program.description}
          </p>

          {/* Program Stats */}
          <div className={`grid grid-cols-2 ${isListView ? 'md:grid-cols-4' : ''} gap-4 md:gap-6 mb-8`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <FiClock className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Duration</p>
                <p className="text-base font-medium text-white">{program.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <FiUsers className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Students</p>
                <p className="text-base font-medium text-white">
                  {program.students ? `${program.students}+ enrolled` : 'Enrolling now'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                <FiBook className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Modules</p>
                <p className="text-base font-medium text-white">
                  {program.curriculum ? program.curriculum.length : 0} total
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <FiStar className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Price</p>
                <p className="text-base font-medium text-white">{program.price}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            {enrolled ? (
              <>
                <button
                  onClick={() => handleContinueLearning(program)}
                  className="flex-1 px-6 py-3 rounded-xl text-base font-medium
                    bg-green-500/20 text-green-400 hover:bg-green-500/30
                    transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Continue Learning
                  <FiArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleViewDetails(program)}
                  className="px-6 py-3 rounded-xl text-base font-medium
                    bg-slate-800 text-white hover:bg-slate-700
                    transition-all duration-300 flex items-center justify-center gap-2"
                >
                  View Progress
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEnroll(program)}
                  className="flex-1 px-6 py-3 rounded-xl text-base font-medium
                    bg-gradient-to-r from-blue-500 to-purple-500 text-white
                    hover:shadow-lg hover:shadow-purple-500/25
                    transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Enroll Now
                  <FiArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleViewDetails(program)}
                  className="px-6 py-3 rounded-xl text-base font-medium
                    bg-slate-800 text-white hover:bg-slate-700
                    transition-all duration-300 flex items-center justify-center gap-2"
                >
                  View Details
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative">
      {/* Programs Grid/List */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
          : 'space-y-6'
      }>
        {filteredPrograms.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            isListView={viewMode === 'list'}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg mb-4">No programs found matching your criteria</p>
          <button
            onClick={() => {
              setFilters({ level: 'all', duration: 'all', featured: false });
            }}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

Programs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  tabContent: PropTypes.object.isRequired,
  onEnroll: PropTypes.func,
  onViewCurriculum: PropTypes.func,
  isEnrolled: PropTypes.func,
  viewMode: PropTypes.oneOf(['grid', 'list']).isRequired,
  searchQuery: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired
};

export default Programs; 