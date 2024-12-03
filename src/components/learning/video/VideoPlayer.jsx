import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { 
  FiPlay, FiPause, FiMaximize, FiVolume2, FiVolumeX, 
  FiSkipBack, FiSkipForward, FiBookmark, FiClock, FiChevronLeft, FiChevronRight, FiList, FiGlobe, FiVolume1, FiSettings, FiX, FiMinimize2, FiCommand, FiCopy 
} from 'react-icons/fi';
import { 
  formatTime, 
  videoErrorHandler,
  getVolumeIcon,
  calculateBufferedProgress,
  toggleFullscreen,
  getCurrentChapter,
  getCustomScrollbarStyles,
  getDemoChapters,
  videoLoadingHandlers,
  handleProgressHover,
  handlePlaybackSpeedChange,
  volumeControls,
  togglePictureInPicture,
  getQualityOptions,
  getModalPosition,
  touchEventHandlers,
  handlePlayPause,
  handleTimeUpdate,
  handleLoadedMetadata,
  handleProgressClick,
  handleSkip,
  handleWatchLater,
  handleMouseMovement,
  handleKeyboardShortcuts,
  monitorNetworkQuality,
  trackPlaybackAnalytics,
  handleGestureSeeking,
  handleMiniPlayer,
  handleFullscreenEvents,
  handlePlaylistNavigation,
  handleVideoEnd,
  initializeTracks,
  restoreSavedProgress,
  handleChapterNavigation,
  getNextChapter,
  initializeDemoChapters,
  handleNetworkQuality,
  handleBookmark,
  handleTheaterMode,
  handleGestureStart,
  initializeAnalytics,
  initializePlaybackStats,
  initializeNetworkStats,
  initializeThumbnailPreview,
  handleDoubleClick,
  handleQualityChange,
  handleTheaterModeToggle,
  initializeVideoEvents,
  handleOverlayVisibility,
  updatePlaybackStats,
  generateThumbnail
} from '../../../utils/video';
import SettingsModal from './SettingsModal';
import ShortcutsModal from './ShortcutsModal';
import VolumeModal from './VolumeModal';
import PlaylistDrawer from './PlaylistDrawer';
import ThumbnailPreview from './ThumbnailPreview';
import VideoInfoBar from './VideoInfoBar';
import MiniPlayer from './MiniPlayer';
import ChapterMarkers from './ChapterMarkers';


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
  const containerRef = useRef(null);
  const doubleClickTimeout = useRef(null);
  const touchStartTime = useRef(0);
  const touchStartX = useRef(0);
  const isSeeking = useRef(false);
  const miniPlayerRef = useRef(null);
  const gestureRef = useRef({ startX: 0, startY: 0 });
  const timeDisplayRef = useRef(null);
  const chaptersRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showControls, setShowControls] = useState(true);
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
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [showKeyboardOverlay, setShowKeyboardOverlay] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [showTitleOverlay, setShowTitleOverlay] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [networkQuality, setNetworkQuality] = useState('high');
  const [showChapterList, setShowChapterList] = useState(false);
  const [hoveredChapter, setHoveredChapter] = useState(null);
  const [networkStats, setNetworkStats] = useState(initializeNetworkStats());
  const [thumbnailPreview, setThumbnailPreview] = useState(initializeThumbnailPreview());
  const [analytics, setAnalytics] = useState(initializeAnalytics());
  const [playbackStats, setPlaybackStats] = useState(initializePlaybackStats());
  const [previewThumbnail, setPreviewThumbnail] = useState(null);
  const [showPreviewPlayer, setShowPreviewPlayer] = useState(false);

  // Add new gradient styles
  const gradientClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500',
    hover: 'hover:from-cyan-400 hover:via-violet-400 hover:to-fuchsia-400',
    text: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400',
    border: 'border-violet-500/30',
    glow: 'shadow-lg shadow-violet-500/20'
  };

  // Add new responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  // Add resize handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    return handleFullscreenEvents(setIsFullscreen);
  }, []);

  useEffect(() => {
    restoreSavedProgress({
      savedProgress,
      videoRef,
      setCurrentTime
    });
  }, [savedProgress]);

  useEffect(() => {
    setTracks(initializeTracks());
  }, []);

  const handlePrevious = () => {
    handlePlaylistNavigation({
      direction: 'prev',
      currentIndex,
      playlistLength: playlist.length,
      onNavigate
    });
  };

  const handleNext = () => {
    handlePlaylistNavigation({
      direction: 'next',
      currentIndex,
      playlistLength: playlist.length,
      onNavigate
    });
  };

  const handleVideoEndWrapper = () => {
    handleVideoEnd({
      setIsPlaying,
      currentIndex,
      playlistLength: playlist.length,
      onNavigate
    });
  };

  const navigateToChapter = (chapter) => {
    handleChapterNavigation({
      chapter,
      videoRef,
      setCurrentTime,
      setCurrentChapter
    });
  };

  const getNextChapterWrapper = () => {
    return getNextChapter({
      currentChapter,
      chapters
    });
  };

  useEffect(() => {
    if (!chapters || chapters.length === 0) {
      setChapters(initializeDemoChapters());
    }
  }, [chapters]);

  useEffect(() => {
    return handleMouseMovement({
      setShowControls,
      isPlaying
    });
  }, [isPlaying]);

  useEffect(() => {
    const keyboardHandler = handleKeyboardShortcuts({
      handlePlay,
      toggleFullscreen,
      setIsMuted,
      handleSkip: handleSkipWrapper,
      handleVolumeChange,
      togglePiP,
      handlePlaybackSpeed: handlePlaybackSpeedWrapper,
      volume,
      isMuted
    });

    document.addEventListener('keydown', keyboardHandler);
    return () => document.removeEventListener('keydown', keyboardHandler);
  }, [isPlaying, isMuted, volume]);

  useEffect(() => {
    return monitorNetworkQuality({
      setNetworkStats,
      setSelectedQuality
    });
  }, []);

  useEffect(() => {
    return trackPlaybackAnalytics({
      isPlaying,
      playbackSpeed,
      setAnalytics
    });
  }, [isPlaying, playbackSpeed]);

  const handlePlay = () => {
    const newAnalytics = handlePlayPause({ videoRef, isPlaying, analytics });
    setAnalytics(newAnalytics);
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdateWrapper = () => {
    handleTimeUpdate({
      videoRef,
      setCurrentTime,
      onProgress,
      updateCurrentChapter
    });
  };

  const handleLoadedMetadataWrapper = () => {
    handleLoadedMetadata({
      videoRef,
      setDuration,
      savedProgress,
      setCurrentTime
    });
  };

  const handleProgressClickWrapper = (e) => {
    if (e.type === 'click') {
      handleProgressClick({
        e,
        progressRef,
        videoRef,
        duration,
        setCurrentTime,
        onProgress
      });
    }
  };

  const handleSkipWrapper = (seconds) => {
    handleSkip({
      seconds,
      videoRef,
      currentTime,
      duration,
      setCurrentTime
    });
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

  const toggleBookmark = () => {
    handleBookmark({
      videoUrl,
      title,
      currentTime,
      duration,
      isBookmarked,
      setIsBookmarked
    });
  };

  const togglePiP = async () => {
    const newPiPState = await togglePictureInPicture(isPiPActive, videoRef);
    setIsPiPActive(newPiPState);
  };

  const handlePlaybackSpeedWrapper = (action) => {
    const newSpeed = handlePlaybackSpeedChange(action, playbackSpeed, videoRef.current);
    setPlaybackSpeed(newSpeed);
  };

  const handleVolumeChange = (newVolume) => {
    volumeControls.handleVolumeChange(newVolume, videoRef, setVolume, setIsMuted);
  };

  const toggleMute = () => {
    volumeControls.toggleMute(
      isMuted,
      volume,
      previousVolume,
      videoRef,
      setIsMuted,
      setVolume,
      setPreviousVolume
    );
  };

  const qualityOptions = getQualityOptions();

  const modalPosition = (type) => getModalPosition(type, isFullscreenMode);

  const handleTouchStart = (e) => {
    touchEventHandlers.handleTouchStart(e, touchStartTime, touchStartX);
  };

  const handleTouchMove = (e) => {
    touchEventHandlers.handleTouchMove(
      e,
      { touchStartTime, touchStartX, isSeeking },
      { currentTime, duration },
      videoRef
    );
  };

  const handleTouchEnd = () => {
    touchEventHandlers.handleTouchEnd(touchStartTime, isSeeking, handlePlay);
  };

  // Add network quality monitoring
  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return handleNetworkQuality({
      connection,
      setNetworkStats,
      setSelectedQuality
    });
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
    handleMiniPlayer({
      isMiniPlayer,
      setIsMiniPlayer,
      miniPlayerRef
    });
  };

  // Add gesture handling for mobile
  const handleTouchStartGesture = (e) => {
    handleGestureStart({
      e,
      gestureRef
    });
  };

  const handleTouchMoveGesture = (e) => {
    handleGestureSeeking({
      e,
      gestureRef,
      videoRef,
      currentTime,
      duration,
      volume,
      handleVolumeChange
    });
  };

  // Add "Watch Later" functionality
  const toggleWatchLater = () => {
    const newWatchLaterState = handleWatchLater({
      isWatchLater,
      videoUrl,
      title,
      duration,
      currentTime
    });
    setIsWatchLater(newWatchLaterState);
  };

  // Add missing useEffect for scrollbar styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = getCustomScrollbarStyles();
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Add missing useEffect for demo chapters
  useEffect(() => {
    setChapters(getDemoChapters());
  }, []);

  // Add missing double-click handler
  const handleVideoClick = () => {
    handleDoubleClick({
      doubleClickTimeout,
      handlePlay,
      toggleFullscreen
    });
  };

  // Add missing loading handlers
  const handleLoadStart = () => videoLoadingHandlers.handleLoadStart(setIsLoading);
  const handleCanPlay = () => videoLoadingHandlers.handleCanPlay(setIsLoading);
  const handleWaiting = () => videoLoadingHandlers.handleWaiting(setIsBuffering);
  const handlePlaying = () => videoLoadingHandlers.handlePlaying(setIsBuffering);

  // Add missing progress hover handler
  const handleProgressHoverWrapper = (e) => {
    handleProgressHover(
      e, 
      { progressRef, videoRef }, 
      { duration }, 
      setThumbnailPreview
    );
  };

  // Add missing chapter update handler
  const updateCurrentChapter = (time) => {
    const current = getCurrentChapter(time, chapters);
    setCurrentChapter(current);
  };

  const handleQualityChangeWrapper = (quality) => {
    handleQualityChange({
      quality,
      setSelectedQuality,
      setPlaybackStats,
      videoRef,
      currentTime
    });
  };

  const toggleTheaterMode = () => {
    handleTheaterModeToggle({
      isTheaterMode,
      setIsTheaterMode,
      containerRef
    });
  };

  useEffect(() => {
    return initializeVideoEvents({
      videoRef,
      handleTimeUpdateWrapper,
      handleLoadedMetadataWrapper,
      handleVideoEndWrapper,
      handleLoadStart,
      handleCanPlay,
      handleWaiting,
      handlePlaying,
      handleVideoClick,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      isMuted
    });
  }, [isPlaying, isMuted, volume, playbackSpeed, videoRef, currentTime]);

  const overlayHandlers = handleOverlayVisibility({
    isPlaying,
    setShowControls,
    setShowTitleOverlay
  });

  useEffect(() => {
    updatePlaybackStats({
      isPlaying,
      playbackSpeed,
      bufferingEvents: playbackStats.bufferingEvents,
      qualityChanges: playbackStats.qualityChanges,
      setPlaybackStats
    });
  }, [isPlaying, playbackSpeed]);

  // Define getSettingsPosition inside the component
  const getSettingsPosition = () => {
    if (isMobile) {
      return {};
    }
    
    return {
      position: 'absolute',
      top: isFullscreenMode ? '20px' : '80px',
      right: '20px'
    };
  };

  // Update handleProgressHover to handle cross-origin images safely
  const handleProgressHover = async (e) => {
    e.preventDefault();
    
    if (progressRef.current && duration) {
      const rect = progressRef.current.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      const previewTime = Math.max(0, Math.min(position * duration, duration));
      
      try {
        // Create a temporary video element for preview
        const tempVideo = document.createElement('video');
        tempVideo.crossOrigin = "anonymous"; // Add cross-origin attribute
        tempVideo.src = videoUrl;
        tempVideo.preload = 'auto';
        
        // Set the preview time and wait for the frame to load
        tempVideo.currentTime = previewTime;
        await new Promise((resolve) => {
          tempVideo.addEventListener('seeked', resolve, { once: true });
        });

        // Generate thumbnail
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 360;
        const ctx = canvas.getContext('2d');
        
        // Set cross-origin property on context if needed
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        try {
          ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
          setPreviewThumbnail(thumbnailUrl);
          setShowPreviewPlayer(true);
          setPreviewTime(previewTime);
          setPreviewPosition({
            x: e.clientX,
            y: rect.top
          });
        } catch (canvasError) {
          console.error('Canvas error:', canvasError);
        }

        // Cleanup
        tempVideo.remove();
        canvas.remove();
      } catch (error) {
        console.error('Error generating preview:', error);
      }
    }
  };

  // Separate click handler to handle seeking
  const handleProgressClick = (e) => {
    if (progressRef.current && duration) {
      const rect = progressRef.current.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      const newTime = position * duration;
      
      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
        if (onProgress) {
          onProgress(newTime);
        }
      }
    }
  };

  // Add cleanup for preview
  useEffect(() => {
    return () => {
      if (previewThumbnail) {
        URL.revokeObjectURL(previewThumbnail);
      }
    };
  }, [previewThumbnail]);

  // Update the main container
  return (
    <>
      <div 
        ref={containerRef}
        className={`relative bg-slate-900/90 backdrop-blur-lg rounded-2xl overflow-hidden 
          border border-violet-500/20 ${gradientClasses.glow} ${
          isFullscreenMode ? 'fixed inset-0 z-50' : 
          isMobile ? 'h-[calc(100vh-80px)]' : 'h-[calc(100vh-120px)]'
        } transition-all duration-300`}
      >
        <div className={`flex ${isMobile ? 'flex-col' : 'h-full'}`}>
          {/* Main Video Section */}
          <div className={`flex-1 flex flex-col min-w-0 ${isMobile ? 'order-2' : ''}`}>
            {/* Video Container */}
            <div 
              className={`relative flex-1 bg-slate-950 ${
                isFullscreenMode ? 'h-screen' : 'min-h-0'
              } ${isTheaterMode ? 'aspect-[21/9]' : isPortrait ? 'aspect-[9/16]' : 'aspect-video'}`}
              onMouseEnter={overlayHandlers.onMouseEnter}
              onMouseLeave={overlayHandlers.onMouseLeave}
            >
              <video
                ref={videoRef}
                className={`w-full h-full ${isPortrait ? 'object-contain' : 'object-cover'}`}
                src={videoUrl}
                onTimeUpdate={handleTimeUpdateWrapper}
                onLoadedMetadata={handleLoadedMetadataWrapper}
                onEnded={handleVideoEndWrapper}
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
                    className="absolute top-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent"
                  >
                    <h2 className="text-lg md:text-2xl font-semibold text-white truncate">{title}</h2>
                    {currentChapter && (
                      <p className="text-xs md:text-sm text-slate-300 mt-1 truncate">
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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                  <motion.button
                    onClick={handlePlay}
                    className="relative w-20 h-20 md:w-24 md:h-24 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Outer ring with gradient and glow */}
                    <div className="absolute inset-0 rounded-full 
                      bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 
                      backdrop-blur-md border border-white/10 
                      shadow-xl shadow-violet-500/20
                      group-hover:shadow-2xl group-hover:shadow-violet-500/30
                      group-hover:border-white/20 transition-all duration-300" />

                    {/* Animated gradient background */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 
                      opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 
                      blur-xl group-hover:blur-2xl transition-all duration-300" />
                    
                    {/* Inner circle with icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full 
                        bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500
                        p-[2px] group-hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-full rounded-full bg-slate-900/90 backdrop-blur-sm 
                          flex items-center justify-center">
                          {isPlaying ? (
                            <FiPause className="w-8 h-8 md:w-10 md:h-10 text-white 
                              drop-shadow-lg group-hover:text-transparent group-hover:bg-clip-text 
                              group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-violet-400 
                              group-hover:to-fuchsia-400 transition-all duration-300" />
                          ) : (
                            <FiPlay className="w-8 h-8 md:w-10 md:h-10 ml-1 text-white 
                              drop-shadow-lg group-hover:text-transparent group-hover:bg-clip-text 
                              group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-violet-400 
                              group-hover:to-fuchsia-400 transition-all duration-300" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-violet-500/20"
                      initial={false}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.button>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 space-y-2 md:space-y-4">
                  {/* Progress Bar Container */}
                  <div className="relative group">
                    {/* Preview Text */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm text-white/90 
                      bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                      Pull up for precise seeking
                    </div>

                    {/* Preview Player Container */}
                    <AnimatePresence>
                      {showPreviewPlayer && previewThumbnail && (
                        <div className="absolute bottom-full left-0 right-0 mb-4 z-30">
                          <MiniPlayer
                            videoRef={videoRef}
                            videoUrl={videoUrl}
                            title={title}
                            isMiniPlayer={isMiniPlayer}
                            miniPlayerRef={miniPlayerRef}
                            onClose={() => setIsMiniPlayer(false)}
                            showPreview={showPreviewPlayer}
                            previewImage={previewThumbnail}
                            previewTime={previewTime}
                            previewPosition={previewPosition}
                            duration={duration}
                          />
                        </div>
                      )}
                    </AnimatePresence>

                    {/* Progress Bar */}
                    <div 
                      ref={progressRef}
                      onClick={handleProgressClick}
                      onMouseMove={handleProgressHover}
                      onMouseLeave={() => {
                        setShowPreviewPlayer(false);
                        setPreviewThumbnail(null);
                      }}
                      className="relative h-1.5 md:h-2 bg-slate-700/50 rounded-full overflow-hidden cursor-pointer
                        hover:h-3 transition-all duration-200"
                    >
                      {/* Progress Fill */}
                      <motion.div 
                        className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500
                          group-hover:shadow-lg group-hover:shadow-violet-500/30 transition-all duration-300"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                        layoutId="progress"
                      />
                      
                      {/* Buffered Progress */}
                      <div 
                        className="absolute top-0 bottom-0 left-0 bg-white/10"
                        style={{ 
                          width: `${calculateBufferedProgress(videoRef.current)}%` 
                        }}
                      />

                      {/* Chapter Markers */}
                      <div className="absolute inset-0">
                        {chapters.map((chapter, index) => (
                          <div
                            key={chapter.time}
                            className="absolute top-1/2 -translate-y-1/2 group/marker"
                            style={{ 
                              left: `${(chapter.time / duration) * 100}%`,
                              zIndex: 20
                            }}
                          >
                            {/* Marker Line */}
                            <div className="absolute -translate-x-1/2 w-0.5 h-4 md:h-5
                              bg-gradient-to-b from-violet-500/50 to-transparent 
                              group-hover/marker:from-violet-400 transition-colors duration-200
                              opacity-0 group-hover:opacity-100" />
                            
                            {/* Marker Dot */}
                            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full
                              bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500
                              border border-white/20 shadow-lg shadow-violet-500/20
                              group-hover/marker:scale-150 group-hover/marker:shadow-violet-500/40
                              transition-all duration-200" />
                            
                            {/* Chapter Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                              opacity-0 group-hover/marker:opacity-100 transition-opacity duration-200
                              pointer-events-none"
                            >
                              <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-lg px-2 py-1
                                border border-violet-500/20 shadow-lg shadow-violet-500/20
                                whitespace-nowrap"
                              >
                                <div className="text-xs font-medium text-white">
                                  {chapter.title}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  {formatTime(chapter.time)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Time Display */}
                    <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-slate-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Left Controls */}
                    <div className="flex items-center gap-2 md:gap-4">
                      <ControlButton onClick={handlePlay} icon={isPlaying ? FiPause : FiPlay} />
                      {!isMobile && (
                        <>
                          <ControlButton onClick={() => handleSkipWrapper(-10)} icon={FiSkipBack} />
                          <ControlButton onClick={() => handleSkipWrapper(10)} icon={FiSkipForward} />
                        </>
                      )}
                      
                      <div className="relative group"
                        onMouseEnter={() => !isMobile && setShowVolumeSlider(true)}
                        onMouseLeave={() => !isMobile && setShowVolumeSlider(false)}
                      >
                        <ControlButton 
                          onClick={toggleMute}
                          icon={volume === 0 || isMuted ? FiVolumeX : volume < 0.5 ? FiVolume1 : FiVolume2}
                        />
                        <AnimatePresence>
                          {showVolumeSlider && !isMobile && (
                            <VolumeModal
                              position={getModalPosition('volume')}
                              volume={volume}
                              onVolumeChange={handleVolumeChange}
                            />
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="text-white/90 text-xs md:text-sm font-medium tracking-wide">
                        <span ref={timeDisplayRef}>
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-2 md:gap-4">
                      {!isMobile && (
                        <>
                          <ControlButton 
                            onClick={toggleBookmark}
                            icon={FiBookmark}
                            active={isBookmarked}
                          />
                          <ControlButton 
                            onClick={() => setShowPlaylist(!showPlaylist)}
                            icon={FiList}
                            active={showPlaylist}
                            tooltip="Playlist"
                          />
                          <ControlButton 
                            onClick={() => setShowSettings(!showSettings)}
                            icon={FiSettings}
                            active={showSettings}
                          />
                          <ControlButton 
                            onClick={() => setShowShortcuts(!showShortcuts)}
                            icon={FiCommand}
                            active={showShortcuts}
                          />
                          <ControlButton 
                            onClick={togglePiP}
                            icon={FiCopy}
                            active={isPiPActive}
                          />
                        </>
                      )}
                      <ControlButton 
                        onClick={toggleFullscreen}
                        icon={isFullscreen ? FiMinimize2 : FiMaximize}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Buttons */}
              {showControls && !isMobile && (
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
            <VideoInfoBar
              title={title}
              currentTime={currentTime}
              duration={duration}
              networkStats={networkStats}
              selectedQuality={selectedQuality}
              currentChapter={currentChapter}
              chapters={chapters}
              isWatchLater={isWatchLater}
              onWatchLater={toggleWatchLater}
              showControls={showControls}
              onChapterClick={(chapter) => {
                if (videoRef.current) {
                  videoRef.current.currentTime = chapter.time;
                }
              }}
              isMobile={isMobile}
            />
          </div>

          {/* Playlist Drawer */}
          {(!isMobile || showPlaylist) && (
            <PlaylistDrawer
              playlist={playlist}
              currentIndex={currentIndex}
              onNavigate={onNavigate}
              isFullscreenMode={isFullscreenMode}
              showPlaylist={showPlaylist}
              setShowPlaylist={setShowPlaylist}
              title={title}
              isMobile={isMobile}
              currentTime={currentTime}
              duration={duration}
              isPlaying={isPlaying}
            />
          )}
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showSettings && !isMobile && (
            <SettingsModal
              onClose={() => setShowSettings(false)}
              position={getSettingsPosition()}
              tracks={tracks}
              selectedAudio={selectedAudio}
              setSelectedAudio={setSelectedAudio}
              selectedSubtitle={selectedSubtitle}
              setSelectedSubtitle={setSelectedSubtitle}
              playbackSpeed={playbackSpeed}
              setPlaybackSpeed={setPlaybackSpeed}
              selectedQuality={selectedQuality}
              setSelectedQuality={(quality) => {
                setSelectedQuality(typeof quality === 'object' ? quality.value : quality);
              }}
              qualityOptions={qualityOptions}
              videoRef={videoRef}
              analytics={analytics}
              networkStats={networkStats}
              playbackStats={playbackStats}
              currentChapter={currentChapter}
              currentTime={currentTime}
              duration={duration}
              isMobile={isMobile}
              isTablet={window.innerWidth >= 640 && window.innerWidth < 1024}
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
      </div>
    </>
  );
};

// Update ControlButton component
const ControlButton = ({ onClick, icon: Icon, active = false, className = '' }) => (
  <motion.button
    onClick={onClick}
    className={`p-1.5 md:p-2 rounded-lg transition-all duration-300 ${
      active 
        ? 'bg-violet-500/20 text-violet-400' 
        : 'text-white/90 hover:bg-white/10'
    } ${className}`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon className="w-4 h-4 md:w-5 md:h-5" />
  </motion.button>
);

// Update NavigationButton component
const NavigationButton = ({ direction, onClick, disabled }) => {
  if (disabled) return null;

  return (
    <motion.button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === 'left' ? 'left-4 md:left-6' : 'right-4 md:right-6'
      } w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-cyan-500/20 via-violet-500/20 
      to-fuchsia-500/20 backdrop-blur-sm flex items-center justify-center text-white 
      border border-violet-500/30 group transition-all duration-300`}
      whileHover={{ 
        scale: 1.1, 
        x: direction === 'left' ? -4 : 4 
      }}
      whileTap={{ scale: 0.9 }}
    >
      {direction === 'left' ? (
        <FiChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:text-violet-400 transition-colors" />
      ) : (
        <FiChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:text-violet-400 transition-colors" />
      )}
    </motion.button>
  );
};

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