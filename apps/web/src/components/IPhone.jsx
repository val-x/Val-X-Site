import * as THREE from 'three';
import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

function Model(props) {
  const { nodes, materials } = useGLTF("/models/scene.glb");
  const groupRef = useRef();
  const screenRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [currentTexture, setCurrentTexture] = useState(null);

  // Debug logging
  useEffect(() => {
    console.log('Item props:', props.item);
    console.log('Attempting to load image:', props.item?.img);
  }, [props.item]);

  // Enhanced texture loading
  useEffect(() => {
    if (!props.item?.img) {
      console.warn('No image provided');
      return;
    }

    // Create texture loader
    const textureLoader = new THREE.TextureLoader();
    
    textureLoader.load(
      props.item.img,
      (texture) => {
        console.log('Texture loaded successfully');
        // Configure texture
        texture.encoding = THREE.sRGBEncoding;
        texture.flipY = true; // Changed to true to fix orientation
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;

        // Update material with new texture
        if (screenRef.current) {
          const material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0,
            metalness: 0,
            emissive: new THREE.Color('#ffffff'),
            emissiveMap: texture,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 1,
            side: THREE.DoubleSide
          });

          screenRef.current.material = material;
          setCurrentTexture(texture);

          // Fade in animation
          gsap.fromTo(material,
            { opacity: 0 },
            { 
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => props.onImageLoad?.()
            }
          );
        }
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );

    // Cleanup
    return () => {
      if (currentTexture) {
        currentTexture.dispose();
      }
    };
  }, [props.item?.img]);

  // Material updates for the phone body
  useEffect(() => {
    if (!materials || !props.item?.color) return;
    
    Object.entries(materials).forEach(([key, material]) => {
      if (
        key !== "zFdeDaGNRwzccye" &&
        key !== "ujsvqBWRMnqdwPx" &&
        key !== "hUlRcbieVuIiOXG" &&
        key !== "jlzuBkUzuJqgiAK" &&
        key !== "xNrofRCqOXXHVZt"
      ) {
        material.color = new THREE.Color(props.item.color[0]);
        material.needsUpdate = true;
      }
    });
  }, [materials, props.item?.color]);

  // Hover effects
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

  // Add debug logging for model loading
  useEffect(() => {
    console.log('Model nodes:', nodes);
    console.log('Model materials:', materials);
  }, [nodes, materials]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Screen */}
      <animated.group 
        scale={screenSpring.scale}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <mesh
          ref={screenRef}
          castShadow
          receiveShadow
          geometry={nodes.xXDHkMplTIDAXLN.geometry}
        >
          <meshStandardMaterial
            roughness={0}
            metalness={0}
            envMapIntensity={1}
            transparent={true}
            opacity={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      </animated.group>

      {/* Phone Body */}
      {Object.entries(nodes).map(([key, node]) => {
        if (key !== "xXDHkMplTIDAXLN" && node.geometry) {
          return (
            <mesh
              key={key}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={materials[node.material?.name]}
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
