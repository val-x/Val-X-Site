import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const TableOfContents = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.unobserve(element);
    });
  }, [sections]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden xl:block fixed right-8 top-1/2 transform -translate-y-1/2 bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 max-w-xs"
    >
      <h4 className="text-lg font-semibold text-white mb-4">Quick Navigation</h4>
      <nav className="space-y-2">
        {sections.map(({ id, title }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`block py-2 px-4 rounded-lg transition-all duration-300 ${
              activeSection === id
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {title}
          </a>
        ))}
      </nav>
    </motion.div>
  );
};

TableOfContents.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TableOfContents; 