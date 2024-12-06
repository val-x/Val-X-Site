import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import VideoModal from '../VideoModal';

const Hero = ({
  badge,
  title,
  titleGradient = "from-white via-blue-100 to-white",
  highlightGradient = "from-blue-400 via-purple-400 to-pink-400",
  description,
  primaryButtonText = "Get Started",
  primaryButtonIcon = <FiArrowRight className="w-5 h-5" />,
  onPrimaryButtonClick,
  showVideoButton = true,
  videoButtonText = "Watch Demo",
  videoUrl = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4", // Default test video
  videoTitle = "Product Demo",
  stats,
  backgroundVariant = "default",
  className = ""
}) => {
  const [showVideo, setShowVideo] = useState(false);

  // Handle body scroll lock
  useEffect(() => {
    if (showVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showVideo]);

  // Background variants
  const backgroundStyles = {
    default: {
      orbs: [
        "absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl",
        "absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      ],
      grid: "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]"
    },
    // Add more variants as needed
  };

  const bgStyle = backgroundStyles[backgroundVariant] || backgroundStyles.default;

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Main Content */}
        <div className="relative z-10">
          {/* Badge */}
          {badge && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                border border-blue-500/20 rounded-full text-blue-400 backdrop-blur-sm"
            >
              {badge}
            </motion.span>
          )}

          {/* Title */}
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl"
            >
              {typeof title === 'string' ? (
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${titleGradient}`}>
                  {title}
                </span>
              ) : title}
            </motion.h1>
          )}

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            {primaryButtonText && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPrimaryButtonClick}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl 
                  font-medium text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300
                  flex items-center gap-2"
              >
                {primaryButtonText}
                {primaryButtonIcon}
              </motion.button>
            )}

            {showVideoButton && videoUrl && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm rounded-xl font-medium text-white 
                  hover:bg-slate-800 transition-all duration-300 border border-slate-700/50
                  flex items-center gap-2"
                onClick={() => setShowVideo(true)}
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <FiPlay className="w-4 h-4 text-blue-400" />
                </div>
                {videoButtonText}
              </motion.button>
            )}
          </motion.div>

          {/* Stats */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${highlightGradient} 
                    text-transparent bg-clip-text mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient Orbs */}
          {bgStyle.orbs.map((orbClass, index) => (
            <div key={index} className={orbClass} />
          ))}
          
          {/* Grid Pattern */}
          <div className={bgStyle.grid} />
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <VideoModal
            isOpen={showVideo}
            onClose={() => setShowVideo(false)}
            videoUrl={videoUrl}
            videoTitle={videoTitle}
          />
        )}
      </AnimatePresence>
    </>
  );
};

Hero.propTypes = {
  badge: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  titleGradient: PropTypes.string,
  highlightGradient: PropTypes.string,
  description: PropTypes.string,
  primaryButtonText: PropTypes.string,
  primaryButtonIcon: PropTypes.node,
  onPrimaryButtonClick: PropTypes.func,
  showVideoButton: PropTypes.bool,
  videoButtonText: PropTypes.string,
  videoUrl: PropTypes.string,
  videoTitle: PropTypes.string,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string,
      label: PropTypes.string
    })
  ),
  backgroundVariant: PropTypes.string,
  className: PropTypes.string
};

export default Hero; 