import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  getTemplateDefaults,
  validateTemplateFormat,
  getTemplateDescription,
  getCategorySettings,
  getAllCategories,
  settingTemplates
} from '../templates/settingTemplates';

const SettingModal = ({
  selectedSetting,
  onClose,
  onSave,
  settingValues,
  settingLocks,
  settingDependencies,
  settingValidation,
  settingFavorites,
  toggleFavorite,
  isLoading,
  saveStatus,
  components: {
    SettingPreview,
    SettingTags,
    SettingNotes,
    SettingLockButton,
    SettingComments,
    VersionHistory,
    SchedulePanel
  },
  onSettingSelect
}) => {
  const [configValue, setConfigValue] = useState(
    settingValues[`${selectedSetting.category}-${selectedSetting.setting}`] || ''
  );

  const [activeTab, setActiveTab] = useState('general');
  const template = settingTemplates[selectedSetting.category]?.[selectedSetting.setting];
  const isLocked = settingLocks[`${selectedSetting.category}-${selectedSetting.setting}`];

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'history', label: 'History' },
    { id: 'schedule', label: 'Schedule' }
  ];

  // Add mobile detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add mobile navigation
  const MobileNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-white/10 p-4 md:hidden">
      <div className="flex justify-around">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center space-y-1 ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-gray-400'
            }`}
          >
            {/* Add icons for each tab */}
            <span className="text-lg">
              {tab.id === 'general' ? '⚙️' : tab.id === 'history' ? '📜' : '📅'}
            </span>
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const validateTemplate = (category, setting, value) => {
    return validateTemplateFormat(category, setting, value);
  };

  const isValid = validateTemplate(selectedSetting.category, selectedSetting.setting, configValue);

  const handleApplyTemplate = () => {
    const defaultValue = getTemplateDefaults(selectedSetting.category, selectedSetting.setting);
    setConfigValue(defaultValue);
  };

  const description = getTemplateDescription(selectedSetting.category, selectedSetting.setting);

  // Add new state for template selection
  const [showTemplateList, setShowTemplateList] = useState(false);

  // Get available templates for the current category
  const availableTemplates = settingTemplates[selectedSetting.category] || {};

  // Add search functionality for templates and categories
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (!isLoading && !isLocked) {
          onSave(selectedSetting.category, selectedSetting.setting, configValue);
        }
      }
      // Esc to close
      if (e.key === 'Escape') {
        onClose();
      }
      // Ctrl/Cmd + / to toggle templates
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setShowTemplateList(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isLoading, isLocked, configValue, onSave, onClose]);

  // Add auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (configValue && !isLocked && !isLoading) {
        onSave(selectedSetting.category, selectedSetting.setting, configValue);
      }
    }, 30000); // Auto-save after 30 seconds of inactivity

    return () => clearTimeout(autoSaveTimer);
  }, [configValue, isLocked, isLoading]);

  // Add search filter for templates
  const filteredTemplates = useCallback(() => {
    if (!searchQuery) return availableTemplates;
    
    return Object.entries(availableTemplates).reduce((acc, [name, config]) => {
      if (
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        config.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        acc[name] = config;
      }
      return acc;
    }, {});
  }, [availableTemplates, searchQuery]);

  // Enhanced Template Selector with search
  const EnhancedTemplateSelector = () => (
    <div className="mt-4 p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-violet-300 font-medium">Available Templates</h4>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-48 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white 
                placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 
                  hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={() => setShowTemplateList(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(filteredTemplates()).map(([name, config]) => (
          <motion.button
            key={name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={() => {
              setConfigValue(JSON.stringify(config.template, null, 2));
              setShowTemplateList(false);
              toast.success(`Applied ${name} template`);
            }}
            className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors 
              text-left group border border-white/10"
          >
            <div className="flex justify-between items-start">
              <div>
                <h5 className="text-white font-medium mb-1">{name}</h5>
                <p className="text-sm text-gray-400">{config.description}</p>
                {config.documentation && (
                  <a
                    href={config.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-violet-400 hover:text-violet-300 transition-colors mt-2 inline-block"
                  >
                    View Documentation →
                  </a>
                )}
              </div>
              <span className="text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Apply
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {Object.keys(filteredTemplates()).length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No templates found matching your search.</p>
        </div>
      )}
    </div>
  );

  // Add new state for category navigation
  const [showCategoryNav, setShowCategoryNav] = useState(false);
  
  // Get all categories and their settings
  const allCategories = getAllCategories();
  const currentCategorySettings = getCategorySettings(selectedSetting.category);

  // Add category navigation component
  const CategoryNavigation = () => (
    <div className="mt-4 p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-violet-300 font-medium">Browse Categories</h4>
        <button
          onClick={() => setShowCategoryNav(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="space-y-4">
        {allCategories.map(category => (
          <div key={category} className="space-y-2">
            <h5 className="text-white font-medium">{category}</h5>
            <div className="grid grid-cols-1 gap-2">
              {getCategorySettings(category).map(setting => (
                <button
                  key={setting}
                  onClick={() => {
                    onClose();
                    // You'll need to implement this handler in the parent component
                    onSettingSelect?.(category, setting);
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left
                    text-gray-300 hover:text-white text-sm"
                >
                  {setting}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Add related settings component
  const RelatedSettings = () => (
    <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
      <h4 className="text-white font-medium mb-3">Related Settings</h4>
      <div className="space-y-2">
        {currentCategorySettings
          .filter(setting => setting !== selectedSetting.setting)
          .map(setting => (
            <button
              key={setting}
              onClick={() => {
                onClose();
                onSettingSelect?.(selectedSetting.category, setting);
              }}
              className="w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors
                text-left text-gray-300 hover:text-white text-sm flex justify-between items-center"
            >
              <span>{setting}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 
        overflow-y-auto md:py-8 md:px-6"
    >
      <motion.div
        initial={isMobile ? { y: '100%' } : { scale: 0.9, opacity: 0 }}
        animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1 }}
        exit={isMobile ? { y: '100%' } : { scale: 0.9, opacity: 0 }}
        className="bg-gray-900 w-full min-h-screen md:min-h-0 md:rounded-2xl md:max-w-4xl md:mx-auto
          flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-white/10 p-4 md:p-6 
          md:rounded-t-2xl z-10"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <button
                  onClick={() => setShowCategoryNav(true)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {selectedSetting?.setting}
                </h2>
              </div>
              <p className="text-sm md:text-base text-gray-400">
                {selectedSetting?.category}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleFavorite(selectedSetting.category, selectedSetting.setting)}
                className={`p-2 rounded-full transition-colors ${
                  settingFavorites.includes(`${selectedSetting.category}-${selectedSetting.setting}`)
                    ? 'text-yellow-400 hover:text-yellow-300'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Show category navigation if active */}
          {showCategoryNav && <CategoryNavigation />}

          {/* Desktop Tabs */}
          <div className="hidden md:flex space-x-4 mt-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 p-4 md:p-6 space-y-6 overflow-y-auto
          ${isMobile ? 'pb-24' : 'max-h-[calc(100vh-16rem)]'}`}
        >
          {activeTab === 'general' && (
            <>
              <div className="space-y-6">
                {/* Configuration Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-gray-400 text-sm">Configuration</label>
                    <div className="flex items-center space-x-2">
                      {/* Add Template Button */}
                      <button
                        onClick={() => setShowTemplateList(!showTemplateList)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors 
                          text-gray-400 hover:text-white flex items-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" 
                          />
                        </svg>
                        <span className="text-sm">Templates</span>
                      </button>
                      <SettingLockButton 
                        category={selectedSetting.category} 
                        setting={selectedSetting.setting} 
                      />
                    </div>
                  </div>

                  {/* Show template list if active */}
                  {showTemplateList && <EnhancedTemplateSelector />}

                  <textarea
                    value={configValue}
                    onChange={(e) => setConfigValue(e.target.value)}
                    disabled={isLocked}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    rows="4"
                    placeholder="Enter configuration..."
                  />
                </div>

                {/* Template Section */}
                {template && (
                  <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                    <h4 className="text-violet-300 font-medium mb-2">Template Available</h4>
                    <p className="text-sm text-violet-200/80 mb-2">{description}</p>
                    <button
                      onClick={handleApplyTemplate}
                      className="text-sm text-violet-300 hover:text-violet-200 transition-colors"
                    >
                      Apply Template
                    </button>
                  </div>
                )}

                {/* Preview Section */}
                {configValue && (
                  <SettingPreview 
                    category={selectedSetting.category}
                    setting={selectedSetting.setting}
                    value={configValue}
                  />
                )}

                {/* Tags and Notes */}
                <SettingTags category={selectedSetting.category} setting={selectedSetting.setting} />
                <SettingNotes category={selectedSetting.category} setting={selectedSetting.setting} />
                <SettingComments category={selectedSetting.category} setting={selectedSetting.setting} />
              </div>

              {/* Add related settings at the bottom */}
              <RelatedSettings />
            </>
          )}

          {activeTab === 'history' && (
            <VersionHistory 
              category={selectedSetting.category} 
              setting={selectedSetting.setting} 
            />
          )}

          {activeTab === 'schedule' && (
            <SchedulePanel 
              category={selectedSetting.category} 
              setting={selectedSetting.setting}
            />
          )}
        </div>

        {/* Footer */}
        <div className="hidden md:block sticky bottom-0 bg-gray-900 border-t border-white/10 
          p-4 md:p-6 md:rounded-b-2xl"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {saveStatus === 'success' && (
                <span className="text-green-400 text-sm">Changes saved successfully</span>
              )}
              {saveStatus === 'error' && (
                <span className="text-red-400 text-sm">Error saving changes</span>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(selectedSetting.category, selectedSetting.setting, configValue)}
                disabled={isLoading || isLocked}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
                  to-fuchsia-500 text-white font-medium relative disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation />

        {/* Mobile Action Button */}
        {isMobile && (
          <div className="fixed right-4 bottom-20 z-20">
            <button
              onClick={() => onSave(selectedSetting.category, selectedSetting.setting, configValue)}
              disabled={isLoading || isLocked}
              className="h-14 w-14 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 
                to-fuchsia-500 text-white shadow-lg flex items-center justify-center
                disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SettingModal; 