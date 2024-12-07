import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { 
  FiExternalLink, 
  FiBookmark, 
  FiChevronLeft, 
  FiChevronRight, 
  FiList,
  FiClock,
  FiShare2,
  FiPrinter
} from 'react-icons/fi';
import MarkdownRenderer from '../MarkdownRenderer';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ArticleView = ({ 
  article, 
  onBookmark, 
  isBookmarked,
  articles = [],
  currentIndex = 0,
  onNavigate,
  onComplete
}) => {
  const [showList, setShowList] = useState(false);
  const [readTime, setReadTime] = useState(0);
  const [progress, setProgress] = useState(0);

  // Calculate estimated read time
  useEffect(() => {
    if (article.content) {
      const words = article.content.trim().split(/\s+/).length;
      const time = Math.ceil(words / 200); // Average reading speed of 200 words per minute
      setReadTime(time);
    }
  }, [article.content]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('article-content');
      if (!element) return;

      const totalHeight = element.scrollHeight - element.clientHeight;
      const currentProgress = (element.scrollTop / totalHeight) * 100;
      setProgress(Math.min(currentProgress, 100));

      // Mark as complete when reaching the end
      if (currentProgress > 90 && onComplete) {
        onComplete();
      }
    };

    const element = document.getElementById('article-content');
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, [onComplete]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url
        });
      } else {
        await navigator.clipboard.writeText(article.url);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share article');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-800/50 rounded-xl overflow-hidden flex">
      {/* Main Article Content */}
      <div className="flex-1">
        {/* Progress Bar */}
        <div className="h-1 bg-slate-700/50">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>

        <div className="p-6">
          {/* Navigation Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {currentIndex > 0 && (
                <button
                  onClick={() => onNavigate(currentIndex - 1)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h3 className="text-xl font-semibold text-white">{article.title}</h3>
                {readTime > 0 && (
                  <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                    <FiClock className="w-4 h-4" />
                    <span>{readTime} min read</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
              >
                <FiShare2 className="w-5 h-5" />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
              >
                <FiPrinter className="w-5 h-5" />
              </button>
              <button
                onClick={onBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked 
                    ? 'text-blue-400 bg-blue-500/10' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <FiBookmark className="w-5 h-5" />
              </button>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
              >
                <FiExternalLink className="w-5 h-5" />
              </a>
              <button
                onClick={() => setShowList(!showList)}
                className={`p-2 rounded-lg transition-colors ${
                  showList 
                    ? 'text-blue-400 bg-blue-500/10' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div 
            id="article-content"
            className="prose prose-invert max-w-none overflow-y-auto max-h-[calc(100vh-300px)] pr-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50"
          >
            <MarkdownRenderer content={article.content || 'Article content will be displayed here.'} />
          </div>

          {/* Navigation Footer */}
          <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-700/50">
            {currentIndex > 0 ? (
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              >
                <FiChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <div className="text-sm">Previous</div>
                  <div className="text-white group-hover:text-blue-400 transition-colors">
                    {articles[currentIndex - 1]?.title}
                  </div>
                </div>
              </button>
            ) : (
              <div />
            )}
            {currentIndex < articles.length - 1 && (
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              >
                <div className="text-right">
                  <div className="text-sm">Next</div>
                  <div className="text-white group-hover:text-blue-400 transition-colors">
                    {articles[currentIndex + 1]?.title}
                  </div>
                </div>
                <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Articles List Sidebar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: showList ? '320px' : 0 }}
        className="border-l border-slate-700/50 overflow-hidden"
      >
        {showList && (
          <div className="w-80 h-full bg-slate-900/50">
            <div className="p-4 border-b border-slate-700/50">
              <h3 className="text-lg font-semibold text-white">Related Articles</h3>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50">
              {articles.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(index)}
                  className={`w-full p-4 text-left hover:bg-slate-800/50 transition-colors ${
                    index === currentIndex ? 'bg-slate-800/50' : ''
                  }`}
                >
                  <h4 className={`font-medium ${
                    index === currentIndex ? 'text-blue-400' : 'text-white'
                  }`}>
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-400 mt-1">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

ArticleView.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    content: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  onBookmark: PropTypes.func.isRequired,
  isBookmarked: PropTypes.bool,
  articles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string
  })),
  currentIndex: PropTypes.number,
  onNavigate: PropTypes.func,
  onComplete: PropTypes.func
};

export default ArticleView; 