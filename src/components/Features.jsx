import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { memo, useState, useRef, useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: "Innovative Technology",
    description: "Pioneering cutting-edge solutions that shape the future of digital transformation.",
    icon: "💡",
    color: "from-[#FF3CAC] via-[#784BA0] to-[#2B86C5]"
  },
  {
    title: "Agile Development",
    description: "Swift, iterative development cycles that adapt to your evolving needs.",
    icon: "⚡️",
    color: "from-[#FA8BFF] via-[#2BD2FF] to-[#2BFF88]"
  },
  {
    title: "Scalable Solutions",
    description: "Future-proof architecture that grows seamlessly with your business.",
    icon: "🚀",
    color: "from-[#21D4FD] via-[#2152FF] to-[#B721FF]"
  },
  {
    title: "Security First",
    description: "Enterprise-grade security protecting your valuable digital assets.",
    icon: "🛡️",
    color: "from-[#08AEEA] via-[#2AF598] to-[#FF6B6B]"
  }
];

const projects = [
  {
    name: "IHS Ray",
    category: "E-Commerce",
    url: "https://www.ihsray.com/",
    image: "https://m.media-amazon.com/images/I/818ff7KhYIL._AC_UY1100_.jpg",
    stats: { users: "50K+", growth: "125%", rating: "4.9" }
  },
  {
    name: "Kera Cabs",
    category: "Transportation",
    url: "https://keracabs.com/",
    image: "https://keracabs.com/home/img/bg/2.webp",
    stats: { users: "25K+", growth: "85%", rating: "4.7" }
  },
  {
    name: "AAP Construction",
    category: "Construction",
    url: "https://aapconstruction.in/",
    image: "https://as2.ftcdn.net/v2/jpg/02/01/96/59/1000_F_201965916_Sywvqm6bcX9Mv9lo10gHlBlaBpkLti1B.jpg",
    stats: { users: "10K+", growth: "95%", rating: "4.8" }
  },
  {
    name: "Bonder Connect",
    category: "Business",
    url: "https://bonderconnect.com/",
    image: "https://bonderconnect.com/assets/images/11.png",
    stats: { users: "15K+", growth: "110%", rating: "4.6" }
  },
  {
    name: "Amaze Tech Global",
    category: "Technology",
    url: "https://amazetechglobal.com/",
    image: "https://ionexchangeglobal.com/app/uploads/2021/11/deminiralizer.jpg",
    stats: { users: "30K+", growth: "75%", rating: "4.8" }
  },
  {
    name: "Brew Box",
    category: "Food & Beverage",
    url: "https://www.brewbox.co/",
    image: "https://www.brewbox.co/cdn/shop/files/AdventExternal_300x300_crop_center.png?v=1730739794",
    stats: { users: "20K+", growth: "150%", rating: "4.9" }
  }
];

// New sections data
const successStories = [
  {
    title: "From Idea to IPO",
    company: "TechFlow Solutions",
    description: "Started with our accelerator program and achieved unicorn status in 3 years.",
    metrics: {
      growth: "3000%",
      valuation: "$1.2B",
      timeframe: "36 months"
    },
    logo: "/logos/techflow.svg"
  },
  {
    title: "Market Expansion Success",
    company: "GlobalReach",
    description: "Expanded to 15 countries with our international scaling program.",
    metrics: {
      markets: "15+",
      revenue: "10x",
      timeframe: "24 months"
    },
    logo: "/logos/globalreach.svg"
  }
];

const techStack = {
  frontend: {
    title: "Frontend Technologies",
    icon: "🎨",
    tools: ["React", "Next.js", "Vue", "Angular", "Tailwind CSS"]
  },
  backend: {
    title: "Backend Technologies",
    icon: "⚙️",
    tools: ["Node.js", "Python", "Java", "Go", "Ruby"]
  },
  cloud: {
    title: "Cloud & DevOps",
    icon: "☁️",
    tools: ["AWS", "Azure", "GCP", "Docker", "Kubernetes"]
  }
};

const FeatureCard = memo(({ feature, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const icon = card.querySelector('.feature-icon');
    const content = card.querySelector('.feature-content');

    // Mouse move animation
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      gsap.to(card, {
        '--x': `${x * 100}%`,
        '--y': `${y * 100}%`,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Tilt effect
      const rotateX = (y - 0.5) * 10;
      const rotateY = (x - 0.5) * 10;

      gsap.to(card, {
        transform: `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`,
        duration: 0.3,
      });

      // Icon float effect
      gsap.to(icon, {
        x: (x - 0.5) * 15,
        y: (y - 0.5) * 15,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        '--x': '50%',
        '--y': '50%',
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        duration: 0.5,
      });
      gsap.to(icon, {
        x: 0,
        y: 0,
        duration: 0.5,
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`feature-card relative overflow-hidden rounded-2xl p-8 h-full
      border border-white/10 group transition-all duration-300
      hover:shadow-2xl hover:shadow-blue-500/20
      before:absolute before:inset-0 before:opacity-0 before:transition-opacity
      before:duration-300 group-hover:before:opacity-100
      cursor-pointer backdrop-blur-sm`}
      style={{
        background: `
          linear-gradient(to bottom right, ${feature.color}),
          radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            rgba(255,255,255,0.1) 0%,
            rgba(255,255,255,0) 50%
          )
        `,
      }}
    >
      {/* Animated background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Floating icon with glow effect */}
        <div className="feature-icon relative inline-block mb-6">
          <span className="text-5xl block transform transition-all duration-300 group-hover:scale-125 relative z-10">
            {feature.icon}
          </span>
          <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Content with slide-up animation */}
        <div className="feature-content transform transition-all duration-500">
          <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(to right, ${feature.color})`,
              }}>
            {feature.title}
          </h3>
          
          <p className="text-gray-100 leading-relaxed transform transition-all duration-500 group-hover:translate-y-0">
            {feature.description}
          </p>
        </div>
      </div>

      {/* Interactive particle effect on hover */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full blur-sm animate-float-1" />
          <div className="absolute top-1/4 right-0 w-2 h-2 bg-white rounded-full blur-sm animate-float-2" />
          <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-white rounded-full blur-sm animate-float-3" />
        </div>
      </div>
    </div>
  );
});

const ProjectCard = memo(({ project }) => (
  <div className="project-card relative group">
    <div className="relative overflow-hidden rounded-xl aspect-video">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
      <img 
        src={project.image}
        alt={project.name}
        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        {project.category && (
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm">
              {project.category}
            </span>
          </div>
        )}
        <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
        {project.stats && (
          <div className="flex gap-4 text-sm text-gray-100">
            {project.stats.users && <span>{project.stats.users} Users</span>}
            {project.stats.growth && <span>{project.stats.growth} Growth</span>}
            {project.stats.rating && <span>⭐️ {project.stats.rating}</span>}
          </div>
        )}
      </div>
    </div>
  </div>
));

const Features = () => {
  const [activeSection, setActiveSection] = useState('features');
  const containerRef = useRef(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for better control
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top center+=100",
          end: "bottom center",
          toggleActions: "play none none reverse"
        }
      });

      // Animate feature cards with stagger
      tl.fromTo(".feature-card", 
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: {
            amount: 0.8,
            from: "start"
          },
          clearProps: "all" // Important: clear properties after animation
        }
      );

      // Animate project cards after features
      tl.fromTo(".project-card", 
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: {
            amount: 0.6,
            from: "start"
          },
          clearProps: "all"
        },
        "-=0.2" // Slight overlap with previous animation
      );

      // Add hover animations for feature cards
      gsap.utils.toArray(".feature-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -5,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Add hover animations for project cards
      gsap.utils.toArray(".project-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -5,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Add animations for new sections
      const successTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".success-stories",
          start: "top center+=100",
          end: "bottom center",
          toggleActions: "play none none reverse"
        }
      });

      successTl.fromTo(".success-story-card", 
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.2,
          clearProps: "all"
        }
      );

      const techTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".tech-stack",
          start: "top center+=100",
          end: "bottom center",
          toggleActions: "play none none reverse"
        }
      });

      techTl.fromTo(".tech-category", 
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.2,
          clearProps: "all"
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-conic from-blue-500/40 via-purple-500/40 to-blue-500/40 blur-[100px] opacity-30" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-conic from-cyan-500/40 via-emerald-500/40 to-cyan-500/40 blur-[100px] opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="features-header text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            Elevate Your Digital Presence
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transform your ideas into reality with our cutting-edge solutions and expert team
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index}
            />
          ))}
        </div>

        {/* Projects Showcase */}
        <div className="projects-showcase">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            Featured Projects
          </h3>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>

          {/* See More/Show Less Button - Updated Styling */}
          {projects.length > 3 && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="relative inline-flex items-center justify-center px-8 py-3 
                  bg-gradient-to-r from-blue-500 to-purple-500
                  text-white font-medium rounded-full
                  transform transition-all duration-300
                  hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <span className="relative flex items-center space-x-2">
                  <span>{showAllProjects ? 'Show Less' : 'See More Projects'}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      showAllProjects ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
            </div>
          )}

          {/* Project Stats - Only shown when expanded */}
          {showAllProjects && (
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {projects.length}+
                </div>
                <div className="text-gray-400">Successful Projects</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  95%
                </div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                <div className="text-3xl font-bold text-pink-400 mb-2">
                  150K+
                </div>
                <div className="text-gray-400">Total Users</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                <div className="text-3xl font-bold text-indigo-400 mb-2">
                  4.8
                </div>
                <div className="text-gray-400">Average Rating</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(Features);