import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { blogPosts as samplePosts, categories } from '../data/blogData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { memo } from 'react';
import { formatTime } from '../utils/dateUtils';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import NewsItem from '../components/NewsItem';
import PopularTags from '../components/PopularTags';
import { 
  HomeIcon, 
  BookmarkIcon, 
  PlusIcon, 
  GridIcon, 
  ListIcon, 
  DraftIcon, 
  ArticleIcon, 
  NewsIcon, 
  ArrowIcon,
  HeartIcon,
  CommentIcon 
} from '../components/Icons';

const BlogPost = memo(({ post, onTagSelect }) => {
  const navigate = useNavigate();

  const handleClick = useCallback((e) => {
    if (e.target.closest('.tag-button')) {
      e.stopPropagation();
      return;
    }
    navigate(`/blog/${post.slug}`);
  }, [navigate, post.slug]);

  const handleTagClick = useCallback((tag) => {
    onTagSelect(tag);
  }, [onTagSelect]);

  return (
    <article 
      onClick={handleClick}
      className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm 
      rounded-xl overflow-hidden border border-gray-800/50 hover:border-blue-500/50 transition-all 
      duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
    >
      {post.image && (
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
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img 
              src={post.author.image} 
              alt={post.author.name}
              className="w-10 h-10 rounded-full border-2 border-blue-500/30 object-cover"
            />
            <div>
              <div className="text-sm font-medium text-white">{post.author.name}</div>
              <div className="text-xs text-gray-400">{post.date} · {post.readTime}</div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 
        transition-colors line-clamp-2">
          {post.title}
        </h2>

        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors">
              <HeartIcon className="w-4 h-4" />
              {post.reactions || 0}
            </span>
            <span className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors">
              <CommentIcon className="w-4 h-4" />
              {post.comments || 0}
            </span>
          </div>
          <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
            Read more
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
});

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState("all");
  const [view, setView] = useState("grid");
  const [showDrafts, setShowDrafts] = useState(false);
  const [draftCount, setDraftCount] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [newsItems, setNewsItems] = useState([]);
  const [readingList, setReadingList] = useState(() => {
    return JSON.parse(localStorage.getItem('readingList') || '[]');
  });
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [newsPage, setNewsPage] = useState(1);
  const [hasMoreNews, setHasMoreNews] = useState(true);
  const [newsFilter, setNewsFilter] = useState('all');
  const [newsSort, setNewsSort] = useState('score');
  const [newsView, setNewsView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  
  const ITEMS_PER_PAGE = 10;
  const NEWS_PER_PAGE = 5;

  const [allPosts, setAllPosts] = useState(() => {
    const newPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    return [...newPosts, ...samplePosts];
  });

  const filteredPosts = useMemo(() => {
    if (selectedTag === "all") return allPosts;
    return allPosts.filter(post => 
      post.tags?.includes(selectedTag.toLowerCase())
    );
  }, [selectedTag, allPosts]);

  const getDrafts = useMemo(() => {
    const newPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    return newPosts.filter(post => post.status === 'draft');
  }, [draftCount]);

  const sortedAndFilteredNews = useMemo(() => {
    let filtered = [...newsItems];
    
    // Apply filters
    if (newsFilter === 'top') {
      filtered = filtered.filter(item => item.score > 100);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (newsSort) {
        case 'score':
          return b.score - a.score;
        case 'time':
          return b.time - a.time;
        case 'comments':
          return (b.descendants || 0) - (a.descendants || 0);
        default:
          return 0;
      }
    });
  }, [newsItems, newsFilter, newsSort]);

  const filteredNews = useMemo(() => {
    let filtered = [...sortedAndFilteredNews];
    
    if (searchTerm.trim()) {
      const terms = searchTerm.toLowerCase().split(' ');
      filtered = filtered.filter(item => 
        terms.every(term => 
          item.title?.toLowerCase().includes(term) ||
          item.by?.toLowerCase().includes(term)
        )
      );
    }
    
    return filtered;
  }, [sortedAndFilteredNews, searchTerm]);

  // Define loadMorePosts before using it in useInfiniteScroll
  const loadMorePosts = useCallback(async () => {
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const hasMoreItems = end < filteredPosts.length;
    
    setPage(prev => prev + 1);
    setHasMore(hasMoreItems);
  }, [page, filteredPosts.length]);

  // Define loadMoreNews before using it in useInfiniteScroll
  const loadMoreNews = useCallback(async () => {
    const start = newsPage * NEWS_PER_PAGE;
    const end = start + NEWS_PER_PAGE;
    
    try {
      const response = await fetch(
        'https://hacker-news.firebaseio.com/v0/topstories.json'
      );
      const storyIds = await response.json();
      
      if (end >= storyIds.length) {
        setHasMoreNews(false);
        return;
      }

      const newStories = await Promise.all(
        storyIds.slice(start, end).map(async (id) => {
          const storyResponse = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          return storyResponse.json();
        })
      );

      setNewsItems(prev => [...prev, ...newStories]);
      setNewsPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching more news:', error);
    }
  }, [newsPage]);

  // Now use the infinite scroll hooks after the functions are defined
  const [isFetchingPosts] = useInfiniteScroll(loadMorePosts, hasMore && activeTab === 'blog');
  const [isFetchingNews] = useInfiniteScroll(
    loadMoreNews, 
    hasMoreNews && (activeTab === 'home' || activeTab === 'news')
  );

  // Optimize the toggleReadingList function
  const toggleReadingList = useCallback((item) => {
    setReadingList(prev => {
      const isInList = prev.some(i => i.id === item.id);
      const newList = isInList 
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item];
      
      localStorage.setItem('readingList', JSON.stringify(newList));
      return newList;
    });
  }, []);

  // Modify the news fetching effect
  useEffect(() => {
    const controller = new AbortController();

    const fetchInitialNews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://hacker-news.firebaseio.com/v0/topstories.json',
          { signal: controller.signal }
        );
        const storyIds = await response.json();
        
        // Fetch more stories initially for the news tab
        const initialCount = activeTab === 'news' ? NEWS_PER_PAGE * 2 : NEWS_PER_PAGE;
        
        const stories = await Promise.all(
          storyIds.slice(0, initialCount).map(async (id) => {
            const storyResponse = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
              { signal: controller.signal }
            );
            return storyResponse.json();
          })
        );

        if (!controller.signal.aborted) {
          setNewsItems(stories);
          setHasMoreNews(stories.length === initialCount);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Error fetching news:', error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    // Fetch news for both home and news tabs
    if (activeTab === 'home' || activeTab === 'news') {
      fetchInitialNews();
    }

    return () => controller.abort();
  }, [activeTab]);

  // Memoize the renderMainContent function
  const renderMainContent = useCallback(() => {
    if (isLoading && (activeTab === 'home' || activeTab === 'news')) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-12">
            {/* Blog Posts Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Latest Blog Posts</h2>
              </div>
              <div className={`grid gap-6 ${
                view === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2' 
                  : 'grid-cols-1'
              }`}>
                {filteredPosts.slice(0, 4).map((post) => (
                  <BlogPost 
                    key={post.slug} 
                    post={post} 
                    onTagSelect={setSelectedTag}
                  />
                ))}
              </div>
              {filteredPosts.length > 4 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setActiveTab('blog')}
                    className="px-6 py-2 bg-gray-800/50 text-gray-100 rounded-lg 
                    hover:bg-gray-700/50 transition-colors"
                  >
                    View All Posts
                  </button>
                </div>
              )}
            </section>

            {/* Tech News Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Latest Tech News</h2>
              </div>
              <div className="grid gap-6 grid-cols-1">
                {newsItems.map(item => (
                  <NewsItem 
                    key={item.id} 
                    item={item}
                    isInReadingList={readingList.some(i => i.id === item.id)}
                    onToggleReadingList={toggleReadingList}
                  />
                ))}
                {isFetchingNews && (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                )}
              </div>
            </section>
          </div>
        );
      
      case 'blog':
        return (
          <>
            <div className={`grid gap-6 ${
              view === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {filteredPosts.slice(0, page * ITEMS_PER_PAGE).map((post) => (
                <BlogPost 
                  key={post.slug} 
                  post={post} 
                  onTagSelect={setSelectedTag}
                />
              ))}
            </div>
            {isFetchingPosts && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
          </>
        );
      
      case 'reading-list':
        return (
          <div className="grid gap-6 grid-cols-1">
            {readingList.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400">Your reading list is empty</p>
              </div>
            ) : (
              readingList.map(item => (
                <NewsItem 
                  key={item.id} 
                  item={item}
                  isInReadingList={true}
                  onToggleReadingList={toggleReadingList}
                />
              ))
            )}
          </div>
        );
      
      case 'drafts':
        return getDrafts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">No drafts yet</p>
            <button
              onClick={() => window.location.href = '/blog/new'}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg 
              hover:bg-blue-600 transition-colors"
            >
              Create New Post
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            view === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2' 
              : 'grid-cols-1'
          }`}>
            {getDrafts.map((post, index) => (
              <BlogPost 
                key={index} 
                post={post} 
                onTagSelect={setSelectedTag}
              />
            ))}
          </div>
        );
      
      case 'news':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Tech News</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search news..."
                    className="w-64 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                    text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setNewsView('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      newsView === 'grid' 
                        ? 'text-blue-400 bg-blue-500/10' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <GridIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setNewsView('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      newsView === 'list' 
                        ? 'text-blue-400 bg-blue-500/10' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <ListIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setNewsFilter('all')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    newsFilter === 'all' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-800/50 text-gray-100 hover:bg-gray-700/50'
                  }`}
                >
                  All Stories
                </button>
                <button 
                  onClick={() => setNewsFilter('top')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    newsFilter === 'top' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-800/50 text-gray-100 hover:bg-gray-700/50'
                  }`}
                >
                  Top Stories
                </button>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select
                  value={newsSort}
                  onChange={(e) => setNewsSort(e.target.value)}
                  className="bg-gray-800/50 text-gray-100 rounded-lg px-3 py-2 border border-gray-700 
                  focus:border-blue-500 focus:ring-0"
                >
                  <option value="score">Points</option>
                  <option value="time">Time</option>
                  <option value="comments">Comments</option>
                </select>
              </div>
            </div>

            {/* News Items Grid */}
            <div className={`grid gap-6 ${
              newsView === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {filteredNews.map(item => (
                <NewsItem 
                  key={item.id} 
                  item={item}
                  view={newsView}
                  isInReadingList={readingList.some(i => i.id === item.id)}
                  onToggleReadingList={toggleReadingList}
                />
              ))}
              {isFetchingNews && (
                <div className="col-span-full flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>

            {/* No Results Message */}
            {filteredNews.length === 0 && !isFetchingNews && (
              <div className="text-center py-20">
                <p className="text-gray-400">
                  {searchTerm ? 'No stories found matching your search' : 'No stories found'}
                </p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  }, [
    activeTab,
    isLoading,
    view,
    filteredPosts,
    newsItems,
    readingList,
    toggleReadingList,
    setSelectedTag,
    page,
    isFetchingPosts,
    isFetchingNews,
    newsFilter,
    newsSort,
    sortedAndFilteredNews,
    newsView,
    searchTerm
  ]);

  // Reset pagination when tab or tag changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [activeTab, selectedTag]);

  useEffect(() => {
    if (activeTab === 'news' || activeTab === 'home') {
      setNewsPage(1);
      setHasMoreNews(true);
      setNewsItems([]);
      setNewsFilter('all'); // Reset filter when changing tabs
      setNewsSort('score'); // Reset sort when changing tabs
    }
  }, [activeTab]);

  // Update the sidebar navigation
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-blue-500">Blog</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover insights about technology, development, and innovation
          </p>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-64 space-y-8">
            <div className="sticky top-24">
              <nav className="space-y-2 mb-8">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === 'home'
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-100 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <HomeIcon className="w-5 h-5" />
                  Home
                </button>
                <button
                  onClick={() => setActiveTab('blog')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === 'blog'
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-100 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <ArticleIcon className="w-5 h-5" />
                  Blog Posts
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === 'news'
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-100 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <NewsIcon className="w-5 h-5" />
                  Tech News
                </button>
                <button
                  onClick={() => setActiveTab('reading-list')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === 'reading-list'
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-100 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookmarkIcon className="w-5 h-5" />
                    Reading List
                  </div>
                  {readingList.length > 0 && (
                    <span className="bg-gray-800 text-gray-400 px-2 py-0.5 rounded text-xs">
                      {readingList.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('drafts')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === 'drafts'
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-100 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <DraftIcon className="w-5 h-5" />
                    Drafts
                  </div>
                  <span className="bg-gray-800 text-gray-400 px-2 py-0.5 rounded text-xs">
                    {getDrafts.length || draftCount}
                  </span>
                </button>
              </nav>

              <PopularTags 
                selectedTag={selectedTag}
                onTagSelect={setSelectedTag}
                tags={categories}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedTag('all')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedTag === 'all' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-800/50 text-gray-100 hover:bg-gray-700/50'
                  }`}
                >
                  Latest
                </button>
                <button className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-100 
                hover:bg-gray-700/50 transition-colors">
                  Popular
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => window.location.href = '/blog/new'}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 
                  text-white hover:bg-blue-600 transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                  New Community Post
                </button>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setView('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      view === 'grid' 
                        ? 'text-blue-400 bg-blue-500/10' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <GridIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setView('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      view === 'list' 
                        ? 'text-blue-400 bg-blue-500/10' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <ListIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {renderMainContent()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog; 