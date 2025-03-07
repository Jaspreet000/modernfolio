import { useEffect, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
}

const Parallax = ({ children, speed = 0.5 }: ParallaxProps) => {
  const [offset, setOffset] = useState(0);

  const handleScroll = () => {
    setOffset(window.scrollY * speed);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div style={{ y: offset }}>
      {children}
    </motion.div>
  );
};

export default Parallax; 