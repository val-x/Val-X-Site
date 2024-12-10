import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import IPhone from './IPhone';

const LoadingScreen = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="white" />
  </mesh>
);

class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Model Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      );
    }

    return this.props.children;
  }
}

const ModelView = ({ projects }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const groupRef = useRef();
  const zoomLevel = 6;
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    console.log('Current project:', projects[currentProjectIndex]);
    console.log('Image path:', projects[currentProjectIndex]?.image);
  }, [currentProjectIndex, projects]);

  // Add loading indicator
  const LoadingIndicator = () => (
    <mesh position={[0, 0, 0.1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="#1a1a1a" transparent opacity={0.5} />
    </mesh>
  );

  return (
    <div className="relative w-full h-screen">
      {/* Controls Panel - Outside Canvas */}
      <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-md rounded-xl p-4 border border-white/10">
        <div className="space-y-4">
          <h3 className="text-white/80 text-sm font-medium">Projects</h3>
          <div className="space-y-2">
            {projects.map((project, index) => (
              <button
                key={project.title}
                onClick={() => setCurrentProjectIndex(index)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                  currentProjectIndex === index
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5'
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Three.js Canvas */}
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ 
          position: [0, 0, 10],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        className="bg-black"
      >
        <color attach="background" args={['#000']} />
        <fog attach="fog" args={['#000', 5, 15]} />
        
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        
        {/* Background Effects */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          minDistance={5}
          maxDistance={20}
          target={[0, 0, 0]}
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
          <group ref={groupRef} position={[0, 0, 0]}>
            <Suspense fallback={<LoadingScreen />}>
              <ModelErrorBoundary>
                <IPhone 
                  scale={[0.30, 0.30, 0.30]}
                  position={[0, 0, 0]}
                  rotation={[0, 9, 0]}
                  item={{
                    title: projects[currentProjectIndex].title,
                    color: ["#B8B8B8"],
                    img: projects[currentProjectIndex].image,
                  }}
                  isExploding={isExploding}
                  onImageLoad={() => setImageLoading(false)}
                />
                {imageLoading && <LoadingIndicator />}
              </ModelErrorBoundary>
            </Suspense>
          </group>
        </Float>

        {/* Debug Helper */}
        {/* <axesHelper args={[5]} />
        <gridHelper args={[10, 10]} /> */}
      </Canvas>

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ModelView;