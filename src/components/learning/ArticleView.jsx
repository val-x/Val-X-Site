import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiExternalLink, FiBookmark, FiChevronLeft, FiChevronRight, FiList } from 'react-icons/fi';
import MarkdownRenderer from '../MarkdownRenderer';
import { useState } from 'react';

const ArticleView = ({ 
  article, 
  onBookmark, 
  isBookmarked,
  articles = [], // Array of related articles
  currentIndex = 0,
  onNavigate
}) => {
  const [showList, setShowList] = useState(false);

  return (
    <div className="bg-slate-800/50 rounded-xl overflow-hidden flex">
      {/* Main Article Content */}
      <div className="flex-1">
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
              <h3 className="text-xl font-semibold text-white">{article.title}</h3>
            </div>
            <div className="flex items-center gap-2">
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
          <div className="prose prose-invert max-w-none">
            <MarkdownRenderer content={article.content || 'Article content will be displayed here.'} />
          </div>

          {/* Navigation Footer */}
          <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-700/50">
            {currentIndex > 0 ? (
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <FiChevronLeft className="w-5 h-5" />
                <span>Previous Article</span>
              </button>
            ) : (
              <div />
            )}
            {currentIndex < articles.length - 1 && (
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <span>Next Article</span>
                <FiChevronRight className="w-5 h-5" />
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
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
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
  onNavigate: PropTypes.func
};

export default ArticleView; 