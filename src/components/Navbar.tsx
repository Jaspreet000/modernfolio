"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
  { name: "Download CV", path: "#", highlight: true, isDownload: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/cv/resume.docx';
    link.download = 'Jaspreet_Singh_Resume.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const menuVariants = {
    closed: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed w-full z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? "glassmorphism" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold bg-gradient-to-r from-accent-purple to-accent-pink p-2 rounded-lg">
            JS
          </span>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white group-hover:text-accent-pink transition-colors duration-300">
              Jaspreet Singh
            </span>
            <span className="text-sm text-white/70 group-hover:text-accent-pink/70 transition-colors duration-300">
              Full Stack Developer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            item.isDownload ? (
              <button
                key={item.path}
                onClick={handleDownload}
                className="px-4 py-2 bg-gradient-to-r from-accent-purple to-accent-pink rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-accent-pink/20 transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  {item.name}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
              </button>
            ) : (
              <Link
                key={item.path}
                href={item.path}
                className={`relative group ${
                  pathname === item.path ? "text-accent-pink" : "text-white"
                }`}
              >
                <>
                  <span className="relative z-10">{item.name}</span>
                  <motion.span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-purple to-accent-pink transform origin-left
                    ${pathname === item.path ? "scale-x-100" : "scale-x-0"}`}
                    initial={false}
                    animate={{ scaleX: pathname === item.path ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              </Link>
            )
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <div className="w-6 h-6 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-white transform transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transform transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-full left-0 right-0 backdrop-blur-md bg-black/70 md:hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                item.isDownload ? (
                  <button
                    key={item.path}
                    onClick={() => {
                      handleDownload();
                      setIsOpen(false);
                    }}
                    className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white font-semibold flex items-center justify-between"
                  >
                    {item.name}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 px-4 rounded-lg transition-all duration-300 ${
                      pathname === item.path
                        ? "bg-gradient-to-r from-accent-purple to-accent-pink text-white"
                        : "hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
