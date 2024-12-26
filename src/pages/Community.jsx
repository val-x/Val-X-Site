import VideoPlayer from '../components/learning/video/VideoPlayer';

const BlogPost = memo(({ post, onTagSelect }) => {
  const navigate = useNavigate();

  const handleClick = useCallback((e) => {
    if (e.target.closest('.tag-button') || e.target.closest('.video-player')) {
      e.stopPropagation();
      return;
    }
    navigate(`/community/${post.slug}`);
  }, [navigate, post.slug]);

  // ... other existing code ...

  return (
    <article 
      onClick={handleClick}
      className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm 
      rounded-xl overflow-hidden border border-gray-800/50 hover:border-blue-500/50 transition-all 
      duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
    >
      {post.type === 'video' ? (
        <div className="relative h-[300px] video-player">
          <VideoPlayer
            videoUrl={post.videoUrl}
            title={post.title}
            savedProgress={post.savedProgress}
            onProgress={(progress) => {
              // Handle video progress
              console.log('Video progress:', progress);
            }}
          />
        </div>
      ) : post.image && (
        // Existing image code...
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60" />
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            {post.tags?.slice(0, 2).map(tag => (
              <button 
                key={tag}
                className="tag-button px-3 py-1 text-xs font-medium text-blue-400 bg-gray-900/80 
                backdrop-blur-sm rounded-full border border-blue-500/30 hover:bg-blue-500/20 
                transition-colors"
                onClick={() => handleTagClick(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Rest of the existing BlogPost component code... */}
    </article>
  );
});

const Community = () => {
  // ... existing state and hooks ...

  // Update title and description
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-blue-500">Community</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Share and discover insights through articles, videos, and discussions
          </p>
        </div>

        {/* Rest of the existing component code... */}
      </main>

      <Footer />
    </div>
  );
};

export default Community; 