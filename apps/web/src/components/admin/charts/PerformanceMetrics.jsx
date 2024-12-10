import React from 'react';
import { motion } from 'framer-motion';

const PerformanceMetrics = ({ metrics }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {Object.entries(metrics).map(([key, value]) => {
      if (key === 'userEngagement') return null;
      
      return (
        <motion.div
          key={key}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          whileHover={{ scale: 1.02 }}
        >
          <h4 className="text-gray-400 text-sm capitalize mb-4">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </h4>
          <div className="space-y-2">
            {Object.entries(value).map(([subKey, subValue]) => {
              const displayValue = typeof subValue === 'object' 
                ? JSON.stringify(subValue) 
                : subValue.toString();

              return (
                <div key={subKey} className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm capitalize">
                    {subKey.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-white font-medium">{displayValue}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      );
    })}
  </div>
);

export default PerformanceMetrics; 