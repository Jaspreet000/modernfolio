import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/models/universal.glb');
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.6}
      floatIntensity={0.6}
      floatingRange={[-0.1, 0.1]}
    >
      <primitive 
        object={scene} 
        position={[-0.7, 0.7, 0]} 
        scale={[1.4, 1.4, 1.2]} 
        rotation={[(30 * Math.PI) / 180, (214 * Math.PI) / 180, (-5 * Math.PI) / 180]} 
      />
    </Float>
  );
}

export default function ThreeScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Model />
      <OrbitControls enableZoom={true} enablePan={false} />
    </Canvas>
  );
} 