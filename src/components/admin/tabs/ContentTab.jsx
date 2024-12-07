import React from 'react';
import { motion } from 'framer-motion';

const ContentTab = ({ 
  contentItems, 
  setShowAddContentModal, 
  itemVariants 
}) => {
  return (
    <motion.div 
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
      variants={itemVariants}
    >
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contentItems.map((item) => (
          <motion.div
            key={item.id}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
            whileHover={{ scale: 1.02 }}
          >
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
              <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 
                transition-colors text-sm">
                Edit
              </button>
              <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 
                transition-colors text-sm">
                Preview
              </button>
              <button className="px-3 py-1 rounded-lg bg-white/5 text-red-400 hover:bg-white/10 
                transition-colors text-sm ml-auto">
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ContentTab; 