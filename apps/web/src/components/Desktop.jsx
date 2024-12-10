import * as THREE from 'three';
import React, { useEffect, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function DesktopModel(props) {
  const { nodes, materials } = useGLTF("/models/scene2.glb");
  const groupRef = useRef();

  // Load the texture
  const texture = useTexture(props.item.img);

  useEffect(() => {
    // Texture and material setup
    texture.encoding = THREE.sRGBEncoding;
    texture.flipY = false;
    
    Object.entries(materials).forEach(([key, material]) => {      
      if (props.item && props.item.color) {
        material.color = new THREE.Color(props.item.color[0]);
      }
      
      if (key === "screen") {
        material.map = texture;
        material.transparent = true;
        material.opacity = 1;
      }
      
      material.needsUpdate = true;
    });
  }, [materials, props.item, texture]);

  useFrame(() => {
    if (groupRef.current) {
      // Rotate the model to face the screen towards the camera
      groupRef.current.rotation.y = Math.PI; // Rotate 180 degrees around Y-axis
      groupRef.current.rotation.x = -Math.PI / 24; // Slight tilt for perspective
      
      // Adjust position to center the screen
      groupRef.current.position.set(0, -0.3, 0); // Move up slightly
    }
  });
  
  return (
    <group ref={groupRef} {...props} dispose={null}>
      {Object.entries(nodes).map(([key, node]) => {
        if (node.type === "Mesh") {
          return (
            <mesh
              key={key}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={materials[node.material.name]}
              scale={0.013} // Slightly reduced scale for better fit
            />
          );
        }
        return null;
      })}
    </group>
  );
}

export default DesktopModel;

useGLTF.preload("/models/scene2.glb");