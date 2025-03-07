import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';

function MovingStars() {
  const starsRef = useRef<any>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.1;
    }
  });

  return <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade ref={starsRef} />;
}

function BackgroundElements() {
  return (
    <>
      <MovingStars />
      <Float
        speed={2}
        rotationIntensity={2}
        floatIntensity={1}
        floatingRange={[-0.1, 0.1]}
      >
        <mesh>
          <torusGeometry args={[8, 0.5, 16, 100]} />
          <meshStandardMaterial color="#6B2FD9" opacity={0.1} transparent />
        </mesh>
      </Float>
    </>
  );
}

export default function ThreeBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <ambientLight intensity={0.3} />
      <BackgroundElements />
    </Canvas>
  );
} 