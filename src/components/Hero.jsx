import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Transforming Ideas",
      subtitle: "Into Digital Reality",
      description: "We craft innovative software solutions that empower businesses to thrive in the digital age",
      image: "/assets/videos/dhdhd.mp4",
      isVideo: true
    },
    {
      title: "Building The Future",
      subtitle: "With Technology",
      description: "Cutting-edge solutions for modern business challenges",
      image: "/assets/videos/explore.mp4",
      isVideo: true
    },
    {
      title: "Innovation Meets",
      subtitle: "Excellence",
      description: "Expert teams delivering exceptional results",
      image: "/assets/videos/ddd.mp4",
      isVideo: true
    }
  ];

  useGSAP(() => {
    // Initial animations
    gsap.from('#hero-title', { 
      opacity: 0, 
      y: 100,
      duration: 1,
      delay: 0.5
    });
    gsap.from('#hero-subtitle', { 
      opacity: 0, 
      y: 50,
      duration: 1,
      delay: 0.8
    });
    gsap.from('#hero-description', { 
      opacity: 0, 
      y: 30,
      duration: 1,
      delay: 1.1
    });
    gsap.from('#hero-cta', { 
      opacity: 0, 
      y: 30,
      duration: 1,
      delay: 1.4
    });
  }, []);

  useEffect(() => {
    // Auto-advance slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Slide transition animation
    gsap.to('.slide-content', {
      opacity: 0,
      y: 50,
      duration: 0.5,
      onComplete: () => {
        gsap.to('.slide-content', {
          opacity: 1,
          y: 0,
          duration: 0.5
        });
      }
    });
  }, [currentSlide]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {slides[currentSlide].isVideo ? (
          <video
            key={slides[currentSlide].image}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={slides[currentSlide].image} type="video/mp4" />
          </video>
        ) : (
          <img
            src={slides[currentSlide].image}
            alt="Hero"
            className="w-full h-full object-cover"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="slide-content">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
            <span id="hero-title" className="block">
              {slides[currentSlide].title}
            </span>
            <span id="hero-subtitle" className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {slides[currentSlide].subtitle}
            </span>
          </h1>
          <p id="hero-description" className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            {slides[currentSlide].description}
          </p>
          <div id="hero-cta" className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/get-started"
              className="px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Your Project
            </Link>
            <Link 
              to="/solutions"
              className="px-8 py-4 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Explore Solutions
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-blue-500 w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 text-white/50 flex items-center gap-2 text-sm">
        <div className="w-8 h-8 border-2 border-white/20 rounded-full flex items-center justify-center animate-bounce">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;