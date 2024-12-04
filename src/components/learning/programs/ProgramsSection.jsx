import { motion, AnimatePresence } from 'framer-motion';
import Programs from './Programs';
import ProgramsHeader from './ProgramsHeader';
import SearchControls from './SearchControls';
import FiltersPanel from './FiltersPanel';
import { tabContent } from '../../../data/programs';

const ProgramsSection = ({ 
  searchQuery, 
  setSearchQuery, 
  viewMode, 
  setViewMode, 
  showFilters, 
  setShowFilters,
  isMobile,
  filters,
  setFilters,
  activeTab,
  setActiveTab,
  onEnroll,
  onViewCurriculum,
  checkEnrollment
}) => {
  // Program Category Tabs
  const renderProgramTabs = () => (
    <div className="relative mb-8">
      <div className="flex flex-nowrap sm:flex-wrap gap-2 justify-start sm:justify-center 
        overflow-x-auto sm:overflow-x-visible scrollbar-thin scrollbar-thumb-slate-700 
        scrollbar-track-slate-800/50 pb-2 sm:pb-0 -mx-4 sm:mx-0 px-4 sm:px-0">
        {Object.keys(tabContent).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-xl font-medium 
              transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
          >
            {tabContent[tab].title}
          </motion.button>
        ))}
      </div>
      {/* Fade edges on mobile */}
      <div className="absolute left-0 top-0 bottom-2 w-4 bg-gradient-to-r from-slate-950 
        to-transparent sm:hidden" />
      <div className="absolute right-0 top-0 bottom-2 w-4 bg-gradient-to-l from-slate-950 
        to-transparent sm:hidden" />
    </div>
  );

  return (
    <section id="programs" className="relative py-8 sm:py-12 lg:py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-[20%] w-[500px] h-[500px] bg-gradient-to-r 
          from-blue-500/10 via-violet-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[10%] w-[400px] h-[400px] bg-gradient-to-r 
          from-purple-500/10 via-violet-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Programs Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 lg:mb-12">
        <ProgramsHeader />
        
        {/* Program Category Tabs */}
        {renderProgramTabs()}

        {/* Search and Controls */}
        <SearchControls 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          isMobile={isMobile}
        />
      </div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative space-y-6">
          {/* Filters Panel with Animation */}
          <AnimatePresence mode="wait">
            {showFilters && (
              <FiltersPanel 
                filters={filters}
                setFilters={setFilters}
              />
            )}
          </AnimatePresence>

          {/* Programs List/Grid */}
          <Programs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabContent={tabContent}
            onEnroll={onEnroll}
            onViewCurriculum={onViewCurriculum}
            isEnrolled={checkEnrollment}
            viewMode={isMobile ? 'list' : viewMode}
            searchQuery={searchQuery}
            filters={filters}
          />
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection; 