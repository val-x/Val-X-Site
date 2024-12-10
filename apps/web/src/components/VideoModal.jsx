import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import VideoPlayer from './learning/video/VideoPlayer';
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useModal } from '../contexts/ModalContext';

const VideoModal = ({ isOpen, onClose, videoUrl, videoTitle }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { setIsModalActive } = useModal();

  useEffect(() => {
    setIsModalActive(isOpen);
    return () => setIsModalActive(false);
  }, [isOpen, setIsModalActive]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999]"
      >
        {/* Backdrop with blur */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"
          onClick={onClose}
        />
        
        {/* Content Container */}
        <div className="relative h-full flex flex-col z-[10000] overflow-hidden">
          {/* Header with close button */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between p-4 md:p-6"
          >
            {/* Title - Only show on tablet and desktop */}
            {!isMobile && (
              <h3 className="text-white font-medium truncate pr-4">
                {videoTitle}
              </h3>
            )}
            
            {/* Close button */}
            <div className="ml-auto">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full bg-slate-800/50 text-white hover:bg-slate-700/50 
                  transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50
                  hover:shadow-lg hover:shadow-purple-500/20"
              >
                <FiX className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Video container with responsive sizing */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`flex-1 flex items-center justify-center p-4 ${
              isMobile ? 'px-0' : 'md:p-6 lg:p-8'
            }`}
          >
            <div className={`w-full ${
              isMobile 
                ? 'h-full max-h-[calc(100vh-120px)]' 
                : isTablet 
                  ? 'max-w-3xl'
                  : 'max-w-6xl'
            }`}>
              <div className={`relative ${
                isMobile 
                  ? 'h-full' 
                  : 'aspect-video'
              }`}>
                <VideoPlayer
                  videoUrl={videoUrl}
                  title={videoTitle}
                  onProgress={(time) => console.log('Video progress:', time)}
                />
              </div>
            </div>
          </motion.div>

          {/* Mobile title bar at bottom */}
          {isMobile && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-slate-900/95 backdrop-blur-sm border-t border-slate-800/50 p-4"
            >
              <h3 className="text-white font-medium text-sm truncate">
                {videoTitle}
              </h3>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

VideoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  videoUrl: PropTypes.string.isRequired,
  videoTitle: PropTypes.string.isRequired
};

export default VideoModal; 