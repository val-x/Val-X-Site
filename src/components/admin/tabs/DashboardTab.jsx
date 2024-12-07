import React from 'react';
import { motion } from 'framer-motion';
import { Chart } from 'react-chartjs-2';
import { ActivityLineChart, UserActivityBreakdown, AnalyticsChart, SystemHealthIndicator, PerformanceMetrics } from '../charts';

const DashboardTab = ({ 
  userActivities, 
  userEngagementData, 
  userMetrics, 
  stats, 
  systemHealth, 
  recentActivity,
  analytics,
  itemVariants,
  containerVariants 
}) => {
  return (
    <>
      <UserActivityBreakdown activities={userActivities} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Activity Timeline */}
        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Activity Timeline</h3>
          <ActivityLineChart data={userEngagementData} />
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
          <PerformanceMetrics metrics={userMetrics} />
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.label}</h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <span className={`flex items-center text-sm ${
                stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
                <svg
                  className={`w-4 h-4 ml-1 ${stat.trend === 'down' && 'transform rotate-180'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Analytics and System Health */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Weekly Analytics</h3>
          <AnalyticsChart data={analytics.weeklyStats} />
          <div className="mt-4 space-y-2">
            {analytics.topPages.map((page) => (
              <div key={page.path} className="flex justify-between items-center">
                <span className="text-gray-400">{page.path}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300">{page.views.toLocaleString()} views</span>
                  <span className="text-green-400">{page.change}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(systemHealth).map(([key, value]) => (
              <SystemHealthIndicator
                key={key}
                type={key}
                value={value.usage}
                status={value.status}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mt-6"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 
                transition-colors"
              whileHover={{ scale: 1.01 }}
            >
              <div>
                <p className="text-white font-medium">{activity.user}</p>
                <p className="text-gray-400 text-sm">{activity.action}</p>
              </div>
              <span className="text-gray-400 text-sm">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default DashboardTab; 