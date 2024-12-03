import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tabContent } from '../data/programs';
import { getUserProgress, updateUserProgress } from '../utils/enrollment';
import ProgressBar from '../components/learning/ProgressBar';
import BackgroundEffects from '../components/learning/BackgroundEffects';
import LessonContent from '../components/learning/LessonContent';
import Navbar from '../components/Navbar';
import { FiClock, FiCheckCircle, FiLock, FiBookmark, FiShare2, FiDownload } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const ProgramMaterials = () => {
  const { programId } = useParams();
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [activeTopic, setActiveTopic] = useState(0);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState({});
  const [showNotes, setShowNotes] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(false);

  // Find program data
  const program = Object.values(tabContent)
    .flatMap(tab => tab.programs)
    .find(p => p.id === programId);

  useEffect(() => {
    try {
      if (program && program.curriculum) {
        const totalTopics = program.curriculum.reduce((total, week) => {
          if (!week) return total;
          if (week.days) {
            return total + week.days.reduce(
              (dayTotal, day) => dayTotal + (day?.topics?.length || 0),
              0
            );
          }
          return total + (week.topics?.length || 0);
        }, 0);

        const userProgress = getUserProgress(programId) || {
          completed: 0,
          total: totalTopics,
          weekProgress: program.curriculum.map(week => ({
            weekNum: week?.week || 0,
            days: week?.days ? week.days.map(day => ({
              dayNum: day?.day || 0,
              completed: 0,
              total: day?.topics?.length || 0
            })) : [{
              dayNum: 1,
              completed: 0,
              total: week?.topics?.length || 0
            }]
          })),
          lastAccessed: new Date().toISOString()
        };

        setProgress(userProgress);
      }
    } catch (err) {
      console.error('Error initializing progress:', err);
      setError('Failed to initialize course progress');
    }
  }, [programId, program]);

  useEffect(() => {
    if (program?.id) {
      const savedBookmarks = JSON.parse(localStorage.getItem(`bookmarks_${programId}`) || '[]');
      const savedNotes = JSON.parse(localStorage.getItem(`notes_${programId}`) || '{}');
      setBookmarks(savedBookmarks);
      setNotes(savedNotes);
    }
  }, [programId, program]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Error</h1>
          <p className="text-slate-400 mb-4">{error}</p>
          <Link 
            to="/learn" 
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Return to Programs
          </Link>
        </div>
      </div>
    );
  }

  if (!program || !program.curriculum) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Program Not Found</h1>
          <p className="text-slate-400 mb-4">
            The program "{programId}" could not be found or has no curriculum content.
          </p>
          <Link 
            to="/learn" 
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Return to Programs
          </Link>
        </div>
      </div>
    );
  }

  const currentWeek = program.curriculum[activeWeek];
  if (!currentWeek) {
    setActiveWeek(0);
    return null;
  }

  const currentDay = currentWeek.days?.[activeDay];
  const currentTopics = currentWeek.days 
    ? currentDay?.topics 
    : currentWeek.topics;

  if (!currentTopics) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Content Not Available</h1>
          <p className="text-slate-400 mb-4">
            The selected lesson content is not available at the moment.
          </p>
          <Link 
            to="/learn" 
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Return to Programs
          </Link>
        </div>
      </div>
    );
  }

  const currentTopic = currentDay 
    ? currentDay.topics[activeTopic]
    : currentWeek.topics?.[activeTopic];

  const calculateProgress = (weekIndex, dayIndex) => {
    if (!progress?.weekProgress) return 0;
    const weekProgress = progress.weekProgress[weekIndex];
    if (!weekProgress?.days) return 0;
    const dayProgress = weekProgress.days[dayIndex];
    if (!dayProgress) return 0;
    return (dayProgress.completed / dayProgress.total) * 100;
  };

  const isLessonLocked = (weekIndex, dayIndex) => {
    if (weekIndex === 0 && dayIndex === 0) return false;
    
    const prevWeekProgress = progress?.weekProgress?.[weekIndex - 1];
    const prevDayProgress = progress?.weekProgress?.[weekIndex]?.days?.[dayIndex - 1];

    if (dayIndex === 0) {
      // Check if previous week is completed
      return !prevWeekProgress?.days?.every(day => day.completed === day.total);
    } else {
      // Check if previous day is completed
      return !prevDayProgress || prevDayProgress.completed < prevDayProgress.total;
    }
  };

  const handleLessonComplete = () => {
    try {
      if (!progress || !program.curriculum || !currentTopics) return;

      const newProgress = {
        ...progress,
        completed: Math.min(progress.completed + 1, progress.total),
        weekProgress: progress.weekProgress.map((week, weekIndex) => {
          if (weekIndex !== activeWeek) return week;
          return {
            ...week,
            days: week.days.map((day, dayIndex) => {
              if (currentWeek.days && dayIndex !== activeDay) return day;
              
              const newCompleted = Math.min(day.completed + 1, day.total);
              const isFullyCompleted = newCompleted === day.total;
              
              if (isFullyCompleted) {
                toast.success(`Completed: Day ${day.day} - ${day.title}`);
                if (weekIndex === program.curriculum.length - 1 && 
                    dayIndex === currentWeek.days.length - 1) {
                  setShowCongrats(true);
                  setIsCompleted(true);
                }
              }
              
              return {
                ...day,
                completed: newCompleted
              };
            })
          };
        }),
        lastAccessed: new Date().toISOString()
      };

      updateUserProgress(programId, newProgress);
      setProgress(newProgress);

      // Navigation logic
      if (activeTopic < currentTopics.length - 1) {
        setActiveTopic(prev => prev + 1);
      } else if (currentWeek.days && activeDay < currentWeek.days.length - 1) {
        setActiveDay(prev => prev + 1);
        setActiveTopic(0);
      } else if (activeWeek < program.curriculum.length - 1) {
        setActiveWeek(prev => prev + 1);
        setActiveDay(0);
        setActiveTopic(0);
      }
    } catch (err) {
      console.error('Error completing lesson:', err);
      setError('Failed to update progress');
    }
  };

  const currentLesson = currentTopic ? {
    title: currentTopic,
    content: `# ${currentTopic}\n\n## Overview\n\nThis lesson covers ${currentTopic}.\n\n## Learning Objectives\n\n- Understand the fundamentals of ${currentTopic}\n- Learn best practices for implementation\n- Gain practical experience through exercises\n\n## Content\n\nDetailed content for ${currentTopic} will be covered in this section...\n`,
    duration: currentDay?.duration || "60 mins",
    resources: [
      {
        type: 'video',
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        title: `${currentTopic} - Video Tutorial`,
        duration: 596
      },
      {
        type: 'article',
        url: '#',
        title: `Deep Dive into ${currentTopic}`
      }
    ],
    quiz: [
      {
        question: `What is the main purpose of ${currentTopic}?`,
        options: [
          "Option A - Example answer",
          "Option B - Example answer",
          "Option C - Example answer",
          "Option D - Example answer"
        ],
        correctAnswer: 0
      }
    ]
  } : null;

  const toggleBookmark = (weekIndex, dayIndex, topicIndex) => {
    const bookmarkKey = `${weekIndex}-${dayIndex}-${topicIndex}`;
    const newBookmarks = bookmarks.includes(bookmarkKey)
      ? bookmarks.filter(b => b !== bookmarkKey)
      : [...bookmarks, bookmarkKey];
    setBookmarks(newBookmarks);
    localStorage.setItem(`bookmarks_${programId}`, JSON.stringify(newBookmarks));
    toast.success(
      bookmarks.includes(bookmarkKey) 
        ? 'Bookmark removed' 
        : 'Lesson bookmarked for later'
    );
  };

  const saveNote = (note) => {
    const noteKey = `${activeWeek}-${activeDay}-${activeTopic}`;
    const newNotes = { ...notes, [noteKey]: note };
    setNotes(newNotes);
    localStorage.setItem(`notes_${programId}`, JSON.stringify(newNotes));
    toast.success('Note saved');
  };

  const downloadMaterials = async () => {
    setDownloadProgress(true);
    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Materials downloaded successfully');
    } catch (error) {
      toast.error('Failed to download materials');
    } finally {
      setDownloadProgress(false);
    }
  };

  const shareProgress = () => {
    const shareText = `I'm ${Math.round((progress.completed / progress.total) * 100)}% through the ${program.title} course!`;
    if (navigator.share) {
      navigator.share({
        title: 'My Learning Progress',
        text: shareText,
        url: window.location.href
      }).catch(() => {
        navigator.clipboard.writeText(shareText + ' ' + window.location.href);
        toast.success('Link copied to clipboard');
      });
    } else {
      navigator.clipboard.writeText(shareText + ' ' + window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative">
      <Navbar />
      <BackgroundEffects variant="minimal" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Header */}
        <div className="mb-12">
          <Link 
            to="/learn"
            className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Programs
          </Link>

          <h1 className="text-4xl font-bold text-white mb-4">{program.title}</h1>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              {program.level}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              {program.duration}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        {progress && (
          <div className="mb-12 max-w-xl">
            <ProgressBar
              progress={progress.completed}
              total={progress.total}
              label="Course Progress"
              variant={progress.completed === progress.total ? 'success' : 'default'}
            />
          </div>
        )}

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Modules Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 rounded-xl p-4 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Course Modules</h3>
              <nav className="space-y-2">
                {program.curriculum?.map((week, weekIndex) => {
                  if (!week) return null;
                  
                  const weekProgress = calculateProgress(weekIndex, 0);
                  
                  return (
                    <div key={weekIndex} className="space-y-2">
                      <button
                        onClick={() => {
                          setActiveWeek(weekIndex);
                          setActiveDay(0);
                          setActiveTopic(0);
                        }}
                        className={`relative w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                          weekIndex === activeWeek
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>Week {week.week}: {week.title}</span>
                          {weekProgress === 100 && (
                            <FiCheckCircle className="text-green-400" />
                          )}
                        </div>
                        <div className="mt-1 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                            style={{ width: `${weekProgress}%` }}
                          />
                        </div>
                      </button>

                      {weekIndex === activeWeek && week.days && (
                        <div className="pl-4 space-y-1">
                          {week.days.map((day, dayIndex) => {
                            if (!day) return null;
                            
                            const dayProgress = calculateProgress(weekIndex, dayIndex);
                            const locked = isLessonLocked(weekIndex, dayIndex);
                            
                            return (
                              <div key={dayIndex}>
                                <button
                                  onClick={() => {
                                    if (!locked) {
                                      setActiveDay(dayIndex);
                                      setActiveTopic(0);
                                    } else {
                                      toast.error('Complete previous lessons first');
                                    }
                                  }}
                                  className={`relative w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                                    locked
                                      ? 'text-slate-500 cursor-not-allowed'
                                      : dayIndex === activeDay
                                      ? 'text-blue-400 bg-blue-500/10'
                                      : 'text-slate-400 hover:text-white'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span>Day {day.day}: {day.title}</span>
                                    <div className="flex items-center gap-2">
                                      <FiClock className="text-slate-500" />
                                      <span className="text-xs text-slate-500">{day.duration}</span>
                                      {locked ? (
                                        <FiLock className="text-slate-500" />
                                      ) : dayProgress === 100 ? (
                                        <FiCheckCircle className="text-green-400" />
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="mt-1 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                                      style={{ width: `${dayProgress}%` }}
                                    />
                                  </div>
                                </button>

                                {dayIndex === activeDay && day.topics && (
                                  <div className="pl-4 space-y-1 mt-1">
                                    {day.topics.map((topic, topicIndex) => {
                                      if (!topic) return null;
                                      
                                      return (
                                        <button
                                          key={topicIndex}
                                          onClick={() => setActiveTopic(topicIndex)}
                                          className={`w-full text-left px-4 py-2 rounded-lg text-xs transition-all duration-300 ${
                                            topicIndex === activeTopic
                                              ? 'text-blue-400 bg-blue-500/10'
                                              : 'text-slate-400 hover:text-white'
                                          }`}
                                        >
                                          {topic}
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={`${activeWeek}-${activeDay}-${activeTopic}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900/50 rounded-xl p-8"
            >
              {currentLesson && (
                <LessonContent 
                  lesson={currentLesson}
                  onComplete={handleLessonComplete}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {showCongrats && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 p-8 rounded-2xl max-w-lg text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">🎉 Congratulations!</h2>
            <p className="text-slate-300 mb-6">
              You've completed the {program.title} course! Keep up the great work!
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/learn"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                Explore More Courses
              </Link>
              <button
                onClick={() => setShowCongrats(false)}
                className="px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="fixed bottom-8 right-8 flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowNotes(!showNotes)}
          className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-purple-500/25"
        >
          <FiBookmark className="w-6 h-6" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={shareProgress}
          className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-purple-500/25"
        >
          <FiShare2 className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={downloadMaterials}
          disabled={downloadProgress}
          className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-purple-500/25 disabled:opacity-50"
        >
          <FiDownload className={`w-6 h-6 ${downloadProgress ? 'animate-bounce' : ''}`} />
        </motion.button>
      </div>

      {showNotes && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-0 top-0 h-full w-96 bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/50 p-6 overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Notes</h3>
            <button
              onClick={() => setShowNotes(false)}
              className="text-slate-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <textarea
            value={notes[`${activeWeek}-${activeDay}-${activeTopic}`] || ''}
            onChange={(e) => saveNote(e.target.value)}
            placeholder="Add your notes here..."
            className="w-full h-64 bg-slate-800/50 rounded-xl p-4 text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />

          <div className="mt-4 text-sm text-slate-400">
            Notes are automatically saved as you type.
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProgramMaterials; 