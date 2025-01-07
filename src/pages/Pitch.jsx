import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";
import {
  PresentationChartBarIcon,
  RocketLaunchIcon,
  CpuChipIcon,
  UserGroupIcon,
  ChartBarIcon,
  GlobeAltIcon,
  BoltIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const slides = [
  {
    id: 1,
    title: "VAL-X",
    subtitle: "The Future of Digital Innovation",
    content: {
      type: "hero",
      description: "Transforming Ideas into Digital Reality",
      highlights: [
        "Next-Generation Development",
        "AI-Powered Solutions",
        "Enterprise-Grade Architecture",
      ],
    },
    bgGradient: "from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20",
    icon: RocketLaunchIcon,
  },
  {
    id: 2,
    title: "The Problem",
    subtitle: "Current Market Challenges",
    content: {
      type: "stats",
      items: [
        {
          value: "73%",
          label: "Companies struggle with digital transformation",
        },
        { value: "62%", label: "Face technical debt issues" },
        { value: "48%", label: "Lack AI/ML capabilities" },
      ],
    },
    bgGradient: "from-red-500/20 via-orange-500/20 to-amber-500/20",
    icon: PresentationChartBarIcon,
  },
  {
    id: 3,
    title: "Our Solution",
    subtitle: "Comprehensive Digital Transformation",
    content: {
      type: "features",
      items: [
        {
          title: "AI-First Development",
          description: "Leveraging cutting-edge AI technologies",
        },
        {
          title: "Cloud-Native",
          description: "Scalable and resilient architecture",
        },
        {
          title: "Full-Stack Innovation",
          description: "End-to-end digital solutions",
        },
      ],
    },
    bgGradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    icon: CpuChipIcon,
  },
  {
    id: 4,
    title: "Market Opportunity",
    subtitle: "Growing Digital Demand",
    content: {
      type: "market",
      stats: [
        { value: "$3.3T", label: "Global IT Services Market by 2025" },
        { value: "16.5%", label: "Annual Growth Rate" },
        { value: "$500B", label: "AI Software Market" },
      ],
    },
    bgGradient: "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
    icon: GlobeAltIcon,
  },
  {
    id: 5,
    title: "Competitive Advantage",
    subtitle: "What Sets Us Apart",
    content: {
      type: "grid",
      items: [
        { title: "AI Integration", icon: BoltIcon },
        { title: "Scalable Solutions", icon: ChartBarIcon },
        { title: "Expert Team", icon: UserGroupIcon },
        { title: "Proven Track Record", icon: TrophyIcon },
      ],
    },
    bgGradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
    icon: TrophyIcon,
  },
];

const SlideContent = ({ content }) => {
  switch (content.type) {
    case "hero":
      return (
        <div className="space-y-8">
          <p className="text-2xl text-gray-300">{content.description}</p>
          <ul className="space-y-4">
            {content.highlights.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center text-xl text-gray-200"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 mr-4" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      );

    case "stats":
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-cyan-400 mb-2">
                {item.value}
              </div>
              <div className="text-gray-300">{item.label}</div>
            </motion.div>
          ))}
        </div>
      );

    case "features":
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-black/30 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      );

    case "market":
      return (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center bg-black/30 rounded-xl p-6"
              >
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case "grid":
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {content.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <item.icon className="w-12 h-12 text-cyan-400" />
              </div>
              <div className="text-gray-300">{item.title}</div>
            </motion.div>
          ))}
        </div>
      );

    default:
      return null;
  }
};

const Pitch = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      } else if (e.key === "f") {
        toggleFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener("keydown", handleKeyPress);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Get the current slide's icon component
  const SlideIcon = slides[currentSlide].icon;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div
        className={`pt-24 pb-16 px-4 ${isFullscreen ? "fixed inset-0 z-50 pt-0 pb-0 px-0" : ""}`}
      >
        <div
          className={`${
            isFullscreen ? "w-screen h-screen" : "max-w-7xl mx-auto"
          } relative min-h-[600px] flex items-center justify-center`}
        >
          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-white transition-colors"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className="w-6 h-6" />
            ) : (
              <ArrowsPointingOutIcon className="w-6 h-6" />
            )}
          </button>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-white transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-white transition-colors"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Slide Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={`
                ${isFullscreen ? "w-screen h-screen" : "w-full min-h-[600px]"}
                rounded-2xl bg-gradient-to-br ${slides[currentSlide].bgGradient} 
                backdrop-blur-xl border border-white/10
                ${isFullscreen ? "rounded-none border-0" : ""}
                overflow-auto
              `}
            >
              <div
                className={`
                h-full flex flex-col
                ${isFullscreen ? "p-16" : "p-12"}
              `}
              >
                {/* Slide Header */}
                <div className="flex items-center mb-8">
                  <SlideIcon
                    className={`
                    ${isFullscreen ? "w-16 h-16" : "w-12 h-12"}
                    text-cyan-400 mr-4
                  `}
                  />
                  <div>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`
                        font-bold text-white
                        ${isFullscreen ? "text-6xl md:text-7xl" : "text-4xl md:text-5xl"}
                      `}
                    >
                      {slides[currentSlide].title}
                    </motion.h1>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className={`
                        text-gray-300
                        ${isFullscreen ? "text-3xl" : "text-xl"}
                      `}
                    >
                      {slides[currentSlide].subtitle}
                    </motion.h2>
                  </div>
                </div>

                {/* Slide Content */}
                <div className="flex-1 flex items-center">
                  <SlideContent content={slides[currentSlide].content} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Progress */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-cyan-400"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        :fullscreen {
          background: black;
          width: 100vw;
          height: 100vh;
          padding: 0;
          margin: 0;
        }

        ::backdrop {
          background: black;
        }

        .fullscreen-slide {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
        }
      `}</style>

      {!isFullscreen && <Footer />}
    </div>
  );
};

export default Pitch;
