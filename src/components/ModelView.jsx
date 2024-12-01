import { useRef, Suspense } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from 'three';
import IPhone from './IPhone';
import Loader from './Loader';
import Lights from './Lights';

gsap.registerPlugin(ScrollTrigger);

const ModelView = () => {
  const groupRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8
    });
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[400px] rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm relative"
    >
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.3} />
        <Lights />

        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          target={new THREE.Vector3(0, 0, 0)}
        />

        <group ref={groupRef} position={[0, 0, 0]}>
          <Suspense fallback={<Loader />}>
            <IPhone 
              scale={[15, 15, 15]}
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
      </Canvas>
    </div>
  );
};

export default ModelView;