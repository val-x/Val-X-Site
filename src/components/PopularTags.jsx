import { memo, useState, useCallback } from 'react';

const PopularTags = memo(({ selectedTag, onTagSelect, tags }) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const [showAllStats, setShowAllStats] = useState(false);

  const visibleTags = showAllTags ? tags.filter(tag => tag !== 'all') : tags.filter(tag => tag !== 'all').slice(0, 4);
  const visibleStats = showAllStats ? tags.filter(tag => tag !== 'all') : tags.filter(tag => tag !== 'all').slice(0, 3);

  const handleShowMoreTags = useCallback(() => {
    setShowAllTags(prev => !prev);
  }, []);

  const handleShowMoreStats = useCallback(() => {
    setShowAllStats(prev => !prev);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 rounded-xl border 
    border-gray-800/50 flex flex-col max-h-[400px]">
      {/* Header */}
      <div className="p-4 border-b border-gray-800/50">
        <h3 className="font-bold text-white text-sm">Popular Tags</h3>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {/* Tags Section */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onTagSelect('all')}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                selectedTag === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              All Posts
            </button>
            {visibleTags.map(tag => (
              <button
                key={tag}
                onClick={() => onTagSelect(tag)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                  selectedTag === tag 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-white hover:border-gray-600/50'
                }`}
              >
                #{tag.toLowerCase()}
              </button>
            ))}
          </div>
          
          {tags.length > 5 && (
            <button
              onClick={handleShowMoreTags}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              {showAllTags ? 'Show Less' : `+${tags.length - 5} more`}
            </button>
          )}
        </div>

        {/* Tag Stats */}
        <div className="pt-4 border-t border-gray-800/50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-gray-400">Trending</h4>
            {tags.length > 3 && (
              <button
                onClick={handleShowMoreStats}
                className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors"
              >
                {showAllStats ? 'Less' : 'More'}
              </button>
            )}
          </div>
          <div className="space-y-2">
            {visibleStats.map(tag => (
              <div key={tag} className="flex items-center justify-between group">
                <button 
                  onClick={() => onTagSelect(tag)}
                  className="text-xs text-gray-400 hover:text-blue-400 transition-colors"
                >
                  #{tag.toLowerCase()}
                </button>
                <div className="flex items-center gap-1.5">
                  <div className="h-1 w-16 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500/50 rounded-full group-hover:bg-blue-500/70 transition-colors"
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors">
                    {Math.floor(Math.random() * 100)}%
                  </span>
                </div>
              </div>
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
    width: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(31, 41, 55, 0.5);
    border-radius: 2px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(55, 65, 81, 0.7);
  }

  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(31, 41, 55, 0.5) transparent;
  }
`;
document.head.appendChild(style); 