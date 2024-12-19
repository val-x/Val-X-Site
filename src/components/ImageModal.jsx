import { useEffect, useState } from 'react';
import { ArrowIcon, HeartIcon, CommentIcon, ShareIcon, BookmarkIcon } from './Icons';

const ImageModal = ({ post, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState('');
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'ArrowLeft': handlePrevImage(); break;
        case 'ArrowRight': handleNextImage(); break;
        case 'Escape': onClose(); break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentImageIndex]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handlePrevImage = () => {
    if (!post.images) return;
    setCurrentImageIndex(prev => prev === 0 ? post.images.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    if (!post.images) return;
    setCurrentImageIndex(prev => prev === post.images.length - 1 ? 0 : prev + 1);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    setComment('');
  };

  if (!isOpen) return null;

  const currentImage = post.images ? post.images[currentImageIndex] : post.image;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <div 
        className="relative flex w-full h-full lg:h-[85vh] max-w-7xl bg-gradient-to-br 
        from-gray-900 via-gray-800 to-gray-900 rounded-none lg:rounded-2xl overflow-hidden
        border border-gray-700/50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 rounded-full bg-gray-800/90 
          text-gray-400 hover:text-white hover:bg-gray-700/90 transition-all duration-300
          backdrop-blur-sm border border-gray-700/50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row w-full h-full">
          {/* Image section */}
          <div className="relative flex-1 bg-gradient-to-br from-gray-900 to-black group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
            
            {/* Navigation arrows - always visible on desktop, visible on hover for mobile */}
            {post.images && post.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 
              lg:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 
                  transform hover:scale-110 transition-all duration-300 backdrop-blur-sm 
                  border border-white/10 hover:border-white/20 group/btn"
                >
                  <ArrowIcon className="w-6 h-6 rotate-180 transform group-hover/btn:-translate-x-0.5 
                  transition-transform duration-300" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 
                  transform hover:scale-110 transition-all duration-300 backdrop-blur-sm 
                  border border-white/10 hover:border-white/20 group/btn"
                >
                  <ArrowIcon className="w-6 h-6 transform group-hover/btn:translate-x-0.5 
                  transition-transform duration-300" />
                </button>
              </div>
            )}

            <img
              src={currentImage}
              alt={post.title}
              className="w-full h-full object-contain relative z-10"
              loading="lazy"
            />
            
            {/* Progress bar */}
            {post.images && post.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {post.images.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'w-6 bg-blue-500' 
                        : 'w-1.5 bg-gray-600 hover:bg-gray-500 cursor-pointer'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info sidebar */}
          <div className="flex flex-col w-full lg:w-[400px] bg-gradient-to-b from-gray-900 via-gray-800/95 to-gray-900 
          backdrop-blur-md border-l border-gray-700/50">
            {/* Header */}
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full 
                    animate-pulse blur opacity-50" />
                    <img 
                      src={post.author.image} 
                      alt={post.author.name}
                      className="relative w-10 h-10 rounded-full border-2 border-gray-700/50 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-white">{post.author.name}</div>
                    <div className="text-sm text-gray-400">{post.date}</div>
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white 
                transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content section */}
            <div className="flex-1 overflow-y-auto">
              {/* Caption */}
              <div className="p-6 border-b border-gray-700/50">
                <h3 className="text-lg font-medium text-white mb-2">{post.title}</h3>
                <p className="text-gray-300">{post.excerpt}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags?.map(tag => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-sm font-medium text-blue-400 bg-blue-500/10 
                      rounded-full border border-blue-500/20 hover:border-blue-500/40 
                      transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comments section */}
              <div className="p-6">
                {/* Add comments section here if needed */}
              </div>
            </div>

            {/* Action bar */}
            <div className="border-t border-gray-700/50">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className={`transform hover:scale-110 transition-all duration-300 ${
                        isLiked 
                          ? 'text-red-500' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <HeartIcon className="w-7 h-7" />
                    </button>
                    <button className="transform hover:scale-110 transition-all duration-300 
                    text-gray-400 hover:text-white">
                      <CommentIcon className="w-7 h-7" />
                    </button>
                    <button className="transform hover:scale-110 transition-all duration-300 
                    text-gray-400 hover:text-white">
                      <ShareIcon className="w-7 h-7" />
                    </button>
                  </div>
                  <button 
                    onClick={() => setIsSaved(!isSaved)}
                    className={`transform hover:scale-110 transition-all duration-300 ${
                      isSaved 
                        ? 'text-blue-500' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <BookmarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <div className="text-white font-medium">
                  {post.reactions.toLocaleString()} likes
                </div>
              </div>

              {/* Comment input */}
              <form onSubmit={handleSubmitComment} className="p-6 border-t border-gray-700/50">
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 bg-gray-800/50 text-white placeholder-gray-500 px-4 py-2 
                    rounded-full border border-gray-700 focus:outline-none focus:border-blue-500/50 
                    transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!comment.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-full font-medium 
                    hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed 
                    transition-colors"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal; 