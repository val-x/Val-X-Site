import { memo, useState, useCallback } from 'react';

const PopularTags = memo(({ selectedTag, onTagSelect, tags }) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const [showAllStats, setShowAllStats] = useState(false);

  const visibleTags = showAllTags ? tags.filter(tag => tag !== 'all') : tags.filter(tag => tag !== 'all').slice(0, 6);
  const visibleStats = showAllStats ? tags.filter(tag => tag !== 'all') : tags.filter(tag => tag !== 'all').slice(0, 4);

  const handleShowMoreTags = useCallback(() => {
    setShowAllTags(prev => !prev);
  }, []);

  const handleShowMoreStats = useCallback(() => {
    setShowAllStats(prev => !prev);
  }, []);

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 flex flex-col max-h-[450px]">
      {/* Header */}
      <div className="p-5 border-b border-gray-800/50">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-blue-500 rounded-full" />
          <h3 className="font-semibold text-white">Discover Topics</h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
        {/* Tags Grid */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onTagSelect('all')}
              className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 truncate ${
                selectedTag === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              All Posts
            </button>
            {visibleTags.map(tag => (
              <button
                key={tag}
                onClick={() => onTagSelect(tag)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 truncate ${
                  selectedTag === tag
                    ? 'bg-blue-500/10 text-blue-400 border-2 border-blue-500/20'
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-800 hover:text-white'
                }`}
                title={`#${tag.toLowerCase()}`}
              >
                #{tag.toLowerCase()}
              </button>
            ))}
          </div>
          
          {tags.length > 7 && (
            <button
              onClick={handleShowMoreTags}
              className="w-full text-sm text-gray-400 hover:text-white transition-colors py-2 rounded-xl
              border border-gray-800 hover:border-gray-700"
            >
              {showAllTags ? '← Show Less' : `Show More (${tags.length - 7})`}
            </button>
          )}
        </div>

        {/* Trending Stats */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-orange-500 text-lg">🔥</span>
              <h4 className="font-medium text-white">Trending Now</h4>
            </div>
            {tags.length > 4 && (
              <button
                onClick={handleShowMoreStats}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                {showAllStats ? 'Show Less' : 'View All'}
              </button>
            )}
          </div>
          
          <div className="space-y-3">
            {visibleStats.map(tag => (
              <button
                key={tag}
                onClick={() => onTagSelect(tag)}
                className="w-full group"
                title={`#${tag.toLowerCase()}`}
              >
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-800/30
                hover:bg-gray-800/50 transition-all duration-200">
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors truncate max-w-[150px]">
                    #{tag.toLowerCase()}
                  </span>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="h-1.5 w-20 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full
                        group-hover:from-blue-500 group-hover:to-blue-300 transition-colors"
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-500 group-hover:text-gray-300">
                      {Math.floor(Math.random() * 100)}%
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default PopularTags;

// Custom scrollbar styles
const style = document.createElement('style');
style.textContent = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 5px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(55, 65, 81, 0.3);
    border-radius: 20px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(55, 65, 81, 0.5);
  }

  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(55, 65, 81, 0.3) transparent;
  }
`;
document.head.appendChild(style); 