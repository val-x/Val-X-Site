import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchInput, AdvancedSearchPanel, BulkActionsBar } from '../components';
import { toast } from 'react-hot-toast';

const UsersTab = ({
  selectedView,
  setSelectedView,
  showAdvancedSearch,
  setShowAdvancedSearch,
  showBulkActions,
  renderUsersTable,
  renderUsersGrid,
  onSearch,
  isSearching,
  selectedCount,
  onBulkAction,
  advancedSearchFields
}) => {
  // Add state for view preferences
  const [showViewOptions, setShowViewOptions] = useState(false);
  const [columnPreferences, setColumnPreferences] = useState({
    name: true,
    email: true,
    role: true,
    status: true,
    lastActive: false,
    joinDate: false
  });

  // Add state for quick filters
  const [quickFilters, setQuickFilters] = useState({
    active: false,
    inactive: false,
    admin: false,
    recent: false
  });

  // Add keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + F to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        document.querySelector('input[type="search"]')?.focus();
      }
      // Ctrl/Cmd + Shift + F to toggle advanced search
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        setShowAdvancedSearch(prev => !prev);
      }
      // Ctrl/Cmd + G to toggle view
      if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        setSelectedView(prev => prev === 'grid' ? 'table' : 'grid');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [setShowAdvancedSearch, setSelectedView]);

  // Handle quick filter changes
  const handleQuickFilterChange = (filter) => {
    setQuickFilters(prev => {
      const newFilters = { ...prev, [filter]: !prev[filter] };
      // Apply filters to search/data
      applyQuickFilters(newFilters);
      return newFilters;
    });
  };

  // Apply quick filters
  const applyQuickFilters = useCallback((filters) => {
    const activeFilters = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (activeFilters.length > 0) {
      toast.success(`Applied filters: ${activeFilters.join(', ')}`);
    }
  }, []);

  // Handle column preference changes
  const handleColumnPreferenceChange = (column) => {
    setColumnPreferences(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  // View options panel
  const ViewOptionsPanel = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute right-0 top-12 w-64 bg-gray-900 rounded-xl border border-white/10 
        shadow-xl p-4 z-10"
    >
      <h3 className="text-white font-medium mb-3">View Options</h3>
      <div className="space-y-2">
        {Object.entries(columnPreferences).map(([column, isVisible]) => (
          <label key={column} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isVisible}
              onChange={() => handleColumnPreferenceChange(column)}
              className="rounded bg-white/5 border-white/10 text-violet-500 
                focus:ring-violet-500 focus:ring-offset-0"
            />
            <span className="text-gray-300 capitalize">
              {column.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          </label>
        ))}
      </div>
    </motion.div>
  );

  // Quick filters section
  const QuickFilters = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.entries(quickFilters).map(([filter, isActive]) => (
        <button
          key={filter}
          onClick={() => handleQuickFilterChange(filter)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            isActive
              ? 'bg-violet-500/20 text-violet-300'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedView('grid')}
            className={`p-2 rounded-lg transition-colors ${
              selectedView === 'grid'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" 
              />
            </svg>
          </button>
          <button
            onClick={() => setSelectedView('table')}
            className={`p-2 rounded-lg transition-colors ${
              selectedView === 'table'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
              />
            </svg>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowViewOptions(!showViewOptions)}
              className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" 
                />
              </svg>
            </button>
            <AnimatePresence>
              {showViewOptions && <ViewOptionsPanel />}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAdvancedSearch(prev => !prev)}
            className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            <span className="text-sm">Advanced Search</span>
          </button>
          <SearchInput onSearch={onSearch} isSearching={isSearching} />
        </div>
      </div>

      <QuickFilters />

      <AnimatePresence>
        {showAdvancedSearch && (
          <AdvancedSearchPanel
            fields={advancedSearchFields}
            onClose={() => setShowAdvancedSearch(false)}
            onApply={() => {
              // Handle apply filters
              toast.success('Applied advanced filters');
            }}
          />
        )}
      </AnimatePresence>

      {selectedView === 'table' ? renderUsersTable() : renderUsersGrid()}

      <AnimatePresence>
        {showBulkActions && (
          <BulkActionsBar
            selectedCount={selectedCount}
            onAction={onBulkAction}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default UsersTab; 