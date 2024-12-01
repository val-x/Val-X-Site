import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Blog', path: '/blog' },
    { label: 'Careers', path: '/careers' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-gradient-to-r from-black/95 via-black/90 to-black/95 backdrop-blur-md py-3 shadow-lg shadow-blue-500/10' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />
      
      <nav className="relative flex justify-between items-center px-6 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold flex items-center group perspective-1000">
          <motion.span 
            className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text
              group-hover:bg-[length:400%] bg-[length:100%] animate-text-shine font-black"
            whileHover={{ 
              rotateX: [0, 15, -15, 0],
              transition: { duration: 0.5 }
            }}
          >
            VAL-X
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <Link 
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.path) ? 'text-white' : 'text-gray-300'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                  transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                {isActive(item.path) && (
                  <motion.span 
                    layoutId="activeTab"
                    className="absolute inset-0 -z-10 rounded-lg bg-white/10 backdrop-blur-sm"
                    transition={{ type: "spring", bounce: 0.2 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <Link 
              to="/get-started"
              className="relative px-6 py-2.5 rounded-full overflow-hidden"
            >
              <span className="relative z-10 text-sm font-medium text-white">Get Started</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden relative z-10 p-2 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-white transform origin-center transition-transform"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 bg-white"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-white transform origin-center transition-transform"
            />
          </div>
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
              animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute top-full right-0 w-full bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-lg md:hidden"
            >
              <div className="flex flex-col items-center py-8 space-y-6">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full px-6"
                  >
                    <Link 
                      to={item.path}
                      className="block text-gray-300 hover:text-white transition-colors relative group py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="relative z-10 font-medium">{item.label}</span>
                      <motion.div
                        whileHover={{ scaleX: 1, opacity: 1 }}
                        className="absolute inset-0 bg-white/5 rounded-lg scale-x-0 opacity-0 transition-all duration-300"
                      />
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full px-6"
                >
                  <Link 
                    to="/get-started"
                    className="block w-full text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                      text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-blue-500/25 
                      hover:shadow-purple-500/25 transition-shadow"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;