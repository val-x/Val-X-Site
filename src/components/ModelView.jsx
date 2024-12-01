import { useRef, Suspense, useState, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

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

const ModelView = () => {
  const groupRef = useRef(null);
  const containerRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

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
    // Initial animation
    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center+=100",
      },
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
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
  }, [autoRotate]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setAutoRotate(true);
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

      {/* Overlay Instructions */}
      <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-xl rounded-xl px-6 py-3 text-white/80 text-sm z-10 transform transition-all duration-300 hover:scale-105">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          <span>Interact with the model</span>
        </div>
        <div className="mt-2 text-xs text-white/60">
          Click and drag to rotate • Scroll to zoom
        </div>
      </div>

      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
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
                  title: "iPhone 15 Pro",
                  color: "#B8B8B8",
                  img: "/assets/images/hero.jpeg"
                }}
              />
            </Suspense>
          </group>
        </Float>
      </Canvas>
    </div>
  );
};

export default ModelView;