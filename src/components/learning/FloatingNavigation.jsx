import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const FloatingNavigation = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 xl:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4 shadow-xl"
          >
            <nav className="space-y-1">
              {sections.map(({ id, title }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                  }}
                  className="block py-2 px-4 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                >
                  {title}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full p-4 shadow-lg hover:shadow-purple-500/25 transition-shadow backdrop-blur-sm"
        whileTap={{ scale: 0.95 }}
      >
        <svg 
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </motion.button>
    </div>
  );
};

FloatingNavigation.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FloatingNavigation; 