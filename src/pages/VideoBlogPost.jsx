import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VideoPlayer from '../components/learning/video/VideoPlayer';
import { HeartIcon, CommentIcon, BookmarkIcon } from '../components/Icons';
import ReactMarkdown from 'react-markdown';

const VideoBlogPost = () => {
  const { slug } = useParams();
  const videoContainerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [post] = useState(() => blogPosts.find(p => p.slug === slug));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Navbar />
      
      <main className="pt-16">
        {/* Video Section */}
        <div className="w-full bg-black">
          <div ref={videoContainerRef} className="relative aspect-video max-w-[1920px] mx-auto">
            {/* Video Player */}
            <VideoPlayer
              videoUrl={post.videoUrl}
              title={post.title}
              savedProgress={post.savedProgress}
              onProgress={(progress) => {
                console.log('Video progress:', progress);
              }}
            />

            {/* Video Controls */}
            <div className={`absolute top-0 right-0 z-30 flex gap-2 p-4 ${
              isFullscreen ? 'opacity-0 hover:opacity-100 transition-opacity' : ''
            }`}>
              <button
                onClick={toggleFullscreen}
                className="text-white/80 hover:text-white p-2 bg-black/50 rounded-lg"
              >
                {isFullscreen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 9h6v6M15 9l-6 6M9 15h6v-6M9 9l6 6" 
                    />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0 0l-5-5m-7 11h4m-4 0v4m0 0l5-5m5 5v-4m0 4h-4m0 0l5-5" 
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Stats */}
              <div>
                <h1 className="text-2xl font-bold text-white mb-4">{post.title}</h1>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{post.views || '1.2K'} views</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400">
                      <HeartIcon className="w-5 h-5" />
                      <span>{post.reactions}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400">
                      <CommentIcon className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400">
                      <BookmarkIcon className="w-5 h-5" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-b border-gray-800 py-4">
                <img 
                  src={post.author.image} 
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-white">{post.author.name}</div>
                  <div className="text-sm text-gray-400">{post.author.followers || '10K'} followers</div>
                </div>
                <button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Follow
                </button>
              </div>

              {/* Description */}
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4">
                {post.tags?.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 text-sm text-blue-400 bg-blue-500/10 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white">Related Videos</h3>
              {/* Add related videos here */}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VideoBlogPost; 