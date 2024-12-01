import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ModelView from '../components/ModelView';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const projects = [
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    title: 'Bonder Connect',
    description: 'Business Networking Platform',
    color: 'from-cyan-400 via-violet-400 to-fuchsia-400',
    tech: 'React & Node.js',
    stats: {
      users: '50K+',
      rating: '4.9',
      growth: '125%'
    }
  },
  {
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    title: 'IHS Ray',
    description: 'E-Commerce Platform',
    color: 'from-fuchsia-400 via-violet-400 to-cyan-400',
    tech: 'Next.js & Tailwind',
    stats: {
      users: '25K+',
      rating: '4.7',
      growth: '85%'
    }
  },
  {
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
    title: 'Kera Cabs',
    description: 'Transportation App',
    color: 'from-violet-400 via-fuchsia-400 to-cyan-400',
    tech: 'React Native & Firebase',
    stats: {
      users: '35K+',
      rating: '4.8',
      growth: '95%'
    }
  },
  {
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    title: 'AAP Construction',
    description: 'Construction Management',
    color: 'from-cyan-400 via-violet-400 to-fuchsia-400',
    tech: 'Vue.js & Laravel',
    stats: {
      users: '20K+',
      rating: '4.6',
      growth: '75%'
    }
  },
  {
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    title: 'Amaze Tech Global',
    description: 'Technology Solutions',
    color: 'from-fuchsia-400 via-violet-400 to-cyan-400',
    tech: 'Angular & Django',
    stats: {
      users: '40K+',
      rating: '4.8',
      growth: '110%'
    }
  },
  {
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    title: 'Brew Box',
    description: 'Food & Beverage Platform',
    color: 'from-violet-400 via-fuchsia-400 to-cyan-400',
    tech: 'MERN Stack',
    stats: {
      users: '30K+',
      rating: '4.7',
      growth: '90%'
    }
  }
];

const ModelViewPage = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(3);

  const handleLoadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, projects.length));
  };

  const hasMoreProjects = visibleProjects < projects.length;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section with Animated Background */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-conic from-cyan-500/30 via-violet-500/30 to-fuchsia-500/30 blur-[100px] animate-spin-slow" />
            <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-conic from-fuchsia-500/30 via-cyan-500/30 to-violet-500/30 blur-[100px] animate-spin-slow-reverse" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                  Our Projects
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Explore our portfolio of innovative digital solutions
              </p>
              
              {/* Project Type Tabs */}
              <div className="flex flex-wrap justify-center gap-4">
                {['all', 'web', 'mobile', 'enterprise'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${selectedTab === tab 
                        ? 'bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* 3D Model Viewer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10"
            >
              <div className="aspect-[16/9]">
                <ModelView projects={projects} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="py-20 relative">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-conic from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 blur-[100px] opacity-30" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-conic from-fuchsia-500/20 via-cyan-500/20 to-violet-500/20 blur-[100px] opacity-30" />
          </div>

          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                  Featured Projects
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Discover our innovative solutions across different industries and technologies
              </p>
            </motion.div>

            {/* Updated Projects Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.slice(0, visibleProjects).map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  {/* Updated Project Card */}
                  <div className="relative">
                    {/* Project Image */}
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    </div>

                    {/* Project Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-8 group-hover:translate-y-0 transition-all duration-300">
                      {/* Tech Badge */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                        <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${project.color} text-white text-sm font-medium`}>
                          {project.tech}
                        </span>
                      </div>

                      {/* Project Info */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                        <p className="text-gray-100 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                          {project.description}
                        </p>

                        {/* Stats Row */}
                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150">
                          <div className="flex items-center gap-1 text-cyan-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                            </svg>
                            <span className="text-sm">{project.stats.users}</span>
                          </div>
                          <div className="flex items-center gap-1 text-violet-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm">{project.stats.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-fuchsia-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13.962 8.885l-3.736 3.739c-.086.086-.201.13-.316.13-.115 0-.23-.044-.316-.13l-3.736-3.739c-.442-.443-.13-1.2.471-1.2h7.162c.601 0 .913.757.471 1.2z" />
                            </svg>
                            <span className="text-sm">{project.stats.growth}</span>
                          </div>
                        </div>

                        {/* View Project Button */}
                        <button className="w-full px-4 py-2 mt-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 delay-200">
                          View Project
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Show More Button */}
            {hasMoreProjects && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-16 text-center"
              >
                <button
                  onClick={handleLoadMore}
                  className="group relative px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400/10 via-violet-400/10 to-fuchsia-400/10 hover:from-cyan-400/20 hover:via-violet-400/20 hover:to-fuchsia-400/20 text-white font-medium transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Show More Projects</span>
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ModelViewPage; 