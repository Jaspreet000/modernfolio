"use client";

import { motion, useIsPresent } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const isPresent = useIsPresent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="fixed inset-0 z-50 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan"
      />
      {children}
    </motion.div>
  );
}
