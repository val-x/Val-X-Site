import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { 
  FiPlay, FiPause, FiMaximize, FiVolume2, FiVolumeX, 
  FiSkipBack, FiSkipForward, FiBookmark, FiClock, FiChevronLeft, FiChevronRight, FiList, FiGlobe, FiVolume1, FiSettings, FiX, FiMinimize2, FiCommand 
} from 'react-icons/fi';
import { formatTime } from '../../../utils/dateUtils';
import SettingsModal from './SettingsModal';
import ShortcutsModal from './ShortcutsModal';
import VolumeModal from './VolumeModal';
import PlaylistDrawer from './PlaylistDrawer';
import VideoAnalytics from './VideoAnalytics';

const VideoPlayer = ({ 
  videoUrl, 
  title, 
  onProgress, 
  savedProgress,
  playlist = [], // Array of { id, title, url, duration }
  currentIndex = 0,
  onNavigate // Function to handle navigation
}) => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState('default');
  const [selectedSubtitle, setSelectedSubtitle] = useState('off');
  const [showSettings, setShowSettings] = useState(false);
  const [tracks, setTracks] = useState({ audio: [], subtitles: [] });
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPiPActive, setIsPiPActive] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [selectedQuality, setSelectedQuality] = useState('auto');
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);
  const [previewPosition, setPreviewPosition] = useState(0);
  const [showKeyboardOverlay, setShowKeyboardOverlay] = useState(false);
  const previewRef = useRef(null);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [showTitleOverlay, setShowTitleOverlay] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(null);
  const doubleClickTimeout = useRef(null);
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [networkQuality, setNetworkQuality] = useState('high');
  const [playbackStats, setPlaybackStats] = useState({
    watchTime: 0,
    bufferingEvents: 0,
    qualityChanges: 0
  });
  const miniPlayerRef = useRef(null);
  const gestureRef = useRef({ startX: 0, startY: 0 });
  const timeDisplayRef = useRef(null);
  const [networkStats, setNetworkStats] = useState({
    downlink: 0,
    effectiveType: '4g',
    rtt: 0
  });
  const [thumbnailPreview, setThumbnailPreview] = useState({
    show: false,
    time: 0,
    position: 0,
    image: null
  });
  const [analytics, setAnalytics] = useState({
    startTime: Date.now(),
    playCount: 0,
    pauseCount: 0,
    seekCount: 0,
    bufferingCount: 0,
    totalPlayTime: 0,
    averagePlaybackSpeed: 1,
    qualityChanges: 0
  });
  const [showChapterList, setShowChapterList] = useState(false);
  const [hoveredChapter, setHoveredChapter] = useState(null);
  const chaptersRef = useRef(null);

  // Add new gradient styles
  const gradientClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500',
    hover: 'hover:from-cyan-400 hover:via-violet-400 hover:to-fuchsia-400',
    text: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400',
    border: 'border-violet-500/30',
    glow: 'shadow-lg shadow-violet-500/20'
  };

  useEffect(() => {
    if (savedProgress) {
      setCurrentTime(savedProgress);
      if (videoRef.current) {
        videoRef.current.currentTime = savedProgress;
      }
    }
  }, [savedProgress]);

  useEffect(() => {
    let hideControlsTimeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(hideControlsTimeout);
      hideControlsTimeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(hideControlsTimeout);
    };
  }, [isPlaying]);

  useEffect(() => {
    // Simulate available audio tracks and subtitles
    setTracks({
      audio: [
        { id: 'default', label: 'Original', language: 'en' },
        { id: 'audio-es', label: 'Spanish', language: 'es' },
        { id: 'audio-fr', label: 'French', language: 'fr' }
      ],
      subtitles: [
        { id: 'off', label: 'Off', language: 'off' },
        { id: 'sub-en', label: 'English', language: 'en' },
        { id: 'sub-es', label: 'Spanish', language: 'es' },
        { id: 'sub-fr', label: 'French', language: 'fr' }
      ]
    });
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (document.activeElement.tagName === 'INPUT' || 
          document.activeElement.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          handlePlay();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          setIsMuted(!isMuted);
          break;
        case 'arrowleft':
          e.preventDefault();
          handleSkip(-10);
          break;
        case 'arrowright':
          e.preventDefault();
          handleSkip(10);
          break;
        case 'arrowup':
          e.preventDefault();
          handleVolumeChange(Math.min(volume + 0.1, 1));
          break;
        case 'arrowdown':
          e.preventDefault();
          handleVolumeChange(Math.max(volume - 0.1, 0));
          break;
        case 'p':
          e.preventDefault();
          togglePiP();
          break;
        case ',':
          e.preventDefault();
          handlePlaybackSpeed('decrease');
          break;
        case '.':
          e.preventDefault();
          handlePlaybackSpeed('increase');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, isMuted, volume]);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setAnalytics(prev => ({ ...prev, pauseCount: prev.pauseCount + 1 }));
      } else {
        videoRef.current.play();
        setAnalytics(prev => ({ ...prev, playCount: prev.playCount + 1 }));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const time = video.currentTime;
      setCurrentTime(time);
      
      // Update progress
      onProgress?.(time);
      
      // Update chapter if available
      updateCurrentChapter?.(time);
      
      // Update buffered progress
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        const progress = (bufferedEnd / duration) * 100;
        // You can add a state for buffered progress if needed
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      setDuration(video.duration);
      
      // Set saved progress if available
      if (savedProgress && savedProgress < video.duration) {
        video.currentTime = savedProgress;
        setCurrentTime(savedProgress);
      }
    }
  };

  const handleProgressClick = (e) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * duration;
      
      // Update video time
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      
      // Update progress
      onProgress?.(newTime);
    }
  };

  const handleSkip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullscreen = async () => {
    try {
      const container = containerRef.current;
      
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
        setIsFullscreenMode(true);
        
        // Handle different browser prefixes
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          await container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
          await container.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
        setIsFullscreenMode(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Implement bookmark saving logic
  };

  // Add navigation handlers
  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < playlist.length - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  // Add auto-next on video completion
  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (currentIndex < playlist.length - 1) {
      onNavigate?.(currentIndex + 1);
    }
  };

  const togglePiP = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiPActive(false);
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
        setIsPiPActive(true);
      }
    } catch (error) {
      console.error('PiP error:', error);
    }
  };

  const handlePlaybackSpeed = (action) => {
    const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    let newIndex;

    if (action === 'increase') {
      newIndex = Math.min(currentIndex + 1, speeds.length - 1);
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    const newSpeed = speeds[newIndex];
    setPlaybackSpeed(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      handleVolumeChange(previousVolume);
    } else {
      setPreviousVolume(volume);
      handleVolumeChange(0);
    }
    setIsMuted(!isMuted);
  };

  const qualityOptions = [
    { id: 'auto', label: 'Auto', resolution: 'Auto' },
    { id: '1080p', label: '1080p', resolution: '1920x1080' },
    { id: '720p', label: '720p', resolution: '1280x720' },
    { id: '480p', label: '480p', resolution: '854x480' },
    { id: '360p', label: '360p', resolution: '640x360' }
  ];

  // Add new helper function for modal positioning
  const getModalPosition = (type) => {
    if (isFullscreenMode) {
      switch (type) {
        case 'settings':
          return 'bottom-32 right-8 w-96';
        case 'shortcuts':
          return 'bottom-32 left-8 w-96';
        case 'volume':
          return 'bottom-24 left-24';
        default:
          return '';
      }
    }

    // Responsive positioning for minimized state
    return {
      settings: 'bottom-full right-0 mb-4 w-72 sm:w-80 lg:w-96 lg:bottom-20 lg:mb-0',
      shortcuts: 'bottom-full left-0 mb-4 w-72 sm:w-80 lg:w-96 lg:bottom-20 lg:mb-0',
      volume: 'bottom-16 left-0'
    }[type];
  };

  // Add custom scrollbar styles
  const customScrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(15, 23, 42, 0.3);
      border-radius: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(59, 130, 246, 0.5);
      border-radius: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(59, 130, 246, 0.7);
    }
  `;

  // Add style tag to head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = customScrollbarStyles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Add these new event handlers
  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handlePlaying = () => {
    setIsBuffering(false);
  };

  // Add preview functionality
  const handleProgressHover = async (e) => {
    if (progressRef.current && duration) {
      const rect = progressRef.current.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      const time = position * duration;
      
      // Generate thumbnail preview
      const thumbnail = await generateThumbnail(time);
      
      setThumbnailPreview({
        show: true,
        time,
        position: e.clientX - rect.left,
        image: thumbnail
      });
    }
  };

  // Add new helper function for chapters
  const updateCurrentChapter = (time) => {
    const current = chapters.find((chapter, index) => {
      const nextChapter = chapters[index + 1];
      return time >= chapter.time && (!nextChapter || time < nextChapter.time);
    });
    setCurrentChapter(current);
  };

  // Add useEffect for demo chapters
  useEffect(() => {
    // Demo chapters - in real app, these would come from props or API
    setChapters([
      { id: 1, title: 'Introduction', time: 0 },
      { id: 2, title: 'Main Content', time: 60 },
      { id: 3, title: 'Summary', time: 120 }
    ]);
  }, []);

  // Add double-click handler
  const handleVideoClick = () => {
    if (doubleClickTimeout.current) {
      clearTimeout(doubleClickTimeout.current);
      doubleClickTimeout.current = null;
      toggleFullscreen();
    } else {
      doubleClickTimeout.current = setTimeout(() => {
        handlePlay();
        doubleClickTimeout.current = null;
      }, 300);
    }
  };

  // Add touch event handlers
  const touchStartTime = useRef(0);
  const touchStartX = useRef(0);
  const isSeeking = useRef(false);

  const handleTouchStart = (e) => {
    touchStartTime.current = Date.now();
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isSeeking.current && Date.now() - touchStartTime.current > 500) {
      isSeeking.current = true;
    }

    if (isSeeking.current) {
      const diff = (e.touches[0].clientX - touchStartX.current) / window.innerWidth;
      const newTime = currentTime + (diff * duration);
      if (videoRef.current) {
        videoRef.current.currentTime = Math.max(0, Math.min(duration, newTime));
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isSeeking.current && Date.now() - touchStartTime.current < 300) {
      handlePlay();
    }
    isSeeking.current = false;
  };

  // Add network quality monitoring
  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    const updateNetworkQuality = () => {
      if (connection) {
        setNetworkStats({
          downlink: connection.downlink,
          effectiveType: connection.effectiveType,
          rtt: connection.rtt
        });

        // Auto-adjust quality based on network conditions
        if (connection.effectiveType === '4g' && connection.downlink > 5) {
          setSelectedQuality('1080p');
        } else if (connection.effectiveType === '4g' || connection.downlink > 2) {
          setSelectedQuality('720p');
        } else {
          setSelectedQuality('480p');
        }
      }
    };

    if (connection) {
      connection.addEventListener('change', updateNetworkQuality);
      updateNetworkQuality();
      return () => connection.removeEventListener('change', updateNetworkQuality);
    }
  }, []);

  // Add playback analytics
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setAnalytics(prev => ({
          ...prev,
          totalPlayTime: prev.totalPlayTime + 1,
          averagePlaybackSpeed: (prev.averagePlaybackSpeed + playbackSpeed) / 2
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Add mini-player functionality
  const toggleMiniPlayer = () => {
    if (!isMiniPlayer) {
      setIsMiniPlayer(true);
      if (miniPlayerRef.current) {
        miniPlayerRef.current.style.transform = 'translate(calc(100vw - 320px), calc(100vh - 180px))';
      }
    } else {
      setIsMiniPlayer(false);
    }
  };

  // Add gesture handling for mobile
  const handleTouchStartGesture = (e) => {
    const touch = e.touches[0];
    gestureRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      timeStamp: e.timeStamp
    };
  };

  const handleTouchMoveGesture = (e) => {
    if (!gestureRef.current.startX) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - gestureRef.current.startX;
    const deltaY = touch.clientY - gestureRef.current.startY;
    const deltaTime = e.timeStamp - gestureRef.current.timeStamp;

    // Horizontal swipe for seeking
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      const seekTime = (deltaX / window.innerWidth) * duration * 0.5;
      if (videoRef.current) {
        videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seekTime));
      }
    }

    // Vertical swipe for volume
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
      const volumeChange = -(deltaY / window.innerHeight);
      handleVolumeChange(Math.max(0, Math.min(1, volume + volumeChange)));
    }
  };

  // Add "Watch Later" functionality
  const toggleWatchLater = () => {
    setIsWatchLater(!isWatchLater);
    // Save to local storage or backend
    const watchLaterList = JSON.parse(localStorage.getItem('watchLater') || '[]');
    if (!isWatchLater) {
      watchLaterList.push({
        id: videoUrl,
        title,
        timestamp: Date.now(),
        duration,
        currentTime
      });
    } else {
      const index = watchLaterList.findIndex(item => item.id === videoUrl);
      if (index !== -1) {
        watchLaterList.splice(index, 1);
      }
    }
    localStorage.setItem('watchLater', JSON.stringify(watchLaterList));
  };

  // Add demo chapters if not provided
  useEffect(() => {
    if (!chapters || chapters.length === 0) {
      setChapters([
        { id: 1, title: 'Introduction', time: 0, description: 'Overview of the topic' },
        { id: 2, title: 'Main Content', time: 60, description: 'Detailed explanation' },
        { id: 3, title: 'Examples', time: 120, description: 'Practical demonstrations' },
        { id: 4, title: 'Summary', time: 180, description: 'Key takeaways' }
      ]);
    }
  }, [chapters]);

  // Add chapter navigation functions
  const navigateToChapter = (chapter) => {
    if (videoRef.current) {
      videoRef.current.currentTime = chapter.time;
      setCurrentTime(chapter.time);
      setCurrentChapter(chapter);
    }
  };

  const getNextChapter = () => {
    if (!currentChapter) return chapters[0];
    const currentIndex = chapters.findIndex(c => c.id === currentChapter.id);
    return chapters[currentIndex + 1];
  };

  // Update the main container
  return (
    <div 
      ref={containerRef}
      className={`relative bg-slate-900/90 backdrop-blur-lg rounded-2xl overflow-hidden 
        border border-violet-500/20 ${gradientClasses.glow} ${
        isFullscreenMode ? 'fixed inset-0 z-50' : 'h-[calc(100vh-120px)]'
      }`}
    >
      <div className={`flex h-full`}>
        {/* Main Video Section */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Video Container */}
          <div 
            className={`relative flex-1 bg-slate-950 ${
              isFullscreenMode ? 'h-screen' : 'min-h-0'
            } ${isTheaterMode ? 'aspect-[21/9]' : 'aspect-video'}`}
            onMouseEnter={() => {
              setShowControls(true);
              setShowTitleOverlay(true);
            }}
            onMouseLeave={() => {
              if (isPlaying) {
                setShowControls(false);
                setShowTitleOverlay(false);
              }
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src={videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnd}
              onLoadStart={handleLoadStart}
              onCanPlay={handleCanPlay}
              onWaiting={handleWaiting}
              onPlaying={handlePlaying}
              onClick={handleVideoClick}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              muted={isMuted}
            />
            
            {/* Title Overlay */}
            <AnimatePresence>
              {showTitleOverlay && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent"
                >
                  <h2 className="text-2xl font-semibold text-white">{title}</h2>
                  {currentChapter && (
                    <p className="text-sm text-slate-300 mt-1">
                      Chapter: {currentChapter.title}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Overlay Controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"
            >
              {/* Center Play Button */}
              <motion.button
                onClick={handlePlay}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  w-20 h-20 rounded-full backdrop-blur-sm flex items-center justify-center 
                  ${gradientClasses.primary} ${gradientClasses.hover} transition-all duration-300
                  border border-white/20 group`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="absolute inset-0 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors" />
                {isPlaying ? (
                  <FiPause className="w-10 h-10 text-white relative z-10" />
                ) : (
                  <FiPlay className="w-10 h-10 ml-1 text-white relative z-10" />
                )}
              </motion.button>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                {/* Progress Bar */}
                <div 
                  ref={progressRef}
                  onClick={handleProgressClick}
                  onMouseMove={handleProgressHover}
                  onMouseLeave={() => setThumbnailPreview(prev => ({ ...prev, show: false }))}
                  className="relative h-1.5 bg-slate-700/50 rounded-full overflow-hidden cursor-pointer group"
                >
                  <motion.div 
                    className={`h-full ${gradientClasses.primary} group-hover:shadow-lg 
                      group-hover:shadow-violet-500/30 transition-all duration-300`}
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                    layoutId="progress"
                  />
                  
                  {/* Thumbnail Preview */}
                  <AnimatePresence>
                    {thumbnailPreview.show && thumbnailPreview.image && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute bottom-8 -translate-x-1/2 pointer-events-none"
                        style={{ left: thumbnailPreview.position }}
                      >
                        <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg border border-violet-500/20 p-1">
                          <img 
                            src={thumbnailPreview.image} 
                            alt="Preview" 
                            className="w-40 h-[90px] rounded"
                          />
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 
                            backdrop-blur-sm rounded-md px-2 py-1 text-xs font-medium text-white">
                            {formatTime(thumbnailPreview.time)}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between">
                  {/* Left Controls */}
                  <div className="flex items-center gap-4">
                    <ControlButton onClick={handlePlay} icon={isPlaying ? FiPause : FiPlay} />
                    <ControlButton onClick={() => handleSkip(-10)} icon={FiSkipBack} />
                    <ControlButton onClick={() => handleSkip(10)} icon={FiSkipForward} />
                    
                    <div className="relative group"
                      onMouseEnter={() => setShowVolumeSlider(true)}
                      onMouseLeave={() => setShowVolumeSlider(false)}
                    >
                      <ControlButton 
                        onClick={toggleMute}
                        icon={volume === 0 || isMuted ? FiVolumeX : volume < 0.5 ? FiVolume1 : FiVolume2}
                      />
                      <AnimatePresence>
                        {showVolumeSlider && (
                          <VolumeModal
                            position={getModalPosition('volume')}
                            volume={volume}
                            onVolumeChange={handleVolumeChange}
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="text-white/90 text-sm font-medium tracking-wide">
                      <span ref={timeDisplayRef}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-4">
                    <ControlButton 
                      onClick={toggleBookmark}
                      icon={FiBookmark}
                      active={isBookmarked}
                    />
                    <ControlButton 
                      onClick={() => setShowSettings(!showSettings)}
                      icon={FiSettings}
                      active={showSettings}
                    />
                    <ControlButton 
                      onClick={togglePiP}
                      icon={FiMinimize2}
                      active={isPiPActive}
                    />
                    <ControlButton 
                      onClick={() => setShowShortcuts(!showShortcuts)}
                      icon={FiCommand}
                      active={showShortcuts}
                    />
                    <ControlButton 
                      onClick={toggleFullscreen}
                      icon={isFullscreen ? FiMinimize2 : FiMaximize}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            {showControls && (
              <>
                <NavigationButton
                  direction="left"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                />
                <NavigationButton
                  direction="right"
                  onClick={handleNext}
                  disabled={currentIndex === playlist.length - 1}
                />
              </>
            )}
          </div>

          {/* Video Info Bar */}
          <div className="flex-shrink-0 p-4 border-t border-violet-500/20 bg-slate-900/90 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-semibold ${gradientClasses.text}`}>{title}</h3>
                <p className="text-sm text-slate-400">
                  {currentIndex + 1} of {playlist.length}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <FiClock className="w-4 h-4" />
                  <span className="text-sm">{formatTime(duration)}</span>
                </div>
                <PlaylistButton
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  active={showPlaylist}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Playlist Drawer */}
        <PlaylistDrawer
          playlist={playlist}
          currentIndex={currentIndex}
          onNavigate={onNavigate}
          isFullscreenMode={isFullscreenMode}
          showPlaylist={showPlaylist}
          title={title}
        />
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showSettings && (
          <SettingsModal
            onClose={() => setShowSettings(false)}
            position={getModalPosition('settings')}
            tracks={tracks}
            selectedAudio={selectedAudio}
            setSelectedAudio={setSelectedAudio}
            selectedSubtitle={selectedSubtitle}
            setSelectedSubtitle={setSelectedSubtitle}
            playbackSpeed={playbackSpeed}
            setPlaybackSpeed={setPlaybackSpeed}
            selectedQuality={selectedQuality}
            setSelectedQuality={setSelectedQuality}
            qualityOptions={qualityOptions}
            videoRef={videoRef}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showShortcuts && (
          <ShortcutsModal
            onClose={() => setShowShortcuts(false)}
            position={getModalPosition('shortcuts')}
          />
        )}
      </AnimatePresence>

      {(isLoading || isBuffering) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full border-4 border-violet-500/20 border-t-violet-500"
          />
        </div>
      )}

      {showKeyboardOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setShowKeyboardOverlay(false)}
        >
          <div className="bg-slate-900/90 rounded-2xl border border-violet-500/20 p-8 max-w-2xl w-full">
            <h3 className={`text-xl font-semibold mb-6 ${gradientClasses.text}`}>
              Keyboard Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { key: 'Space/K', action: 'Play/Pause' },
                { key: 'F', action: 'Toggle Fullscreen' },
                { key: 'M', action: 'Toggle Mute' },
                { key: '←', action: 'Rewind 10s' },
                { key: '→', action: 'Forward 10s' },
                { key: '↑', action: 'Volume Up' },
                { key: '↓', action: 'Volume Down' },
                { key: 'P', action: 'Picture in Picture' },
                { key: ',', action: 'Decrease Speed' },
                { key: '.', action: 'Increase Speed' }
              ].map(({ key, action }) => (
                <div key={key} className="flex items-center gap-4">
                  <kbd className="px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-slate-300 
                    border border-violet-500/20">
                    {key}
                  </kbd>
                  <span className="text-slate-400">{action}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/90 
        backdrop-blur-sm rounded-lg border border-violet-500/20 px-3 py-1.5">
        <div className={`w-2 h-2 rounded-full ${
          networkStats.effectiveType === '4g' && networkStats.downlink > 5 ? 'bg-green-400' :
          networkStats.effectiveType === '4g' || networkStats.downlink > 2 ? 'bg-yellow-400' :
          'bg-red-400'
        }`} />
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-300">
            {selectedQuality === 'auto' ? 'AUTO' : selectedQuality}
          </span>
          <span className="text-[10px] text-slate-400">
            {networkStats.downlink.toFixed(1)} Mbps
          </span>
        </div>
      </div>

      {/* Mini Player */}
      {isMiniPlayer && (
        <motion.div
          ref={miniPlayerRef}
          drag
          dragConstraints={{ left: 0, top: 0, right: window.innerWidth - 320, bottom: window.innerHeight - 180 }}
          className="fixed bottom-4 right-4 w-80 h-45 bg-slate-900 rounded-lg overflow-hidden 
            shadow-xl border border-violet-500/20 z-50"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            src={videoUrl}
            // ... other video props
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
            <h4 className="text-sm font-medium text-white truncate">{title}</h4>
          </div>
          <button
            onClick={() => setIsMiniPlayer(false)}
            className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <FiX className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Playback Stats */}
      {showSettings && (
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg 
          border border-violet-500/20 p-4 text-sm">
          <h4 className="font-medium text-white mb-2">Playback Stats</h4>
          <div className="space-y-1 text-slate-300">
            <p>Watch Time: {formatTime(playbackStats.watchTime)}</p>
            <p>Buffering Events: {playbackStats.bufferingEvents}</p>
            <p>Quality Changes: {playbackStats.qualityChanges}</p>
            <p>Network: {networkQuality}</p>
          </div>
        </div>
      )}

      {/* Watch Later Button */}
      <ControlButton
        onClick={toggleWatchLater}
        icon={FiClock}
        active={isWatchLater}
        className="absolute top-4 right-16"
      />

      {/* Mini Player Toggle */}
      <ControlButton
        onClick={toggleMiniPlayer}
        icon={isMiniPlayer ? FiMaximize : FiMinimize2}
        active={isMiniPlayer}
        className="absolute top-4 right-28"
      />

      <VideoAnalytics
        showSettings={showSettings}
        analytics={analytics}
        networkStats={networkStats}
        playbackStats={playbackStats}
        chapters={chapters}
        currentTime={currentTime}
        duration={duration}
        currentChapter={currentChapter}
        onChapterClick={(chapter) => {
          if (videoRef.current) {
            videoRef.current.currentTime = chapter.time;
          }
        }}
        gradientClasses={gradientClasses}
      />
    </div>
  );
};

// New component for control buttons
const ControlButton = ({ onClick, icon: Icon, active = false }) => (
  <motion.button
    onClick={onClick}
    className={`p-2 rounded-lg transition-all duration-300 ${
      active 
        ? 'bg-violet-500/20 text-violet-400' 
        : 'text-white/90 hover:bg-white/10'
    }`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon className="w-5 h-5" />
  </motion.button>
);

// New component for navigation buttons
const NavigationButton = ({ direction, onClick, disabled }) => {
  if (disabled) return null;

  return (
    <motion.button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === 'left' ? 'left-6' : 'right-6'
      } w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 via-violet-500/20 
      to-fuchsia-500/20 backdrop-blur-sm flex items-center justify-center text-white 
      border border-violet-500/30 group transition-all duration-300`}
      whileHover={{ 
        scale: 1.1, 
        x: direction === 'left' ? -4 : 4 
      }}
      whileTap={{ scale: 0.9 }}
    >
      {direction === 'left' ? (
        <FiChevronLeft className="w-6 h-6 group-hover:text-violet-400 transition-colors" />
      ) : (
        <FiChevronRight className="w-6 h-6 group-hover:text-violet-400 transition-colors" />
      )}
    </motion.button>
  );
};

// New component for playlist button
const PlaylistButton = ({ onClick, active }) => (
  <motion.button
    onClick={onClick}
    className={`p-2 rounded-lg transition-all duration-300 ${
      active 
        ? 'bg-violet-500/20 text-violet-400' 
        : 'text-slate-400 hover:text-white hover:bg-white/10'
    }`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <FiList className="w-5 h-5" />
  </motion.button>
);

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onProgress: PropTypes.func,
  savedProgress: PropTypes.number,
  playlist: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    description: PropTypes.string
  })),
  currentIndex: PropTypes.number,
  onNavigate: PropTypes.func,
  chapters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    description: PropTypes.string
  }))
};

export default VideoPlayer; 