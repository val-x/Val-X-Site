import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Stats = ({ 
  stats,
  badge = "Our Impact",
  title = "Making a Difference",
  className = "",
  variant = "default" // 'default' | 'gradient' | 'minimal'
}) => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top center+=100",
      }
    });

    tl.from(".stat-card", {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    });
  }, []);

  const variants = {
    default: {
      container: "bg-gradient-to-b from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6",
      number: "bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text",
      label: "text-slate-400"
    },
    gradient: {
      container: "bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 hover:border-slate-600/50 transition-all duration-300",
      number: "text-white",
      label: "text-slate-300"
    },
    minimal: {
      container: "p-6",
      number: "text-white",
      label: "text-slate-400"
    }
  };

  const currentVariant = variants[variant];

  return (
    <div className={`stats-section relative ${className}`}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-400">
          {badge}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white mb-4">
          {title}
        </h2>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`stat-card group ${currentVariant.container}`}
          >
            {stat.icon && (
              <div className="mb-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                {typeof stat.icon === 'string' ? (
                  <span className="text-4xl">{stat.icon}</span>
                ) : (
                  <stat.icon className="w-8 h-8" />
                )}
              </div>
            )}
            <h3 className={`text-3xl md:text-4xl font-bold mb-2 ${currentVariant.number}`}>
              {stat.number}
            </h3>
            <p className={currentVariant.label}>{stat.label}</p>
            {stat.change && (
              <div className={`mt-2 text-sm ${
                parseFloat(stat.change) >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {parseFloat(stat.change) >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(stat.change))}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Stats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
      change: PropTypes.string
    })
  ).isRequired,
  badge: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'gradient', 'minimal'])
};

export default Stats; 