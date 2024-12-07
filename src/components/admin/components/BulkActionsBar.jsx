import React from 'react';
import { motion } from 'framer-motion';

const BulkActionsBar = ({ selectedCount, onAction }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 rounded-full 
      shadow-lg border border-white/10 px-6 py-3 flex items-center space-x-4"
  >
    <span className="text-white font-medium">{selectedCount} items selected</span>
    <div className="h-4 w-px bg-white/20" />
    <button
      className="text-gray-300 hover:text-white transition-colors"
      onClick={() => onAction('edit')}
    >
      Edit
    </button>
    <button
      className="text-gray-300 hover:text-white transition-colors"
      onClick={() => onAction('archive')}
    >
      Archive
    </button>
    <button
      className="text-red-400 hover:text-red-300 transition-colors"
      onClick={() => onAction('delete')}
    >
      Delete
    </button>
  </motion.div>
);

export default BulkActionsBar; 