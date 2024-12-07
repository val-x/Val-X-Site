import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchInput, AdvancedSearchPanel, BulkActionsBar } from '../components';

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
        </div>
        <SearchInput onSearch={onSearch} isSearching={isSearching} />
      </div>

      <AnimatePresence>
        {showAdvancedSearch && (
          <AdvancedSearchPanel
            fields={advancedSearchFields}
            onClose={() => setShowAdvancedSearch(false)}
            onApply={() => {
              // Handle apply filters
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