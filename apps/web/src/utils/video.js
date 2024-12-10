/**
 * Generate a thumbnail from a video at a specific time
 * @param {HTMLVideoElement} video - The video element
 * @param {number} time - Time in seconds
 * @returns {Promise<string>} - Data URL of the thumbnail
 */
export const generateThumbnail = async (video, time) => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const currentTime = video.currentTime; // Store current time
      
      // Set video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Set video to preview time
      video.currentTime = time;
      
      // Wait for video to seek to new time
      video.addEventListener('seeked', () => {
        try {
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
          
          // Restore original time
          video.currentTime = currentTime;
          
          resolve(thumbnailUrl);
        } catch (error) {
          reject(error);
        }
      }, { once: true });

    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Format time in seconds to HH:MM:SS or MM:SS
 * @param {number} seconds 
 * @returns {string}
 */
export const formatTime = (seconds) => {
  if (isNaN(seconds)) return '00:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Video error handling utilities
 */
export const videoErrorHandler = {
  isRecoverableError: (error) => {
    // List of error codes that are potentially recoverable
    const recoverableErrors = [
      MediaError.MEDIA_ERR_ABORTED,
      MediaError.MEDIA_ERR_NETWORK,
      MediaError.MEDIA_ERR_DECODE
    ];
    
    return error?.code && recoverableErrors.includes(error.code);
  },

  getErrorMessage: (error) => {
    if (!error?.code) return 'An unknown error occurred';
    
    switch (error.code) {
      case MediaError.MEDIA_ERR_ABORTED:
        return 'The video playback was aborted';
      case MediaError.MEDIA_ERR_NETWORK:
        return 'A network error occurred';
      case MediaError.MEDIA_ERR_DECODE:
        return 'The video could not be decoded';
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        return 'The video format is not supported';
      default:
        return 'An unknown error occurred';
    }
  }
};

/**
 * Get appropriate volume icon based on volume level
 * @param {number} volume - Volume level between 0 and 1
 * @param {boolean} isMuted - Mute state
 * @returns {string} - Icon name
 */
export const getVolumeIcon = (volume, isMuted) => {
  if (isMuted || volume === 0) return 'volume-x';
  if (volume < 0.5) return 'volume-1';
  return 'volume-2';
};

/**
 * Calculate buffered progress
 * @param {HTMLVideoElement} video 
 * @returns {number} - Progress percentage
 */
export const calculateBufferedProgress = (video) => {
  if (!video?.buffered?.length) return 0;
  
  const bufferedEnd = video.buffered.end(video.buffered.length - 1);
  const duration = video.duration;
  return (bufferedEnd / duration) * 100;
};

/**
 * Handle fullscreen changes with browser prefixes
 * @param {HTMLElement} element 
 * @returns {Promise<void>}
 */
export const toggleFullscreen = async (element) => {
  try {
    if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      }
    }
  } catch (error) {
    console.error('Fullscreen error:', error);
    throw error;
  }
};

/**
 * Update current chapter based on video time
 * @param {number} time - Current video time
 * @param {Array} chapters - Array of chapter objects
 * @returns {Object|null} - Current chapter or null
 */
export const getCurrentChapter = (time, chapters) => {
  return chapters.find((chapter, index) => {
    const nextChapter = chapters[index + 1];
    return time >= chapter.time && (!nextChapter || time < nextChapter.time);
  });
};

/**
 * Create custom scrollbar styles
 * @returns {string} - CSS styles for custom scrollbar
 */
export const getCustomScrollbarStyles = () => `
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

/**
 * Get demo chapters for testing
 * @returns {Array} - Array of demo chapter objects
 */
export const getDemoChapters = () => [
  { id: 1, title: 'Introduction', time: 0 },
  { id: 2, title: 'Main Content', time: 60 },
  { id: 3, title: 'Summary', time: 120 }
];

/**
 * Handle video loading states
 * @returns {Object} - Object containing loading state handlers
 */
export const videoLoadingHandlers = {
  handleLoadStart: (setIsLoading) => {
    setIsLoading(true);
  },
  
  handleCanPlay: (setIsLoading) => {
    setIsLoading(false);
  },
  
  handleWaiting: (setIsBuffering) => {
    setIsBuffering(true);
  },
  
  handlePlaying: (setIsBuffering) => {
    setIsBuffering(false);
  }
};

/**
 * Handle progress bar hover and thumbnail generation
 * @param {Event} e - Mouse event
 * @param {Object} refs - Object containing refs
 * @param {Object} state - Object containing state values
 * @param {Function} setThumbnailPreview - State setter for thumbnail preview
 * @returns {Promise<void>}
 */
export const handleProgressHover = async (e, { progressRef, videoRef }, { duration }, setThumbnailPreview) => {
  if (progressRef.current && duration) {
    const rect = progressRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const time = position * duration;
    
    const thumbnail = await generateThumbnail(videoRef.current, time);
    
    setThumbnailPreview({
      show: true,
      time,
      position: e.clientX - rect.left,
      image: thumbnail
    });
  }
};

/**
 * Handle video playback speed changes
 * @param {string} action - 'increase' or 'decrease'
 * @param {number} currentSpeed - Current playback speed
 * @param {HTMLVideoElement} videoRef - Video element reference
 * @returns {number} - New playback speed
 */
export const handlePlaybackSpeedChange = (action, currentSpeed, videoRef) => {
  const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const currentIndex = speeds.indexOf(currentSpeed);
  let newIndex;

  if (action === 'increase') {
    newIndex = Math.min(currentIndex + 1, speeds.length - 1);
  } else {
    newIndex = Math.max(currentIndex - 1, 0);
  }

  const newSpeed = speeds[newIndex];
  if (videoRef) {
    videoRef.playbackRate = newSpeed;
  }
  return newSpeed;
};

/**
 * Handle volume changes and muting
 * @returns {Object} - Volume control handlers
 */
export const volumeControls = {
  handleVolumeChange: (newVolume, videoRef, setVolume, setIsMuted) => {
    setVolume(newVolume);
    if (videoRef?.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  },

  toggleMute: (isMuted, volume, previousVolume, videoRef, setIsMuted, setVolume, setPreviousVolume) => {
    if (isMuted) {
      volumeControls.handleVolumeChange(previousVolume, videoRef, setVolume, setIsMuted);
    } else {
      setPreviousVolume(volume);
      volumeControls.handleVolumeChange(0, videoRef, setVolume, setIsMuted);
    }
    setIsMuted(!isMuted);
  }
};

/**
 * Handle Picture-in-Picture mode
 * @param {boolean} isPiPActive - Current PiP state
 * @param {HTMLVideoElement} videoRef - Video element reference
 * @returns {Promise<boolean>} - New PiP state
 */
export const togglePictureInPicture = async (isPiPActive, videoRef) => {
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
      return false;
    } else if (document.pictureInPictureEnabled && videoRef?.current) {
      await videoRef.current.requestPictureInPicture();
      return true;
    }
    return isPiPActive;
  } catch (error) {
    console.error('PiP error:', error);
    return isPiPActive;
  }
};

/**
 * Get quality options for video
 * @returns {Array} - Array of quality options
 */
export const getQualityOptions = () => [
  { id: 'auto', label: 'Auto', resolution: 'Auto' },
  { id: '1080p', label: '1080p', resolution: '1920x1080' },
  { id: '720p', label: '720p', resolution: '1280x720' },
  { id: '480p', label: '480p', resolution: '854x480' },
  { id: '360p', label: '360p', resolution: '640x360' }
];

/**
 * Get modal position based on fullscreen state
 * @param {string} type - Modal type
 * @param {boolean} isFullscreenMode - Fullscreen state
 * @returns {string} - CSS classes for positioning
 */
export const getModalPosition = (type, isFullscreenMode) => {
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

  return {
    settings: 'bottom-full right-0 mb-4 w-72 sm:w-80 lg:w-96 lg:bottom-20 lg:mb-0',
    shortcuts: 'bottom-full left-0 mb-4 w-72 sm:w-80 lg:w-96 lg:bottom-20 lg:mb-0',
    volume: 'bottom-16 left-0'
  }[type] || '';
};

/**
 * Handle touch events for video player
 * @returns {Object} - Touch event handlers
 */
export const touchEventHandlers = {
  handleTouchStart: (e, touchStartTime, touchStartX) => {
    touchStartTime.current = Date.now();
    touchStartX.current = e.touches[0].clientX;
  },

  handleTouchMove: (e, { touchStartTime, touchStartX, isSeeking }, { currentTime, duration }, videoRef) => {
    if (!isSeeking.current && Date.now() - touchStartTime.current > 500) {
      isSeeking.current = true;
    }

    if (isSeeking.current && videoRef?.current) {
      const diff = (e.touches[0].clientX - touchStartX.current) / window.innerWidth;
      const newTime = currentTime + (diff * duration);
      videoRef.current.currentTime = Math.max(0, Math.min(duration, newTime));
    }
  },

  handleTouchEnd: (touchStartTime, isSeeking, handlePlay) => {
    if (!isSeeking.current && Date.now() - touchStartTime.current < 300) {
      handlePlay();
    }
    isSeeking.current = false;
  }
};

/**
 * Handle video play/pause and analytics
 * @param {Object} params - Parameters object
 * @returns {Object} - Updated analytics state
 */
export const handlePlayPause = ({ 
  videoRef, 
  isPlaying, 
  analytics 
}) => {
  if (videoRef?.current) {
    if (isPlaying) {
      videoRef.current.pause();
      return {
        ...analytics,
        pauseCount: analytics.pauseCount + 1
      };
    } else {
      videoRef.current.play();
      return {
        ...analytics,
        playCount: analytics.playCount + 1
      };
    }
  }
  return analytics;
};

/**
 * Handle video time update
 * @param {Object} params - Parameters object
 */
export const handleTimeUpdate = ({
  videoRef,
  setCurrentTime,
  onProgress,
  updateCurrentChapter
}) => {
  if (videoRef?.current) {
    const video = videoRef.current;
    const time = video.currentTime;
    setCurrentTime(time);
    
    // Update progress
    onProgress?.(time);
    
    // Update chapter if available
    updateCurrentChapter?.(time);
  }
};

/**
 * Handle video metadata loaded
 * @param {Object} params - Parameters object
 */
export const handleLoadedMetadata = ({
  videoRef,
  setDuration,
  savedProgress,
  setCurrentTime
}) => {
  if (videoRef?.current) {
    const video = videoRef.current;
    setDuration(video.duration);
    
    // Set saved progress if available
    if (savedProgress && savedProgress < video.duration) {
      video.currentTime = savedProgress;
      setCurrentTime(savedProgress);
    }
  }
};

/**
 * Handle progress bar click
 * @param {Object} params - Parameters object
 */
export const handleProgressClick = ({
  e,
  progressRef,
  videoRef,
  duration,
  setCurrentTime,
  onProgress
}) => {
  if (progressRef?.current && videoRef?.current) {
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

/**
 * Handle video skip forward/backward
 * @param {Object} params - Parameters object
 */
export const handleSkip = ({
  seconds,
  videoRef,
  currentTime,
  duration,
  setCurrentTime
}) => {
  if (videoRef?.current) {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }
};

/**
 * Handle watch later functionality
 * @param {Object} params - Parameters object
 */
export const handleWatchLater = ({
  isWatchLater,
  videoUrl,
  title,
  duration,
  currentTime
}) => {
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
  return !isWatchLater;
};

/**
 * Handle mouse movement for controls visibility
 * @param {Object} params - Parameters object
 * @returns {Function} - Cleanup function
 */
export const handleMouseMovement = ({
  setShowControls,
  isPlaying
}) => {
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
};

/**
 * Handle keyboard shortcuts for video player
 * @param {Object} params - Parameters object
 * @returns {Function} - Event handler function
 */
export const handleKeyboardShortcuts = ({
  handlePlay,
  toggleFullscreen,
  setIsMuted,
  handleSkip,
  handleVolumeChange,
  togglePiP,
  handlePlaybackSpeed,
  volume,
  isMuted
}) => {
  return (e) => {
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
};

/**
 * Handle network quality monitoring and auto quality adjustment
 * @param {Object} params - Parameters object
 * @returns {Function} - Cleanup function
 */
export const handleNetworkQuality = ({
  connection,
  setNetworkStats,
  setSelectedQuality
}) => {
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
  return () => {};
};

/**
 * Handle bookmark functionality
 * @param {Object} params - Parameters object
 */
export const handleBookmark = ({
  videoUrl,
  title,
  currentTime,
  duration,
  isBookmarked,
  setIsBookmarked
}) => {
  const bookmarks = JSON.parse(localStorage.getItem('videoBookmarks') || '[]');
  
  if (!isBookmarked) {
    bookmarks.push({
      id: videoUrl,
      title,
      timestamp: Date.now(),
      position: currentTime,
      duration
    });
  } else {
    const index = bookmarks.findIndex(b => b.id === videoUrl);
    if (index !== -1) {
      bookmarks.splice(index, 1);
    }
  }
  
  localStorage.setItem('videoBookmarks', JSON.stringify(bookmarks));
  setIsBookmarked(!isBookmarked);
};

/**
 * Handle theater mode toggle
 * @param {Object} params - Parameters object
 */
export const handleTheaterMode = ({
  isTheaterMode,
  setIsTheaterMode,
  containerRef
}) => {
  setIsTheaterMode(!isTheaterMode);
  if (containerRef?.current) {
    containerRef.current.style.maxWidth = !isTheaterMode ? '100%' : '1280px';
  }
};

/**
 * Handle gesture start
 * @param {Object} params - Parameters object
 */
export const handleGestureStart = ({
  e,
  gestureRef
}) => {
  const touch = e.touches[0];
  gestureRef.current = {
    startX: touch.clientX,
    startY: touch.clientY,
    timeStamp: e.timeStamp
  };
};

/**
 * Initialize video analytics
 * @returns {Object} - Initial analytics state
 */
export const initializeAnalytics = () => ({
  startTime: Date.now(),
  playCount: 0,
  pauseCount: 0,
  seekCount: 0,
  bufferingCount: 0,
  totalPlayTime: 0,
  averagePlaybackSpeed: 1,
  qualityChanges: 0
});

/**
 * Initialize playback stats
 * @returns {Object} - Initial playback stats
 */
export const initializePlaybackStats = () => ({
  watchTime: 0,
  bufferingEvents: 0,
  qualityChanges: 0
});

/**
 * Initialize network stats
 * @returns {Object} - Initial network stats
 */
export const initializeNetworkStats = () => ({
  downlink: 0,
  effectiveType: '4g',
  rtt: 0
});

/**
 * Initialize thumbnail preview state
 * @returns {Object} - Initial thumbnail preview state
 */
export const initializeThumbnailPreview = () => ({
  show: false,
  time: 0,
  position: 0,
  image: null
});

/**
 * Get next chapter
 * @param {Object} params - Parameters object
 * @returns {Object|null} - Next chapter or first chapter if none current
 */
export const getNextChapter = ({
  currentChapter,
  chapters
}) => {
  if (!currentChapter) return chapters[0];
  const currentIndex = chapters.findIndex(c => c.id === currentChapter.id);
  return chapters[currentIndex + 1];
};

/**
 * Initialize audio and subtitle tracks
 * @returns {Object} - Track configuration
 */
export const initializeTracks = () => ({
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

/**
 * Handle saved progress restoration
 * @param {Object} params - Parameters object
 */
export const restoreSavedProgress = ({
  savedProgress,
  videoRef,
  setCurrentTime
}) => {
  if (savedProgress) {
    setCurrentTime(savedProgress);
    if (videoRef?.current) {
      videoRef.current.currentTime = savedProgress;
    }
  }
};

/**
 * Handle chapter navigation
 * @param {Object} params - Parameters object
 */
export const handleChapterNavigation = ({
  chapter,
  videoRef,
  setCurrentTime,
  setCurrentChapter
}) => {
  if (videoRef?.current) {
    videoRef.current.currentTime = chapter.time;
    setCurrentTime(chapter.time);
    setCurrentChapter(chapter);
  }
};

/**
 * Initialize demo chapters if none provided
 * @returns {Array} - Demo chapters
 */
export const initializeDemoChapters = () => [
  { id: 1, title: 'Introduction', time: 0, description: 'Overview of the topic' },
  { id: 2, title: 'Main Content', time: 60, description: 'Detailed explanation' },
  { id: 3, title: 'Examples', time: 120, description: 'Practical demonstrations' },
  { id: 4, title: 'Summary', time: 180, description: 'Key takeaways' }
];

/**
 * Handle fullscreen change events
 * @param {Function} setIsFullscreen - State setter for fullscreen
 * @returns {Function} - Cleanup function
 */
export const handleFullscreenEvents = (setIsFullscreen) => {
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
};

/**
 * Handle playlist navigation
 * @param {Object} params - Parameters object
 */
export const handlePlaylistNavigation = ({
  direction,
  currentIndex,
  playlistLength,
  onNavigate
}) => {
  if (direction === 'prev' && currentIndex > 0) {
    onNavigate(currentIndex - 1);
  } else if (direction === 'next' && currentIndex < playlistLength - 1) {
    onNavigate(currentIndex + 1);
  }
};

/**
 * Handle video end
 * @param {Object} params - Parameters object
 */
export const handleVideoEnd = ({
  setIsPlaying,
  currentIndex,
  playlistLength,
  onNavigate
}) => {
  setIsPlaying(false);
  if (currentIndex < playlistLength - 1) {
    onNavigate?.(currentIndex + 1);
  }
};

/**
 * Handle gesture-based seeking and volume control
 * @param {Object} params - Parameters object
 */
export const handleGestureSeeking = ({
  e,
  gestureRef,
  videoRef,
  currentTime,
  duration,
  volume,
  handleVolumeChange
}) => {
  if (!gestureRef.current.startX) return;

  const touch = e.touches[0];
  const deltaX = touch.clientX - gestureRef.current.startX;
  const deltaY = touch.clientY - gestureRef.current.startY;
  const deltaTime = e.timeStamp - gestureRef.current.timeStamp;

  // Horizontal swipe for seeking
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
    const seekTime = (deltaX / window.innerWidth) * duration * 0.5;
    if (videoRef?.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seekTime));
    }
  }

  // Vertical swipe for volume
  if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
    const volumeChange = -(deltaY / window.innerHeight);
    handleVolumeChange(Math.max(0, Math.min(1, volume + volumeChange)));
  }
};

/**
 * Handle mini player functionality
 * @param {Object} params - Parameters object
 */
export const handleMiniPlayer = ({
  isMiniPlayer,
  setIsMiniPlayer,
  miniPlayerRef
}) => {
  if (!isMiniPlayer) {
    setIsMiniPlayer(true);
    if (miniPlayerRef?.current) {
      miniPlayerRef.current.style.transform = 'translate(calc(100vw - 320px), calc(100vh - 180px))';
    }
  } else {
    setIsMiniPlayer(false);
    if (miniPlayerRef?.current) {
      miniPlayerRef.current.style.transform = '';
    }
  }
};

/**
 * Monitor network quality and adjust video quality accordingly
 * @param {Object} params - Parameters object
 * @returns {Function} - Cleanup function
 */
export const monitorNetworkQuality = ({
  setNetworkStats,
  setSelectedQuality
}) => {
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
  return () => {};
};

/**
 * Track video playback analytics
 * @param {Object} params - Parameters object
 * @returns {Function} - Cleanup function
 */
export const trackPlaybackAnalytics = ({
  isPlaying,
  playbackSpeed,
  setAnalytics
}) => {
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
};

/**
 * Handle video double click
 * @param {Object} params - Parameters object
 */
export const handleDoubleClick = ({
  doubleClickTimeout,
  handlePlay,
  toggleFullscreen
}) => {
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

/**
 * Handle video quality change
 * @param {Object} params - Parameters object
 */
export const handleQualityChange = ({
  quality,
  setSelectedQuality,
  setPlaybackStats,
  videoRef,
  currentTime
}) => {
  setSelectedQuality(quality);
  setPlaybackStats(prev => ({
    ...prev,
    qualityChanges: prev.qualityChanges + 1
  }));

  // Save current time to restore after quality change
  const time = currentTime;
  if (videoRef?.current) {
    // Simulate quality change by reloading video
    videoRef.current.load();
    videoRef.current.currentTime = time;
    if (!videoRef.current.paused) {
      videoRef.current.play();
    }
  }
};

/**
 * Handle theater mode toggle
 * @param {Object} params - Parameters object
 */
export const handleTheaterModeToggle = ({
  isTheaterMode,
  setIsTheaterMode,
  containerRef
}) => {
  setIsTheaterMode(!isTheaterMode);
  if (containerRef?.current) {
    containerRef.current.style.maxWidth = !isTheaterMode ? '100%' : '1280px';
    containerRef.current.style.height = !isTheaterMode ? '100vh' : 'auto';
  }
};

/**
 * Initialize video event listeners
 * @param {Object} params - Parameters object
 */
export const initializeVideoEvents = ({
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
}) => {
  const video = videoRef.current;
  if (!video) return;

  video.addEventListener('timeupdate', handleTimeUpdateWrapper);
  video.addEventListener('loadedmetadata', handleLoadedMetadataWrapper);
  video.addEventListener('ended', handleVideoEndWrapper);
  video.addEventListener('loadstart', handleLoadStart);
  video.addEventListener('canplay', handleCanPlay);
  video.addEventListener('waiting', handleWaiting);
  video.addEventListener('playing', handlePlaying);
  video.addEventListener('click', handleVideoClick);
  video.addEventListener('touchstart', handleTouchStart);
  video.addEventListener('touchmove', handleTouchMove);
  video.addEventListener('touchend', handleTouchEnd);
  video.muted = isMuted;

  return () => {
    video.removeEventListener('timeupdate', handleTimeUpdateWrapper);
    video.removeEventListener('loadedmetadata', handleLoadedMetadataWrapper);
    video.removeEventListener('ended', handleVideoEndWrapper);
    video.removeEventListener('loadstart', handleLoadStart);
    video.removeEventListener('canplay', handleCanPlay);
    video.removeEventListener('waiting', handleWaiting);
    video.removeEventListener('playing', handlePlaying);
    video.removeEventListener('click', handleVideoClick);
    video.removeEventListener('touchstart', handleTouchStart);
    video.removeEventListener('touchmove', handleTouchMove);
    video.removeEventListener('touchend', handleTouchEnd);
  };
};

/**
 * Handle video overlay visibility
 * @param {Object} params - Parameters object
 */
export const handleOverlayVisibility = ({
  isPlaying,
  setShowControls,
  setShowTitleOverlay
}) => {
  const show = () => {
    setShowControls(true);
    setShowTitleOverlay(true);
  };

  const hide = () => {
    if (isPlaying) {
      setShowControls(false);
      setShowTitleOverlay(false);
    }
  };

  return { show, hide };
};

/**
 * Update video playback stats
 * @param {Object} params - Parameters object
 */
export const updatePlaybackStats = ({
  isPlaying,
  playbackSpeed,
  bufferingEvents,
  qualityChanges,
  setPlaybackStats
}) => {
  setPlaybackStats(prev => ({
    watchTime: isPlaying ? prev.watchTime + 1 : prev.watchTime,
    bufferingEvents,
    qualityChanges,
    averageSpeed: (prev.averageSpeed * prev.watchTime + playbackSpeed) / (prev.watchTime + 1)
  }));
};
