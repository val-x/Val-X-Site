import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const ContentTab = ({ 
  contentItems, 
  setShowAddContentModal, 
  itemVariants 
}) => {
  // Add state for filtering and sorting
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'title', 'type'
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Filter and sort content items
  const filteredAndSortedItems = useCallback(() => {
    return contentItems
      .filter(item => {
        const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
        const matchesType = selectedType === 'all' || item.type === selectedType;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesType && matchesSearch;
      })
      .sort((a, b) => {
        const order = sortOrder === 'asc' ? 1 : -1;
        switch (sortBy) {
          case 'title':
            return order * a.title.localeCompare(b.title);
          case 'type':
            return order * a.type.localeCompare(b.type);
          default: // date
            return order * (new Date(b.updatedAt) - new Date(a.updatedAt));
        }
      });
  }, [contentItems, selectedStatus, selectedType, searchQuery, sortBy, sortOrder]);

  // Handle bulk actions
  const handleBulkAction = (action) => {
    switch (action) {
      case 'publish':
        toast.success(`Published ${selectedItems.length} items`);
        break;
      case 'archive':
        toast.success(`Archived ${selectedItems.length} items`);
        break;
      case 'delete':
        toast.success(`Deleted ${selectedItems.length} items`);
        break;
      default:
        break;
    }
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Content Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddContentModal(true)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
            to-fuchsia-500 text-white font-medium"
        >
          New Content
        </motion.button>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg bg-white/5 border border-white/10 
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
            focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="all">All Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
          <option value="Review">Review</option>
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
            focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="all">All Types</option>
          <option value="Documentation">Documentation</option>
          <option value="Page">Page</option>
          <option value="Blog">Blog</option>
        </select>

        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [newSortBy, newSortOrder] = e.target.value.split('-');
            setSortBy(newSortBy);
            setSortOrder(newSortOrder);
          }}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
            focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="type-asc">Type A-Z</option>
          <option value="type-desc">Type Z-A</option>
        </select>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAndSortedItems().map((item) => (
          <motion.div
            key={item.id}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
            whileHover={{ scale: 1.02 }}
            variants={itemVariants}
          >
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={(e) => {
                  const newSelection = e.target.checked
                    ? [...selectedItems, item.id]
                    : selectedItems.filter(id => id !== item.id);
                  setSelectedItems(newSelection);
                  setShowBulkActions(newSelection.length > 0);
                }}
                className="mt-1 rounded bg-white/5 border-white/10 text-violet-500 
                  focus:ring-violet-500 focus:ring-offset-0"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Published' ? 'bg-green-500/20 text-green-300' :
                    item.status === 'Draft' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{item.type}</p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 
                    hover:bg-white/10 transition-colors text-sm">
                    Edit
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 
                    hover:bg-white/10 transition-colors text-sm">
                    Preview
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-white/5 text-red-400 
                    hover:bg-white/10 transition-colors text-sm ml-auto">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {showBulkActions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 
              rounded-full shadow-lg border border-white/10 px-6 py-3 flex items-center space-x-4"
          >
            <span className="text-white font-medium">{selectedItems.length} items selected</span>
            <div className="h-4 w-px bg-white/20" />
            <button
              onClick={() => handleBulkAction('publish')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Publish
            </button>
            <button
              onClick={() => handleBulkAction('archive')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Archive
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContentTab; 