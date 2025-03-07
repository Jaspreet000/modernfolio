"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  parallax?: boolean;
  fadeIn?: boolean;
  isFirstSection?: boolean;
}

export default function Section({
  children,
  className = "",
  id,
  parallax = true,
  fadeIn = true,
  isFirstSection = false,
}: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    // Reduce parallax effect on mobile
    parallax ? ["10%", "-10%"] : ["0%", "0%"]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    fadeIn ? [0.5, 1, 1, 0.5] : [1, 1, 1, 1]
  );

  // Adjust padding based on whether it's the first section
  const baseClasses = `
    relative w-full 
    ${isFirstSection ? 'pt-20 sm:pt-24' : 'py-6 sm:py-10 md:py-16'} 
    ${!isFirstSection ? 'mt-4 sm:mt-6 md:mt-8' : ''}
    ${className}
  `;

  return (
    <section id={id} ref={ref} className={baseClasses}>
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-radial from-accent-purple/5 via-transparent to-transparent" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </section>
  );
}
