import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiExternalLink,
  FiBookmark,
  FiShare2,
  FiUsers,
  FiStar,
  FiTrendingUp,
  FiImage,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

const ProjectDisplay = ({ project, onSelect, viewMode = "grid" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  // Enhanced Unsplash image fallbacks with high-quality images
  const getUnsplashFallback = (category) => {
    const fallbacks = {
      "Healthcare & Wellness": [
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80",
      ],
      FinTech: [
        "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&auto=format&fit=crop&q=80",
      ],
      "Blockchain & AI": [
        "https://images.unsplash.com/photo-1644088379091-d574269d422f?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
      ],
      "Lifestyle & Wellness": [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80",
      ],
      "E-Commerce": [
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
      ],
      Transportation: [
        "https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80",
      ],
      Construction: [
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80",
      ],
      Business: [
        "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
      ],
      Technology: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      ],
      "Food & Beverage": [
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
      ],
      default: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
      ],
    };

    const categoryImages = fallbacks[category] || fallbacks.default;
    return categoryImages[Math.floor(Math.random() * categoryImages.length)];
  };

  // Handle image loading and fallback
  useEffect(() => {
    const loadImage = async () => {
      setImageLoaded(false);
      setImageError(false);

      try {
        // Try project image first
        if (project.image) {
          setImageSrc(project.image);
        } else {
          // Use Unsplash fallback if no project image
          setImageSrc(getUnsplashFallback(project.category));
        }
      } catch (error) {
        console.error("Error loading image:", error);
        setImageError(true);
        // Use default fallback if both fail
        setImageSrc(getUnsplashFallback("default"));
      }
    };

    loadImage();
  }, [project.image, project.category]);

  const handleImageError = () => {
    setImageError(true);
    setImageSrc(getUnsplashFallback(project.category));
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      await navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      });
    } catch (err) {
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

  const getContainerClassName = () => {
    const baseClasses =
      "group relative overflow-hidden cursor-pointer bg-black/20 backdrop-blur-sm border border-white/10";

    switch (viewMode) {
      case "list":
        return `${baseClasses} rounded-xl flex gap-6`;
      case "card":
        return `${baseClasses} rounded-2xl flex flex-col`;
      case "grid":
      default:
        return `${baseClasses} rounded-3xl`;
    }
  };

  const getImageContainerClassName = () => {
    switch (viewMode) {
      case "list":
        return "w-48 h-32 shrink-0";
      case "card":
        return "h-48";
      case "grid":
      default:
        return "aspect-[16/9]";
    }
  };

  const getContentClassName = () => {
    switch (viewMode) {
      case "list":
        return "flex-1 p-4";
      case "card":
        return "flex-1 p-6";
      case "grid":
      default:
        return "relative p-6";
    }
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={getContainerClassName()}
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20" />
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20" />
      </div>

      {/* Project Image */}
      <div
        className={`relative overflow-hidden bg-gray-900 ${getImageContainerClassName()}`}
      >
        {/* Skeleton Loading State */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FiImage className="w-12 h-12 text-white/20 animate-pulse" />
            </div>
          </div>
        )}

        {/* Image */}
        <motion.img
          src={imageSrc}
          alt={project.title}
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover transform transition-all duration-700
            ${isHovered ? "scale-110" : "scale-100"}
            ${imageLoaded ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Error State */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
            <div className="text-center">
              <FiImage className="w-12 h-12 mx-auto text-white/20" />
              <p className="mt-2 text-sm text-white/50">Image unavailable</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className={getContentClassName()}>
        {/* Category and Tech Stack */}
        <div className="flex items-center gap-3 mb-4">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.color} shadow-lg shadow-cyan-500/20`}
          >
            {project.category}
          </motion.span>
          <span className="text-sm text-white/70">{project.tech}</span>
        </div>

        {/* Title and Description */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`font-bold text-white mb-2 ${
            viewMode === "list" ? "text-xl" : "text-2xl"
          } ${viewMode === "grid" ? "line-clamp-1" : ""}`}
        >
          {project.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`text-white/70 text-sm ${
            viewMode === "list" ? "line-clamp-1" : "line-clamp-2"
          } mb-6`}
        >
          {project.description}
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`grid gap-4 mb-6 ${
            viewMode === "list" ? "grid-cols-3 max-w-md" : "grid-cols-3"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <FiUsers className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-white/50">Users</p>
              <p className="text-sm font-medium text-cyan-400">
                {project.stats.users}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <FiStar className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-xs text-white/50">Rating</p>
              <p className="text-sm font-medium text-violet-400">
                {project.stats.rating}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-fuchsia-500/10">
              <FiTrendingUp className="w-4 h-4 text-fuchsia-400" />
            </div>
            <div>
              <p className="text-xs text-white/50">Growth</p>
              <p className="text-sm font-medium text-fuchsia-400">
                {project.stats.growth}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className={`absolute ${
            viewMode === "list" ? "top-4 right-4" : "top-6 right-6"
          } flex gap-2`}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
          >
            <FiShare2 className="w-4 h-4 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBookmark}
            className={`p-2 rounded-xl backdrop-blur-sm transition-colors ${
              isBookmarked
                ? "bg-violet-500 text-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <FiBookmark className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Visit Site Button */}
        {project.url && (
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`absolute ${
              viewMode === "list" ? "bottom-4 right-4" : "bottom-6 right-6"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
            >
              <span>Visit Site</span>
              <FiExternalLink className="w-4 h-4" />
            </motion.button>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDisplay;
