import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelView from "../components/ModelView";
import {
  modelProjects,
  clientProjects,
  getAllProjects,
  getCategories,
  getProjectStats,
} from "../data/projects";
import { useDebounce } from "../hooks/useDebounce";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useInView } from "react-intersection-observer";
import {
  ShareIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import {
  budgetEstimates,
  currencies,
  sortOptions,
} from "../data/budgetEstimates";
import BudgetEstimates from "../components/BudgetEstimates";

// ProjectCard component
const ProjectCard = ({
  project,
  index,
  isGridView,
  isSelected,
  onClick,
  onFocus,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      await navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    toast.success(
      isBookmarked ? "Project removed from bookmarks" : "Project bookmarked!"
    );
  };

  const handleVisitSite = (e) => {
    e.stopPropagation();
    if (project.url) {
      window.open(project.url, "_blank");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isSelected ? 1.02 : 1,
        boxShadow: isSelected ? "0 0 0 2px rgba(139, 92, 246, 0.5)" : "none",
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer
        ${isGridView ? "" : "flex gap-8"}`}
      onClick={onClick}
      onFocus={onFocus}
      tabIndex={0}
      role="button"
      aria-selected={isSelected}
    >
      {/* Project Image */}
      <div
        className={`${isGridView ? "aspect-video" : "w-1/3"} overflow-hidden`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Project Info */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-6 ${isGridView ? "" : "relative w-2/3"}`}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.color}`}
            >
              {project.category}
            </span>
            <span className="text-gray-400 text-sm">{project.tech}</span>
          </div>
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="text-gray-300 text-sm">{project.description}</p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-cyan-400">{project.stats.users} Users</span>
            <span className="text-violet-400">⭐ {project.stats.rating}</span>
            <span className="text-fuchsia-400">↗ {project.stats.growth}</span>
          </div>

          {/* Visit Site Button */}
          {project.url && (
            <button
              onClick={handleVisitSite}
              className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Visit Site →
            </button>
          )}
        </div>
      </div>

      {/* Add action buttons */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleShare}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Share project"
        >
          <ShareIcon className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={handleBookmark}
          className={`p-2 rounded-full transition-colors ${
            isBookmarked
              ? "bg-violet-500 text-white"
              : "bg-white/10 hover:bg-white/20"
          }`}
          aria-label={
            isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
          }
        >
          <BookmarkIcon className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

// ProjectModal component
const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 max-w-2xl w-full border border-white/10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="space-y-6">
          {/* Project Image */}
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Project Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.color}`}
              >
                {project.category}
              </span>
              <span className="text-gray-400">{project.tech}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-400">{project.description}</p>
          </div>

          {/* Project Details */}
          {project.details && (
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Challenge
                </h4>
                <p className="text-gray-400">{project.details.challenge}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Solution
                </h4>
                <p className="text-gray-400">{project.details.solution}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Impact
                </h4>
                <p className="text-gray-400">{project.details.impact}</p>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 rounded-xl">
            <div className="text-center">
              <p className="text-sm text-gray-400">Users</p>
              <p className="text-lg font-bold text-cyan-400">
                {project.stats.users}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Rating</p>
              <p className="text-lg font-bold text-violet-400">
                {project.stats.rating}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Growth</p>
              <p className="text-lg font-bold text-fuchsia-400">
                {project.stats.growth}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-4 border-violet-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

const ProjectGrid = ({ projects, isGridView, onSelectProject }) => {
  const gridRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gridRef.current) return;

      switch (e.key) {
        case "ArrowRight":
          setSelectedIndex((prev) => Math.min(prev + 1, projects.length - 1));
          break;
        case "ArrowLeft":
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "ArrowDown":
          setSelectedIndex((prev) =>
            Math.min(prev + (isGridView ? 3 : 1), projects.length - 1)
          );
          break;
        case "ArrowUp":
          setSelectedIndex((prev) => Math.max(prev - (isGridView ? 3 : 1), 0));
          break;
        case "Enter":
          onSelectProject(projects[selectedIndex]);
          break;
        default:
          return;
      }
      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, projects, isGridView, onSelectProject]);

  return (
    <motion.div
      ref={gridRef}
      layout
      className={`grid gap-8 ${isGridView ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id || project.title}
            project={project}
            index={index}
            isGridView={isGridView}
            isSelected={index === selectedIndex}
            onClick={() => onSelectProject(project)}
            onFocus={() => setSelectedIndex(index)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

// Add sorting options
const SORT_OPTIONS = {
  NEWEST: "newest",
  POPULAR: "popular",
  RATING: "rating",
};

const CategoryBadge = ({ category, count, isSelected, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
      ${
        isSelected
          ? "bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white"
          : "bg-white/5 text-white/60 hover:bg-white/10"
      }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
    <span className="px-2 py-0.5 rounded-full bg-white/10">{count}</span>
  </motion.button>
);

const Showcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const [showModel, setShowModel] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");
  const ITEMS_PER_PAGE = 9;

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const categories = useMemo(() => getCategories(), []);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredProjects = useMemo(() => {
    const projects = showModel ? modelProjects : clientProjects;
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        project.description
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, debouncedSearch, showModel]);

  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredProjects, page]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    setHasMore(filteredProjects.length > page * ITEMS_PER_PAGE);
    setPage(1); // Reset pagination when filters change
  }, [filteredProjects.length, selectedCategory, debouncedSearch]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

  // Handle view transitions
  const handleViewChange = useCallback(() => {
    setIsLoading(true);
    setShowModel((prev) => !prev);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  // Add new states
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NEWEST);
  const [categoryStats, setCategoryStats] = useState({});

  // Calculate category counts
  useEffect(() => {
    const stats = getProjectStats().categoryCounts;
    setCategoryStats(stats);
  }, []);

  // Enhanced project filtering and sorting
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...filteredProjects];

    switch (sortBy) {
      case SORT_OPTIONS.POPULAR:
        result.sort(
          (a, b) => parseInt(b.stats.users) - parseInt(a.stats.users)
        );
        break;
      case SORT_OPTIONS.RATING:
        result.sort(
          (a, b) => parseFloat(b.stats.rating) - parseFloat(a.stats.rating)
        );
        break;
      case SORT_OPTIONS.NEWEST:
      default:
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return result;
  }, [filteredProjects, sortBy]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24">
        {/* Hero Section with 3D Model */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-conic from-cyan-500/30 via-violet-500/30 to-fuchsia-500/30 blur-[100px] animate-spin-slow" />
            <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-conic from-fuchsia-500/30 via-cyan-500/30 to-violet-500/30 blur-[100px] animate-spin-slow-reverse" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                  Projects
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Explore our innovative solutions and success stories
              </p>

              {/* Tab Controls */}
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${activeTab === "projects" ? "bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}
                >
                  Projects
                </button>
                <button
                  onClick={() => setActiveTab("budgetEstimates")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${activeTab === "budgetEstimates" ? "bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}
                >
                  Budget Estimates
                </button>
              </div>

              {/* Project Type Controls - Only show when projects tab is active */}
              {activeTab === "projects" && (
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleViewChange}
                    disabled={isLoading}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${showModel ? "bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}
                      ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isLoading ? <LoadingSpinner /> : "Our Projects"}
                  </button>
                  <button
                    onClick={() => setShowModel(!showModel)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                        ${!showModel ? "bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}
                  >
                    Client Projects
                  </button>
                </div>
              )}
            </motion.div>

            {/* Tab Content */}
            {activeTab === "projects" ? (
              <>
                {/* 3D Model View */}
                {showModel && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 mb-20"
                  >
                    <div className="aspect-[16/9] relative">
                      {modelLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <LoadingSpinner />
                        </div>
                      )}
                      <ModelView
                        projects={modelProjects}
                        onLoad={() => setModelLoading(false)}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Projects Grid Section */}
                {!showModel && (
                  <ErrorBoundary>
                    <section className="py-20 relative">
                      <div className="max-w-7xl mx-auto px-6">
                        <ProjectGrid
                          projects={paginatedProjects}
                          isGridView={isGridView}
                          onSelectProject={setSelectedProject}
                        />

                        {/* Infinite Scroll Trigger */}
                        {hasMore && (
                          <div ref={loadMoreRef} className="py-8 text-center">
                            <LoadingSpinner />
                          </div>
                        )}

                        {/* Empty State */}
                        {filteredProjects.length === 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full text-center py-12"
                          >
                            <p className="text-gray-400 mb-4">
                              No projects found matching your criteria
                            </p>
                            <button
                              onClick={() => {
                                setSelectedCategory("all");
                                setSearchQuery("");
                              }}
                              className="text-violet-400 hover:text-violet-300 transition-colors"
                            >
                              Clear filters
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </section>
                  </ErrorBoundary>
                )}
              </>
            ) : (
              <BudgetEstimates />
            )}
          </div>
        </section>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Showcase;
