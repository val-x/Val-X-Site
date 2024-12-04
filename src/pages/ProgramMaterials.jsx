import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  tabContent, 
  sampleFlashCards,
  sampleLiveSession,
  sampleMentor,
  sampleWeekData,
  sampleFeedback,
  sampleDiscussions,
  sampleAnnouncements,
  availableSlots
} from '../data/programs';
import { getUserProgress, updateUserProgress } from '../utils/enrollment';
import ProgressBar from '../components/learning/ProgressBar';
import BackgroundEffects from '../components/learning/BackgroundEffects';
import LessonContent from '../components/learning/LessonContent';
import Navbar from '../components/Navbar';
import { FiClock, FiCheckCircle, FiLock, FiBookmark, FiShare2, FiDownload, FiTarget, FiBook, FiVideo } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import ProgressStats from '../components/learning/tracker/ProgressStats';
import PomodoroTimer from '../components/learning/tracker/PomodoroTimer';
import LiveSession from '../components/learning/LiveSession';
import MentoringSection from '../components/learning/MentoringSection';
import WeeklyReview from '../components/learning/WeeklyReview';
import CommunicationHub from '../components/learning/CommunicationHub';

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
  const [videoProgress, setVideoProgress] = useState({});
  const [lastWatchedVideo, setLastWatchedVideo] = useState(null);
  const [readArticles, setReadArticles] = useState([]);
  const [activeResource, setActiveResource] = useState(null);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [contentError, setContentError] = useState(null);
  const [activeTab, setActiveTab] = useState('lesson');

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

  useEffect(() => {
    const loadResourceProgress = async () => {
      try {
        // Load video progress from localStorage
        const savedVideoProgress = JSON.parse(
          localStorage.getItem(`videoProgress_${programId}`) || '{}'
        );
        setVideoProgress(savedVideoProgress);

        // Load last watched video
        const lastWatched = localStorage.getItem(`lastWatched_${programId}`);
        setLastWatchedVideo(lastWatched);

        // Load read articles
        const readArticlesList = JSON.parse(
          localStorage.getItem(`readArticles_${programId}`) || '[]'
        );
        setReadArticles(readArticlesList);

        setIsLoadingContent(false);
      } catch (err) {
        console.error('Error loading resource progress:', err);
        setContentError('Failed to load your learning progress');
        setIsLoadingContent(false);
      }
    };

    loadResourceProgress();
  }, [programId]);

  const handleVideoProgress = (videoId, progress) => {
    const newProgress = {
      ...videoProgress,
      [videoId]: progress
    };
    setVideoProgress(newProgress);
    localStorage.setItem(`videoProgress_${programId}`, JSON.stringify(newProgress));

    // Update last watched video
    setLastWatchedVideo(videoId);
    localStorage.setItem(`lastWatched_${programId}`, videoId);

    // Check if video is complete (progress > 90%) and update lesson progress
    if (progress > 90) {
      handleLessonProgress();
    }
  };

  const handleArticleComplete = (articleId) => {
    const newReadArticles = [...readArticles, articleId];
    setReadArticles(newReadArticles);
    localStorage.setItem(`readArticles_${programId}`, JSON.stringify(newReadArticles));
    handleLessonProgress();
  };

  const handleLessonProgress = () => {
    try {
      if (!progress || !program.curriculum || !currentTopics) return;

      const newProgress = {
        ...progress,
        weekProgress: progress.weekProgress.map((week, weekIndex) => {
          if (weekIndex !== activeWeek) return week;
          return {
            ...week,
            days: week.days.map((day, dayIndex) => {
              if (currentWeek.days && dayIndex !== activeDay) return day;
              
              // Calculate completion based on resources and content
              const totalResources = currentDay?.resources?.length || 0;
              const completedResources = currentDay?.resources?.filter(resource => {
                if (resource.type === 'video') {
                  return videoProgress[resource.id] > 90;
                }
                if (resource.type === 'article') {
                  return readArticles.includes(resource.id);
                }
                return false;
              }).length || 0;

              const newCompleted = Math.min(
                day.completed + 1, 
                Math.ceil((completedResources / totalResources) * day.total)
              );

              return {
                ...day,
                completed: newCompleted
              };
            })
          };
        })
      };

      updateUserProgress(programId, newProgress);
      setProgress(newProgress);
    } catch (err) {
      console.error('Error updating lesson progress:', err);
      setError('Failed to update progress');
    }
  };

  const renderLessonContent = () => {
    if (isLoadingContent) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      );
    }

    if (contentError) {
      return (
        <div className="text-center py-12">
          <p className="text-red-400 mb-4">{contentError}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return currentTopic ? (
      <LessonContent
        lesson={{
          ...currentLesson,
          onVideoProgress: handleVideoProgress,
          onArticleComplete: handleArticleComplete,
          videoProgress: videoProgress,
          readArticles: readArticles,
          lastWatchedVideo: lastWatchedVideo
        }}
        onComplete={handleLessonComplete}
      />
    ) : null;
  };

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

  // Add new helper function to get current resource details
  const getCurrentResourceDetails = () => {
    if (!currentDay?.resources) {
      return {
        allResources: [],
        videoResources: [],
        articleResources: [],
        totalResources: 0,
        completedResources: 0
      };
    }
    
    const allResources = currentDay.resources;
    const videoResources = allResources.filter(r => r.type === 'video');
    const articleResources = allResources.filter(r => r.type === 'article');
    
    return {
      allResources,
      videoResources,
      articleResources,
      totalResources: allResources.length,
      completedResources: allResources.filter(resource => {
        if (resource.type === 'video' && resource.id) {
          return videoProgress[resource.id] > 90;
        }
        if (resource.type === 'article' && resource.id) {
          return readArticles.includes(resource.id);
        }
        return false;
      }).length
    };
  };

  // Add function to check if a day is accessible
  const isDayAccessible = (weekIndex, dayIndex) => {
    if (weekIndex === 0 && dayIndex === 0) return true;
    
    const prevWeekProgress = progress?.weekProgress?.[weekIndex - 1];
    const prevDayProgress = progress?.weekProgress?.[weekIndex]?.days?.[dayIndex - 1];
    
    // First day of a week - check if previous week is completed
    if (dayIndex === 0) {
      return prevWeekProgress?.days?.every(day => 
        day.completed === day.total
      );
    }
    
    // Check if previous day is completed
    return prevDayProgress?.completed === prevDayProgress?.total;
  };

  // Update handleLessonComplete to be more comprehensive
  const handleLessonComplete = () => {
    try {
      if (!progress || !program.curriculum || !currentTopics) return;

      const resourceDetails = getCurrentResourceDetails();
      const isResourceComplete = resourceDetails?.completedResources === resourceDetails?.totalResources;
      
      if (!isResourceComplete) {
        toast.error('Please complete all resources before proceeding');
        return;
      }

      const newProgress = {
        ...progress,
        completed: progress.completed + 1,
        weekProgress: progress.weekProgress.map((week, weekIndex) => {
          if (weekIndex !== activeWeek) return week;
          return {
            ...week,
            days: week.days.map((day, dayIndex) => {
              if (currentWeek.days && dayIndex !== activeDay) return day;
              
              const newCompleted = Math.min(day.completed + 1, day.total);
              
              // Check if day is completed
              if (newCompleted === day.total) {
                toast.success(`Completed: ${currentDay.title}`);
                
                // Check if week is completed
                const isWeekCompleted = week.days.every((d, idx) => 
                  idx === dayIndex ? newCompleted === d.total : d.completed === d.total
                );
                
                if (isWeekCompleted) {
                  toast.success(`Completed: Week ${week.weekNum}`);
                  
                  // Check if course is completed
                  const isCourseCompleted = progress.weekProgress.every((w, idx) =>
                    idx === weekIndex ? isWeekCompleted : w.days.every(d => d.completed === d.total)
                  );
                  
                  if (isCourseCompleted) {
                    setShowCongrats(true);
                    setIsCompleted(true);
                  }
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

  // Add function to get next available lesson
  const getNextAvailableLesson = () => {
    for (let w = 0; w < program.curriculum.length; w++) {
      const week = program.curriculum[w];
      if (!week.days) continue;
      
      for (let d = 0; d < week.days.length; d++) {
        const day = week.days[d];
        if (!day) continue;
        
        const dayProgress = progress?.weekProgress?.[w]?.days?.[d];
        if (!dayProgress) continue;
        
        if (dayProgress.completed < dayProgress.total && isDayAccessible(w, d)) {
          return { weekIndex: w, dayIndex: d, topicIndex: 0 };
        }
      }
    }
    return null;
  };

  // Add function to handle resume learning
  const handleResumeLearning = () => {
    const nextLesson = getNextAvailableLesson();
    if (nextLesson) {
      setActiveWeek(nextLesson.weekIndex);
      setActiveDay(nextLesson.dayIndex);
      setActiveTopic(nextLesson.topicIndex);
    }
  };

  // Update currentLesson object to include more details
  const currentLesson = currentTopic ? {
    title: currentTopic,
    content: `# ${currentTopic}\n\n## Overview\n\nThis lesson covers ${currentTopic}.\n\n## Learning Objectives\n\n- Understand the fundamentals of ${currentTopic}\n- Learn best practices for implementation\n- Gain practical experience through exercises\n\n## Content\n\nDetailed content for ${currentTopic} will be covered in this section...\n`,
    duration: currentDay?.duration || "60 mins",
    resources: currentDay?.resources || [],
    resourceProgress: getCurrentResourceDetails(),
    quiz: currentDay?.quiz || [],
    isAccessible: isDayAccessible(activeWeek, activeDay),
    onVideoProgress: handleVideoProgress,
    onArticleComplete: handleArticleComplete,
    videoProgress: videoProgress,
    readArticles: readArticles,
    lastWatchedVideo: lastWatchedVideo
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

  // Add totalResources calculation
  const totalResources = useMemo(() => {
    if (!currentDay?.resources) return 0;
    return currentDay.resources.length;
  }, [currentDay]);

  // Add resourceDetails calculation
  const resourceDetails = useMemo(() => {
    return getCurrentResourceDetails();
  }, [currentDay, videoProgress, readArticles]);

  const handleTimerComplete = () => {
    toast.success('Focus session completed!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-800">
      <Navbar />
      <BackgroundEffects variant="minimal" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full 
          bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rotate-45 transform-gpu" />
      </div>

      <div className="relative">
        {/* Header Section */}
        <div className="bg-gradient-to-b from-slate-950 to-transparent pt-24 pb-12 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Left Side */}
              <div className="flex-1">
                <Link 
                  to="/learn"
                  className="inline-flex items-center text-slate-400 hover:text-white transition-all
                    hover:translate-x-0.5 transform-gpu mb-4"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Programs
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-white via-blue-100 to-white mb-4">
                  {program.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-slate-400">
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 
                    border border-slate-700/50">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    {program.level}
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 
                    border border-slate-700/50">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    {program.duration}
                  </span>
                  {isCompleted && (
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 
                      border border-green-500/20 text-green-400">
                      <FiCheckCircle className="w-4 h-4" />
                      Completed
                    </span>
                  )}
                </div>
              </div>

              {/* Right Side */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleResumeLearning}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                    rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 
                    transition-all duration-300 flex items-center justify-center gap-2 
                    hover:scale-105 transform-gpu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                  Resume Learning
                </button>
                
                <button
                  onClick={downloadMaterials}
                  disabled={downloadProgress}
                  className="px-6 py-3 bg-slate-800/50 text-white rounded-xl font-medium 
                    hover:bg-slate-800 transition-all duration-300 flex items-center 
                    justify-center gap-2 border border-slate-700/50"
                >
                  <FiDownload className={`w-5 h-5 ${downloadProgress ? 'animate-bounce' : ''}`} />
                  Course Materials
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        {progress && (
          <ProgressStats
            progress={progress}
            videoProgress={videoProgress}
            resourceDetails={resourceDetails}
          />
        )}

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* Main Content Column */}
            <div className="lg:col-span-3 space-y-8">
              {/* Tab Navigation */}
              <div className="bg-slate-900/50 rounded-xl p-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab('lesson')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === 'lesson'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Lesson Content
                  </button>
                  <button
                    onClick={() => setActiveTab('live')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === 'live'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Live Sessions
                  </button>
                  <button
                    onClick={() => setActiveTab('mentoring')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === 'mentoring'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Mentoring
                  </button>
                  <button
                    onClick={() => setActiveTab('review')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === 'review'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Weekly Review
                  </button>
                  <button
                    onClick={() => setActiveTab('community')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === 'community'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Community
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {activeTab === 'lesson' && (
                  <div className="space-y-8">
                    <div className="bg-slate-900/50 rounded-xl p-8">
                      {renderLessonContent()}
                    </div>
                  </div>
                )}

                {activeTab === 'live' && (
                  <LiveSession session={sampleLiveSession} />
                )}

                {activeTab === 'mentoring' && (
                  <MentoringSection 
                    mentor={sampleMentor}
                    availableSlots={availableSlots}
                  />
                )}

                {activeTab === 'review' && (
                  <WeeklyReview 
                    weekData={sampleWeekData}
                    feedback={sampleFeedback}
                  />
                )}

                {activeTab === 'community' && (
                  <CommunicationHub 
                    discussions={sampleDiscussions}
                    announcements={sampleAnnouncements}
                  />
                )}
              </motion.div>
            </div>
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
          className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white 
            shadow-lg hover:shadow-purple-500/25 relative"
        >
          <FiBookmark className="w-6 h-6" />
          {bookmarks.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs 
              flex items-center justify-center">
              {bookmarks.length}
            </span>
          )}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={shareProgress}
          className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white 
            shadow-lg hover:shadow-purple-500/25"
        >
          <FiShare2 className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={downloadMaterials}
          disabled={downloadProgress}
          className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white 
            shadow-lg hover:shadow-purple-500/25 disabled:opacity-50"
        >
          <FiDownload className={`w-6 h-6 ${downloadProgress ? 'animate-bounce' : ''}`} />
        </motion.button>
      </div>

      {/* Notes Panel */}
      {showNotes && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-0 top-0 h-full w-96 bg-slate-900/95 backdrop-blur-xl border-l 
            border-slate-700/50 p-6 overflow-y-auto z-50"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 
              bg-clip-text text-transparent">
              Notes & Bookmarks
            </h3>
            <button
              onClick={() => setShowNotes(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Bookmarked Lessons */}
          {bookmarks.length > 0 && (
            <div className="mb-8">
              <h4 className="text-sm font-medium text-slate-400 mb-3">Bookmarked Lessons</h4>
              <div className="space-y-2">
                {bookmarks.map(bookmark => {
                  const [weekIndex, dayIndex, topicIndex] = bookmark.split('-').map(Number);
                  const week = program.curriculum[weekIndex];
                  const day = week?.days?.[dayIndex];
                  const topic = day?.topics?.[topicIndex];

                  if (!topic) return null;

                  return (
                    <button
                      key={bookmark}
                      onClick={() => {
                        setActiveWeek(weekIndex);
                        setActiveDay(dayIndex);
                        setActiveTopic(topicIndex);
                        setShowNotes(false);
                      }}
                      className="w-full text-left p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 
                        transition-colors group"
                    >
                      <div className="text-sm font-medium text-white group-hover:text-blue-400 
                        transition-colors">
                        {topic}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Week {week.week}, Day {day.day}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes Editor */}
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-3">Current Lesson Notes</h4>
            <textarea
              value={notes[`${activeWeek}-${activeDay}-${activeTopic}`] || ''}
              onChange={(e) => saveNote(e.target.value)}
              placeholder="Add your notes here..."
              className="w-full h-64 bg-slate-800/50 rounded-xl p-4 text-white placeholder-slate-500 
                resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <p className="text-xs text-slate-400 mt-2">
              Notes are automatically saved as you type
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="mt-8">
            <h4 className="text-sm font-medium text-slate-400 mb-3">Quick Navigation</h4>
            <div className="space-y-2">
              <button
                onClick={handleResumeLearning}
                className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                  hover:from-blue-500/30 hover:to-purple-500/30 transition-colors text-white 
                  font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
                Resume Learning
              </button>
              <button
                onClick={() => {
                  setActiveWeek(0);
                  setActiveDay(0);
                  setActiveTopic(0);
                  setShowNotes(false);
                }}
                className="w-full p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors 
                  text-white font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Start from Beginning
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProgramMaterials; 