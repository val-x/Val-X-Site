import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/learning/Hero';
import Features from '../components/learning/Features';
import LearningPath from '../components/learning/LearningPath';
import Programs from '../components/learning/Programs';
import Stats from '../components/learning/Stats';
import Testimonials from '../components/learning/Testimonials';
import CTA from '../components/CTA';
import EnrollmentForm from '../components/learning/EnrollmentForm';
import CurriculumModal from '../components/learning/CurriculumModal';
import { checkEnrollment } from '../utils/enrollment';
import { features, tabContent, stats, testimonials, learningPathSteps } from '../data/programs';
import { motion } from 'framer-motion';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundEffects from '../components/learning/BackgroundEffects';
import ScrollProgress from '../components/learning/ScrollProgress';
import TableOfContents from '../components/learning/TableOfContents';
import FloatingNavigation from '../components/learning/FloatingNavigation';

gsap.registerPlugin(ScrollTrigger);

const LearnWithUs = () => {
  const [activeTab, setActiveTab] = useState('code');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [enrollingProgram, setEnrollingProgram] = useState(null);

  useGSAP(() => {
    gsap.from(".animate-on-scroll", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".animate-on-scroll",
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  const sections = [
    { id: 'hero', title: 'Overview' },
    { id: 'features', title: 'Features' },
    { id: 'learning-path', title: 'Learning Path' },
    { id: 'programs', title: 'Programs' },
    { id: 'stats', title: 'Statistics' },
    { id: 'testimonials', title: 'Testimonials' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
      <ScrollProgress />
      <Navbar />
      <BackgroundEffects variant="minimal" />
      <TableOfContents sections={sections} />
      <FloatingNavigation sections={sections} />

      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div id="hero" className="pt-20 pb-32 relative max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Hero 
                badge="Transform Your Future"
                title="Learn and Grow with Us"
                description="Comprehensive learning programs to help you succeed in tech and business."
              />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="space-y-32">
            {sections.map(({ id, title }, index) => (
              <div 
                key={id} 
                id={id}
                className="relative"
              >
                {/* Section Progress Indicator */}
                <div className="absolute -left-4 md:-left-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-700/50 to-transparent">
                  <motion.div
                    initial={{ height: "0%" }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
                  />
                </div>

                {/* Section Number */}
                <div className="absolute -left-6 md:-left-10 top-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                  {index + 1}
                </div>

                {/* Section Content */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="pl-8"
                >
                  {/* Render the appropriate component based on section ID */}
                  {id === 'features' && <Features features={features} />}
                  {id === 'learning-path' && <LearningPath steps={learningPathSteps} />}
                  {id === 'programs' && (
                    <Programs 
                      activeTab={activeTab}
                      onTabChange={setActiveTab}
                      tabContent={tabContent}
                      onEnroll={setEnrollingProgram}
                      onViewCurriculum={setSelectedProgram}
                      isEnrolled={checkEnrollment}
                    />
                  )}
                  {id === 'stats' && (
                    <Stats 
                      stats={stats}
                      variant="gradient"
                      badge="Our Impact"
                      title="Transforming Careers Worldwide"
                    />
                  )}
                  {id === 'testimonials' && <Testimonials testimonials={testimonials} />}
                </motion.div>
              </div>
            ))}

            {/* CTA Section */}
            <div id="cta">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="max-w-4xl mx-auto"
              >
                <CTA 
                  badge="Ready to Transform?"
                  title="Start Your Learning Journey Today"
                  description="Join thousands of learners who have transformed their careers through our comprehensive programs. Get access to world-class education and expert mentorship."
                  primaryAction={{
                    text: "Start Learning",
                    link: "/get-started"
                  }}
                  secondaryAction={{
                    text: "View Course Catalog",
                    onClick: () => {
                      console.log("Downloading course catalog...");
                    }
                  }}
                  className="bg-gradient-to-r from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {enrollingProgram && (
        <EnrollmentForm 
          program={enrollingProgram} 
          onClose={() => setEnrollingProgram(null)} 
        />
      )}

      {selectedProgram && (
        <CurriculumModal 
          program={selectedProgram} 
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </div>
  );
};

export default LearnWithUs;