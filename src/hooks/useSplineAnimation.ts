import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

export function useSplineAnimation() {
  const splineRef = useRef<Application>();

  const onLoad = (splineApp: Application) => {
    splineRef.current = splineApp;
    startAnimation();
  };

  const startAnimation = () => {
    if (!splineRef.current) return;

    // Add continuous rotation animation
    const animate = () => {
      if (!splineRef.current) return;
      
      // Rotate the object slightly each frame
      const currentRotation = splineRef.current.getObjectByName('Scene')?.rotation;
      if (currentRotation) {
        currentRotation.y += 0.001; // Adjust speed as needed
      }

      // Request next frame
      requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();
  };

  return { onLoad };
} 