import { useState, useEffect } from 'react';
import { HeartIcon, ShareIcon, ArrowUpIcon, BookmarkIcon, TwitterIcon, LinkedInIcon, LinkIcon } from './Icons';
import { toast } from 'react-hot-toast';

const FloatingActions = ({ 
  onReaction, 
  hasReacted, 
  reactions, 
  isBookmarked, 
  onBookmark, 
  onShare 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async (platform) => {
    onShare?.(platform);
    setShowShareMenu(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Main Action Button */}
      <button
        onClick={() => setShowActions(!showActions)}
        className="p-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white 
        shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 relative"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 
        opacity-0 blur group-hover:opacity-50 transition-opacity" />
        <svg className="w-6 h-6 relative" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" 
          />
        </svg>
      </button>

      {/* Action Buttons */}
      <div className={`absolute bottom-full right-0 mb-4 space-y-3 transition-all duration-300 
      ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {/* Share Button */}
        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="p-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white 
            shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 relative group"
          >
            <ShareIcon className="w-6 h-6 relative group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Share Menu */}
          {showShareMenu && (
            <div className="absolute bottom-full right-0 mb-4 bg-gradient-to-br from-gray-900/95 
            to-black/95 rounded-2xl border border-white/10 backdrop-blur-sm p-2 min-w-[200px] 
            shadow-xl">
              <div className="space-y-1">
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/5 text-left"
                >
                  <TwitterIcon className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-200">Share on Twitter</span>
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/5 text-left"
                >
                  <LinkedInIcon className="w-5 h-5 text-violet-400" />
                  <span className="text-gray-200">Share on LinkedIn</span>
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/5 text-left"
                >
                  <LinkIcon className="w-5 h-5 text-fuchsia-400" />
                  <span className="text-gray-200">Copy Link</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reaction Button */}
        <button
          onClick={onReaction}
          className={`p-4 rounded-full text-white shadow-lg transition-all duration-300 relative 
          group ${
            hasReacted 
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:shadow-rose-500/25' 
              : 'bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:shadow-fuchsia-500/25'
          }`}
        >
          <HeartIcon className={`w-6 h-6 relative group-hover:scale-110 transition-transform 
          ${hasReacted ? 'fill-current' : ''}`} />
          {reactions > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold 
            rounded-full w-5 h-5 flex items-center justify-center">
              {reactions}
            </span>
          )}
        </button>

        {/* Bookmark Button */}
        <button
          onClick={onBookmark}
          className={`p-4 rounded-full text-white shadow-lg transition-all duration-300 relative 
          group ${
            isBookmarked 
              ? 'bg-gradient-to-r from-cyan-500 to-violet-500 hover:shadow-violet-500/25' 
              : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:shadow-gray-700/25'
          }`}
        >
          <BookmarkIcon className={`w-6 h-6 relative group-hover:scale-110 transition-transform 
          ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`p-4 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white 
          shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 relative group 
          ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <ArrowUpIcon className="w-6 h-6 relative group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default FloatingActions; 