import React from 'react';
import { motion } from 'framer-motion';

const UserActivityBreakdown = ({ activities }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {activities.map((activity) => (
      <motion.div
        key={activity.type}
        className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex justify-between items-start mb-2">
          <span className="text-gray-400 text-sm capitalize">{activity.type}</span>
          <span className={`flex items-center text-sm ${
            activity.trend === 'up' ? 'text-green-400' : 'text-red-400'
          }`}>
            {activity.trend === 'up' ? '↑' : '↓'}
          </span>
        </div>
        <p className="text-2xl font-bold text-white">{activity.count}</p>
      </motion.div>
    ))}
  </div>
);

export default UserActivityBreakdown; 