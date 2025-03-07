"use client";

import { AnimatePresence } from "framer-motion";
import Loading from "@/components/Loading";
import { usePageTransition } from "@/hooks/usePageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isTransitioning, pathname } = usePageTransition();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loading key="loading" />
        ) : (
          <main
            key={pathname}
            className={isTransitioning ? "pointer-events-none" : ""}
          >
            {children}
            <Footer />
          </main>
        )}
      </AnimatePresence>
    </>
  );
} 