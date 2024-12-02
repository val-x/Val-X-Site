import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projects } from '../data/projects';

// Add ProjectCard component
const ProjectCard = ({ project, index, isGridView, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer
        ${isGridView ? '' : 'flex gap-8'}`}
      onClick={onClick}
    >
      {/* Project Image */}
      <div className={`${isGridView ? 'aspect-video' : 'w-1/3'} overflow-hidden`}>
        <img 
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Project Info */}
      <div className={`absolute inset-0 flex flex-col justify-end p-6 ${isGridView ? '' : 'relative w-2/3'}`}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.color}`}>
              {project.category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="text-gray-300 text-sm">{project.description}</p>
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-cyan-400">{project.stats.users} Users</span>
            <span className="text-violet-400">⭐ {project.stats.rating}</span>
            <span className="text-fuchsia-400">↗ {project.stats.growth}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Add ProjectModal component
const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 max-w-2xl w-full border border-white/10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-6">
          {/* Project Image */}
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Project Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.color}`}>
                {project.category}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-400">{project.description}</p>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Challenge</h4>
              <p className="text-gray-400">{project.details.challenge}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Solution</h4>
              <p className="text-gray-400">{project.details.solution}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Impact</h4>
              <p className="text-gray-400">{project.details.impact}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 rounded-xl">
            <div className="text-center">
              <p className="text-sm text-gray-400">Users</p>
              <p className="text-lg font-bold text-cyan-400">{project.stats.users}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Rating</p>
              <p className="text-lg font-bold text-violet-400">{project.stats.rating}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Growth</p>
              <p className="text-lg font-bold text-fuchsia-400">{project.stats.growth}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CaseStudies = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);

  const categories = ['all', ...new Set(projects.map(project => project.category))];

  const filteredProjects = projects
    .filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24">
        {/* Enhanced Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-violet-500/10 to-fuchsia-500/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                  Success Stories
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Discover how we've helped businesses transform their digital presence
              </p>
            </motion.div>

            {/* Search and Filter Controls */}
            <div className="mt-12 space-y-6">
              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search case studies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Category Filter and View Toggle */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                        ${selectedCategory === category 
                          ? 'bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </motion.button>
                  ))}
                </div>

                {/* View Toggle */}
                <div className="flex gap-2 bg-white/5 rounded-full p-1">
                  <button
                    onClick={() => setIsGridView(true)}
                    className={`p-2 rounded-full transition-all ${isGridView ? 'bg-white/10 text-white' : 'text-gray-400'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsGridView(false)}
                    className={`p-2 rounded-full transition-all ${!isGridView ? 'bg-white/10 text-white' : 'text-gray-400'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid/List View */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-gray-400 text-lg">No projects found matching your criteria</p>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className={isGridView 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-8"
                }
              >
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                      index={index}
                      isGridView={isGridView}
                      onClick={() => setSelectedProject(project)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>

        {/* Enhanced Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudies; 