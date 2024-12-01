import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = () => {
  useGSAP(() => {
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
    gsap.from('#hero-cta', { 
      opacity: 0, 
      y: 30,
      duration: 1,
      delay: 1.2
    });
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-full h-full">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent animate-pulse"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 
          id="hero-title"
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          Transforming Ideas Into
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {' '}Digital Reality
          </span>
        </h1>
        
        <p 
          id="hero-subtitle"
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          We craft innovative software solutions that empower businesses 
          to thrive in the digital age
        </p>

        <div 
          id="hero-cta"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-lg">
            Start Project
          </button>
          <button className="px-8 py-3 border border-white text-white rounded-full hover:bg-white/10 transition-colors text-lg">
            View Our Work
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-white"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero