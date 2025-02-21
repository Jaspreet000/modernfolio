import { useRef, useState, useEffect } from 'react';
import { useSpring } from 'framer-motion';

interface UseMagneticEffectProps {
  distance?: number;
  stiffness?: number;
  damping?: number;
}

export function useMagneticEffect({
  distance = 20,
  stiffness = 150,
  damping = 15,
}: UseMagneticEffectProps = {}) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping, stiffness };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const newX = (e.clientX - centerX) / rect.width * distance;
      const newY = (e.clientY - centerY) / rect.height * distance;

      setPosition({ x: newX, y: newY });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [distance]);

  return { ref, x, y };
} 