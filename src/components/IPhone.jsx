/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: polyman (https://sketchfab.com/Polyman_3D)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/apple-iphone-15-pro-max-black-df17520841214c1792fb8a44c6783ee7
Title: Apple iPhone 15 Pro Max Black
*/

import * as THREE from 'three';
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useSpring, animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

function Model(props) {
  const { nodes, materials } = useGLTF("/models/scene.glb");
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Keep only screen ref
  const screenRef = useRef();
  
  // Screen texture handling
  const [currentTexture, setCurrentTexture] = useState(null);
  
  useEffect(() => {
    const texture = new THREE.TextureLoader().load(props.item.img);
    texture.encoding = THREE.sRGBEncoding;
    texture.flipY = false;
    
    // Add fade transition
    gsap.to(currentTexture || {}, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentTexture(texture);
        gsap.to(texture, {
          opacity: 1,
          duration: 0.3
        });
      }
    });
  }, [props.item.img]);

  // Basic material updates
  useEffect(() => {
    Object.entries(materials).forEach(([key, material]) => {
      if (
        key !== "zFdeDaGNRwzccye" &&
        key !== "ujsvqBWRMnqdwPx" &&
        key !== "hUlRcbieVuIiOXG" &&
        key !== "jlzuBkUzuJqgiAK" &&
        key !== "xNrofRCqOXXHVZt"
      ) {
        material.color = new THREE.Color(props.item.color[0]);
      }
      material.needsUpdate = true;
    });
  }, [materials, props.item]);

  // Simple hover effects for screen
  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  // Screen animation spring
  const screenSpring = useSpring({
    scale: hovered ? 1.02 : 1,
    config: { tension: 300, friction: 10 }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Screen Assembly */}
      <animated.group 
        ref={screenRef}
        scale={screenSpring.scale}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.xXDHkMplTIDAXLN.geometry}
        >
          <meshStandardMaterial
            map={currentTexture}
            roughness={0.2}
            metalness={0.8}
            envMapIntensity={1.5}
            emissive={new THREE.Color('#ffffff')}
            emissiveIntensity={0.2}
            transparent={true}
            opacity={1}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      </animated.group>

      {/* Static Parts */}
      {Object.entries(nodes).map(([key, node]) => {
        if (key !== "xXDHkMplTIDAXLN" && node.geometry) {
          return (
            <mesh
              key={key}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={materials[node.material?.name]}
              scale={0.01}
            />
          );
        }
        return null;
      })}
    </group>
  );
}

export default Model;

useGLTF.preload("/models/scene.glb");
