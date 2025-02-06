import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../contexts/ModalContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);
  const location = useLocation();
  const { isModalActive } = useModal();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Showcase", path: "/showcase" },
  ];

  const appItems = [
    {
      label: "Chat",
      path: "https://chat.val-x.com",
      icon: `
        <g>
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" opacity="0.2"/>
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 11h-8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1zm0-4h-8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1zm-4 8h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1z"/>
        </g>`,
      bgColor: "from-cyan-400 to-cyan-600",
    },
    {
      label: "Community",
      // path: "/blog",
      path: "https://scale.val-x.com",
      icon: `
        <g>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.2"/>
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z"/>
        </g>`,
      bgColor: "from-violet-400 to-violet-600",
    },
    {
      label: "Learn",
      path: "/learn-with-us",
      icon: `
        <g>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.2"/>
          <path d="M12 3L4 9v12h16V9l-8-6zm6 16h-3v-6H9v6H6v-9l6-4.5 6 4.5v9z"/>
          <path d="M14 14.5V17h-4v-2.5c0-1.1.9-2 2-2s2 .9 2 2z"/>
        </g>`,
      bgColor: "from-fuchsia-400 to-fuchsia-600",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAppsOpen && !event.target.closest(".apps-menu")) {
        setIsAppsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAppsOpen]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  if (isModalActive) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/50 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="relative flex justify-between items-center px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold group perspective">
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 
              font-black tracking-tight"
            >
              VAL-X
            </span>
            <motion.div
              className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-400/20 via-violet-400/20 to-fuchsia-400/20 
                blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={item.path}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  hover:text-white group ${isActive(item.path) ? "text-white" : "text-gray-400"}`}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive(item.path) ? (
                  <motion.div
                    layoutId="navBackground"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 
                      rounded-full backdrop-blur-sm"
                    transition={{ type: "spring", bounce: 0.2 }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-white/0 rounded-full hover:bg-white/5 transition-colors duration-300" />
                )}
              </Link>
            </motion.div>
          ))}

          {/* Apps Menu Button */}
          <div className="relative apps-menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAppsOpen(!isAppsOpen)}
              className="relative ml-4 p-3 rounded-xl overflow-hidden group"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 
                backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 opacity-0 
                group-hover:opacity-20 blur-xl transition-opacity duration-300"
              />

              <div className="relative grid grid-cols-2 gap-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400"
                    initial={false}
                    animate={
                      isAppsOpen
                        ? { scale: [1, 1.2, 1], rotate: 180 }
                        : { scale: 1, rotate: 0 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  />
                ))}
              </div>
            </motion.button>

            {/* Apps Dropdown Menu */}
            <AnimatePresence>
              {isAppsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
                  className="absolute right-0 mt-4 w-[300px] p-6 rounded-2xl bg-black/90 backdrop-blur-2xl 
                    border border-white/10 shadow-2xl shadow-cyan-500/20"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-fuchsia-500/5" />
                    <div className="absolute -inset-[1px] bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20" />
                    <motion.div
                      className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      animate={{
                        x: ["0%", "200%"],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>

                  {/* Content Container */}
                  <div className="relative">
                    {/* Header */}
                    <div className="mb-4 text-center">
                      <h3
                        className="text-base font-semibold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 
                        bg-clip-text text-transparent"
                      >
                        Quick Access
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Select an app to get started
                      </p>
                    </div>

                    {/* Apps Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      {appItems.map((app, index) => (
                        <motion.div
                          key={app.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: index * 0.1,
                            duration: 0.4,
                            type: "spring",
                            stiffness: 100,
                          }}
                        >
                          <Link
                            to={app.path}
                            className="group flex flex-col items-center relative"
                          >
                            {/* Icon Container with Hover Effects */}
                            <div className="relative">
                              <div
                                className={`w-16 h-16 rounded-xl flex items-center justify-center 
                                bg-gradient-to-br ${app.bgColor} group-hover:scale-105 transform transition-all duration-300
                                border border-white/10 overflow-hidden`}
                              >
                                {/* Animated Border */}
                                <motion.div
                                  className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 opacity-0 
                                    group-hover:opacity-100 transition-opacity duration-300 z-0"
                                  animate={{
                                    backgroundPosition: ["0% 0%", "100% 100%"],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                  }}
                                />

                                {/* Icon Background with Animated Gradient */}
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/50 z-10"
                                  animate={{
                                    background: [
                                      "linear-gradient(45deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 100%)",
                                      "linear-gradient(225deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 100%)",
                                    ],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                  }}
                                />

                                {/* Icon with Floating Animation */}
                                <motion.svg
                                  className="relative w-8 h-8 text-white z-20"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  animate={{
                                    y: [0, -2, 0],
                                    scale: [1, 1.05, 1],
                                  }}
                                  transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                  dangerouslySetInnerHTML={{ __html: app.icon }}
                                />

                                {/* Enhanced Glow Effect */}
                                <motion.div
                                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${app.bgColor} opacity-0 
                                    group-hover:opacity-40 blur-xl transition-opacity duration-300 -z-10`}
                                  animate={{
                                    scale: [1, 1.1, 1],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                />
                              </div>
                            </div>

                            {/* Label with Gradient on Hover */}
                            <div className="mt-2 relative">
                              <span
                                className="text-xs font-medium text-gray-300 group-hover:text-transparent 
                                group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-violet-400 
                                group-hover:to-fuchsia-400 group-hover:bg-clip-text transition-all duration-300"
                              >
                                {app.label}
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden relative z-10 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full"
            />
            <motion.span
              animate={
                isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
              className="block h-0.5 w-6 bg-gradient-to-r from-fuchsia-400 to-cyan-400 rounded-full"
            />
          </div>
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 md:hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`block px-4 py-2 rounded-lg text-base font-medium transition-colors
                        ${
                          isActive(item.path)
                            ? "bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 text-white"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Apps Grid */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {appItems.map((app, index) => (
                    <motion.div
                      key={app.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.3,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <Link
                        to={app.path}
                        className="group flex flex-col items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {/* Icon Container */}
                        <div className="relative">
                          <div
                            className={`w-14 h-14 rounded-xl flex items-center justify-center 
                            bg-gradient-to-br ${app.bgColor} group-hover:scale-105 transform transition-all duration-300
                            border border-white/10 overflow-hidden`}
                          >
                            {/* Animated Border */}
                            <motion.div
                              className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 opacity-0 
                                group-hover:opacity-100 transition-opacity duration-300 z-0"
                              animate={{
                                backgroundPosition: ["0% 0%", "100% 100%"],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                              }}
                            />

                            {/* Icon Background */}
                            <div className="absolute inset-[1px] rounded-lg bg-gradient-to-br from-black/90 to-black/50 z-10" />

                            {/* Icon */}
                            <motion.svg
                              className="relative w-7 h-7 text-white z-20"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              animate={{
                                y: [0, -2, 0],
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              dangerouslySetInnerHTML={{ __html: app.icon }}
                            />

                            {/* Glow Effect */}
                            <motion.div
                              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${app.bgColor} opacity-0 
                                group-hover:opacity-30 blur-lg transition-opacity duration-300 -z-10`}
                              animate={{
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          </div>
                        </div>

                        {/* Label */}
                        <span
                          className="mt-2 text-xs font-medium text-gray-300 group-hover:text-transparent 
                          group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-violet-400 
                          group-hover:to-fuchsia-400 group-hover:bg-clip-text transition-all duration-300"
                        >
                          {app.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
