import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, ChevronRightIcon, ClipboardDocumentIcon, InformationCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { docSections, docsContent } from '../data/docsData';
import mermaid from 'mermaid';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ApiEndpoint = ({ method, endpoint, description, parameters }) => {
  const methodColors = {
    GET: 'bg-green-500/10 text-green-400 border-green-500/20',
    POST: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    PUT: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    DELETE: 'bg-red-500/10 text-red-400 border-red-500/20'
  };

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden my-4">
      <div className="p-4 bg-white/5">
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded text-sm font-medium border ${methodColors[method]}`}>
            {method}
          </span>
          <code className="text-cyan-400">{endpoint}</code>
        </div>
        <p className="mt-2 text-gray-100">{description}</p>
      </div>
      {parameters && parameters.length > 0 && (
        <div className="border-t border-white/10 p-4">
          <h4 className="text-sm font-medium text-white mb-3">Parameters</h4>
          <div className="space-y-2">
            {parameters.map((param, index) => (
              <div key={index} className="flex items-start gap-3 text-sm">
                <span className="text-violet-400 font-medium">{param.name}</span>
                <span className="text-gray-500">{param.type}</span>
                {param.required && (
                  <span className="text-red-400 text-xs">required</span>
                )}
                <span className="text-gray-100">{param.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileNavigation = ({ sections, activeSection, onSectionClick, isOpen, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="absolute right-0 top-0 bottom-0 w-3/4 bg-gray-900 p-6 overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Navigation</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
            <XMarkIcon className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <nav className="space-y-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onSectionClick(item.href);
                        onClose();
                      }}
                      className={`group flex items-center transition-colors
                        ${activeSection === item.href.replace('#', '') 
                          ? 'text-white' 
                          : 'text-gray-400 hover:text-white'}`}
                    >
                      <ChevronRightIcon className={`mr-2 w-4 h-4 transition-opacity
                        ${activeSection === item.href.replace('#', '')
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'}`}
                      />
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </motion.div>
    </motion.div>
  );
};

const MermaidDiagram = ({ definition }) => {
  const containerRef = useRef(null);
  const diagramId = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#8b5cf6',
        primaryTextColor: '#fff',
        primaryBorderColor: '#7c3aed',
        lineColor: '#6366f1',
        secondaryColor: '#6366f1',
        tertiaryColor: '#1e1b4b'
      }
    });

    if (containerRef.current) {
      try {
        mermaid.render(diagramId.current, definition).then(({ svg }) => {
          containerRef.current.innerHTML = svg;
        });
      } catch (error) {
        console.error('Mermaid diagram rendering failed:', error);
      }
    }
  }, [definition]);

  return (
    <div 
      ref={containerRef} 
      className="overflow-x-auto bg-white/5 rounded-lg p-4 my-6"
    />
  );
};

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('quick-start');
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleSectionClick = (href) => {
    setActiveSection(href.replace('#', ''));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = Object.entries(docsContent)
      .flatMap(([id, section]) => {
        const matches = section.content
          .filter(item => 
            item.type === 'paragraph' || 
            item.type === 'heading' || 
            (item.type === 'list' && item.items.some(i => i.toLowerCase().includes(query.toLowerCase())))
          )
          .map(item => ({
            sectionId: id,
            sectionTitle: section.title,
            matchType: item.type,
            text: item.type === 'list' 
              ? item.items.find(i => i.toLowerCase().includes(query.toLowerCase()))
              : item.text
          }));
        return matches;
      })
      .filter(result => 
        result.text.toLowerCase().includes(query.toLowerCase())
      );

    setSearchResults(results);
  };

  const handleSearchResultClick = (sectionId) => {
    setActiveSection(sectionId);
    setSearchQuery('');
    setSearchResults([]);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderContent = (content) => {
    return content.map((item, index) => {
      switch (item.type) {
        case 'paragraph':
          return (
            <p key={index} className="text-gray-100">
              {item.text}
            </p>
          );
        case 'heading':
          return (
            <h3 key={index} className="text-white mt-8 mb-4">
              {item.text}
            </h3>
          );
        case 'list':
          return (
            <ul key={index} className="list-disc list-inside text-gray-100 space-y-2">
              {item.items.map((listItem, i) => (
                <li key={i}>{listItem}</li>
              ))}
            </ul>
          );
        case 'code':
          return (
            <div key={index} className="bg-black/50 p-4 rounded-lg my-4 relative group">
              <pre className="text-sm overflow-x-auto">
                <code className={`text-cyan-400 language-${item.language}`}>
                  {item.text}
                </code>
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(item.text)}
                className="absolute top-2 right-2 p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 
                  hover:bg-white/10 transition-all duration-200"
              >
                <ClipboardDocumentIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          );
        case 'note':
          return (
            <div key={index} className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4 my-4">
              <div className="flex items-start">
                <InformationCircleIcon className="w-5 h-5 text-violet-400 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-gray-100">{item.text}</p>
              </div>
            </div>
          );
        case 'diagram':
          return (
            <MermaidDiagram
              key={index}
              definition={item.definition}
            />
          );
        case 'api-endpoint':
          return (
            <ApiEndpoint
              key={index}
              method={item.method}
              endpoint={item.endpoint}
              description={item.description}
              parameters={item.parameters}
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert max-w-none">
          {/* Your existing docs content */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Docs; 