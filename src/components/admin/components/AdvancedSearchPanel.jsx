import React from 'react';
import { motion } from 'framer-motion';

const AdvancedSearchPanel = ({ fields, onClose, onApply }) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 'auto', opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/10"
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {fields.map((field) => (
        <div key={field.id}>
          <label className="block text-gray-400 text-sm mb-2">{field.label}</label>
          {field.type === 'select' ? (
            <select
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {field.options.map((option) => (
                <option key={option} value={option.toLowerCase()}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder={`Search by ${field.label.toLowerCase()}...`}
            />
          )}
        </div>
      ))}
    </div>
    <div className="flex justify-end mt-4 space-x-3">
      <button
        onClick={onClose}
        className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
      >
        Clear
      </button>
      <button
        onClick={onApply}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
          to-fuchsia-500 text-white font-medium"
      >
        Apply Filters
      </button>
    </div>
  </motion.div>
);

export default AdvancedSearchPanel; 