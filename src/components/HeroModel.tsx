"use client";

import { useEffect } from "react";
import { useGLTF, Float, OrbitControls } from "@react-three/drei";

export function HeroModel() {
  const { scene } = useGLTF('/models/abstract1.glb', true);
  
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material.envMapIntensity = 1.5;
        child.material.needsUpdate = true;
        child.material.shadowSide = 2;
        child.material.metalness = 0.6;
        child.material.roughness = 0.2;
        child.material.emissiveIntensity = 0.4;
        child.frustumCulled = true;
        
        if (child.geometry) {
          child.geometry.computeBoundingSphere();
          child.geometry.computeBoundingBox();
        }
        
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    return () => {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.geometry?.dispose();
          child.material?.dispose();
        }
      });
    };
  }, [scene]);

  return (
    <>
      <Float
        speed={0.8}
        rotationIntensity={0.4}
        floatIntensity={0.3}
        floatingRange={[-0.1, 0.1]}
      >
        <primitive
          object={scene}
          position={[0, 0, 0]}
          scale={8}
          rotation={[0, Math.PI / 4, 0]}
        />
      </Float>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
        autoRotate
        autoRotateSpeed={0.3}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
} 