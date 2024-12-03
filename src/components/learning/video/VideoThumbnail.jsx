import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const VideoThumbnail = ({ videoUrl, time, width = 160, height = 90 }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const generateThumbnail = async () => {
      if (!videoRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      try {
        video.currentTime = time;
        await new Promise(resolve => video.addEventListener('seeked', resolve, { once: true }));
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        
        const thumbnailUrl = canvas.toDataURL('image/jpeg');
        setThumbnail(thumbnailUrl);
      } catch (error) {
        console.error('Error generating thumbnail:', error);
      }
    };

    generateThumbnail();
  }, [videoUrl, time, width, height]);

  return (
    <>
      <video
        ref={videoRef}
        src={videoUrl}
        className="hidden"
        crossOrigin="anonymous"
      />
      <canvas ref={canvasRef} className="hidden" />
      {thumbnail && (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={thumbnail}
          alt={`Thumbnail at ${time}s`}
          className="rounded-lg"
          style={{ width, height }}
        />
      )}
    </>
  );
};

VideoThumbnail.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

export default VideoThumbnail; 