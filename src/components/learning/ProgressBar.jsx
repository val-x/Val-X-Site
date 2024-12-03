import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ProgressBar = ({ progress, total, label, variant = 'default' }) => {
  const percentage = Math.round((progress / total) * 100);

  const variants = {
    default: {
      container: "bg-slate-800/50",
      bar: "bg-gradient-to-r from-blue-500 to-purple-500",
      text: "text-slate-300"
    },
    success: {
      container: "bg-green-900/20",
      bar: "bg-gradient-to-r from-green-500 to-emerald-500",
      text: "text-green-400"
    },
    warning: {
      container: "bg-yellow-900/20",
      bar: "bg-gradient-to-r from-yellow-500 to-orange-500",
      text: "text-yellow-400"
    }
  };

  const currentVariant = variants[variant];

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${currentVariant.text}`}>{label}</span>
        <span className={`text-sm font-medium ${currentVariant.text}`}>{percentage}%</span>
      </div>
      <div className={`h-2 rounded-full overflow-hidden ${currentVariant.container}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-full rounded-full ${currentVariant.bar}`}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'success', 'warning'])
};

export default ProgressBar; 