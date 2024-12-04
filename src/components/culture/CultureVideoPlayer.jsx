import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import VideoPlayer from '../learning/video/VideoPlayer';

// Export sample videos
export const sampleVideos = {
  bunny: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  sintel: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  elephantsDream: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
};

const CultureVideoPlayer = ({ 
  isOpen, 
  onClose, 
  videoUrl = "/videos/culture-video.mp4",
  title = "Company Culture"
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden"
        >
          <VideoPlayer
            videoUrl={videoUrl}
            title={title}
            onClose={onClose}
            mode="modal"
            className="w-full h-full"
            autoPlay={true}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

CultureVideoPlayer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  videoUrl: PropTypes.string,
  title: PropTypes.string
};

export default CultureVideoPlayer; 