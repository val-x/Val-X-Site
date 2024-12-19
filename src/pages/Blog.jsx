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
  CommentIcon,
  VideoIcon,
  PodcastIcon,
  ImageIcon
} from '../components/Icons';
import '@fontsource/work-sans';
import VideoPlayer from '../components/learning/video/VideoPlayer';
import VideoPost from '../components/VideoPost';
import ImageModal from '../components/ImageModal';

const BlogPost = memo(({ post, onTagSelect }) => {
  const navigate = useNavigate();

  const handleClick = useCallback((e) => {
    if (e.target.closest('.tag-button') || e.target.closest('.video-player')) {
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
      {post.type === 'video' ? (
        <VideoPost post={post} />
      ) : post.image && (
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
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [contentFilter, setContentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  
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
          { 
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
              'Cache-Control': 'no-cache'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const storyIds = await response.json();
        
        const initialCount = activeTab === 'news' ? NEWS_PER_PAGE * 2 : NEWS_PER_PAGE;
        
        const stories = await Promise.all(
          storyIds.slice(0, initialCount).map(async (id) => {
            try {
              const storyResponse = await fetch(
                `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
                { 
                  signal: controller.signal,
                  headers: {
                    'Accept': 'application/json',
                    'Cache-Control': 'no-cache'
                  }
                }
              );
              
              if (!storyResponse.ok) {
                return null;
              }
              
              return storyResponse.json();
            } catch (error) {
              console.warn(`Failed to fetch story ${id}:`, error);
              return null;
            }
          })
        );

        if (!controller.signal.aborted) {
          const validStories = stories.filter(story => story !== null);
          setNewsItems(validStories);
          setHasMoreNews(validStories.length === initialCount);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Error fetching news:', error);
          setNewsItems([]);
          setHasMoreNews(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    if (activeTab === 'home' || activeTab === 'news') {
      fetchInitialNews();
    }

    return () => controller.abort();
  }, [activeTab]);

  // Add error boundary handling
  useEffect(() => {
    const handleError = (event) => {
      event.preventDefault();
      console.error('Resource loading error:', event);
    };

    window.addEventListener('error', handleError, true);
    
    return () => {
      window.removeEventListener('error', handleError, true);
    };
  }, []);

  // Filter video posts
  const videoPosts = useMemo(() => {
    return allPosts.filter(post => post.type === 'video');
  }, [allPosts]);

  // Filter podcast posts
  const podcastPosts = useMemo(() => {
    return allPosts.filter(post => post.type === 'podcast' || post.type === 'audio');
  }, [allPosts]);

  // Add ImageIcon to the imports at the top
  const imagePosts = useMemo(() => {
    return allPosts.filter(post => post.type === 'image' || post.type === 'gallery');
  }, [allPosts]);

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
            {/* Stories/Featured Section */}
            <section className="relative">
              <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {/* Add New Story */}
                <div className="flex-shrink-0">
                  <button 
                    onClick={() => window.location.href = '/blog/new'}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 
                    flex items-center justify-center border-2 border-gray-700 hover:border-blue-500 
                    transition-colors group">
                      <PlusIcon className="w-8 h-8 text-gray-400 group-hover:text-blue-500" />
                    </div>
                    <span className="text-xs text-gray-400">Create</span>
                  </button>
                </div>

                {/* Content Type Stories */}
                {[
                  { type: 'blog', icon: ArticleIcon, label: 'Blog' },
                  { type: 'news', icon: NewsIcon, label: 'News' },
                  { type: 'videos', icon: VideoIcon, label: 'Videos' },
                  { type: 'podcasts', icon: PodcastIcon, label: 'Podcasts' },
                  { type: 'images', icon: ImageIcon, label: 'Gallery' }
                ].map(({ type, icon: Icon, label }) => (
                  <button 
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className="flex-shrink-0 flex flex-col items-center gap-2"
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br p-[2px] ${
                      activeTab === type
                        ? 'from-blue-500 to-purple-500'
                        : 'from-gray-700 to-gray-800'
                    } group`}>
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center 
                      justify-center group-hover:bg-gray-800 transition-colors">
                        <Icon className="w-8 h-8 text-gray-400 group-hover:text-blue-400" />
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Main Feed */}
            <section className="space-y-6">
              {/* Featured Post */}
              {filteredPosts[0] && (
                <article className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 
                backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 
                hover:border-blue-500/50 transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={filteredPosts[0].image} 
                      alt={filteredPosts[0].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={filteredPosts[0].author.image} 
                          alt={filteredPosts[0].author.name}
                          className="w-10 h-10 rounded-full border-2 border-blue-500/30"
                        />
                        <div>
                          <div className="font-medium text-white">{filteredPosts[0].author.name}</div>
                          <div className="text-sm text-gray-300">{filteredPosts[0].date}</div>
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">{filteredPosts[0].title}</h2>
                      <p className="text-gray-300 line-clamp-2">{filteredPosts[0].excerpt}</p>
                    </div>
                  </div>
                </article>
              )}

              {/* Content Grid */}
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* Content Type Sections */}
                {[
                  { 
                    title: 'Latest Blog Posts',
                    items: filteredPosts.slice(1, 3),
                    component: BlogPost 
                  },
                  { 
                    title: 'Tech News',
                    items: newsItems.slice(0, 2),
                    component: NewsItem,
                    props: { isInReadingList: (item) => readingList.some(i => i.id === item.id) }
                  },
                  { 
                    title: 'Latest Videos',
                    items: videoPosts.slice(0, 2),
                    component: BlogPost 
                  },
                  { 
                    title: 'Latest Podcasts',
                    items: podcastPosts.slice(0, 2),
                    component: BlogPost 
                  }
                ].map(({ title, items, component: Component, props = {} }) => (
                  items.length > 0 && (
                    <div key={title} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-white">{title}</h3>
                        <button 
                          onClick={() => setActiveTab(title.toLowerCase().split(' ')[1])}
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          See all
                        </button>
                      </div>
                      {items.map((item) => (
                        <Component 
                          key={item.id || item.slug} 
                          {...(item.id ? { item } : { post: item })}
                          {...(typeof props === 'function' ? props(item) : props)}
                          onTagSelect={setSelectedTag}
                        />
                      ))}
                    </div>
                  )
                ))}

                {/* Image Gallery Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Photo Gallery</h3>
                    <button 
                      onClick={() => setActiveTab('images')}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      See all
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {imagePosts.slice(0, 4).map((post, index) => (
                      <div 
                        key={post.slug}
                        className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer
                        ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
                        onClick={() => {
                          setSelectedPost(post);
                          setIsModalOpen(true);
                        }}
                      >
                        <img 
                          src={post.type === 'gallery' ? post.images[0] : post.image}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        {post.type === 'gallery' && (
                          <div className="absolute top-2 right-2 bg-black/50 text-white 
                          px-2 py-1 rounded-lg text-xs">
                            +{post.images.length - 1}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trending Tags */}
              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-lg font-medium text-white mb-4">Trending Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 10).map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedTag === tag
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
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
      
      case 'videos':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Video Content</h2>
              <div className="flex items-center gap-4">
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

            {videoPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400">No video content available</p>
                <button
                  onClick={() => window.location.href = '/blog/new'}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg 
                  hover:bg-blue-600 transition-colors"
                >
                  Create New Video Post
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                view === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2' 
                  : 'grid-cols-1'
              }`}>
                {videoPosts.map((post) => (
                  <BlogPost 
                    key={post.slug} 
                    post={post} 
                    onTagSelect={setSelectedTag}
                  />
                ))}
              </div>
            )}
          </div>
        );
      
      case 'podcasts':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Podcast Episodes</h2>
              <div className="flex items-center gap-4">
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

            {podcastPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400">No podcast episodes available</p>
                <button
                  onClick={() => window.location.href = '/blog/new'}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg 
                  hover:bg-blue-600 transition-colors"
                >
                  Create New Episode
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                view === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2' 
                  : 'grid-cols-1'
              }`}>
                {podcastPosts.map((post) => (
                  <BlogPost 
                    key={post.slug} 
                    post={post} 
                    onTagSelect={setSelectedTag}
                  />
                ))}
              </div>
            )}
          </div>
        );
      
      case 'images':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Image Gallery</h2>
              <div className="flex items-center gap-4">
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

            {imagePosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400">No image posts available</p>
                <button
                  onClick={() => window.location.href = '/blog/new'}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg 
                  hover:bg-blue-600 transition-colors"
                >
                  Create New Image Post
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                view === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {imagePosts.map((post) => (
                  <article 
                    key={post.slug}
                    className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 
                    backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 
                    hover:border-blue-500/50 transition-all duration-300 
                    hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                  >
                    <div 
                      className="relative aspect-square overflow-hidden cursor-pointer"
                      onClick={() => {
                        setSelectedPost(post);
                        setIsModalOpen(true);
                      }}
                    >
                      {post.type === 'gallery' ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={post.images[0]} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-black/50 text-white 
                          px-2 py-1 rounded-lg text-sm">
                            +{post.images.length - 1}
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={post.author.image} 
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full border border-gray-800"
                        />
                        <div className="text-sm font-medium text-white">
                          {post.author.name}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5 text-gray-400">
                            <HeartIcon className="w-4 h-4" />
                            {post.reactions || 0}
                          </span>
                          <span className="flex items-center gap-1.5 text-gray-400">
                            <CommentIcon className="w-4 h-4" />
                            {post.comments || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
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
    searchTerm,
    videoPosts,
    podcastPosts,
    imagePosts
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
                  onClick={() => setActiveTab('videos')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === 'videos'
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-100 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <VideoIcon className="w-5 h-5" />
                  Videos
                </button>
                <button
                  onClick={() => setActiveTab('podcasts')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === 'podcasts'
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-100 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <PodcastIcon className="w-5 h-5" />
                  Podcasts
                </button>
                <button
                  onClick={() => setActiveTab('images')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === 'images'
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-100 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <ImageIcon className="w-5 h-5" />
                  Images
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
                <button 
                  onClick={() => setSelectedTag('trending')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedTag === 'trending' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-800/50 text-gray-100 hover:bg-gray-700/50'
                  }`}
                >
                  Trending
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-100 
                    hover:bg-gray-700/50 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters
                  </button>
                  <FiltersDropdown 
                    show={showFilters} 
                    onClose={() => setShowFilters(false)} 
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => window.location.href = '/blog/new'}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 
                  text-white hover:bg-blue-600 transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                  New Post
                </button>

                <div className="flex items-center gap-2 bg-gray-800/30 rounded-lg p-1">
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

      <ImageModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPost(null);
        }}
      />
    </div>
  );
};

const FiltersDropdown = ({ show, onClose }) => {
  if (!show) return null;
  
  return (
    <div 
      className="absolute top-full right-0 mt-2 w-64 bg-gray-900 rounded-xl border 
      border-gray-700/50 shadow-xl backdrop-blur-sm z-50"
    >
      <div className="p-4 border-b border-gray-700/50">
        <h3 className="text-sm font-medium text-white">Filter & Sort</h3>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400">Content Type</label>
          <div className="grid grid-cols-2 gap-2">
            {['all', 'blog', 'news', 'video', 'podcast', 'image'].map(type => (
              <button
                key={type}
                onClick={() => setContentFilter(type)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  contentFilter === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400">Sort By</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'latest', label: 'Latest' },
              { value: 'popular', label: 'Popular' },
              { value: 'trending', label: 'Trending' },
              { value: 'discussed', label: 'Most Discussed' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSortBy(value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  sortBy === value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-700/50 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 
          rounded-lg hover:bg-blue-600 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Blog; 