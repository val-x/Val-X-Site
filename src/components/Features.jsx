import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { memo, useState, useEffect, useRef } from 'react'

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

// Update ProjectCard with modern design
const ProjectCard = memo(({ project, isActive }) => (
  <div 
    className={`project-card flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] 
    bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden 
    transition-all duration-500 transform perspective-1000 
    ${isActive ? 'scale-100 rotate-0 translate-y-0' : 'scale-95 -rotate-2 translate-y-4 opacity-50'}
    hover:shadow-2xl hover:shadow-blue-500/20`}
    aria-label={`${project.name} project`}
  >
    <a 
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50 z-10" />
        <img 
          src={project.image}
          alt={`${project.name} project screenshot`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-blue-500/20 backdrop-blur-md px-3 py-1 rounded-full z-20">
          <span className="text-sm text-white font-medium">View Project</span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {project.name}
        </h3>
        <p className="text-gray-400 line-clamp-2">
          {project.description}
        </p>
      </div>
    </a>
  </div>
));

// Add Progress Indicator component
const ProgressIndicator = memo(({ total, current }) => (
  <div className="flex justify-center gap-2 mt-8">
    {Array.from({ length: total }).map((_, index) => (
      <div
        key={index}
        className={`h-1 rounded-full transition-all duration-300 ${
          index === current 
            ? 'w-8 bg-blue-500' 
            : 'w-2 bg-gray-700'
        }`}
      />
    ))}
  </div>
));

// Main component
const Features = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Features section heading animation
      gsap.from(".features-heading", {
        scrollTrigger: {
          trigger: ".features-heading",
          start: "top 85%",
          once: true
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Features cards animation with better timing
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-container",
          start: "top 85%",
          end: "bottom center",
          toggleActions: "play none none none",
          once: true,
          markers: false // Set to true for debugging
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: {
          each: 0.2,
          from: "start"
        },
        ease: "power2.out"
      });

      // Initialize the slider
      const slider = sliderRef.current;
      let startX;
      let scrollLeft;

      const handleDragStart = (e) => {
        setIsDragging(true);
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        scrollLeft = slider.scrollLeft;
      };

      const handleDragEnd = () => {
        setIsDragging(false);
      };

      const handleDragMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      };

      slider.addEventListener('mousedown', handleDragStart);
      slider.addEventListener('touchstart', handleDragStart);
      slider.addEventListener('mousemove', handleDragMove);
      slider.addEventListener('touchmove', handleDragMove);
      slider.addEventListener('mouseup', handleDragEnd);
      slider.addEventListener('touchend', handleDragEnd);
      slider.addEventListener('mouseleave', handleDragEnd);

      return () => {
        slider.removeEventListener('mousedown', handleDragStart);
        slider.removeEventListener('touchstart', handleDragStart);
        slider.removeEventListener('mousemove', handleDragMove);
        slider.removeEventListener('touchmove', handleDragMove);
        slider.removeEventListener('mouseup', handleDragEnd);
        slider.removeEventListener('touchend', handleDragEnd);
        slider.removeEventListener('mouseleave', handleDragEnd);
      };
    });

    return () => ctx.revert();
  }, [isDragging]);

  // Add visible slides calculation
  const getVisibleSlides = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const slideNext = () => {
    const slider = sliderRef.current;
    const slideWidth = slider.clientWidth;
    const visibleSlides = getVisibleSlides();
    gsap.to(slider, {
      scrollLeft: `+=${slideWidth / visibleSlides}`,
      duration: 0.7,
      ease: 'power2.out'
    });
    setCurrentSlide(prev => Math.min(prev + 1, projects.length - visibleSlides));
  };

  const slidePrev = () => {
    const slider = sliderRef.current;
    const slideWidth = slider.clientWidth;
    const visibleSlides = getVisibleSlides();
    gsap.to(slider, {
      scrollLeft: `-=${slideWidth / visibleSlides}`,
      duration: 0.7,
      ease: 'power2.out'
    });
    setCurrentSlide(prev => Math.max(prev - 1, 0));
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
        <div className="features-heading text-center mb-16">
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

        {/* Updated Projects Section */}
        <div className="projects-section relative py-16">
          <div className="projects-heading text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our portfolio of successful client projects
            </p>
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10" />

            <div 
              ref={sliderRef}
              className="projects-container overflow-x-scroll scrollbar-hide snap-x snap-mandatory flex gap-8 
              cursor-grab active:cursor-grabbing py-8 px-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {projects.map((project, index) => (
                <ProjectCard 
                  key={project.name} 
                  project={project} 
                  isActive={index === currentSlide}
                />
              ))}
            </div>

            {/* Updated Navigation Buttons */}
            <button
              onClick={slidePrev}
              disabled={currentSlide === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-500/10 hover:bg-blue-500/20 
              p-4 rounded-full text-white disabled:opacity-30 disabled:cursor-not-allowed z-20
              backdrop-blur-sm border border-blue-500/20 transition-all duration-300
              hover:scale-110"
              aria-label="Previous project"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={slideNext}
              disabled={currentSlide === projects.length - getVisibleSlides()}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500/10 hover:bg-blue-500/20 
              p-4 rounded-full text-white disabled:opacity-30 disabled:cursor-not-allowed z-20
              backdrop-blur-sm border border-blue-500/20 transition-all duration-300
              hover:scale-110"
              aria-label="Next project"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Progress Indicator */}
            <ProgressIndicator 
              total={projects.length - getVisibleSlides() + 1} 
              current={currentSlide} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Features)