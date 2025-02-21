"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense, useState } from "react";
import DefaultModel from "./DefaultModel";

interface Scene3DProps {
  modelPath?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

function Model({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: Scene3DProps) {
  const [modelError, setModelError] = useState(false);

  if (!modelPath || modelError) {
    return <DefaultModel />;
  }

  try {
    const { scene } = useGLTF(modelPath);
    return (
      <primitive
        object={scene}
        scale={scale}
        position={position}
        rotation={rotation}
        onError={() => setModelError(true)}
      />
    );
  } catch (error) {
    console.warn(
      `Could not load model ${modelPath}, falling back to default model`
    );
    return <DefaultModel />;
  }
}

export default function Scene3D(props: Scene3DProps) {
  return (
    <div className="w-full h-full min-h-[400px] relative group">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-primary/50 pointer-events-none z-10" />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} color="#FF2E93" intensity={1} />
          <pointLight position={[10, -10, 5]} color="#6B2FD9" intensity={1} />

          {/* Model */}
          <Model {...props} />

          {/* Environment and Controls */}
          <Environment preset="city" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={1}
          />

          {/* Ground Reflection */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial
              color="#000000"
              metalness={0.8}
              roughness={0.2}
              opacity={0.3}
              transparent
            />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
