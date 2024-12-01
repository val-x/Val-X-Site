import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { memo, useState, useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: "Innovative Technology",
    description: "Leveraging cutting-edge technologies and frameworks to build future-proof solutions.",
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "Agile Development",
    description: "Iterative approach with continuous feedback and rapid delivery of business value.",
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    )
  },
  {
    title: "Scalable Solutions",
    description: "Building robust systems that grow seamlessly with your business needs.",
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: "Security First",
    description: "Implementing industry-leading security practices to protect your data and users.",
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

const stats = [
  { value: "99.9%", label: "Uptime" },
  { value: "45%", label: "Faster Development" },
  { value: "80%", label: "Cost Reduction" },
  { value: "24/7", label: "Support" }
];

const projects = [
  {
    name: "IHS Ray",
    url: "https://www.ihsray.com/",
    image: "https://m.media-amazon.com/images/I/818ff7KhYIL._AC_UY1100_.jpg",
    description: "IHS Ray is an eCommerce platform offering a wide range of family wear for men, women, and kids, focusing on quality and style."
  },
  {
    name: "Kera Cabs",
    url: "https://keracabs.com/",
    image: "https://keracabs.com/home/img/bg/2.webp",
    description: "Kera Cabs provides reliable and efficient transportation services, ensuring a comfortable travel experience for all customers."
  },
  {
    name: "AAP Construction",
    url: "https://aapconstruction.in/",
    image: "https://as2.ftcdn.net/v2/jpg/02/01/96/59/1000_F_201965916_Sywvqm6bcX9Mv9lo10gHlBlaBpkLti1B.jpg",
    description: "AAP Construction specializes in high-quality construction services, focusing on residential and commercial projects with a commitment to excellence."
  },
  {
    name: "Bonder Connect",
    url: "https://bonderconnect.com/",
    image: "https://bonderconnect.com/assets/images/11.png",
    description: "Bonder Connect is a platform that connects businesses with reliable bonding solutions, enhancing operational efficiency and trust."
  },
  {
    name: "Amaze Tech Global",
    url: "https://amazetechglobal.com/",
    image: "https://ionexchangeglobal.com/app/uploads/2021/11/deminiralizer.jpg",
    description: "Amaze Tech Global is a pioneer in water treatment solutions in India, boasting a strong international presence and commitment to sustainability."
  },
  {
    name: "Brew Box",
    url: "https://www.brewbox.co/",
    image: "https://www.brewbox.co/cdn/shop/files/AdventExternal_300x300_crop_center.png?v=1730739794",
    description: "Brew Box is a subscription service that delivers premium coffee and brewing equipment, catering to coffee enthusiasts everywhere."
  }
];

// Memoized components for better performance
const FeatureCard = memo(({ feature }) => (
  <div 
    className="feature-card group bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 hover:bg-gray-800/70 transition-all duration-300"
    role="article"
  >
    <div className="flex items-center gap-6">
      <div 
        className="flex-shrink-0 w-16 h-16 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors"
        aria-hidden="true"
      >
        {feature.icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {feature.title}
        </h3>
        <p className="text-gray-400">
          {feature.description}
        </p>
      </div>
    </div>
  </div>
));

const StatCard = memo(({ stat, index }) => (
  <div 
    className="stat-item text-center p-6 bg-blue-600/10 rounded-xl backdrop-blur-sm hover:bg-blue-600/20 transition-colors"
    role="article"
  >
    <div 
      className={`stat-value-${index} text-3xl md:text-4xl font-bold text-blue-400 mb-2`}
      aria-label={`${stat.value} ${stat.label}`}
    >
      {stat.value}
    </div>
    <div className="text-gray-400">
      {stat.label}
    </div>
  </div>
));

const ProjectCard = memo(({ project }) => (
  <a 
    href={project.url}
    target="_blank"
    rel="noopener noreferrer"
    className="project-card group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300"
    aria-label={`Visit ${project.name} project`}
  >
    <div className="aspect-video overflow-hidden">
      <img 
        src={project.image}
        alt={`${project.name} project screenshot`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
        {project.name}
      </h3>
      <p className="text-gray-400">
        {project.description}
      </p>
    </div>
  </a>
));

// Main component
const Features = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const projectsToShow = showAllProjects ? projects : projects.slice(0, 3);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Features animation - staggered entrance with scale
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-container",
          start: "top center+=100",
          toggleActions: "play none none reverse"
        },
        y: 100,
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: {
          amount: 0.6,
          ease: "power2.out"
        },
        ease: "elastic.out(1, 0.8)"
      });

      // Stats counter animation with floating effect
      stats.forEach((stat, index) => {
        const value = parseFloat(stat.value);
        if (!isNaN(value)) {
          // Counter animation
          gsap.from(`.stat-value-${index}`, {
            scrollTrigger: {
              trigger: ".stats-container",
              start: "top center+=100",
              toggleActions: "play none none reverse"
            },
            textContent: 0,
            duration: 2.5,
            snap: { textContent: 1 },
            ease: "power2.out"
          });

          // Floating animation
          gsap.to(`.stat-item:nth-child(${index + 1})`, {
            scrollTrigger: {
              trigger: ".stats-container",
              start: "top center+=100",
              toggleActions: "play none none reverse"
            },
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.2
          });
        }
      });

      // Projects animation with 3D effect
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".projects-container",
          start: "top center+=100",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        rotationY: 45,
        z: -100,
        duration: 1,
        stagger: {
          amount: 0.8,
          from: "start"
        },
        ease: "power3.out",
        transformOrigin: "center center"
      });

      // Continuous hover animation for project images
      gsap.to(".project-card img", {
        scale: 1.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          amount: 1,
          from: "random"
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Show More animation
  const handleShowMore = () => {
    setShowAllProjects(true);
    gsap.from(".project-card:nth-child(n+4)", {
      opacity: 0,
      rotationY: 45,
      z: -100,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      transformOrigin: "center center",
      clearProps: "transform" // Clean up transform after animation
    });
  };

  // Show Less animation
  const handleShowLess = () => {
    gsap.to(".project-card:nth-child(n+4)", {
      opacity: 0,
      rotationY: -45,
      z: -100,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.in",
      onComplete: () => setShowAllProjects(false)
    });
  };

  // Add hover animations for feature cards
  useEffect(() => {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(card.querySelector('svg'), {
          rotate: 360,
          duration: 0.5,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(card.querySelector('svg'), {
          rotate: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });
  }, []);

  return (
    <section 
      className="py-20 bg-gradient-to-b from-black to-gray-900"
      aria-label="Features and Projects"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine technical expertise with business acumen to deliver exceptional results
          </p>
        </div>

        <div className="features-container grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Projects Section */}
        <div className="projects-section">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our portfolio of successful client projects
            </p>
          </div>

          <div 
            className="projects-container"
            role="region"
            aria-label="Project showcase"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsToShow.map((project, index) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>

            {/* Show More/Less Button */}
            <div className="flex justify-center mt-12">
              <button
                onClick={showAllProjects ? handleShowLess : handleShowMore}
                className="group relative px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 overflow-hidden"
                aria-expanded={showAllProjects}
                aria-controls="projects-grid"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {showAllProjects ? 'Show Less' : 'Show More Projects'}
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      showAllProjects ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
                {/* Button hover effect */}
                <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Features)