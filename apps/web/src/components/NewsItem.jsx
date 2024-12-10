import { memo, useCallback } from 'react';
import { formatTime } from '../utils/dateUtils';
import { BookmarkIcon } from './Icons';

const NewsItem = memo(({ item, isInReadingList, onToggleReadingList }) => {
  const handleToggle = useCallback((e) => {
    e.preventDefault();
    onToggleReadingList(item);
  }, [item, onToggleReadingList]);

  return (
    <article className="group bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm 
    rounded-xl overflow-hidden border border-gray-800/50 hover:border-blue-500/50 transition-all 
    duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] p-6">
      <div className="flex justify-between items-start mb-4">
        <a 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2"
        >
          {item.title}
        </a>
        <button
          onClick={handleToggle}
          className={`p-2 rounded-lg transition-colors ${
            isInReadingList 
              ? 'text-blue-400 bg-blue-500/10' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <BookmarkIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span>{item.score} points</span>
        <span>by {item.by}</span>
        <span>{formatTime(item.time)}</span>
        <a 
          href={`https://news.ycombinator.com/item?id=${item.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors"
        >
          {item.descendants || 0} comments
        </a>
      </div>
    </article>
  );
});

export default NewsItem;
