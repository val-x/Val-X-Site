import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiLoader, FiAlertCircle, FiBookmark, FiCheck, FiPlus, FiStar, FiClock, FiTag, FiCode, FiEdit3, FiPlay, FiPause } from 'react-icons/fi';
import MarkdownRenderer from '../MarkdownRenderer';
import VideoPlayer from './video/VideoPlayer';
import ArticleView from './ArticleView';
import DOMPurify from 'dompurify';
import TaskCard from './tasks/TaskCard';

const TabContent = ({ children, isVisible }) => (
  <AnimatePresence mode="wait">
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

const LoadingState = () => (
  <div className="flex items-center justify-center h-[400px]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="text-blue-400"
    >
      <FiLoader className="w-8 h-8" />
    </motion.div>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-[400px] text-center">
    <FiAlertCircle className="w-12 h-12 text-red-400 mb-4" />
    <p className="text-slate-300">{message}</p>
  </div>
);

const LessonContent = ({ lesson, onComplete, onAddToFlashcards }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isResourceLoading, setIsResourceLoading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    // Simulate resource loading
    const loadResources = async () => {
      setIsResourceLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        setIsResourceLoading(false);
        setError(null);
      } catch (err) {
        setError('Failed to load resources');
        setIsResourceLoading(false);
      }
    };

    loadResources();
  }, [activeTab]);

  // Format video resources into playlist format
  const videoPlaylist = lesson.resources
    ?.filter(r => r.type === 'video')
    .map((video, index) => ({
      id: `video-${index}`,
      title: video.title,
      url: video.url,
      duration: video.duration || 300 // Default 5 minutes if not specified
    })) || [];

  // Format article resources
  const articles = lesson.resources
    ?.filter(r => r.type === 'article')
    .map((article, index) => ({
      id: `article-${index}`,
      title: article.title,
      url: article.url,
      content: article.content,
      description: article.description || 'Related article for this lesson'
    })) || [];

  // Add debug logging to check resources
  console.log('Resources:', lesson.resources);
  console.log('Video Playlist:', videoPlaylist);
  console.log('Articles:', articles);
  console.log('Current Tab:', activeTab);

  // Helper function to check if tab should be shown
  const shouldShowTab = (tabType) => {
    switch (tabType) {
      case 'video':
        return videoPlaylist && videoPlaylist.length > 0;
      case 'article':
        return articles && articles.length > 0;
      case 'task':
        return lesson.resources?.some(r => r.type === 'task');
      default:
        return true;
    }
  };

  // Helper function to render tab content
  const renderTabContent = () => {
    if (isResourceLoading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState message={error} />;
    }

    switch (activeTab) {
      case 'content':
        return (
          <TabContent isVisible={activeTab === 'content'}>
            <div className="prose prose-invert max-w-none">
              <MarkdownRenderer content={lesson.content} />
            </div>
          </TabContent>
        );
      case 'video':
        return currentVideo ? (
          <TabContent isVisible={activeTab === 'video'}>
            <VideoPlayer 
              videoUrl={currentVideo.url}
              title={currentVideo.title}
              playlist={videoPlaylist}
              currentIndex={currentVideoIndex}
              onNavigate={setCurrentVideoIndex}
              onProgress={(progress) => {
                console.log('Video progress:', progress);
              }}
            />
          </TabContent>
        ) : (
          <ErrorState message="No video content available" />
        );
      case 'article':
        return currentArticle ? (
          <TabContent isVisible={activeTab === 'article'}>
            <ArticleView 
              article={currentArticle}
              articles={articles}
              currentIndex={currentArticleIndex}
              onNavigate={setCurrentArticleIndex}
              onBookmark={() => {
                console.log('Bookmark article:', currentArticle.id);
              }}
              isBookmarked={false}
            />
          </TabContent>
        ) : (
          <ErrorState message="No article content available" />
        );
      case 'task':
        const tasks = lesson.resources?.filter(r => r.type === 'task') || [];
        return (
          <TabContent isVisible={activeTab === 'task'}>
            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Knowledge Check & Practice
                </h2>
                <p className="text-slate-300 mb-6">
                  Complete these tasks to reinforce your understanding of the lesson content.
                </p>
                {tasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={handleTaskComplete}
                    onAddToFlashcards={onAddToFlashcards}
                  />
                ))}
              </div>
            </div>
          </TabContent>
        );
      default:
        return null;
    }
  };

  const handleQuizSubmit = () => {
    const allCorrect = lesson.quiz.every(
      (q, idx) => selectedAnswers[idx] === q.correctAnswer
    );
    
    if (allCorrect) {
      onComplete();
    }
    
    setQuizSubmitted(true);
  };

  const handleTaskComplete = (taskId) => {
    setCompletedTasks(prev => [...prev, taskId]);
    // Check if all tasks are completed
    const allTasksCompleted = lesson.resources
      ?.filter(r => r.type === 'task')
      .every(task => [...completedTasks, taskId].includes(task.id));
    
    if (allTasksCompleted) {
      handleLessonProgress();
    }
  };

  const currentVideo = videoPlaylist[currentVideoIndex];
  const currentArticle = articles[currentArticleIndex];

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-slate-700/50">
        {['content', 'video', 'article', 'task'].map((tab) => {
          if (!shouldShowTab(tab)) return null;

          const getTabLabel = () => {
            switch (tab) {
              case 'content':
                return 'Lesson Content';
              case 'video':
                return `Video Tutorials (${videoPlaylist.length})`;
              case 'article':
                return `Related Articles (${articles.length})`;
              case 'task':
                const tasks = lesson.resources?.filter(r => r.type === 'task') || [];
                return `Tasks (${tasks.length})`;
              default:
                return '';
            }
          };

          return (
            <motion.button
              key={tab}
              onClick={() => {
                setIsResourceLoading(true);
                setActiveTab(tab);
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                activeTab === tab
                  ? 'text-blue-400'
                  : 'text-slate-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {getTabLabel(tab)}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px] relative">
        {renderTabContent()}
      </div>

      {/* Quiz Section */}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <div className="border-t border-slate-800 pt-8">
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            className="text-xl font-semibold text-white mb-4 flex items-center gap-2"
          >
            <span>Knowledge Check</span>
            <svg
              className={`w-5 h-5 transition-transform ${showQuiz ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showQuiz && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {lesson.quiz.map((question, idx) => (
                <div key={idx} className="space-y-4">
                  <p className="text-white font-medium">{question.question}</p>
                  <div className="space-y-2">
                    {question.options.map((option, optionIdx) => (
                      <button
                        key={optionIdx}
                        onClick={() => setSelectedAnswers(prev => ({ ...prev, [idx]: optionIdx }))}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                          selectedAnswers[idx] === optionIdx
                            ? 'bg-blue-500/20 text-white border border-blue-500/50'
                            : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-transparent'
                        }`}
                        disabled={quizSubmitted}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  Submit Answers
                </button>
              ) : (
                <div className="text-center text-green-400">
                  Great job! You can now continue to the next lesson.
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

LessonContent.propTypes = {
  lesson: PropTypes.shape({
    content: PropTypes.string.isRequired,
    resources: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['video', 'article', 'task']).isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string,
      content: PropTypes.string,
      description: PropTypes.string,
      duration: PropTypes.number,
      id: PropTypes.string,
      example: PropTypes.string
    })),
    quiz: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswer: PropTypes.number.isRequired
    }))
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  onAddToFlashcards: PropTypes.func.isRequired
};

export default LessonContent; 