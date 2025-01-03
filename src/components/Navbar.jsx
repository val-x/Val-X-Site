import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../contexts/ModalContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isModalActive } = useModal();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Chat', path: 'https://valenclient.pages.dev/' },
    { label: 'Showcase', path: '/showcase' },
    { label: 'Community', path: '/blog' },
    { label: 'Learn', path: '/learn-with-us' },
    // { label: 'Careers', path: '/careers' },
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

  if (isModalActive) return null;

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/50 backdrop-blur-xl border-b border-white/10 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="relative flex justify-between items-center px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold group perspective">
          <motion.div 
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 
              font-black tracking-tight">
              VAL-X
            </span>
            <motion.div
              className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-400/20 via-violet-400/20 to-fuchsia-400/20 
                blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={item.path}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  hover:text-white group ${isActive(item.path) ? 'text-white' : 'text-gray-400'}`}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive(item.path) ? (
                  <motion.div
                    layoutId="navBackground"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 
                      rounded-full backdrop-blur-sm"
                    transition={{ type: "spring", bounce: 0.2 }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-white/0 rounded-full hover:bg-white/5 transition-colors duration-300" />
                )}
              </Link>
            </motion.div>
          ))}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/get-started"
              className="relative ml-4 px-6 py-2.5 rounded-full overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 opacity-100 
                group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 opacity-0 
                group-hover:opacity-100 blur-xl transition-opacity" />
              <span className="relative z-10 text-sm font-medium text-white">Get Started</span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden relative z-10 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-gradient-to-r from-fuchsia-400 to-cyan-400 rounded-full"
            />
          </div>
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 md:hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      to={item.path}
                      className={`block px-4 py-2 rounded-lg text-base font-medium transition-colors
                        ${isActive(item.path) 
                          ? 'bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 text-white' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link 
                    to="/get-started"
                    className="block w-full text-center bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 
                      text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
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