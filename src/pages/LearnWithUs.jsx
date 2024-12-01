import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import EnrollmentForm from '../components/EnrollmentForm';
import Navbar from '../components/Navbar';
import { checkEnrollment } from '../utils/enrollment';
import { programs } from '../data/programs';

const LearnWithUs = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [enrollingProgram, setEnrollingProgram] = useState(null);
  


  const filteredPrograms = selectedLevel === 'all' 
    ? programs 
    : programs.filter(program => program.level.toLowerCase() === selectedLevel);

  const features = [
    {
      icon: "👩‍💻",
      title: "Live Coding Sessions",
      description: "Weekly live sessions with experienced system designers"
    },
    {
      icon: "📚",
      title: "Comprehensive Materials",
      description: "Access to detailed documentation and case studies"
    },
    {
      icon: "🤝",
      title: "1-on-1 Mentoring",
      description: "Personal guidance from industry experts"
    },
    {
      icon: "🏆",
      title: "Certification",
      description: "Industry-recognized certification upon completion"
    }
  ];

  const openCurriculum = (program) => {
    setSelectedProgram(program);
  };

  const isEnrolled = (programId) => {
    return checkEnrollment(programId);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black pt-24">
        
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Master System Design
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Comprehensive learning programs to help you design and build scalable, reliable, and efficient systems.
          </p>
        </motion.div>

        {/* Add this announcement banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 mb-16 border border-purple-500/20"
        >
          <div className="flex items-start gap-4">
            <span className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </span>
            <div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                Special Launch Offer
              </h3>
              <p className="text-gray-400">
                We're currently in the development phase of our courses and offering free access for early adopters. 
                Join now to get lifetime access to these comprehensive system design courses!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-sm"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter Section */}
        <div className="flex justify-center gap-4 mt-16 mb-8">
          {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedLevel === level
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredPrograms.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-white">{program.title}</h3>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-400">{program.price}</span>
                    {program.originalPrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        {program.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-400">{program.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-purple-400">Level:</span>
                    <span className="text-sm text-gray-100">{program.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-purple-400">Duration:</span>
                    <span className="text-sm text-gray-100">{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-purple-400">Next Start:</span>
                    <span className="text-sm text-gray-100">{program.nextStart}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-sm font-medium text-purple-400 mb-2">What you'll learn:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {program.topics.map((topic) => (
                      <li key={topic} className="text-sm text-gray-100 flex items-center gap-1">
                        <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 mt-6">
                  {isEnrolled(program.id) ? (
                    <Link
                      to={`/program-materials/${program.id}`}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
                    >
                      Continue Learning
                    </Link>
                  ) : (
                    <button 
                      onClick={() => setEnrollingProgram(program)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                    >
                      Enroll Now
                    </button>
                  )}
                  <button 
                    onClick={() => openCurriculum(program)}
                    className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-300"
                  >
                    View Curriculum
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Curriculum Modal */}
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedProgram.title}</h3>
                  <p className="text-gray-400">{selectedProgram.description}</p>
                </div>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {selectedProgram.curriculum.map((week) => (
                  <div key={week.week} className="border border-gray-800 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">
                      Week {week.week}: {week.title}
                    </h4>
                    <ul className="space-y-2">
                      {week.topics.map((topic) => (
                        <li key={topic} className="text-gray-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Enrollment Form Modal */}
        {enrollingProgram && (
          <EnrollmentForm 
            program={enrollingProgram} 
            onClose={() => setEnrollingProgram(null)} 
          />
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 text-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to become a system design expert?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of engineers who have transformed their careers through our system design programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-started"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              Start Learning Today
            </Link>
            <button className="px-8 py-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-300">
              Download Syllabus
            </button>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default LearnWithUs; 