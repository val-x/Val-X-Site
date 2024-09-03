import * as THREE from 'three';
import React, { useEffect, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { log } from 'three/examples/jsm/nodes/Nodes.js';

function DesktopModel(props) {
  const { nodes, materials } = useGLTF("/models/scene2.glb");

  // Load the texture
  const texture = useTexture(props.item.img);

  useEffect(() => {
    // Adjust texture properties if needed
    texture.encoding = THREE.sRGBEncoding;
    texture.flipY = false; // You might need to flip the texture vertically depending on your model

    console.log(props);
    
    Object.entries(materials).forEach(([key, material]) => {      
      if (props.item && props.item.color) {

        material.color = new THREE.Color(props.item.color[0]);
      }
      
      // Apply texture to specific materials
      // You'll need to identify which material should receive the texture
      if (key === "screen") { // Replace with your material name
        material.map = texture;

        // Enable transparency and set opacity to 100%
        material.transparent = true; // Allow the material to use transparency
        material.opacity = 100;       // Set opacity to 100%
      }
      
      material.needsUpdate = true;
    });
  }, [materials, props.item, texture]);
  
  return (
    <group {...props} dispose={null}>
      {Object.entries(nodes).map(([key, node]) => {
        if (node.type === "Mesh") {
          return (
            <mesh
              key={key}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={materials[node.material.name]}
              scale={0.015} // Adjust scale as needed
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