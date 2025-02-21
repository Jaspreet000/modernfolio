"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatePresence } from "framer-motion";
import Loading from "@/components/Loading";
import { usePageTransition } from "@/hooks/usePageTransition";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isTransitioning, pathname } = usePageTransition();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary text-white min-h-screen`}>
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
      </body>
    </html>
  );
}
