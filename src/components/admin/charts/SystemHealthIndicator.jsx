import React from 'react';
import { motion } from 'framer-motion';

const SystemHealthIndicator = ({ type, value, status }) => (
  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
    <div className="flex justify-between items-center mb-2">
      <span className="text-gray-400">{type}</span>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        status === 'normal' ? 'bg-green-500/20 text-green-300' :
        status === 'warning' ? 'bg-yellow-500/20 text-yellow-300' :
        'bg-red-500/20 text-red-300'
      }`}>
        {status}
      </span>
    </div>
    <div className="relative pt-1">
      <div className="overflow-hidden h-2 text-xs flex rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
            status === 'normal' ? 'bg-green-500' :
            status === 'warning' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}
        />
      </div>
      <span className="text-sm text-gray-300 mt-1 block">{value}%</span>
    </div>
  </div>
);

export default SystemHealthIndicator; 