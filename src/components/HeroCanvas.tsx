"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense } from "react";
import { HeroModel } from "./HeroModel";  // You'll need to move HeroModel to a separate file

interface HeroCanvasProps {
  setIsModelLoaded: (loaded: boolean) => void;
  isMobile: boolean;
}

export default function HeroCanvas({ setIsModelLoaded, isMobile }: HeroCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 25], fov: 35, far: 1000 }}
      style={{ background: 'transparent' }}
      dpr={[1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 2)]}
      performance={{ min: 0.5 }}
      shadows={{
        enabled: true,
        type: THREE.PCFSoftShadowMap,
        autoUpdate: false,
        needsUpdate: true
      }}
      gl={{
        antialias: !isMobile,
        alpha: true,
        stencil: false,
        depth: true,
        powerPreference: 'high-performance',
        logarithmicDepthBuffer: true
      }}
      onCreated={({ gl, scene }) => {
        setIsModelLoaded(true);
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Optimize scene
        scene.matrixAutoUpdate = false;
        // Handle scene updates manually
        scene.traverse((obj) => {
          obj.matrixAutoUpdate = false;
          obj.updateMatrix();
        });
      }}
    >
      {/* Base lighting - optimized */}
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-near={1}
        color="#ffffff"
      />
      
      {/* Accent lighting - optimized */}
      <pointLight
        position={[-5, 5, 2]}
        intensity={0.8}
        color="#ff3366"
        distance={30}
        decay={1.5}
        castShadow={false}
      />
      <pointLight
        position={[5, -5, 2]}
        intensity={0.8}
        color="#00ffff"
        distance={30}
        decay={1.5}
      />
      <spotLight
        position={[0, 8, 4]}
        intensity={0.6}
        color="#9945ff"
        angle={0.3}
        penumbra={0.8}
        decay={1.5}
      />
      <spotLight
        position={[0, -8, 4]}
        intensity={0.6}
        color="#00ff9d"
        angle={0.3}
        penumbra={0.8}
        decay={1.5}
      />
      <pointLight
        position={[0, 0, -10]}
        intensity={0.5}
        color="#ffffff"
        distance={20}
        decay={2}
      />
      <HeroModel />
    </Canvas>
  );
} 