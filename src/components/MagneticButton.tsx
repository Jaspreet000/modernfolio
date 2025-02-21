"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "filled" | "outlined";
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  variant = "filled",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = 20; // Maximum distance from center
    const newX = ((e.clientX - centerX) / rect.width) * distance;
    const newY = ((e.clientY - centerY) / rect.height) * distance;

    setPosition({ x: newX, y: newY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses = `
    relative px-6 py-3 rounded-full font-semibold transition-all duration-300
    ${
      variant === "filled"
        ? "bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:shadow-neon"
        : "border-2 border-accent-pink text-white hover:bg-accent-pink/10"
    }
    ${className}
  `;

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={baseClasses}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        style={{
          x: useTransform(x, (value) => value * -1),
          y: useTransform(y, (value) => value * -1),
        }}
        className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
      />
    </motion.button>
  );
}
