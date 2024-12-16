import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { DashboardTab, UsersTab, ContentTab, SettingsTab } from '../components/admin/tabs';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AddContentModal = ({ onClose }) => {
  const [documentType, setDocumentType] = useState('Documentation');
  const [content, setContent] = useState('');

  const handleTypeChange = (type) => {
    setDocumentType(type);
    setContent(DOCUMENT_TEMPLATES[type]?.defaultContent || '');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full mx-4"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">Create New Content</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Document Type</label>
            <select
              value={documentType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
            >
              {Object.values(DOCUMENT_TYPES).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Content</label>
            <div className="grid grid-cols-2 gap-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-sm"
              />
              <div className="bg-white/5 rounded-lg p-4 prose prose-invert max-w-none">
                {/* Add markdown preview here if needed */}
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex space-x-2">
              {DOCUMENT_TEMPLATES[documentType]?.sections.map(section => (
                <button
                  key={section}
                  type="button"
                  onClick={() => setContent(prev => `${prev}\n\n## ${section}`)}
                  className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 text-sm"
                >
                  + {section}
                </button>
              ))}
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
                  to-fuchsia-500 text-white"
              >
                Create Content
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [dateRange, setDateRange] = useState('week');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedExportFormat, setSelectedExportFormat] = useState('csv');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedView, setSelectedView] = useState('grid');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const searchDebounceRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', trend: 'up' },
    { label: 'Active Sessions', value: '456', change: '+5%', trend: 'up' },
    { label: 'Revenue', value: '$12,345', change: '+8%', trend: 'up' },
    { label: 'Conversion Rate', value: '2.4%', change: '-1%', trend: 'down' },
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Created new account', time: '2 minutes ago' },
    { user: 'Jane Smith', action: 'Purchased Premium Plan', time: '15 minutes ago' },
    { user: 'Mike Johnson', action: 'Updated profile', time: '1 hour ago' },
    { user: 'Sarah Wilson', action: 'Submitted support ticket', time: '2 hours ago' },
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor', status: 'Active' },
  ];

  const contentItems = [
    { id: 1, title: 'Sample Business Proposal', type: 'Business Proposal', status: 'Draft', content: '# Executive Summary\n\nThis is a sample business proposal...' },
    { id: 2, title: 'Developer Offer Letter', type: 'Offer Letter', status: 'Published', content: '# Offer Letter\n\nWe are pleased to offer you...' },
    { id: 3, title: 'Q4 Services Invoice', type: 'Invoice', status: 'Published', content: '# Invoice\n\n## Bill To\nAcme Corp...' },
    { id: 4, title: 'Contract Termination Notice', type: 'Termination Letter', status: 'Draft', content: '# Termination Letter\n\nThis letter serves to notify...' },
    { id: 5, title: 'Getting Started Guide', type: 'Documentation', status: 'Published' },
    { id: 6, title: 'Product Features', type: 'Page', status: 'Draft' },
    { id: 7, title: 'API Documentation', type: 'Documentation', status: 'Published' },
    { id: 8, title: 'Release Notes', type: 'Blog', status: 'Review' },
  ];

  const settings = [
    { category: 'General', items: ['Site Settings', 'Branding', 'SEO'] },
    { category: 'Security', items: ['Authentication', 'API Keys', 'Permissions'] },
    { category: 'Email', items: ['SMTP Settings', 'Templates', 'Notifications'] },
    { category: 'Integration', items: ['Payment Gateway', 'Social Media', 'Analytics'] },
  ];

  const notifications = [
    { id: 1, type: 'alert', message: 'System update scheduled for tonight', time: '1 hour ago' },
    { id: 2, type: 'warning', message: 'High server load detected', time: '2 hours ago' },
    { id: 3, type: 'success', message: 'Backup completed successfully', time: '3 hours ago' },
  ];

  const analytics = {
    weeklyStats: [
      { day: 'Mon', value: 45 },
      { day: 'Tue', value: 52 },
      { day: 'Wed', value: 49 },
      { day: 'Thu', value: 63 },
      { day: 'Fri', value: 58 },
      { day: 'Sat', value: 48 },
      { day: 'Sun', value: 42 },
    ],
    topPages: [
      { path: '/home', views: 12453, change: '+15%' },
      { path: '/products', views: 8234, change: '+8%' },
      { path: '/blog', views: 6423, change: '+12%' },
    ]
  };

  const userMetrics = {
    activeUsers: {
      current: '234',
      previous: '198',
      change: '+18%'
    },
    newSignups: {
      today: '45',
      weekly: '312',
      monthly: '1,234'
    }
  };

  const userEngagementData = [
    { time: '00:00', value: 30 },
    { time: '04:00', value: 25 },
    { time: '08:00', value: 65 },
    { time: '12:00', value: 85 },
    { time: '16:00', value: 70 },
    { time: '20:00', value: 45 }
  ];

  const systemHealth = {
    cpu: { usage: 42, status: 'normal' },
    memory: { usage: 68, status: 'warning' },
    storage: { usage: 35, status: 'normal' },
    network: { latency: 45, status: 'normal' }
  };

  const userActivities = [
    { type: 'login', count: 245, trend: 'up' },
    { type: 'signup', count: 32, trend: 'up' },
    { type: 'purchase', count: 18, trend: 'down' },
    { type: 'support', count: 12, trend: 'up' }
  ];

  const advancedSearchFields = [
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'email', label: 'Email', type: 'text' },
    { id: 'role', label: 'Role', type: 'select', options: ['All', 'Admin', 'Editor', 'User'] },
    { id: 'status', label: 'Status', type: 'select', options: ['All', 'Active', 'Inactive'] },
    { id: 'dateJoined', label: 'Date Joined', type: 'date' }
  ];

  const totalPages = Math.ceil(users.length / pageSize);
  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSearch = useCallback((query) => {
    setIsSearching(true);
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      const results = users.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.role.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  }, [users]);

  const NotificationsPanel = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 top-12 w-80 bg-gray-900 rounded-xl border border-white/10 shadow-xl"
    >
      <div className="p-4 border-b border-white/10">
        <h3 className="text-white font-semibold">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 border-b border-white/10 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <span className={`p-1 rounded-full ${
                notification.type === 'alert' ? 'bg-red-500/20 text-red-400' :
                notification.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {notification.type === 'alert' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                    />
                  ) : notification.type === 'warning' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  )}
                </svg>
              </span>
              <div>
                <p className="text-sm text-white">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-white/10">
        <button className="w-full text-center text-sm text-violet-400 hover:text-violet-300 transition-colors">
          View All Notifications
        </button>
      </div>
    </motion.div>
  );

  const UserDetailsModal = ({ user }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full mx-4"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">User Details</h2>
          <button
            onClick={() => setShowUserDetails(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Name</label>
              <p className="text-white">{user.name}</p>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <p className="text-white">{user.email}</p>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Role</label>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.role === 'Admin' ? 'bg-violet-500/20 text-violet-300' :
                user.role === 'Editor' ? 'bg-cyan-500/20 text-cyan-300' :
                'bg-gray-500/20 text-gray-300'
              }`}>
                {user.role}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Status</label>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {user.status}
              </span>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Last Active</label>
              <p className="text-white">2 hours ago</p>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Member Since</label>
              <p className="text-white">Jan 15, 2024</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Activity Overview</h3>
          <div className="h-48 bg-white/5 rounded-lg p-4">
            {/* Add activity chart here */}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
            onClick={() => setShowUserDetails(false)}
          >
            Close
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
              to-fuchsia-500 text-white font-medium"
          >
            Edit User
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  const NotificationBell = () => (
    <motion.div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
      >
        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
          />
        </svg>
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </motion.button>
      <AnimatePresence>
        {showNotifications && <NotificationsPanel />}
      </AnimatePresence>
    </motion.div>
  );

  const AnalyticsChart = () => (
    <div className="h-48 flex items-end justify-between space-x-2">
      {analytics.weeklyStats.map((stat) => (
        <div key={stat.day} className="flex flex-col items-center">
          <div 
            className="w-8 bg-gradient-to-t from-violet-500/20 to-cyan-500/20 rounded-t"
            style={{ height: `${stat.value}%` }}
          ></div>
          <span className="text-xs text-gray-400 mt-2">{stat.day}</span>
        </div>
      ))}
    </div>
  );

  const AddUserModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Add New User</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Role</label>
            <select
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="user">User</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() => setShowAddUserModal(false)}
              className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
                to-fuchsia-500 text-white font-medium"
            >
              Add User
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  const TabButton = ({ tab, label }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        activeTab === tab
          ? 'bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 text-white'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </motion.button>
  );

  const DeleteConfirmationModal = ({ user, onConfirm, onCancel }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Delete User</h3>
          <p className="text-gray-400 mb-6">
            Are you sure you want to delete {user.name}? This action cannot be undone.
          </p>
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCancel}
              className="px-6 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onConfirm}
              className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Delete
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const FilterPanel = () => (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
              focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Role</label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
              focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="user">User</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
              focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
              to-fuchsia-500 text-white font-medium hover:opacity-90 transition-opacity"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </motion.div>
  );

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

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const exportFormats = [
    { value: 'csv', label: 'CSV', icon: '📄' },
    { value: 'pdf', label: 'PDF', icon: '📑' },
    { value: 'excel', label: 'Excel', icon: '📊' },
    { value: 'json', label: 'JSON', icon: '{ }' }
  ];

  const ExportModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Export Data</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Time Range</label>
            <div className="grid grid-cols-2 gap-2">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setSelectedTimeRange(range.value)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    selectedTimeRange === range.value
                      ? 'bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Export Format</label>
            <div className="grid grid-cols-2 gap-2">
              {exportFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => setSelectedExportFormat(format.value)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                    selectedExportFormat === format.value
                      ? 'bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <span>{format.icon}</span>
                  <span>{format.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={() => setShowExportModal(false)}
              className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
                to-fuchsia-500 text-white font-medium relative group"
            >
              <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
                Export
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const handleExport = async () => {
    setIsLoading(true);
    try {
      // Simulate export delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock export success
      const timestamp = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const filename = `val-x-export-${timestamp}.${selectedExportFormat}`;
      
      // Show success notification
      toast.success(`Export completed: ${filename}`);
      setShowExportModal(false);
    } catch (error) {
      toast.error('Export failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderHeader = () => (
    <motion.div className="flex justify-between items-center mb-8" variants={itemVariants}>
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 
          bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <NotificationBell />
      </div>
      <div className="flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowExportModal(true)}
          className="px-6 py-2 rounded-full bg-white/5 text-gray-300 hover:bg-white/10 
            transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
            />
          </svg>
          <span>Export</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 
            text-white font-medium hover:opacity-90 transition-opacity"
        >
          + New Action
        </motion.button>
      </div>
    </motion.div>
  );

  const AdvancedSearchPanel = () => (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {advancedSearchFields.map((field) => (
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
          className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
          onClick={() => setShowAdvancedSearch(false)}
        >
          Clear
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
            to-fuchsia-500 text-white font-medium"
        >
          Apply Filters
        </button>
      </div>
    </motion.div>
  );

  const BulkActionsBar = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 rounded-full 
        shadow-lg border border-white/10 px-6 py-3 flex items-center space-x-4"
    >
      <span className="text-white font-medium">{selectedRows.length} items selected</span>
      <div className="h-4 w-px bg-white/20" />
      <button
        className="text-gray-300 hover:text-white transition-colors"
        onClick={() => handleBulkAction('edit')}
      >
        Edit
      </button>
      <button
        className="text-gray-300 hover:text-white transition-colors"
        onClick={() => handleBulkAction('archive')}
      >
        Archive
      </button>
      <button
        className="text-red-400 hover:text-red-300 transition-colors"
        onClick={() => handleBulkAction('delete')}
      >
        Delete
      </button>
    </motion.div>
  );

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleBulkAction = (action) => {
    // Implement bulk actions logic
    console.log(`Bulk action: ${action} for rows:`, selectedRows);
  };

  const handleRowSelect = (id) => {
    setSelectedRows(prev => {
      const isSelected = prev.includes(id);
      const newSelection = isSelected
        ? prev.filter(item => item !== id)
        : [...prev, id];
      setShowBulkActions(newSelection.length > 0);
      return newSelection;
    });
  };

  const Pagination = () => (
    <div className="flex items-center justify-between mt-6 px-4">
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <span>Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white"
        >
          {[10, 20, 50].map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );

  const SearchInput = () => (
    <div className="relative">
      <input
        type="text"
        placeholder="Search users..."
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-4 py-2 pl-10 rounded-lg bg-white/5 border border-white/10 text-white 
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      {isSearching && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );

  const renderUsersTable = () => (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
      <div className="p-4">
        <SearchInput />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 px-4 text-left">
                <input
                  type="checkbox"
                  className="rounded bg-white/5 border-white/10 text-violet-500 
                    focus:ring-violet-500 focus:ring-offset-0"
                  onChange={(e) => {
                    const allIds = users.map(user => user.id);
                    setSelectedRows(e.target.checked ? allIds : []);
                    setShowBulkActions(e.target.checked);
                  }}
                  checked={selectedRows.length === users.length}
                />
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(searchResults.length > 0 ? searchResults : paginatedUsers).map((user) => (
              <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    className="rounded bg-white/5 border-white/10 text-violet-500 
                      focus:ring-violet-500 focus:ring-offset-0"
                    checked={selectedRows.includes(user.id)}
                    onChange={() => handleRowSelect(user.id)}
                  />
                </td>
                <td className="py-3 px-4 text-white">{user.name}</td>
                <td className="py-3 px-4 text-gray-300">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'Admin' ? 'bg-violet-500/20 text-violet-300' :
                    user.role === 'Editor' ? 'bg-cyan-500/20 text-cyan-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowUserDetails(true);
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setUserToDelete(user);
                        setShowDeleteConfirm(true);
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );

  const renderUsersGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8" variants={containerVariants}>
      {users.map((user) => (
        <motion.div
          key={user.id}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">{user.name}</h2>
            <div className="flex space-x-4">
              <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 
                transition-colors text-sm">
                Edit
              </button>
              <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 
                transition-colors text-sm">
                Preview
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <p className="text-white">{user.email}</p>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Role</label>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.role === 'Admin' ? 'bg-violet-500/20 text-violet-300' :
                user.role === 'Editor' ? 'bg-cyan-500/20 text-cyan-300' :
                'bg-gray-500/20 text-gray-300'
              }`}>
                {user.role}
              </span>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Status</label>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {user.status}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const ActivityLineChart = ({ data }) => {
    const chartData = {
      labels: data.map(item => item.time),
      datasets: [
        {
          label: 'User Activity',
          data: data.map(item => item.value),
          fill: true,
          backgroundColor: 'rgba(124, 58, 237, 0.1)',
          borderColor: 'rgba(124, 58, 237, 0.8)',
          tension: 0.4,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'rgba(255, 255, 255, 0.8)',
          bodyColor: 'rgba(255, 255, 255, 0.8)',
          padding: 12,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)',
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)',
          },
        },
      },
    };

    return (
      <div className="h-64">
        <Chart type="line" data={chartData} options={options} />
      </div>
    );
  };

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

  const QuickStatsCard = ({ title, value, change, icon }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm">{title}</span>
        {icon}
      </div>
      <p className="text-2xl font-bold text-white mb-2">{value}</p>
      <div className="flex items-center space-x-2">
        <span className={`text-sm ${
          change.startsWith('+') ? 'text-green-400' : 'text-red-400'
        }`}>
          {change}
        </span>
        <span className="text-gray-400 text-sm">vs last period</span>
      </div>
    </motion.div>
  );

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardTab
            userActivities={userActivities}
            userEngagementData={userEngagementData}
            userMetrics={userMetrics}
            stats={stats}
            systemHealth={systemHealth}
            recentActivity={recentActivity}
            analytics={analytics}
            itemVariants={itemVariants}
            containerVariants={containerVariants}
          />
        );

      case 'users':
        return (
          <UsersTab
            selectedView={selectedView}
            setSelectedView={setSelectedView}
            showAdvancedSearch={showAdvancedSearch}
            setShowAdvancedSearch={setShowAdvancedSearch}
            showBulkActions={showBulkActions}
            renderUsersTable={renderUsersTable}
            renderUsersGrid={renderUsersGrid}
          />
        );

      case 'content':
        return (
          <ContentTab
            contentItems={contentItems}
            setShowAddContentModal={setShowAddContentModal}
            itemVariants={itemVariants}
          />
        );

      case 'settings':
        return (
          <SettingsTab
            settings={settings}
            containerVariants={containerVariants}
            itemVariants={itemVariants}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {renderHeader()}
        
        {/* Navigation Tabs */}
        <motion.div className="flex space-x-4 mb-8" variants={itemVariants}>
          <TabButton tab="dashboard" label="Dashboard" />
          <TabButton tab="users" label="Users" />
          <TabButton tab="content" label="Content" />
          <TabButton tab="settings" label="Settings" />
        </motion.div>

        {renderTabContent()}

        <AnimatePresence>
          {showExportModal && <ExportModal />}
          {showAddUserModal && <AddUserModal />}
          {showUserDetails && selectedUser && <UserDetailsModal user={selectedUser} />}
          {showDeleteConfirm && userToDelete && (
            <DeleteConfirmationModal
              user={userToDelete}
              onConfirm={() => {
                // Handle delete
                setShowDeleteConfirm(false);
                setUserToDelete(null);
              }}
              onCancel={() => {
                setShowDeleteConfirm(false);
                setUserToDelete(null);
              }}
            />
          )}
          {showAddContentModal && (
            <AddContentModal onClose={() => setShowAddContentModal(false)} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Admin; 