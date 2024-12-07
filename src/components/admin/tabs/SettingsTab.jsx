import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import SettingModal from '../components/SettingModal';

const SettingsTab = ({ 
  settings, 
  containerVariants, 
  itemVariants 
}) => {
  const [activeSection, setActiveSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSettings, setRecentSettings] = useState([]);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [settingHistory, setSettingHistory] = useState([]);
  const [settingValues, setSettingValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [settingCategories, setSettingCategories] = useState([]);
  const [settingBackups, setSettingBackups] = useState([]);
  const [importMode, setImportMode] = useState(false);
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [settingValidation, setSettingValidation] = useState({});
  const [settingDependencies, setSettingDependencies] = useState({});
  const [settingPermissions, setSettingPermissions] = useState({});
  const [settingTags, setSettingTags] = useState({});
  const [settingFavorites, setSettingFavorites] = useState([]);
  const [settingNotes, setSettingNotes] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const prefersReducedMotion = useReducedMotion();
  const [settingGroups, setSettingGroups] = useState([]);
  const [settingTemplates, setSettingTemplates] = useState({});
  const [settingLocks, setSettingLocks] = useState({});
  const [settingComments, setSettingComments] = useState({});
  const [settingVersions, setSettingVersions] = useState({});
  const [settingSchedule, setSettingSchedule] = useState({});
  const [settingAudit, setSettingAudit] = useState([]);

  // Load saved settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('settingValues');
    if (savedSettings) {
      setSettingValues(JSON.parse(savedSettings));
    }
  }, []);

  // Group settings by category on mount
  useEffect(() => {
    const categories = settings.reduce((acc, section) => {
      acc[section.category] = section.items;
      return acc;
    }, {});
    setSettingCategories(categories);
  }, [settings]);

  // Backup settings periodically
  useEffect(() => {
    const backup = {
      timestamp: new Date().toISOString(),
      values: settingValues
    };
    setSettingBackups(prev => [backup, ...prev].slice(0, 5));
  }, [settingValues]);

  const handleSettingRestore = useCallback((backup) => {
    setSettingValues(backup.values);
    localStorage.setItem('settingValues', JSON.stringify(backup.values));
    toast.success('Settings restored successfully');
  }, []);

  const handleSettingsExport = useCallback(() => {
    const exportData = {
      settings: settingValues,
      history: settingHistory,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `settings-backup-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [settingValues, settingHistory]);

  const handleSettingsImport = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          setSettingValues(importedData.settings);
          setSettingHistory(prev => [...importedData.history, ...prev]);
          localStorage.setItem('settingValues', JSON.stringify(importedData.settings));
          toast.success('Settings imported successfully');
        } catch (error) {
          toast.error('Invalid settings file');
        }
      };
      reader.readAsText(file);
    }
  }, []);

  const filteredSettings = settings.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  const handleSettingClick = (category, setting) => {
    setSelectedSetting({ category, setting });
    // Add to recent settings
    setRecentSettings(prev => {
      const newRecent = [{ category, setting }, ...prev.filter(item => 
        !(item.category === category && item.setting === setting)
      )].slice(0, 5);
      return newRecent;
    });
  };

  // Add validation rules
  const validateSetting = (category, setting, value) => {
    const validations = {
      'Security': {
        'API Keys': (val) => val && val.length >= 32,
        'Authentication': (val) => ['OAuth', 'JWT', 'Basic'].includes(val),
        'Permissions': (val) => Array.isArray(val) && val.length > 0
      },
      'Email': {
        'SMTP Settings': (val) => {
          try {
            const config = JSON.parse(val);
            return config.host && config.port && config.username && config.password;
          } catch {
            return false;
          }
        }
      }
    };

    const validator = validations[category]?.[setting];
    if (!validator) return true;

    const isValid = validator(value);
    setSettingValidation(prev => ({
      ...prev,
      [`${category}-${setting}`]: isValid
    }));
    return isValid;
  };

  // Add dependency check
  const checkDependencies = (category, setting) => {
    const dependencies = {
      'Email': {
        'Templates': ['SMTP Settings'],
        'Notifications': ['Templates', 'SMTP Settings']
      },
      'Integration': {
        'Analytics': ['API Keys'],
        'Payment Gateway': ['API Keys', 'Authentication']
      }
    };

    const requiredSettings = dependencies[category]?.[setting] || [];
    const missingDependencies = requiredSettings.filter(dep => !settingValues[dep]);

    setSettingDependencies(prev => ({
      ...prev,
      [`${category}-${setting}`]: missingDependencies
    }));

    return missingDependencies.length === 0;
  };

  // Enhanced save handler
  const handleSettingSave = async (category, setting, value) => {
    setIsLoading(true);
    setSaveStatus(null);

    try {
      // Validate setting
      if (!validateSetting(category, setting, value)) {
        toast.error('Invalid setting value');
        setSaveStatus('error');
        return;
      }

      // Check dependencies
      const dependenciesMet = checkDependencies(category, setting);
      if (!dependenciesMet) {
        toast.error('Required dependencies not configured');
        setSaveStatus('error');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newValues = {
        ...settingValues,
        [`${category}-${setting}`]: value
      };
      
      setSettingValues(newValues);
      localStorage.setItem('settingValues', JSON.stringify(newValues));
      
      // Add to history with more details
      setSettingHistory(prev => [{
        category,
        setting,
        value,
        timestamp: new Date().toISOString(),
        type: 'update',
        user: 'Admin', // Replace with actual user
        previousValue: settingValues[`${category}-${setting}`]
      }, ...prev].slice(0, 10));

      setSaveStatus('success');
      toast.success('Setting saved successfully');
    } catch (error) {
      setSaveStatus('error');
      toast.error('Failed to save setting');
    } finally {
      setIsLoading(false);
    }
  };

  const SettingHistoryPanel = () => (
    <motion.div
      variants={itemVariants}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Recent Changes</h3>
      <div className="space-y-3">
        {settingHistory.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
          >
            <div>
              <p className="text-white font-medium">{item.setting}</p>
              <p className="text-sm text-gray-400">{item.category}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">
                {new Date(item.timestamp).toLocaleTimeString()}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(item.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const BackupPanel = () => (
    <motion.div
      variants={itemVariants}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Backups & Recovery</h3>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSettingsExport}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </motion.button>
          <label className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-300 cursor-pointer">
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleSettingsImport}
            />
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </label>
        </div>
      </div>

      <div className="space-y-3">
        {settingBackups.map((backup, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
          >
            <div>
              <p className="text-sm text-gray-300">
                {new Date(backup.timestamp).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">
                {Object.keys(backup.values).length} settings
              </p>
            </div>
            <button
              onClick={() => handleSettingRestore(backup)}
              className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 
                transition-colors text-sm"
            >
              Restore
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Add setting preview component
  const SettingPreview = ({ category, setting, value }) => {
    const previewComponents = {
      'Email': {
        'Templates': () => (
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-sm text-gray-400 mb-2">Template Preview</div>
            <div className="prose prose-invert max-w-none" 
              dangerouslySetInnerHTML={{ __html: value }} 
            />
          </div>
        ),
        'SMTP Settings': () => {
          try {
            const config = JSON.parse(value);
            return (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Host:</span>
                  <span className="text-white">{config.host}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Port:</span>
                  <span className="text-white">{config.port}</span>
                </div>
              </div>
            );
          } catch {
            return null;
          }
        }
      }
    };

    const PreviewComponent = previewComponents[category]?.[setting];
    return PreviewComponent ? <PreviewComponent /> : null;
  };

  // Add tag management
  const handleAddTag = (category, setting, tag) => {
    setSettingTags(prev => ({
      ...prev,
      [`${category}-${setting}`]: [
        ...(prev[`${category}-${setting}`] || []),
        tag
      ]
    }));
  };

  const handleRemoveTag = (category, setting, tagToRemove) => {
    setSettingTags(prev => ({
      ...prev,
      [`${category}-${setting}`]: prev[`${category}-${setting}`]?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  // Add favorites management
  const toggleFavorite = (category, setting) => {
    const settingKey = `${category}-${setting}`;
    setSettingFavorites(prev => 
      prev.includes(settingKey)
        ? prev.filter(key => key !== settingKey)
        : [...prev, settingKey]
    );
  };

  // Add notes management
  const updateSettingNote = (category, setting, note) => {
    setSettingNotes(prev => ({
      ...prev,
      [`${category}-${setting}`]: note
    }));
  };

  // Add new components
  const SettingTags = ({ category, setting }) => {
    const [newTag, setNewTag] = useState('');
    const tags = settingTags[`${category}-${setting}`] || [];

    return (
      <div className="mt-4">
        <label className="block text-gray-400 text-sm mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm 
                flex items-center space-x-1"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(category, setting, tag)}
                className="ml-1 hover:text-violet-200"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && newTag.trim()) {
                handleAddTag(category, setting, newTag.trim());
                setNewTag('');
              }
            }}
            placeholder="Add tag..."
            className="flex-1 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white 
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            onClick={() => {
              if (newTag.trim()) {
                handleAddTag(category, setting, newTag.trim());
                setNewTag('');
              }
            }}
            className="px-3 py-1 rounded-lg bg-violet-500/20 text-violet-300 
              hover:bg-violet-500/30 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    );
  };

  const SettingNotes = ({ category, setting }) => {
    const note = settingNotes[`${category}-${setting}`] || '';

    return (
      <div className="mt-4">
        <label className="block text-gray-400 text-sm mb-2">Notes</label>
        <textarea
          value={note}
          onChange={(e) => updateSettingNote(category, setting, e.target.value)}
          placeholder="Add notes about this setting..."
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          rows="3"
        />
      </div>
    );
  };

  // Add setting templates
  const defaultTemplates = {
    'Email': {
      'SMTP Settings': {
        template: {
          host: 'smtp.example.com',
          port: 587,
          username: '',
          password: '',
          secure: true
        },
        description: 'Configure SMTP server settings for email delivery'
      },
      'Templates': {
        template: '<h1>Welcome, {{name}}!</h1>\n<p>Your account has been created.</p>',
        description: 'Email template with support for variables'
      }
    },
    'Security': {
      'API Keys': {
        template: {
          publicKey: '',
          privateKey: '',
          permissions: ['read', 'write']
        },
        description: 'API authentication credentials'
      }
    }
  };

  // Add setting groups
  const defaultGroups = [
    {
      name: 'Basic',
      categories: ['General', 'Email'],
      description: 'Essential configuration settings'
    },
    {
      name: 'Advanced',
      categories: ['Security', 'Integration'],
      description: 'Advanced system settings'
    },
    {
      name: 'Development',
      categories: ['API Keys', 'Analytics'],
      description: 'Developer-specific settings'
    }
  ];

  // Initialize templates and groups
  useEffect(() => {
    setSettingTemplates(defaultTemplates);
    setSettingGroups(defaultGroups);
  }, []);

  // Add lock/unlock functionality
  const toggleSettingLock = (category, setting) => {
    const key = `${category}-${setting}`;
    setSettingLocks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Add comment functionality
  const updateSettingComment = (category, setting, comment) => {
    const key = `${category}-${setting}`;
    setSettingComments(prev => ({
      ...prev,
      [key]: comment
    }));
  };

  // Add new components
  const SettingLockButton = ({ category, setting }) => {
    const isLocked = settingLocks[`${category}-${setting}`];
    
    return (
      <button
        onClick={() => toggleSettingLock(category, setting)}
        className={`p-2 rounded-full transition-colors ${
          isLocked ? 'text-red-400 hover:text-red-300' : 'text-gray-400 hover:text-gray-300'
        }`}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d={isLocked 
              ? "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              : "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
            }
          />
        </svg>
      </button>
    );
  };

  const SettingComments = ({ category, setting }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState(settingComments[`${category}-${setting}`] || '');

    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-gray-400 text-sm">Comments</label>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
        </div>
        {isEditing ? (
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onBlur={() => {
              updateSettingComment(category, setting, comment);
              setIsEditing(false);
            }}
            placeholder="Add comments about this setting..."
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows="3"
          />
        ) : (
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-gray-300 min-h-[80px]">
            {comment || 'No comments added'}
          </div>
        )}
      </div>
    );
  };

  // Add version control
  const addSettingVersion = (category, setting, value) => {
    const key = `${category}-${setting}`;
    setSettingVersions(prev => ({
      ...prev,
      [key]: [
        {
          value,
          timestamp: new Date().toISOString(),
          user: 'Admin', // Replace with actual user
          version: ((prev[key]?.length || 0) + 1).toString()
        },
        ...(prev[key] || [])
      ].slice(0, 10) // Keep last 10 versions
    }));
  };

  // Add scheduling functionality
  const scheduleSettingUpdate = (category, setting, value, date) => {
    const key = `${category}-${setting}`;
    setSettingSchedule(prev => ({
      ...prev,
      [key]: {
        value,
        scheduledDate: date,
        status: 'pending'
      }
    }));
  };

  // Add audit logging
  const logAuditEvent = (category, setting, action, details) => {
    setSettingAudit(prev => [{
      category,
      setting,
      action,
      details,
      timestamp: new Date().toISOString(),
      user: 'Admin', // Replace with actual user
      ip: '127.0.0.1' // Replace with actual IP
    }, ...prev].slice(0, 100)); // Keep last 100 audit events
  };

  // Add new components
  const VersionHistory = ({ category, setting }) => {
    const versions = settingVersions[`${category}-${setting}`] || [];

    return (
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-white mb-4">Version History</h4>
        <div className="space-y-3">
          {versions.map((version, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-violet-300 font-medium">Version {version.version}</span>
                  <p className="text-sm text-gray-400">
                    {new Date(version.timestamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleSettingSave(category, setting, version.value)}
                  className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Restore
                </button>
              </div>
              <pre className="mt-2 p-2 rounded bg-black/20 text-sm text-gray-300 overflow-x-auto">
                {typeof version.value === 'object' 
                  ? JSON.stringify(version.value, null, 2)
                  : version.value}
              </pre>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SchedulePanel = ({ category, setting }) => {
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const schedule = settingSchedule[`${category}-${setting}`];

    return (
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-white mb-4">Schedule Update</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Date</label>
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Time</label>
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
          </div>
          
          <button
            onClick={() => {
              const date = new Date(`${scheduleDate}T${scheduleTime}`);
              scheduleSettingUpdate(category, setting, configValue, date);
            }}
            className="w-full px-4 py-2 rounded-lg bg-violet-500/20 text-violet-300 
              hover:bg-violet-500/30 transition-colors"
          >
            Schedule Update
          </button>

          {schedule && (
            <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/20">
              <p className="text-sm text-violet-300">
                Update scheduled for {new Date(schedule.scheduledDate).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Add handler functions for modal
  const handleModalClose = () => {
    setSelectedSetting(null);
  };

  const handleModalSave = async (category, setting, value) => {
    try {
      await handleSettingSave(category, setting, value);
      // Add version after successful save
      addSettingVersion(category, setting, value);
      // Log audit event
      logAuditEvent(category, setting, 'update', {
        previousValue: settingValues[`${category}-${setting}`],
        newValue: value
      });
    } catch (error) {
      console.error('Failed to save setting:', error);
    }
  };

  // Organize modal components
  const modalComponents = {
    SettingPreview,
    SettingTags,
    SettingNotes,
    SettingLockButton,
    SettingComments,
    VersionHistory,
    SchedulePanel
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Search Bar */}
        <motion.div 
          className="md:col-span-2"
          variants={itemVariants}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          </div>
        </motion.div>

        {/* Recent Settings */}
        {recentSettings.length > 0 && (
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Recent Settings</h4>
            <div className="space-y-2">
              {recentSettings.slice(0, 3).map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSettingClick(item.category, item.setting)}
                  className="w-full p-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 
                    transition-colors text-left text-sm truncate"
                >
                  {item.setting}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Settings Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {filteredSettings.map((section) => (
              <motion.div
                key={section.category}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                variants={itemVariants}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">{section.category}</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSection(activeSection === section.category ? null : section.category)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <svg 
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${
                        activeSection === section.category ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.button>
                </div>

                <AnimatePresence>
                  {(activeSection === section.category || searchQuery) && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 overflow-hidden"
                    >
                      {section.items.map((item) => (
                        <motion.button
                          key={item}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          className="w-full p-3 rounded-lg bg-white/5 text-gray-100 hover:bg-white/10 
                            transition-all text-left flex justify-between items-center group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSettingClick(section.category, item)}
                        >
                          <span>{item}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              Configure
                            </span>
                            <svg
                              className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {!activeSection && !searchQuery && (
                  <div className="mt-2 text-sm text-gray-400">
                    {section.items.length} settings available
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="md:col-span-1 space-y-6">
          <BackupPanel />
          <SettingHistoryPanel />
        </div>
      </div>

      {/* Setting Modal */}
      <AnimatePresence>
        {selectedSetting && (
          <SettingModal
            selectedSetting={selectedSetting}
            onClose={handleModalClose}
            onSave={handleModalSave}
            settingValues={settingValues}
            settingTemplates={settingTemplates}
            settingLocks={settingLocks}
            settingDependencies={settingDependencies}
            settingValidation={settingValidation}
            settingFavorites={settingFavorites}
            toggleFavorite={toggleFavorite}
            isLoading={isLoading}
            saveStatus={saveStatus}
            components={modalComponents}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsTab; 