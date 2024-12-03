import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { formatTime } from '../../../utils/video';

const ThumbnailPreview = ({
  show,
  position,
  time,
  image,
  duration
}) => {
  return (
    <AnimatePresence>
      {show && image && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute bottom-8 -translate-x-1/2 pointer-events-none"
          style={{ left: position }}
        >
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg border border-violet-500/20 p-1">
            <img 
              src={image} 
              alt={`Preview at ${formatTime(time)}`} 
              className="w-40 h-[90px] rounded"
            />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 
              backdrop-blur-sm rounded-md px-2 py-1 text-xs font-medium text-white">
              {formatTime(time)} / {formatTime(duration)}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ThumbnailPreview.propTypes = {
  show: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  image: PropTypes.string,
  duration: PropTypes.number.isRequired
};

export default ThumbnailPreview; 