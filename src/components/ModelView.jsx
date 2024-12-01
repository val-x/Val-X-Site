import { useRef, Suspense, useState, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  useProgress,
  Html,
  Float,
  Stars
} from "@react-three/drei";
import * as THREE from 'three';
import IPhone from './IPhone';
import Lights from './Lights';

const LoadingScreen = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 border-4 border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin" />
        <p className="mt-4 text-white text-lg font-medium">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
};

const ModelView = ({ projects }) => {
  const groupRef = useRef(null);
  const containerRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(8);
  const [isExploding, setIsExploding] = useState(false);

  // Add new states for button interactions
  const [buttonStates, setButtonStates] = useState({
    rotate: true,
    explode: false
  });

  // Add state for project images
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  
  // Add project button styles state
  const [activeProject, setActiveProject] = useState(0);

  // Add animation state for project transitions
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle project selection with animation
  const handleProjectSelect = (index) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentProjectIndex(index);
    setActiveProject(index);

    // Reset transition state after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;
      setCursorPos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(() => {
    // Simple fade-in animation without scroll trigger
    gsap.from(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from([".control-button", ".instruction-panel"], {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.3
    });

    // Continuous rotation animation
    if (groupRef.current && autoRotate) {
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 25,
        repeat: -1,
        ease: "none"
      });
    }

    // Remove scroll-based rotation
    // Keep explosion animation
    if (isExploding && groupRef.current) {
      const parts = groupRef.current.children;
      parts.forEach((part, i) => {
        const randomX = (Math.random() - 0.5) * 3;
        const randomY = (Math.random() - 0.5) * 3;
        const randomZ = (Math.random() - 0.5) * 3;

        gsap.to(part.position, {
          x: randomX,
          y: randomY,
          z: randomZ,
          duration: 1,
          ease: "power2.out"
        });
      });
    } else if (groupRef.current) {
      // Reset positions
      groupRef.current.children.forEach(part => {
        gsap.to(part.position, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          ease: "power2.in"
        });
      });
    }
  }, [autoRotate, isExploding]);

  // Enhanced button handlers
  const handleRotateToggle = () => {
    setAutoRotate(!autoRotate);
    setButtonStates(prev => ({
      ...prev,
      rotate: !prev.rotate
    }));
  };

  const handleExplodeToggle = () => {
    setIsExploding(!isExploding);
    setButtonStates(prev => ({
      ...prev,
      explode: !prev.explode
    }));
    // Stop auto-rotation when exploding
    if (!isExploding) {
      setAutoRotate(false);
    }
  };

  const handleZoom = (direction) => {
    const newZoom = direction === 'in' 
      ? Math.min(12, zoomLevel + 1)
      : Math.max(4, zoomLevel - 1);
    
    gsap.to(containerRef.current, {
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => setZoomLevel(newZoom)
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setAutoRotate(buttonStates.rotate);
      }}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-gray-900/40 to-purple-900/20 backdrop-blur-sm rounded-2xl" />

      {/* Interactive Background Effect */}
      <div 
        className="absolute inset-0 opacity-50 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${(cursorPos.x + 1) * 50}% ${(cursorPos.y + 1) * 50}%, rgba(56, 189, 248, 0.1) 0%, rgba(0, 0, 0, 0) 60%)`
        }}
      />

      {/* Enhanced Instruction Panel */}
      <div className="instruction-panel absolute top-4 left-4 bg-black/30 backdrop-blur-xl rounded-xl px-6 py-3 text-white/80 text-sm z-10 transform transition-all duration-300 hover:scale-105">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          <span>Interact with the model</span>
        </div>
        <div className="mt-2 text-xs text-white/60 space-y-1">
          <p>• Click and drag to rotate</p>
          <p>• Scroll to zoom</p>
          <p>• Hover over parts for details</p>
          <p>• Double-click for part specs</p>
        </div>
      </div>

      {/* Enhanced Controls Overlay */}
      <div className="absolute bottom-4 left-4 z-10 flex space-x-4">
        <button
          onClick={handleRotateToggle}
          className={`control-button px-4 py-2 rounded-full text-white/80 transition-all duration-300 flex items-center space-x-2
            ${buttonStates.rotate ? 'bg-green-500/20 hover:bg-green-500/30' : 'bg-white/10 hover:bg-white/20'}`}
        >
          <svg className={`w-4 h-4 ${buttonStates.rotate ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{autoRotate ? 'Stop Rotation' : 'Auto Rotate'}</span>
        </button>
        <button
          onClick={handleExplodeToggle}
          className={`control-button px-4 py-2 rounded-full text-white/80 transition-all duration-300 flex items-center space-x-2
            ${buttonStates.explode ? 'bg-purple-500/20 hover:bg-purple-500/30' : 'bg-white/10 hover:bg-white/20'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>{isExploding ? 'Reset View' : 'Explode View'}</span>
        </button>
      </div>

      {/* Enhanced Zoom Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col space-y-2">
        <button
          onClick={() => handleZoom('in')}
          className="control-button bg-white/10 backdrop-blur-md p-2 rounded-full text-white/80 hover:bg-white/20 transition-all"
          disabled={zoomLevel >= 12}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="control-button bg-white/10 backdrop-blur-md p-2 rounded-full text-white/80 hover:bg-white/20 transition-all"
          disabled={zoomLevel <= 4}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>

      {/* Enhanced Project Navigation - Horizontal Layout */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Project Navigation Track */}
          <div className="relative">
            {/* Navigation Background */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10" />
            
            {/* Projects Scroll Container */}
            <div className="relative overflow-x-auto hide-scrollbar py-4 px-2">
              <div className="flex items-center gap-4 min-w-max mx-auto">
                {projects.map((project, index) => (
                  <button
                    key={index}
                    onClick={() => handleProjectSelect(index)}
                    className={`
                      group relative px-6 py-3 rounded-xl backdrop-blur-sm
                      transition-all duration-300 transform
                      ${activeProject === index 
                        ? `bg-gradient-to-r ${project.color} scale-105 shadow-lg` 
                        : 'bg-black/30 hover:bg-black/50'
                      }
                      ${isTransitioning ? 'pointer-events-none' : ''}
                      min-w-[200px]
                    `}
                  >
                    {/* Project Info */}
                    <div className="flex flex-col items-center">
                      <span className={`text-sm font-medium ${activeProject === index ? 'text-white' : 'text-white/80'}`}>
                        {project.title}
                      </span>
                      <span className="text-xs text-white/60">
                        {project.tech}
                      </span>
                    </div>

                    {/* Active Indicator */}
                    {activeProject === index && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                    )}

                    {/* Enhanced Hover Preview */}
                    <div className={`
                      absolute -top-32 left-1/2 -translate-x-1/2 
                      w-48 rounded-lg overflow-hidden 
                      opacity-0 group-hover:opacity-100 
                      transition-all duration-300
                      pointer-events-none
                      border border-white/10
                      shadow-xl
                      transform group-hover:-translate-y-2
                    `}>
                      <div className="relative aspect-video">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2 text-xs text-white">
                          {project.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add this CSS to hide scrollbar but keep functionality */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, zoomLevel], fov: 45 }}>
        <color attach="background" args={['#000']} />
        <fog attach="fog" args={['#000', 5, 15]} />
        <Environment preset="city" />
        
        <ambientLight intensity={0.5} />
        <Lights />
        
        {/* Background Effects */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          minDistance={4}
          maxDistance={12}
          target={new THREE.Vector3(0, 0, 0)}
          autoRotate={autoRotate && !hovered}
          autoRotateSpeed={0.5}
          onChange={() => setAutoRotate(false)}
        />

        <Float
          speed={1.5}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          floatingRange={[-.1, .1]}
        >
          <group ref={groupRef} position={[0, -0.5, 0]}>
            <Suspense fallback={<LoadingScreen />}>
              <IPhone 
                scale={[18, 18, 18]}
                position={[0, 0, 0]}
                rotation={[0, Math.PI / 2, 0]}
                item={{
                  title: projects[currentProjectIndex].title,
                  color: "#B8B8B8",
                  img: projects[currentProjectIndex].image
                }}
                isExploding={isExploding}
              />
            </Suspense>
          </group>
        </Float>
      </Canvas>
    </div>
  );
};

export default ModelView;