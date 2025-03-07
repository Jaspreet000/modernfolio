import { useEffect, useRef } from 'react';
import type { Application } from '@splinetool/runtime';

export const useSplineAnimation = () => {
  const splineRef = useRef<Application | null>(null);

  const onLoad = (spline: Application) => {
    splineRef.current = spline;
    console.log('Spline scene loaded successfully');
  };

  return {
    onLoad,
    splineRef
  };
};

export default useSplineAnimation; 