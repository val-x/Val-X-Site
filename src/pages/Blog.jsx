import { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { blogPosts, categories } from '../data/blogData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPost = ({ post }) => {
  const navigate = useNavigate();

  return (
    <article 
      onClick={() => navigate(`/blog/${post.slug}`)}
      className="bg-gray-800/30 hover:bg-gray-800/50 rounded-lg p-4 cursor-pointer transition-all"
    >
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
          loading="lazy"
        />
      )}
      
      <div className="flex items-center gap-2 mb-2">
        <img 
          src={post.author.image} 
          alt={post.author.name}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <div className="text-sm text-gray-100">{post.author.name}</div>
          <div className="text-xs text-gray-500">{post.date}</div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white hover:text-blue-400 mb-2">
        {post.title}
      </h2>

      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags?.map(tag => (
          <span 
            key={tag}
            className="text-sm text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 px-2 py-1 rounded-md"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <HeartIcon className="w-4 h-4" />
            {post.reactions || 0}
          </span>
          <span className="flex items-center gap-1">
            <CommentIcon className="w-4 h-4" />
            {post.comments || 0}
          </span>
        </div>
        <span>{post.readTime}</span>
      </div>
    </article>
  );
};

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState("all");
  
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 pt-24">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-64 space-y-6">
            <nav className="space-y-2">
              <a href="#" className="block text-gray-100 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-lg">
                🏠 Home
              </a>
              <a href="#" className="block text-gray-100 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-lg">
                📚 Reading List
              </a>
              <a href="#" className="block text-gray-100 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-lg">
                🏷️ Tags
              </a>
            </nav>

            <div className="p-4 bg-gray-800/30 rounded-lg">
              <h3 className="font-bold text-white mb-2">Popular Tags</h3>
              <div className="space-y-1">
                {categories.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`block w-full text-left px-2 py-1 rounded ${
                      selectedTag === tag 
                        ? 'text-blue-400 bg-blue-400/10' 
                        : 'text-gray-400 hover:text-blue-400 hover:bg-gray-800/50'
                    }`}
                  >
                    #{tag.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <button className={`px-4 py-2 rounded-lg ${
                selectedTag === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800/30 text-gray-100 hover:bg-gray-800/50'
              }`}>
                Latest
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-800/30 text-gray-100 hover:bg-gray-800/50">
                Top
              </button>
            </div>

            <div className="space-y-4">
              {blogPosts.map((post, index) => (
                <BlogPost key={index} post={post} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Simple icon components
const HeartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const CommentIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export default Blog; 