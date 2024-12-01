import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { checkEnrollment } from '../utils/enrollment';
import { materials, programKeys } from '../data/materials';
import Navbar from '../components/Navbar';

const ProgramMaterials = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [completedMaterials, setCompletedMaterials] = useState({});

  useEffect(() => {
    // Check if user is enrolled
    const enrolled = checkEnrollment(parseInt(programId));
    setIsEnrolled(enrolled);

    // If not enrolled, redirect to learn-with-us page
    if (!enrolled) {
      alert('Please enroll in the course to access materials');
      navigate('/learn-with-us');
    }
  }, [programId, navigate]);

  // If not enrolled, don't render content
  if (!isEnrolled) {
    return null;
  }

  const programKey = programKeys[programId];
  const program = materials[programKey];

  if (!program) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Program Not Found</h2>
          <p className="text-gray-400 mb-6">The program you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/learn-with-us')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium"
          >
            Return to Courses
          </button>
        </div>
      </div>
    );
  }

  const handleMaterialComplete = (weekNum, materialIndex) => {
    setCompletedMaterials(prev => ({
      ...prev,
      [`${weekNum}-${materialIndex}`]: true
    }));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Course Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-4">{program.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {program.weeks.length} weeks
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {selectedWeek} of {program.weeks.length} completed
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <span className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <div>
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  Early Access Program
                </h3>
                <p className="text-gray-400">
                  You're part of our early access program! We're continuously updating and improving the course content.
                  Your feedback will help us make this course even better.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-64 flex-shrink-0">
              <div className="bg-gray-900 rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Course Content</h2>
                <div className="mb-4 w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: `${(selectedWeek / program.weeks.length) * 100}%` }}
                  />
                </div>
                <nav className="space-y-2">
                  {program.weeks.map((week) => (
                    <button
                      key={week.week}
                      onClick={() => setSelectedWeek(week.week)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors relative group ${
                        selectedWeek === week.week
                          ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white'
                          : 'text-gray-400 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Week {week.week}</span>
                        {selectedWeek > week.week && (
                          <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm opacity-80 truncate">{week.title}</p>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-8 grid grid-cols-3 gap-4">
                <div className="bg-gray-900 rounded-xl p-4">
                  <h4 className="text-sm text-gray-400 mb-1">Course Progress</h4>
                  <p className="text-2xl font-bold">
                    {Math.round((Object.keys(completedMaterials).length / 
                      (program.weeks.reduce((acc, week) => acc + week.materials.length, 0))) * 100)}%
                  </p>
                </div>
                <div className="bg-gray-900 rounded-xl p-4">
                  <h4 className="text-sm text-gray-400 mb-1">Time Invested</h4>
                  <p className="text-2xl font-bold">
                    {Object.keys(completedMaterials).length * 2}h
                  </p>
                </div>
                <div className="bg-gray-900 rounded-xl p-4">
                  <h4 className="text-sm text-gray-400 mb-1">Current Streak</h4>
                  <p className="text-2xl font-bold">3 days</p>
                </div>
              </div>

              {program.weeks
                .filter((week) => week.week === selectedWeek)
                .map((week) => (
                  <div key={week.week}>
                    <h2 className="text-2xl font-bold mb-6">Week {week.week}: {week.title}</h2>
                    <div className="space-y-6">
                      {week.materials.map((material, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-900 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              {material.type === 'reading' && (
                                <span className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                                </span>
                              )}
                              {material.type === 'video' && (
                                <span className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </span>
                              )}
                              {material.type === 'exercise' && (
                                <span className="p-2 bg-pink-500/10 text-pink-400 rounded-lg">
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </span>
                              )}
                              <h3 className="text-lg font-semibold">{material.title}</h3>
                            </div>
                            <span className="text-sm text-gray-400">{material.duration}</span>
                          </div>

                          {material.type === 'reading' && (
                            <div className="prose prose-invert max-w-none">
                              <p className="text-gray-300">{material.content}</p>
                              <div className="flex items-center gap-4 mt-4">
                                <button 
                                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                  onClick={() => handleMaterialComplete(week.week, index)}
                                >
                                  {completedMaterials[`${week.week}-${index}`] ? 'Completed ✓' : 'Mark as Complete'}
                                </button>
                                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                  Continue Reading
                                </button>
                              </div>
                            </div>
                          )}

                          {material.type === 'video' && (
                            <div>
                              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-gray-400">Video Player Placeholder</span>
                              </div>
                              <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                Watch Video
                              </button>
                            </div>
                          )}

                          {material.type === 'exercise' && (
                            <div>
                              <p className="text-gray-400 mb-4">{material.description}</p>
                              <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                Start Exercise
                              </button>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setSelectedWeek(prev => Math.max(1, prev - 1))}
                  disabled={selectedWeek === 1}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    selectedWeek === 1
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous Week
                </button>
                <button
                  onClick={() => setSelectedWeek(prev => Math.min(program.weeks.length, prev + 1))}
                  disabled={selectedWeek === program.weeks.length}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    selectedWeek === program.weeks.length
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  Next Week
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramMaterials; 