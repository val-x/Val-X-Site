import { useState, useEffect } from 'react';
import { checkEnrollment } from '../utils/enrollment';
import { features, tabContent, stats, testimonials, learningPathSteps } from '../data/programs';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Navbar from '../components/Navbar';
import Hero from '../components/learning/Hero';
import Features from '../components/learning/Features';
import LearningPath from '../components/learning/LearningPath';
import Programs from '../components/learning/programs/Programs';
import Stats from '../components/learning/Stats';
import Testimonials from '../components/learning/Testimonials';
import CTA from '../components/CTA';
import EnrollmentForm from '../components/learning/EnrollmentForm';
import CurriculumModal from '../components/learning/CurriculumModal';
import BackgroundEffects from '../components/learning/BackgroundEffects';
import ScrollProgress from '../components/learning/ScrollProgress';
import TableOfContents from '../components/learning/TableOfContents';
import FloatingNavigation from '../components/learning/FloatingNavigation';
import { FiGrid, FiList, FiFilter, FiSearch } from 'react-icons/fi';
import MainTabNavigation from '../components/navigation/MainTabNavigation';
import ProgramsSection from '../components/learning/programs/ProgramsSection';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const LearnWithUs = () => {
  const [activeTab, setActiveTab] = useState(Object.keys(tabContent)[0]);
  const [activeMainTab, setActiveMainTab] = useState('programs');
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    level: 'all',
    duration: 'all',
    price: 'all',
    featured: false
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile detection and view mode
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile) {
        setViewMode('list');
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sections = [
    { id: 'hero', title: 'Overview' },
    { id: 'features', title: 'Features' },
    { id: 'learning-path', title: 'Learning Path' },
    { id: 'stats', title: 'Impact' },
    { id: 'testimonials', title: 'Success Stories' }
  ];

  const handleEnroll = (program) => {
    setSelectedProgram(program);
    setShowEnrollment(true);
  };

  const handleViewCurriculum = (program) => {
    setSelectedProgram(program);
    setShowCurriculum(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects variant="learning" />
      <ScrollProgress />

      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-slate-900/90 backdrop-blur-xl shadow-lg' : ''
        }`}
      >
        <Navbar />
      </motion.header>

      {/* Main Tab Navigation */}
      <MainTabNavigation 
        activeMainTab={activeMainTab}
        setActiveMainTab={setActiveMainTab}
      />

      <main className="relative">
        {/* Conditional Content Based on Active Tab */}
        {activeMainTab === 'programs' ? (
          <ProgramsSection 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            isMobile={isMobile}
            filters={filters}
            setFilters={setFilters}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabContent={tabContent}
            onEnroll={handleEnroll}
            onViewCurriculum={handleViewCurriculum}
            checkEnrollment={checkEnrollment}
          />
        ) : (
          <>
            {/* Info Hero */}
            <section id="hero" className="relative min-h-[90vh] flex items-center justify-center px-4 py-20">
              <div className="max-w-7xl mx-auto relative z-10">
                <Hero
                  badge="Elevate Your Skills"
                  title={
                    <>
                      Transform Your Future with{' '}
                      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                        Expert-Led Learning
                      </span>
                    </>
                  }
                  description="Join our comprehensive learning programs designed to help you master modern technologies and launch your dream career."
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative py-20 px-4">
              <div className="max-w-7xl mx-auto">
                <Features features={features} />
              </div>
            </section>

            {/* Learning Path Section */}
            <section id="learning-path" className="relative py-20 px-4">
              <div className="max-w-7xl mx-auto">
                <LearningPath steps={learningPathSteps} />
              </div>
            </section>

            {/* Stats Section */}
            <section id="stats" className="relative py-20 px-4">
              <div className="max-w-7xl mx-auto">
                <Stats stats={stats} />
              </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="relative py-20 px-4">
              <div className="max-w-7xl mx-auto">
                <Testimonials testimonials={testimonials} />
              </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 px-4">
              <div className="max-w-7xl mx-auto">
                <CTA />
              </div>
            </section>

            {/* Navigation Helpers - Only shown in Info tab */}
            <TableOfContents sections={sections} />
            <FloatingNavigation sections={sections} />
          </>
        )}
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showEnrollment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-2xl p-8 max-w-lg w-full relative"
            >
              <button
                onClick={() => setShowEnrollment(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <EnrollmentForm program={selectedProgram} onClose={() => setShowEnrollment(false)} />
            </motion.div>
          </motion.div>
        )}

        {showCurriculum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowCurriculum(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowCurriculum(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {selectedProgram && (
                <CurriculumModal 
                  program={selectedProgram} 
                  onClose={() => setShowCurriculum(false)} 
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LearnWithUs;