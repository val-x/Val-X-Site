import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MainTabNavigation = ({ activeMainTab, setActiveMainTab, className = '' }) => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return localStorage.getItem('user') !== null;
  };

  const handleDashboardClick = () => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    } else {
      navigate('/login', { state: { from: '/dashboard' } });
    }
  };

  const DashboardButton = () => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleDashboardClick}
      className="relative px-4 py-2 rounded-xl overflow-hidden group"
    >
      {/* Button Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-violet-600/80 
        to-purple-600/80 opacity-90 group-hover:opacity-100 transition-opacity" />
      
      {/* Button Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-violet-400 
        to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
      
      {/* Button Border Glow */}
      <div className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-white/20 
        transition-colors" />
      
      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2 text-white font-medium">
        <svg className="w-4 h-4 transition-transform group-hover:rotate-12 duration-300" 
          viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
        </svg>
        <span className="hidden sm:inline group-hover:translate-x-0.5 transition-transform duration-300">
          {isAuthenticated() ? 'Dashboard' : 'Sign In'}
        </span>
      </span>

      {/* Hover Ripple Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r 
        from-transparent via-white/5 to-transparent transition-transform duration-700" />
    </motion.button>
  );

  return (
    <div className={`w-full bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80 py-4 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Tabs Container */}
          <div className="flex justify-center flex-1">
            <div className="relative inline-flex p-1.5 bg-slate-800/80 backdrop-blur-sm rounded-2xl 
              border border-slate-700/50 shadow-lg shadow-black/20 group hover:border-slate-600/50 
              transition-all duration-500">
              {/* Ambient light effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-violet-600/30 to-purple-600/30 
                rounded-3xl blur-2xl group-hover:opacity-100 group-hover:from-blue-600/40 
                group-hover:via-violet-600/40 group-hover:to-purple-600/40 transition-all duration-500 opacity-60 -z-10" />
              
              {/* Container glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-violet-500/5 
                to-purple-500/5 group-hover:from-blue-500/10 group-hover:via-violet-500/10 
                group-hover:to-purple-500/10 transition-colors duration-500" />
              
              {/* Programs Tab */}
              <motion.button
                onClick={() => setActiveMainTab('programs')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base 
                  transition-all duration-300 hover:bg-white/5
                  ${activeMainTab === 'programs' 
                    ? 'text-white font-semibold' 
                    : 'text-slate-300 hover:text-white font-medium'
                  }`}
              >
                {activeMainTab === 'programs' && (
                  <motion.div
                    layoutId="tabBackground"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-violet-600/30 to-purple-600/30 
                      rounded-xl border border-blue-400/30 backdrop-blur-sm shadow-lg shadow-blue-500/20"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  >
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-50" />
                  </motion.div>
                )}
                <span className={`relative z-10 flex items-center gap-2 tracking-wide
                  ${activeMainTab === 'programs' ? 'text-white' : 'text-slate-300'}`}
                >
                  <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 
                    ${activeMainTab === 'programs' ? 'scale-110 rotate-180' : ''}`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 6H20M4 12H20M4 18H20" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                      className={`transition-colors duration-300 ${
                        activeMainTab === 'programs' ? 'stroke-blue-200' : 'stroke-current'
                      }`}
                    />
                  </svg>
                  <span className="relative font-semibold">
                    {activeMainTab === 'programs' ? (
                      <span className="relative">
                        {/* Solid text color layer */}
                        <span className="absolute inset-0 text-white/80">Our Programs</span>
                        {/* Gradient overlay */}
                        <span className="relative bg-gradient-to-r from-white via-blue-200 to-purple-200 
                          bg-clip-text text-transparent">
                          Our Programs
                        </span>
                        {/* Text glow effect */}
                        <div className="absolute inset-0 blur-[2px] bg-gradient-to-r from-blue-400/40 
                          to-purple-400/40 -z-10 opacity-100" />
                      </span>
                    ) : (
                      "Our Programs"
                    )}
                    {activeMainTab === 'programs' && (
                      <motion.span
                        layoutId="underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </span>
                </span>
              </motion.button>

              {/* Info Tab */}
              <motion.button
                onClick={() => setActiveMainTab('info')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base 
                  transition-all duration-300 hover:bg-white/5
                  ${activeMainTab === 'info' 
                    ? 'text-white font-semibold' 
                    : 'text-slate-300 hover:text-white font-medium'
                  }`}
              >
                {activeMainTab === 'info' && (
                  <motion.div
                    layoutId="tabBackground"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-violet-600/30 to-blue-600/30 
                      rounded-xl border border-purple-400/30 backdrop-blur-sm shadow-lg shadow-purple-500/20"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  >
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-50" />
                  </motion.div>
                )}
                <span className={`relative z-10 flex items-center gap-2 tracking-wide
                  ${activeMainTab === 'info' ? 'text-white' : 'text-slate-300'}`}
                >
                  <svg 
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 
                      ${activeMainTab === 'info' ? 'scale-110 rotate-12' : ''}`}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 
                        6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className={`transition-colors duration-300 ${
                        activeMainTab === 'info' ? 'stroke-purple-200' : 'stroke-current'
                      }`}
                    />
                  </svg>
                  <span className="relative font-semibold">
                    {activeMainTab === 'info' ? (
                      <span className="relative">
                        {/* Solid text color layer */}
                        <span className="absolute inset-0 text-white/80">Info</span>
                        {/* Gradient overlay */}
                        <span className="relative bg-gradient-to-r from-white via-purple-200 to-blue-200 
                          bg-clip-text text-transparent">
                          Info
                        </span>
                        {/* Text glow effect */}
                        <div className="absolute inset-0 blur-[2px] bg-gradient-to-r from-purple-400/40 
                          to-blue-400/40 -z-10 opacity-100" />
                      </span>
                    ) : (
                      "Info"
                    )}
                    {activeMainTab === 'info' && (
                      <motion.span
                        layoutId="underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </span>
                </span>
              </motion.button>
            </div>
          </div>

          {/* Dashboard Button */}
          <DashboardButton />
        </div>
      </div>
    </div>
  );
};

export default MainTabNavigation; 