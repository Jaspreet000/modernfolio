"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary z-50">
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-20 h-20 rounded-full border-2 border-transparent border-t-accent-pink border-r-accent-purple"
        />

        {/* Middle Ring */}
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 w-16 h-16 m-auto rounded-full border-2 border-transparent border-t-accent-cyan border-l-accent-pink"
        />

        {/* Inner Ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 w-12 h-12 m-auto rounded-full border-2 border-transparent border-b-accent-purple border-r-accent-pink"
        />

        {/* Center Dot */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 w-2 h-2 m-auto rounded-full bg-accent-pink shadow-lg shadow-accent-pink/50"
        />

        {/* Glowing Effect */}
        <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan opacity-20 blur-xl" />
      </div>
    </div>
  );
}
