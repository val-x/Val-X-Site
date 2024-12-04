import { motion } from 'framer-motion';
import { FiSearch, FiGrid, FiList, FiFilter } from 'react-icons/fi';

const ViewToggleButton = ({ icon: Icon, isActive, onClick, label }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative p-2 rounded-lg transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-purple-500/20 text-white'
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
    aria-label={label}
  >
    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 
      ${isActive ? 'scale-110' : ''}`} />
    {isActive && (
      <>
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 
          via-violet-500/10 to-purple-500/10 blur-md" />
        <motion.div
          layoutId="viewModeGlow"
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 
            via-violet-500/20 to-purple-500/20 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.3 }}
        />
      </>
    )}
  </motion.button>
);

const SearchControls = ({ 
  searchQuery, 
  setSearchQuery, 
  viewMode, 
  setViewMode, 
  showFilters, 
  setShowFilters,
  isMobile 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 
        p-4 sm:p-6 shadow-lg group"
    >
      {/* Container glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-violet-500/5 
        to-purple-500/5 rounded-2xl group-hover:opacity-100 transition-opacity duration-500 opacity-50" />

      <div className="relative grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-4">
        {/* Search Input */}
        <div className="relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 
            transition-colors duration-300 group-hover:text-blue-400" />
          <input
            type="text"
            placeholder="Search programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl
              focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 
              transition-all duration-300 text-white placeholder-slate-400
              hover:border-slate-600/50 hover:bg-slate-900/70"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-violet-500/20 
            to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
        </div>

        {/* View Controls */}
        <div className="flex gap-3">
          {/* View Toggle - Hidden on mobile */}
          {!isMobile && (
            <div className="hidden sm:flex bg-slate-900/50 backdrop-blur-sm rounded-xl p-1.5 
              border border-slate-700/30 shadow-lg group">
              {/* Container glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 via-violet-500/5 
                to-purple-500/5 group-hover:opacity-100 transition-opacity duration-300 opacity-0" />
              
              {/* Grid View Button */}
              <ViewToggleButton
                icon={FiGrid}
                isActive={viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
                label="Grid view"
              />

              {/* List View Button */}
              <ViewToggleButton
                icon={FiList}
                isActive={viewMode === 'list'}
                onClick={() => setViewMode('list')}
                label="List view"
              />
            </div>
          )}

          {/* Filter Button */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 
              flex items-center gap-2 text-sm sm:text-base group overflow-hidden
              ${showFilters 
                ? 'bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-purple-500/20 text-white border border-blue-400/30' 
                : 'bg-slate-900/50 text-slate-300 hover:text-white border border-slate-700/30 hover:border-slate-600/50'
              }`}
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 
              to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Icon with animation */}
            <FiFilter className={`w-4 h-4 transition-all duration-300 
              ${showFilters ? 'rotate-180 scale-110' : 'group-hover:rotate-12'}`} />
            
            {/* Text with gradient */}
            <span className={`hidden sm:block transition-all duration-300 ${
              showFilters 
                ? 'bg-gradient-to-r from-blue-100 via-violet-100 to-purple-100 bg-clip-text text-transparent' 
                : ''
            }`}>
              Filters
              {showFilters && (
                <motion.div
                  layoutId="filterUnderline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </span>

            {/* Active state effects */}
            {showFilters && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 
                  to-purple-500/10 blur-md" />
                <motion.div
                  layoutId="filterGlow"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-violet-500/20 
                    to-purple-500/20 blur-xl opacity-70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 0.3 }}
                />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchControls; 