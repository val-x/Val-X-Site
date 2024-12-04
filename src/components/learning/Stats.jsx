import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiUsers, FiAward, FiTrendingUp, FiGlobe } from 'react-icons/fi';

const Stats = ({ stats }) => {
  const defaultStats = [
    {
      number: "10K+",
      label: "Active Learners",
      icon: FiUsers,
      color: "from-blue-500 to-purple-500"
    },
    {
      number: "95%",
      label: "Success Rate",
      icon: FiTrendingUp,
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "50+",
      label: "Countries",
      icon: FiGlobe,
      color: "from-pink-500 to-red-500"
    },
    {
      number: "1000+",
      label: "Certifications",
      icon: FiAward,
      color: "from-red-500 to-orange-500"
    }
  ];

  const finalStats = stats || defaultStats;

  return (
    <div className="relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 
          border border-blue-500/20 rounded-full text-blue-400 backdrop-blur-sm">
          Our Impact
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Transforming Lives
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Through Education
          </span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Join thousands of learners who have transformed their careers through our comprehensive programs.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {finalStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              {/* Card */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 
                border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300
                hover:shadow-lg hover:shadow-blue-500/10">
                
                {/* Icon */}
                <div className="mb-6 relative">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color}/10 
                    flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-blue-400 group-hover:text-blue-300 
                      transition-colors duration-300" />
                  </div>
                  <div className={`absolute -inset-2 rounded-xl bg-gradient-to-r ${stat.color}/20 
                    blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>

                {/* Number */}
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} 
                    text-transparent bg-clip-text mb-2`}
                >
                  {stat.number}
                </motion.div>

                {/* Label */}
                <div className="text-sm text-slate-400 group-hover:text-slate-300 
                  transition-colors duration-300">
                  {stat.label}
                </div>
              </div>

              {/* Background Gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-500/5 to-purple-500/5 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          );
        })}
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

Stats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      color: PropTypes.string.isRequired
    })
  )
};

export default Stats; 