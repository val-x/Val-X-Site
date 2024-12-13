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
import { ErrorBoundary } from './ErrorBoundary';

// Enhanced loading screen with 3D elements
const LoadingScreen = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4">
        {/* Modern loading animation */}
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          <div 
            className="absolute inset-0 rounded-full border-4 border-t-violet-500 border-r-transparent border-b-cyan-500 border-l-transparent animate-spin"
            style={{ animationDuration: '2s' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-cyan-500">
              {progress.toFixed(0)}%
            </span>
          </div>
        </div>
        <div className="text-white/80 font-medium animate-pulse">
          Loading Experience...
        </div>
      </div>
    </Html>
  );
};

// Update the ProjectDetails component
const ProjectDetails = ({ project, position = [0, 2, 0] }) => {
  if (!project) return null;

  return (
    <group position={position}>
      <Html center transform>
        <div className="px-4 py-2 rounded-lg bg-black/50 backdrop-blur-md text-center min-w-[200px]">
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
            {project.title}
          </h3>
          <p className="text-sm text-white/70 mt-1">
            {project.tech}
          </p>
          <div className="mt-2 flex justify-center gap-2">
            {Object.entries(project.stats).map(([key, value]) => (
              <div key={key} className="text-xs">
                <span className="text-white/50">{key}: </span>
                <span className="text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
};

// New component for interactive hotspots
const Hotspot = ({ position, label, onClick }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? "#60a5fa" : "#fff"}
          emissive={hovered ? "#60a5fa" : "#fff"}
          emissiveIntensity={0.5}
        />
      </mesh>
      {hovered && (
        <Html center>
          <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md text-white text-sm whitespace-nowrap">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
};

// Update the CanvasErrorBoundary component
const CanvasErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary>
      <div className="relative w-full h-full">
        {children}
      </div>
    </ErrorBoundary>
  );
};

// Update camera position for better visibility
const ModelView = ({ projects }) => {
  const groupRef = useRef(null);
  const containerRef = useRef(null);
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [cameraPosition] = useState([0, 0, 12]); // Move camera further back
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewMode, setViewMode] = useState('default');

  // Update materials with better visibility
  const [materials] = useState({
    body: new THREE.MeshPhysicalMaterial({
      color: '#2a2a2a', // Slightly lighter color
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2
    })
  });

  // Animation sequences
  useGSAP(() => {
    if (!groupRef.current) return;

    // Entrance animation
    gsap.from(groupRef.current.position, {
      y: -10,
      duration: 2,
      ease: "elastic.out(1, 0.5)"
    });

    gsap.from(groupRef.current.rotation, {
      y: Math.PI * 2,
      duration: 2,
      ease: "power3.out"
    });

    // Continuous floating animation
    gsap.to(groupRef.current.position, {
      y: '+=0.2',
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }, []);

  // Handle project transitions with screen update
  const transitionToProject = (project) => {
    if (!groupRef.current) return;

    setAutoRotate(false);
    
    // Update current project
    setCurrentProject(project);

    // Animate the model
    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.5,
      ease: "power3.inOut"
    });

    // Update materials with project theme
    gsap.to(materials.body.color, {
      r: 0.16, // #2a2a2a
      g: 0.16,
      b: 0.16,
      duration: 1
    });
  };

  // Enhanced controls UI
  const Controls = () => (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
      <div className="flex gap-2 bg-white/5 backdrop-blur-2xl rounded-full p-1 border border-white/10">
        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => transitionToProject(project)}
            className={`
              px-4 py-2 rounded-full transition-all duration-300
              ${currentProject.id === project.id 
                ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white'
                : 'text-white/70 hover:bg-white/10'
              }
            `}
          >
            {project.title}
          </button>
        ))}
      </div>
    </div>
  );

  // Add new state for view controls
  const [showSpecs, setShowSpecs] = useState(false);

  // Add new controls for view modes
  const ViewControls = () => (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
      <div className="flex gap-2 bg-white/5 backdrop-blur-2xl rounded-xl p-2 border border-white/10">
        <button
          onClick={() => setViewMode('default')}
          className={`p-2 rounded-lg transition-all duration-300 ${
            viewMode === 'default' ? 'bg-violet-500/20 text-violet-400' : 'text-white/70 hover:bg-white/10'
          }`}
          title="Default View"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
        <button
          onClick={() => setViewMode('explode')}
          className={`p-2 rounded-lg transition-all duration-300 ${
            viewMode === 'explode' ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/70 hover:bg-white/10'
          }`}
          title="Explode View"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
        <button
          onClick={() => setShowSpecs(!showSpecs)}
          className={`p-2 rounded-lg transition-all duration-300 ${
            showSpecs ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'text-white/70 hover:bg-white/10'
          }`}
          title="Show Specifications"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </button>
      </div>
    </div>
  );

  // Add specifications panel
  const SpecificationsPanel = () => (
    <div className={`
      absolute left-4 top-4 w-64 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 
      transform transition-all duration-300 ${showSpecs ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
    `}>
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-medium text-white">{currentProject.title} Specs</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-white/60">Display</span>
            <span className="text-white">6.7" OLED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Processor</span>
            <span className="text-white">A16 Bionic</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Camera</span>
            <span className="text-white">48MP Main</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Battery</span>
            <span className="text-white">4323 mAh</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-radial from-violet-500/20 via-transparent to-cyan-500/20 animate-pulse-slow" />
      
      <ViewControls />
      <SpecificationsPanel />
      <Controls />

      <CanvasErrorBoundary>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: cameraPosition, fov: 35 }} // Narrower FOV for better perspective
          onCreated={({ gl }) => {
            gl.setClearColor('#000000');
            gl.domElement.addEventListener('webglcontextlost', (event) => {
              event.preventDefault();
              setTimeout(() => gl.forceContextRestore(), 1000);
            });
          }}
        >
          <color attach="background" args={['#000']} />
          <fog attach="fog" args={['#000', 10, 20]} /> // Adjust fog distance
          
          {/* Improved lighting setup */}
          <ambientLight intensity={1} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, -5, -5]} intensity={1} />
          <pointLight position={[0, 2, 0]} intensity={1} color="#fff" />
          <spotLight
            position={[0, 5, 0]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            castShadow
          />

          <Environment preset="city" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
            maxDistance={15}
            minDistance={8}
          />

          <Float
            speed={1}
            rotationIntensity={0.2}
            floatIntensity={0.2}
          >
            <group ref={groupRef}>
              <Suspense fallback={<LoadingScreen />}>
                <IPhone
                  scale={[12, 12, 12]}  // Adjusted scale
                  rotation={[0.1, -Math.PI / 4, 0]}  // Slight tilt for better view
                  position={[0, 0, 0]}
                  materials={materials}
                  explodeView={viewMode === 'explode'}
                  project={currentProject}
                />
                {currentProject && (
                  <Html
                    position={[0, 2, 0]}
                    center
                    className="pointer-events-none"
                  >
                    <div className="px-4 py-2 rounded-lg bg-black/50 backdrop-blur-md text-center min-w-[200px]">
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
                        {currentProject.title}
                      </h3>
                      <p className="text-sm text-white/70 mt-1">
                        {currentProject.tech}
                      </p>
                    </div>
                  </Html>
                )}
                
                {currentProject && viewMode === 'default' && (
                  <>
                    <Hotspot
                      position={[0.3, 0.3, 0]}
                      label="Screen Technology"
                      onClick={() => console.log("Screen info")}
                    />
                    <Hotspot
                      position={[-0.3, 0.3, 0]}
                      label="Camera System"
                      onClick={() => console.log("Camera info")}
                    />
                    <Hotspot
                      position={[0.3, -0.3, 0]}
                      label="Face ID"
                      onClick={() => console.log("Face ID info")}
                    />
                    <Hotspot
                      position={[-0.3, -0.3, 0]}
                      label="Battery"
                      onClick={() => console.log("Battery info")}
                    />
                  </>
                )}
              </Suspense>
            </group>
          </Float>
        </Canvas>
      </CanvasErrorBoundary>

      {/* Wrap Suspense and model content in ErrorBoundary */}
      <ErrorBoundary>
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <LoadingScreen />
          </div>
        }>
          {/* Model content is now handled by Canvas */}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ModelView;