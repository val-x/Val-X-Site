import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlay, FiPause, FiVolume2, FiVolumeX, FiSkipBack, FiSkipForward,
  FiHeart, FiShare2, FiMoreHorizontal, FiDownload, FiRepeat, FiShuffle
} from 'react-icons/fi';

// Sample podcasts for testing
export const samplePodcasts = {
  synthwave: {
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "Synthwave Vibes",
    thumbnail: "https://images.unsplash.com/photo-1614149162883-504ce4d13909",
    duration: "3:24",
    date: "Oct 1, 2023",
    author: {
      name: "Alex Johnson",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    }
  },
  jazzCafe: {
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    title: "Jazz Café Ambience",
    thumbnail: "https://images.unsplash.com/photo-1437652633673-cc02b9c67a1b",
    duration: "2:56",
    date: "Oct 2, 2023",
    author: {
      name: "Sarah Chen",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    }
  },
  techTalk: {
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    title: "Tech Talk Episode #42",
    thumbnail: "https://images.unsplash.com/photo-1526666923127-b2970f64b422",
    duration: "4:15",
    date: "Oct 3, 2023",
    author: {
      name: "David Kim",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    }
  }
};

const PodcastPlayer = ({ post, onProgress }) => {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Add debug logs for initialization
  useEffect(() => {
    console.log('PodcastPlayer mounted');
    console.log('Initial post:', post);
    console.log('Audio element:', audioRef.current);
  }, []);

  // Add debug logs for audio URL changes
  useEffect(() => {
    console.log('Audio URL changed:', post.audioUrl);
    if (audioRef.current) {
      audioRef.current.load(); // Reload audio when URL changes
    }
  }, [post.audioUrl]);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        console.log('Toggle play clicked');
        console.log('Current audio state:', {
          isPlaying,
          currentTime: audioRef.current.currentTime,
          duration: audioRef.current.duration,
          readyState: audioRef.current.readyState,
          paused: audioRef.current.paused,
          src: audioRef.current.src
        });

        if (isPlaying) {
          console.log('Attempting to pause');
          await audioRef.current.pause();
          console.log('Paused successfully');
        } else {
          console.log('Attempting to play');
          try {
            await audioRef.current.play();
            console.log('Started playing successfully');
          } catch (playError) {
            console.error('Play error:', playError);
            // Try loading the audio again
            audioRef.current.load();
            try {
              await audioRef.current.play();
              console.log('Play successful after reload');
            } catch (retryError) {
              console.error('Retry play error:', retryError);
              setIsPlaying(false);
              throw retryError;
            }
          }
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error('Toggle play error:', error);
        setIsPlaying(false);
      }
    } else {
      console.error('Audio element not found');
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      onProgress?.(audioRef.current.currentTime / duration);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = pos * duration;
    }
  };

  const handleVolumeChange = (newVolume) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleSkip = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        Math.max(audioRef.current.currentTime + seconds, 0),
        duration
      );
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
      });
    }
  }, []);

  useEffect(() => {
    console.log('Audio source changed:', post.audioUrl);
  }, [post.audioUrl]);

  // Add error handling for audio element
  const handleAudioError = (e) => {
    console.error('Audio error:', e);
    setIsPlaying(false);
  };

  return (
    <div className="bg-zinc rounded-xl overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* Album Art */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="aspect-square rounded-xl overflow-hidden relative group"
        >
          <img 
            src={post.thumbnail} 
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Player Controls */}
        <div className="flex flex-col justify-between space-y-6">
          {/* Title and Author */}
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-bold text-white mb-4 line-clamp-2"
            >
              {post.title}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <img 
                src={post.author.image} 
                alt={post.author.name}
                className="w-10 h-10 rounded-full ring-2 ring-blue/30"
              />
              <div>
                <div className="font-medium text-white">{post.author.name}</div>
                <div className="text-sm text-gray">{post.date}</div>
              </div>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div 
              ref={progressRef}
              onClick={handleProgressClick}
              className="h-1 bg-gray-300 rounded-full cursor-pointer relative overflow-hidden group"
            >
              <motion.div 
                className="absolute h-full bg-blue rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
                layoutId="progress"
              />
              <div className="absolute h-full w-full bg-blue/20 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ 
                  left: `${(currentTime / duration) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsShuffle(!isShuffle)}
              className={`p-2 ${isShuffle ? 'text-blue' : 'text-gray'} hover:text-white transition-colors`}
            >
              <FiShuffle className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSkip(-10)}
              className="p-2 text-gray hover:text-white transition-colors"
            >
              <FiSkipBack className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-blue flex items-center justify-center 
                hover:bg-blue/90 transition-colors shadow-lg hover:shadow-blue/25"
            >
              {isPlaying ? (
                <FiPause className="w-7 h-7 text-white" />
              ) : (
                <FiPlay className="w-7 h-7 text-white ml-1" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSkip(10)}
              className="p-2 text-gray hover:text-white transition-colors"
            >
              <FiSkipForward className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsRepeat(!isRepeat)}
              className={`p-2 ${isRepeat ? 'text-blue' : 'text-gray'} hover:text-white transition-colors`}
            >
              <FiRepeat className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Secondary Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 ${isLiked ? 'text-blue' : 'text-gray'} hover:text-blue transition-colors`}
              >
                <FiHeart className="w-5 h-5" />
              </motion.button>

              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  className="p-2 text-gray hover:text-white transition-colors"
                >
                  {isMuted ? (
                    <FiVolumeX className="w-5 h-5" />
                  ) : (
                    <FiVolume2 className="w-5 h-5" />
                  )}
                </motion.button>

                <AnimatePresence>
                  {showVolumeSlider && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 bottom-full mb-2 bg-zinc/90 backdrop-blur-sm rounded-lg p-4 shadow-lg"
                      onMouseLeave={() => setShowVolumeSlider(false)}
                    >
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                        className="w-32 accent-blue"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray hover:text-white transition-colors"
              >
                <FiShare2 className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray hover:text-white transition-colors"
              >
                <FiDownload className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray hover:text-white transition-colors"
              >
                <FiMoreHorizontal className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Updated Audio Element */}
      <audio
        ref={audioRef}
        src={post.audioUrl}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => {
          console.log('Metadata loaded:', {
            duration: e.target.duration,
            readyState: e.target.readyState
          });
          handleLoadedMetadata(e);
        }}
        onError={(e) => {
          const error = e.target.error;
          console.error('Audio error:', {
            code: error?.code,
            message: error?.message,
            networkState: e.target.networkState,
            readyState: e.target.readyState,
            currentSrc: e.target.currentSrc
          });
          setIsPlaying(false);
        }}
      />
    </div>
  );
};

PodcastPlayer.defaultProps = {
  post: samplePodcasts.synthwave,
  onProgress: (progress) => console.log('Progress:', progress)
};

export default PodcastPlayer;