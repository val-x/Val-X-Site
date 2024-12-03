import { motion, AnimatePresence } from 'framer-motion';
import { useState, memo, useEffect, useCallback, useRef } from 'react';
import { 
  FiX, FiChevronDown, FiSettings, FiActivity, FiWifi, FiClock, 
  FiVolume2, FiType, FiMonitor, FiBarChart2, FiZap, FiSearch, FiCommand, FiInfo, FiVolume, FiVolume1 
} from 'react-icons/fi';
import { formatTime } from '../../../utils/video';

// Simple tab component for basic navigation
const Tab = memo(({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
      ${isActive 
        ? 'bg-violet-500/20 text-white'
        : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
  >
    {children}
  </button>
));

// Enhanced VolumeSlider component
const VolumeSlider = memo(({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const sliderRef = useRef(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMouseMove(e);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newValue = Math.max(0, Math.min(x / rect.width, 1));
    setLocalValue(newValue);
    onChange(newValue);
  }, [onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const getVolumeIcon = () => {
    if (localValue === 0) return FiVolume2;
    if (localValue < 0.3) return FiVolume;
    if (localValue < 0.7) return FiVolume1;
    return FiVolume2;
  };

  const VolumeIcon = getVolumeIcon();

  return (
    <div className="flex items-center gap-3 select-none">
      <button
        onClick={() => onChange(localValue === 0 ? 1 : 0)}
        className={`p-1.5 rounded-lg transition-colors duration-200
          ${isDragging ? 'bg-violet-500/20' : 'hover:bg-white/5'}`}
      >
        <VolumeIcon className={`w-4 h-4 transition-colors duration-200
          ${isDragging ? 'text-violet-400' : 'text-slate-400'}`} />
      </button>
      <div 
        ref={sliderRef}
        className="relative flex-1 h-1 bg-slate-700 rounded-full cursor-pointer group"
        onMouseDown={handleMouseDown}
      >
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-violet-500 
            to-fuchsia-500 rounded-full transition-all duration-100"
          style={{ width: `${localValue * 100}%` }}
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 -ml-2 w-4 h-4 rounded-full
            bg-white shadow-lg transform transition-transform duration-100
            ${isDragging ? 'scale-110' : 'scale-90 group-hover:scale-100'}`}
          style={{ left: `${localValue * 100}%` }}
        />
      </div>
      <div className="w-12 text-right">
        <span className={`text-xs font-medium transition-colors duration-200
          ${isDragging ? 'text-violet-400' : 'text-slate-400'}`}>
          {Math.round(localValue * 100)}%
        </span>
      </div>
    </div>
  );
});

// Header component with simplified tabs
const Header = memo(({ activeTab, tabs, setActiveTab, onClose, onShowKeyboardShortcuts }) => (
  <div className="border-b border-violet-500/20">
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium bg-gradient-to-r from-cyan-400 
          via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          Settings
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onShowKeyboardShortcuts}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            title="Keyboard shortcuts"
          >
            <FiCommand className="w-5 h-5 text-slate-400" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <FiX className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="flex items-center gap-2">
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </div>
          </Tab>
        ))}
      </div>
    </div>
  </div>
));

// Collapsible section component
const CollapsibleSection = memo(({ title, isExpanded, onToggle, children, icon: Icon }) => (
  <div className="rounded-lg bg-slate-800/50 overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 
        transition-colors duration-200"
    >
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-lg transition-colors duration-200 
          ${isExpanded ? 'bg-violet-500/20' : 'bg-slate-700'}`}>
          <Icon className={`w-4 h-4 transition-colors duration-200
            ${isExpanded ? 'text-violet-400' : 'text-slate-400'}`} />
        </div>
        <span className={`text-sm font-medium transition-colors duration-200
          ${isExpanded ? 'text-white' : 'text-slate-400'}`}>
          {title}
        </span>
      </div>
      <div className={`transform transition-transform duration-200 
        ${isExpanded ? 'rotate-180' : ''}`}>
        <FiChevronDown className="w-4 h-4 text-slate-400" />
      </div>
    </button>
    <div className={`overflow-hidden transition-all duration-200
      ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="px-4 pb-3 space-y-3">
        {children}
      </div>
    </div>
  </div>
));

// Option button component
const OptionButton = memo(({ selected, onClick, children, description, metadata }) => (
  <button
    onClick={onClick}
    className={`w-full px-3 py-2 rounded-lg text-sm transition-all duration-200
      ${selected 
        ? 'bg-violet-500/20 text-white border border-violet-500/30'
        : 'text-slate-400 hover:bg-white/5 border border-transparent'
      }`}
  >
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-start">
        <span className="font-medium">{children}</span>
        {description && (
          <span className="text-xs text-slate-500">{description}</span>
        )}
      </div>
      {metadata && (
        <span className="text-xs text-slate-500">{metadata}</span>
      )}
    </div>
  </button>
));

// StatItem component
const StatItem = memo(({ label, value, icon: Icon, tooltip }) => (
  <div className="flex items-center justify-between text-sm group relative">
    <div className="flex items-center gap-2">
      {Icon && (
        <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-violet-500/20 
          transition-colors duration-200">
          <Icon className="w-4 h-4 text-slate-400 group-hover:text-violet-400 
            transition-colors duration-200" />
        </div>
      )}
      <span className="text-slate-400 group-hover:text-slate-300 
        transition-colors duration-200">
        {label}
      </span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-white font-medium group-hover:text-violet-400 
        transition-colors duration-200">
        {value}
      </span>
      {tooltip && (
        <div className="absolute right-0 top-full mt-2 opacity-0 group-hover:opacity-100
          transition-all duration-200 pointer-events-none z-50">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg px-3 py-2
            border border-violet-500/20 text-xs text-slate-300 whitespace-nowrap shadow-xl">
            {tooltip}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-slate-900/90 rotate-45
              border-l border-t border-violet-500/20" />
          </div>
        </div>
      )}
    </div>
  </div>
));

const SettingsModal = ({
  onClose,
  position,
  isMobile = false,
  isTablet = false,
  videoQuality,
  setVideoQuality = () => {},
  playbackSpeed,
  setPlaybackSpeed = () => {},
  volume,
  setVolume = () => {},
  subtitlesEnabled = false,
  setSubtitlesEnabled = () => {},
  subtitlesLanguage = 'off',
  setSubtitlesLanguage = () => {},
  audioTrack = 'default',
  setAudioTrack = () => {},
  availableQualities = [],
  availableSubtitles = [],
  availableAudioTracks = [],
  playbackStats = {},
  networkStats = {}
}) => {
  const [activeTab, setActiveTab] = useState('settings');
  const [expandedSections, setExpandedSections] = useState(['quality']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [localSubtitlesEnabled, setLocalSubtitlesEnabled] = useState(subtitlesEnabled);

  // Keyboard shortcuts
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === '?') {
      e.preventDefault();
      setShowKeyboardShortcuts(true);
    } else if (e.key === '/') {
      e.preventDefault();
      setSearchQuery('');
      document.getElementById('settings-search')?.focus();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Keyboard shortcuts info
  const keyboardShortcuts = [
    { key: 'Esc', description: 'Close settings' },
    { key: '/', description: 'Search settings' },
    { key: '↑/↓', description: 'Navigate options' },
    { key: 'Enter', description: 'Select option' },
    { key: 'Q', description: 'Video quality' },
    { key: 'A', description: 'Audio track' },
    { key: 'S', description: 'Subtitles' },
    { key: 'P', description: 'Playback speed' }
  ];

  // Search functionality
  const filterOptions = (options, query) => {
    if (!query) return options;
    const lowerQuery = query.toLowerCase();
    return options.filter(option => 
      option.label.toLowerCase().includes(lowerQuery) ||
      option.description?.toLowerCase().includes(lowerQuery)
    );
  };

  // Enhanced stats display
  const renderDetailedStats = () => (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-violet-400 mb-3">Playback Statistics</h4>
        <div className="grid grid-cols-2 gap-4">
          <StatItem
            label="Watch Time"
            value={formatTime(playbackStats.watchTime)}
            icon={FiClock}
            tooltip="Total time spent watching"
          />
          <StatItem
            label="Buffering"
            value={`${playbackStats.bufferingEvents || 0} events`}
            icon={FiActivity}
            tooltip="Number of buffering events"
          />
          <StatItem
            label="Average Quality"
            value={playbackStats.averageQuality || 'Auto'}
            icon={FiMonitor}
            tooltip="Average video quality"
          />
          <StatItem
            label="Data Saved"
            value={playbackStats.dataSaved ? `${Math.round(playbackStats.dataSaved)}MB` : '0MB'}
            icon={FiZap}
            tooltip="Data saved by adaptive streaming"
          />
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-violet-400 mb-3">Network Information</h4>
        <div className="grid grid-cols-2 gap-4">
          <StatItem
            label="Connection"
            value={networkStats.effectiveType?.toUpperCase() || 'Unknown'}
            icon={FiWifi}
            tooltip="Current network type"
          />
          <StatItem
            label="Speed"
            value={`${networkStats.downlink || 0} Mbps`}
            icon={FiZap}
            tooltip="Download speed"
          />
          <StatItem
            label="Latency"
            value={`${networkStats.rtt || 0}ms`}
            icon={FiActivity}
            tooltip="Network latency"
          />
          <StatItem
            label="Quality Changes"
            value={playbackStats.qualityChanges || 0}
            icon={FiBarChart2}
            tooltip="Number of quality switches"
          />
        </div>
      </div>
    </div>
  );

  const renderSearchBar = () => (
    <div className="px-4 py-2 border-b border-violet-500/20">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          id="settings-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search settings..."
          className="w-full bg-slate-800/50 text-white placeholder-slate-400 text-sm
            rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-violet-500/50"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400
              hover:text-white transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  const renderKeyboardShortcuts = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center 
      justify-center p-4 z-50">
      <div className="bg-slate-900/90 rounded-2xl border border-violet-500/20 
        shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Keyboard Shortcuts</h3>
          <button
            onClick={() => setShowKeyboardShortcuts(false)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {keyboardShortcuts.map(({ key, description }) => (
            <div key={key} className="flex items-center gap-3">
              <kbd className="px-2 py-1 bg-slate-800 rounded text-sm font-medium 
                text-slate-300 border border-slate-700 min-w-[32px] text-center">
                {key}
              </kbd>
              <span className="text-sm text-slate-400">{description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Handle subtitle toggle with local state fallback
  const handleSubtitlesToggle = () => {
    const newValue = !localSubtitlesEnabled;
    setLocalSubtitlesEnabled(newValue);
    if (typeof setSubtitlesEnabled === 'function') {
      setSubtitlesEnabled(newValue);
    }
  };

  // Update local state when prop changes
  useEffect(() => {
    setLocalSubtitlesEnabled(subtitlesEnabled);
  }, [subtitlesEnabled]);

  const toggleSection = (section) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  // Default video qualities if none provided
  const defaultQualities = [
    {
      value: 'auto',
      label: 'Auto',
      description: 'Automatically adjusts quality based on network',
      bandwidth: 'Variable',
      default: true
    },
    {
      value: '2160',
      label: '4K',
      description: '2160p Ultra HD',
      bandwidth: '35-45 Mbps'
    },
    {
      value: '1440',
      label: '2K',
      description: '1440p Quad HD',
      bandwidth: '16-24 Mbps'
    },
    {
      value: '1080',
      label: 'FHD',
      description: '1080p Full HD',
      bandwidth: '8-12 Mbps'
    },
    {
      value: '720',
      label: 'HD',
      description: '720p HD',
      bandwidth: '5-7.5 Mbps'
    },
    {
      value: '480',
      label: 'SD',
      description: '480p Standard',
      bandwidth: '2.5-4 Mbps'
    },
    {
      value: '360',
      label: 'Low',
      description: '360p Low',
      bandwidth: '1-2 Mbps'
    }
  ];

  // Filter available qualities or use defaults
  const qualityOptions = availableQualities.length > 0
    ? [
        defaultQualities[0], // Always include Auto
        ...availableQualities.map(quality => {
          const defaultQuality = defaultQualities.find(q => q.value === quality.toString());
          return defaultQuality || {
            value: quality.toString(),
            label: `${quality}p`,
            description: `${quality}p resolution`,
            bandwidth: `~${quality * 2}kbps`
          };
        })
      ]
    : defaultQualities;

  // Default audio tracks if none provided
  const defaultAudioTracks = [
    {
      id: 'original',
      label: 'Original',
      language: 'Original Audio',
      kind: 'main'
    },
    {
      id: 'english',
      label: 'English',
      language: 'English',
      kind: 'dub'
    },
    {
      id: 'hindi',
      label: 'हिंदी',
      language: 'Hindi',
      kind: 'dub'
    },
    {
      id: 'malayalam',
      label: 'മലയാളം',
      language: 'Malayalam',
      kind: 'dub'
    },
    {
      id: 'tamil',
      label: 'தமிழ்',
      language: 'Tamil',
      kind: 'dub'
    },
    {
      id: 'telugu',
      label: 'తెలుగు',
      language: 'Telugu',
      kind: 'dub'
    }
  ];

  // Use available audio tracks or defaults
  const audioOptions = (availableAudioTracks.length > 0 ? availableAudioTracks : defaultAudioTracks)
    .map(track => ({
      value: track.id,
      label: track.label,
      description: track.language,
      metadata: track.kind,
      icon: track.kind === 'main' ? FiVolume2 : undefined
    }));

  // Default subtitle options if none provided
  const defaultSubtitles = [
    {
      id: 'off',
      label: 'Off',
      language: 'Off',
      kind: 'off'
    },
    {
      id: 'english',
      label: 'English',
      language: 'English',
      kind: 'captions'
    },
    {
      id: 'english-cc',
      label: 'English [CC]',
      language: 'English',
      kind: 'closed-captions'
    },
    {
      id: 'hindi',
      label: 'हिंदी',
      language: 'Hindi',
      kind: 'subtitles'
    },
    {
      id: 'malayalam',
      label: 'മലയാളം',
      language: 'Malayalam',
      kind: 'subtitles'
    },
    {
      id: 'tamil',
      label: 'தமிழ்',
      language: 'Tamil',
      kind: 'subtitles'
    },
    {
      id: 'telugu',
      label: 'తెలుగు',
      language: 'Telugu',
      kind: 'subtitles'
    }
  ];

  // Use available subtitles or defaults
  const subtitleOptions = [
    defaultSubtitles[0], // Always include Off option
    ...(availableSubtitles.length > 0 ? availableSubtitles : defaultSubtitles.slice(1))
      .map(subtitle => ({
        value: subtitle.id,
        label: subtitle.label,
        description: subtitle.kind === 'closed-captions' 
          ? 'Closed Captions (includes sound effects)'
          : subtitle.kind === 'captions'
          ? 'Captions'
          : 'Subtitles',
        metadata: subtitle.language
      }))
  ];

  const renderQualityBadge = (quality) => {
    if (quality === 'auto') return null;
    const qualityNum = parseInt(quality);
    if (qualityNum >= 2160) return '4K';
    if (qualityNum >= 1440) return '2K';
    if (qualityNum >= 1080) return 'FHD';
    if (qualityNum >= 720) return 'HD';
    return null;
  };

  // Playback speed options with descriptions
  const speedOptions = [
    { value: 0.5, label: '0.5x', description: 'Slow motion' },
    { value: 0.75, label: '0.75x', description: 'Slightly slower' },
    { value: 1, label: 'Normal', description: 'Original speed' },
    { value: 1.25, label: '1.25x', description: 'Slightly faster' },
    { value: 1.5, label: '1.5x', description: 'Fast' },
    { value: 1.75, label: '1.75x', description: 'Faster' },
    { value: 2, label: '2x', description: 'Very fast' }
  ];

  // Section icons mapping
  const sectionIcons = {
    quality: FiMonitor,
    speed: FiClock,
    audio: FiVolume2,
    subtitles: FiType,
    stats: FiBarChart2,
    network: FiZap
  };

  // Enhanced tab definitions with badges and descriptions
  const tabs = [
    { 
      id: 'settings', 
      icon: FiSettings, 
      label: 'Settings',
      description: 'Video playback preferences'
    },
    { 
      id: 'stats', 
      icon: FiActivity, 
      label: 'Stats',
      description: 'Playback analytics',
      badge: playbackStats.bufferingEvents > 0 ? playbackStats.bufferingEvents : null
    },
    { 
      id: 'network', 
      icon: FiWifi, 
      label: 'Network',
      description: 'Connection status',
      status: networkStats.effectiveType === '4g' ? 'good' : 'warning'
    }
  ];

  // Enhanced StatItem with hover effects and animations
  const StatItem = ({ label, value, icon: Icon, tooltip }) => (
    <motion.div 
      className="flex items-center justify-between text-sm group relative"
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="flex items-center gap-2">
        {Icon && (
          <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-violet-500/20 transition-colors duration-200">
            <Icon className="w-4 h-4 text-slate-400 group-hover:text-violet-400 transition-colors duration-200" />
          </div>
        )}
        <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-200">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white font-medium group-hover:text-violet-400 transition-colors duration-200">
          {value}
        </span>
        {tooltip && (
          <div className="absolute right-0 top-full mt-2 opacity-0 group-hover:opacity-100
            transition-all duration-200 pointer-events-none z-50 translate-y-2 group-hover:translate-y-0">
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg px-3 py-2
              border border-violet-500/20 text-xs text-slate-300 whitespace-nowrap shadow-xl">
              {tooltip}
              <div className="absolute -top-1 right-4 w-2 h-2 bg-slate-900/90 rotate-45
                border-l border-t border-violet-500/20" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  // Tab button component with enhanced animations and feedback
  const TabButton = ({ tab, isActive, onClick }) => (
    <motion.button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
        transition-all duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 text-white'
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`p-1.5 rounded-lg transition-colors duration-200
        ${isActive ? 'bg-violet-500/20' : 'bg-slate-800'}`}>
        <tab.icon className={`w-4 h-4 transition-colors duration-200
          ${isActive ? 'text-violet-400' : 'text-slate-400'}`} />
      </div>
      <span>{tab.label}</span>
      
      {/* Badge */}
      {tab.badge && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500
            flex items-center justify-center text-[10px] text-white font-bold"
        >
          {tab.badge}
        </motion.div>
      )}
      
      {/* Status Indicator */}
      {tab.status && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute -top-1 -right-1 w-2 h-2 rounded-full
            ${tab.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'}
            shadow-lg`}
          style={{ boxShadow: `0 0 10px ${tab.status === 'good' ? '#22c55e' : '#eab308'}` }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ 
              background: `radial-gradient(circle, ${
                tab.status === 'good' ? '#22c55e' : '#eab308'
              } 0%, transparent 70%)`
            }}
          />
        </motion.div>
      )}

      {/* Active Indicator Line */}
      {isActive && (
        <motion.div
          layoutId="active-tab-indicator"
          className="absolute -bottom-[1px] left-0 right-0 h-[2px] rounded-full
            bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );

  // Filter options based on search query
  const getFilteredOptions = (options, query) => {
    if (!query) return options;
    const lowerQuery = query.toLowerCase();
    return options.filter(option => 
      option.label.toLowerCase().includes(lowerQuery) ||
      option.description?.toLowerCase().includes(lowerQuery) ||
      option.metadata?.toLowerCase().includes(lowerQuery)
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'settings':
        const filteredQualityOptions = getFilteredOptions(qualityOptions, searchQuery);
        const filteredAudioOptions = getFilteredOptions(audioOptions, searchQuery);
        const filteredSubtitleOptions = getFilteredOptions(subtitleOptions, searchQuery);
        const filteredSpeedOptions = getFilteredOptions(speedOptions, searchQuery);

        const hasQualityMatches = filteredQualityOptions.length > 0;
        const hasAudioMatches = filteredAudioOptions.length > 0;
        const hasSubtitleMatches = filteredSubtitleOptions.length > 0;
        const hasSpeedMatches = filteredSpeedOptions.length > 0;

        const noResults = searchQuery && !hasQualityMatches && !hasAudioMatches && 
          !hasSubtitleMatches && !hasSpeedMatches;

        return (
          <div>
            {noResults ? (
              <div className="p-4 text-center">
                <div className="text-slate-400 mb-2">No settings found for "{searchQuery}"</div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-violet-400 hover:text-violet-300 text-sm"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <>
                {(!searchQuery || hasQualityMatches) && (
                  <CollapsibleSection
                    title="Video Quality"
                    isExpanded={expandedSections.includes('quality')}
                    onToggle={() => toggleSection('quality')}
                    icon={sectionIcons.quality}
                  >
                    <div className="space-y-2">
                      {filteredQualityOptions.map(option => (
                        <OptionButton
                          key={option.value}
                          selected={videoQuality === option.value}
                          onClick={() => setVideoQuality(option.value)}
                          description={option.description}
                          metadata={option.bandwidth}
                        >
                          <div className="flex items-center gap-2">
                            {option.label}
                            {renderQualityBadge(option.value) && (
                              <span className="px-1.5 py-0.5 text-[10px] font-semibold 
                                bg-violet-500/20 text-violet-400 rounded">
                                {renderQualityBadge(option.value)}
                              </span>
                            )}
                          </div>
                        </OptionButton>
                      ))}
                    </div>
                  </CollapsibleSection>
                )}

                {(!searchQuery || hasAudioMatches) && (
                  <CollapsibleSection
                    title="Audio Track"
                    isExpanded={expandedSections.includes('audio')}
                    onToggle={() => toggleSection('audio')}
                    icon={sectionIcons.audio}
                  >
                    <div className="space-y-2">
                      {filteredAudioOptions.map(option => (
                        <OptionButton
                          key={option.value}
                          selected={audioTrack === option.value}
                          onClick={() => setAudioTrack(option.value)}
                          description={option.description}
                          metadata={option.metadata}
                        >
                          <div className="flex items-center gap-2">
                            {option.icon && <option.icon className="w-4 h-4" />}
                            {option.label}
                          </div>
                        </OptionButton>
                      ))}
                      {!searchQuery && <VolumeSlider value={volume} onChange={setVolume} />}
                    </div>
                  </CollapsibleSection>
                )}

                {(!searchQuery || hasSubtitleMatches) && (
                  <CollapsibleSection
                    title="Subtitles"
                    isExpanded={expandedSections.includes('subtitles')}
                    onToggle={() => toggleSection('subtitles')}
                    icon={sectionIcons.subtitles}
                  >
                    <div className="space-y-3">
                      {!searchQuery && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Enable Subtitles</span>
                          <button
                            onClick={handleSubtitlesToggle}
                            className={`w-12 h-6 rounded-full relative transition-colors duration-200
                              ${localSubtitlesEnabled ? 'bg-violet-500' : 'bg-slate-700'}`}
                          >
                            <div
                              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full
                                transition-transform duration-200 ${
                                  localSubtitlesEnabled ? 'translate-x-6' : 'translate-x-0'
                                }`}
                            />
                          </button>
                        </div>
                      )}
                      {(localSubtitlesEnabled || searchQuery) && (
                        <div className="space-y-2">
                          {filteredSubtitleOptions.map(option => (
                            <OptionButton
                              key={option.value}
                              selected={subtitlesLanguage === option.value}
                              onClick={() => {
                                if (typeof setSubtitlesLanguage === 'function') {
                                  setSubtitlesLanguage(option.value);
                                }
                              }}
                              description={option.description}
                              metadata={option.metadata}
                            >
                              {option.label}
                            </OptionButton>
                          ))}
                        </div>
                      )}
                    </div>
                  </CollapsibleSection>
                )}

                {(!searchQuery || hasSpeedMatches) && (
                  <CollapsibleSection
                    title="Playback Speed"
                    isExpanded={expandedSections.includes('speed')}
                    onToggle={() => toggleSection('speed')}
                    icon={sectionIcons.speed}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {filteredSpeedOptions.map(option => (
                        <OptionButton
                          key={option.value}
                          selected={playbackSpeed === option.value}
                          onClick={() => setPlaybackSpeed(option.value)}
                          description={option.description}
                        >
                          {option.label}
                        </OptionButton>
                      ))}
                    </div>
                  </CollapsibleSection>
                )}
              </>
            )}
          </div>
        );

      case 'stats':
        return renderDetailedStats();

      case 'network':
        return renderDetailedStats();

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className={`fixed top-0 right-0 h-full bg-slate-900/95 backdrop-blur-md
        border-l border-violet-500/20 shadow-2xl z-50
        ${isMobile ? 'w-full' : 'w-[400px]'}
        flex flex-col`}
    >
      {/* Fixed Header */}
      <div className="flex-none">
        <div className="h-16 px-4 border-b border-violet-500/20 flex items-center justify-between">
          <h3 className="text-lg font-medium bg-gradient-to-r from-cyan-400 
            via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Settings
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyboardShortcuts(true)}
              className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              title="Keyboard shortcuts"
            >
              <FiCommand className="w-5 h-5 text-slate-400" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <FiX className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Fixed Tabs */}
        <div className="h-12 px-4 border-b border-violet-500/20 flex items-center gap-2">
          {tabs.map(tab => (
            <Tab
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </div>
            </Tab>
          ))}
        </div>

        {/* Fixed Search */}
        <div className="p-4 border-b border-violet-500/20">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="settings-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search settings..."
              className="w-full bg-slate-800/50 text-white placeholder-slate-400 text-sm
                rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-violet-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400
                  hover:text-white transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-4">
          {renderTabContent()}
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="flex-none h-16 px-4 border-t border-violet-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <FiInfo className="w-4 h-4" />
          <span>Press '?' for keyboard shortcuts</span>
        </div>
        <div className="text-xs text-slate-500">
          {networkStats.effectiveType?.toUpperCase() || 'Unknown'} • 
          {networkStats.downlink ? ` ${networkStats.downlink} Mbps` : ''}
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showKeyboardShortcuts && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center 
          justify-center p-4 z-50">
          <div className="bg-slate-900/90 rounded-2xl border border-violet-500/20 
            shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Keyboard Shortcuts</h3>
              <button
                onClick={() => setShowKeyboardShortcuts(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {keyboardShortcuts.map(({ key, description }) => (
                <div key={key} className="flex items-center gap-3">
                  <kbd className="px-2 py-1 bg-slate-800 rounded text-sm font-medium 
                    text-slate-300 border border-slate-700 min-w-[32px] text-center">
                    {key}
                  </kbd>
                  <span className="text-sm text-slate-400">{description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default memo(SettingsModal); 