import { useParams } from 'react-router-dom';
import { blogPosts as samplePosts } from '../data/blogData';
import Navbar from './Navbar';
import Footer from './Footer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useMemo, useState, useEffect } from 'react';
import { HeartIcon, CommentIcon, ShareIcon, LinkIcon, ArrowUpIcon, BookmarkIcon } from './Icons';
import { toast } from 'react-hot-toast';
import MarkdownRenderer from './MarkdownRenderer';
import Comments from './Comments';
import FloatingActions from './FloatingActions';

const BlogPost = () => {
  const { slug } = useParams();
  
  const post = useMemo(() => {
    const newPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const allPosts = [...newPosts, ...samplePosts];
    return allPosts.find(p => p.slug === slug);
  }, [slug]);

  if (!post) {
    throw new Response("Not Found", { 
      status: 404,
      statusText: "Blog post not found" 
    });
  }

  const [hasReacted, setHasReacted] = useState(false);
  const [reactions, setReactions] = useState(post.reactions);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.some(b => b.slug === post.slug));
  }, [post.slug]);

  const handleReaction = () => {
    if (!hasReacted) {
      setReactions(prev => prev + 1);
      setHasReacted(true);
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = '❤️';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = post.title;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        break;
    }
    setShowShareMenu(false);
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (isBookmarked) {
      const newBookmarks = bookmarks.filter(b => b.slug !== post.slug);
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      toast.success('Removed from bookmarks');
    } else {
      const newBookmarks = [...bookmarks, { 
        slug: post.slug, 
        title: post.title,
        date: post.date,
        author: post.author
      }];
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      toast.success('Added to bookmarks');
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      text: comment,
      author: {
        name: "Current User",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      },
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section with Gradient Overlay */}
      <div className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 
          mix-blend-overlay opacity-60" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 h-full flex flex-col justify-end pb-20">
          {/* Tags with gradient effect */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {post.tags?.map(tag => (
              <span 
                key={tag}
                className="relative group"
              >
                {/* Animated gradient background */}
                <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-violet-500 
                to-fuchsia-500 rounded-full opacity-70 blur-sm group-hover:opacity-100 
                group-hover:blur-md transition-all duration-500 animate-gradient-shift" />
                
                {/* Shimmering effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent 
                via-white/25 to-transparent opacity-0 group-hover:opacity-20 blur-sm 
                animate-shimmer" />
                
                {/* Tag content */}
                <div className="relative px-5 py-2 rounded-full bg-gradient-to-br 
                from-gray-900/90 to-black/90 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 
                    to-violet-400 group-hover:scale-125 transition-transform duration-300" />
                    <span className="text-sm font-medium bg-clip-text text-transparent 
                    bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 
                    group-hover:from-cyan-300 group-hover:via-violet-300 group-hover:to-fuchsia-300 
                    transition-all duration-300">
                      #{tag}
                    </span>
                  </div>
                </div>
              </span>
            ))}
          </div>

          {/* Title with gradient text */}
          <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tight
          text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
            {post.title}
          </h1>

          {/* Author and Stats Section */}
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-4">
              {/* Author Image with Creative Effects */}
              <div className="relative group">
                {/* Animated gradient border */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 
                to-fuchsia-500 opacity-75 group-hover:opacity-100 blur transition-all duration-500" />
                
                {/* Glow effect */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500/20 
                via-violet-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 blur-lg 
                transition-all duration-500 animate-pulse-slow" />
                
                {/* Image Container */}
                <div className="relative w-14 h-14 rounded-full transform transition-transform duration-500 
                group-hover:scale-105 group-hover:rotate-6">
                  {/* Background pattern */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 to-black" />
                  
                  {/* Author Image */}
                  <img 
                    src={post.author.image} 
                    alt={post.author.name}
                    className="relative w-full h-full rounded-full object-cover border-2 border-white/10 
                    ring-2 ring-violet-500/20 transition-all duration-500 group-hover:ring-violet-500/40"
                  />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/20 
                  to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rotate-45" />
                </div>
              </div>

              <div>
                <div className="font-medium text-white text-lg">{post.author.name}</div>
                <div className="text-gray-400">{post.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition-colors">
                <ClockIcon className="w-5 h-5" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-2 text-gray-400 hover:text-fuchsia-400 transition-colors">
                <HeartIcon className="w-5 h-5" />
                {reactions} reactions
              </span>
              <span className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <CommentIcon className="w-5 h-5" />
                {post.comments} comments
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <main className="relative">
        {/* Decorative gradient blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-r 
        from-cyan-500/30 via-violet-500/30 to-fuchsia-500/30 blur-3xl opacity-20 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-4 py-20">
          <div className="flex gap-12">
            {/* Article Content */}
            <article className="flex-1">
              {/* Main Content */}
              <div className="prose prose-invert max-w-none">
                <MarkdownRenderer content={post.content} />
              </div>

              {/* Article Footer */}
              <div className="mt-16 border-t border-white/10 pt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Author Image with Creative Effects */}
                    <div className="relative group">
                      {/* Animated gradient border */}
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 
                      to-fuchsia-500 opacity-75 group-hover:opacity-100 blur transition-all duration-500" />
                      
                      {/* Glow effect */}
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500/20 
                      via-violet-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 blur-lg 
                      transition-all duration-500 animate-pulse-slow" />
                      
                      {/* Image Container */}
                      <div className="relative w-12 h-12 rounded-full transform transition-transform duration-500 
                      group-hover:scale-105 group-hover:-rotate-6">
                        {/* Background pattern */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 to-black" />
                        
                        {/* Author Image */}
                        <img 
                          src={post.author.image} 
                          alt={post.author.name}
                          className="relative w-full h-full rounded-full object-cover border-2 border-white/10 
                          ring-2 ring-violet-500/20 transition-all duration-500 group-hover:ring-violet-500/40"
                        />
                        
                        {/* Shine effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/20 
                        to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-45" />
                      </div>
                    </div>

                    <div>
                      <div className="font-medium text-white">{post.author.name}</div>
                      <div className="text-sm text-gray-400">Technical Writer</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handleReaction}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                      ${hasReacted 
                        ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-rose-400' 
                        : 'bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 text-gray-400 hover:text-fuchsia-400'
                      }`}
                    >
                      <HeartIcon className={`w-5 h-5 ${hasReacted ? 'fill-current' : ''}`} />
                      {reactions} reactions
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments Section - Using the new component */}
              {/* <div className="mt-16">
                <Comments 
                  comments={comments} 
                  onAddComment={(newComment) => setComments(prev => [newComment, ...prev])} 
                />
              </div> */}
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block w-72 space-y-8">
              <div className="sticky top-24">
                {/* Table of Contents */}
                <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 
                border border-white/10 backdrop-blur-sm">
                  <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r 
                  from-cyan-400 to-violet-400 mb-4">
                    Table of Contents
                  </h3>
                  <nav className="space-y-1">
                    {generateTableOfContents(post.content).map((item, index) => (
                      <a
                        key={index}
                        href={`#${item.id}`}
                        className={`block py-2 px-3 rounded-lg text-sm transition-all
                        ${item.level === 2 
                          ? 'text-gray-200 hover:bg-white/5 hover:text-violet-400' 
                          : 'text-gray-400 hover:text-violet-400 pl-6'}`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Share Buttons */}
                <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 
                border border-white/10 backdrop-blur-sm mt-8">
                  <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r 
                  from-violet-400 to-fuchsia-400 mb-4">
                    Share Article
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 
                    rounded-lg group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 
                      group-hover:from-cyan-500/20 group-hover:to-violet-500/20 transition-colors" />
                      <TwitterIcon className="w-5 h-5 text-cyan-400" />
                      <span className="text-cyan-400">Twitter</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 
                    rounded-lg group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 
                      group-hover:from-violet-500/20 group-hover:to-fuchsia-500/20 transition-colors" />
                      <LinkedInIcon className="w-5 h-5 text-violet-400" />
                      <span className="text-violet-400">LinkedIn</span>
                    </button>
                  </div>
                </div>

                {/* More from Author */}
                <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 
                border border-white/10 backdrop-blur-sm mt-8">
                  <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r 
                  from-fuchsia-400 to-cyan-400 mb-4">
                    More from {post.author.name}
                  </h3>
                  <div className="space-y-4">
                    {samplePosts
                      .filter(p => p.author.name === post.author.name && p.slug !== post.slug)
                      .slice(0, 3)
                      .map(p => (
                        <a
                          key={p.slug}
                          href={`/blog/${p.slug}`}
                          className="block group"
                        >
                          <h4 className="text-sm font-medium text-gray-200 group-hover:text-transparent 
                          group-hover:bg-clip-text group-hover:bg-gradient-to-r 
                          group-hover:from-violet-400 group-hover:to-fuchsia-400 
                          transition-all duration-300 line-clamp-2 mb-1">
                            {p.title}
                          </h4>
                          <p className="text-xs text-gray-400">{p.date}</p>
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      <FloatingActions 
        onReaction={handleReaction}
        hasReacted={hasReacted}
        reactions={reactions}
        isBookmarked={isBookmarked}
        onBookmark={handleBookmark}
        onShare={handleShare}
      />

    </div>
  );
};

// Helper function to generate table of contents
const generateTableOfContents = (content) => {
  const headings = [];
  const lines = content.split('\n');
  
  lines.forEach(line => {
    if (line.startsWith('## ')) {
      headings.push({
        level: 2,
        text: line.replace('## ', ''),
        id: line.replace('## ', '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
    } else if (line.startsWith('### ')) {
      headings.push({
        level: 3,
        text: line.replace('### ', ''),
        id: line.replace('### ', '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
    }
  });

  return headings;
};

// Add these new icon components
const ClockIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" 
    />
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" 
    />
  </svg>
);

export default BlogPost; 