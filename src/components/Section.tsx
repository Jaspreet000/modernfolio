"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  parallax?: boolean;
  fadeIn?: boolean;
}

export default function Section({
  children,
  className = "",
  id,
  parallax = true,
  fadeIn = true,
}: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    parallax ? ["20%", "-20%"] : ["0%", "0%"]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    fadeIn ? [0, 1, 1, 0] : [1, 1, 1, 1]
  );

  const baseClasses = `
    relative min-h-screen w-full py-16 md:py-24
    ${className}
  `;

  return (
    <section id={id} ref={ref} className={baseClasses}>
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 h-full w-full max-w-7xl mx-auto px-6"
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
