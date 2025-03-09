"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars, Float, useGLTF, OrbitControls } from "@react-three/drei";
import Section from "@/components/Section";
import MagneticButton from "@/components/MagneticButton";
import Link from "next/link";
// import Image from "next/image";
import dynamic from "next/dynamic";
import type { Application } from '@splinetool/runtime';
import * as THREE from "three";

// Extended type to include timeline methods
interface SplineTimeline {
  play: () => void;
  pause: () => void;
}

interface ExtendedApplication extends Application {
  getTimeline: () => SplineTimeline | null;
  getEventsByType: (type: string) => any[];
}

// Dynamically import heavy components with loading configuration
const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-primary/50 animate-pulse" />,
  suspense: true
});

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-primary/50 animate-pulse" />,
  suspense: true
});

// Dynamically import Three.js components
const ThreeBackground = dynamic(() => import("@/components/ThreeComponents"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-primary/50 animate-pulse" />,
  suspense: true
});

const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-primary/50 animate-pulse" />,
  suspense: true
});

const ClientSideLayout = dynamic(() => import('../components/ClientSideLayout'), {
  ssr: false
});

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), {
  ssr: false
});

// Stats data
const stats = [
  { label: "Years Experience", value: "1+", icon: "clock" },
  { label: "Projects Completed", value: "15+", icon: "check-circle" },
  { label: "Technologies", value: "20+", icon: "cogs" },
  { label: "Happy Clients", value: "5+", icon: "smile" },
];

// Featured projects
const featuredProjects = [
  {
    title: "Promptalysis",
    description: "Promptalysis – AI-powered platform using Google Gemini API to analyze and enhance prompt quality with feedback, discussions, and gamification. 🚀",
    tech: ["Next.js", "TypeScript", "Gemini API","MongoDB","TailwindCSS"],
    color: "#6B2FD9",
    image: "/project/project-10.png",
    preview: "https://promptalysis-jet.vercel.app/",
    code: "https://github.com/Jaspreet000/promptalysis"
  },
  {
    title: "Space Forecaster",
    description: "Space Forecaster – AI-powered system for real-time space weather tracking, astronomical event predictions, and planetary condition analysis. 🚀",
    tech: ["Next.js", "React Three Fibre", "TypeScript","TailwindCSS"],
    color: "#FF2E93",
    image: "/project/project-12.png",
    preview: "https://spaceforecaster.vercel.app",
    code: "https://github.com/Jaspreet000/space_forecaster"
  },
  {
    title: "Portfolio 2.0",
    description: "Modern Portfolio – A modern, interactive portfolio built with React Three Fiber, featuring 3D effects, smooth animations, and a sleek, futuristic design. 🚀",
    tech: ["Next.js", "Spline", "Framer","TailwindCSS","React Three Fibre"],
    color: "#00F0FF",
    image: "/project/project-11.png",
    preview: "https://www.jaspreeet.me/",
    code: "https://github.com/Jaspreet000/modernfolio"
  },
];

const testimonials = [
  { 
    name: "Shahid", 
    quote: "Jaspreet is a highly skilled frontend developer who makes complex tasks look effortless. Quiet yet impactful, he delivers with precision, a calm demeanor, and a willingness to help, ensuring every project runs smoothly. ", 
    role: "AI Engineer, Proton Datalabs",
    rating: 4 
  },
  { 
    name: "Raghuveer Sain", 
    quote: "A true professional who deeply understands project needs. His expertise, dedication, and attention to detail ensure outstanding results, consistently exceeding expectations with precision and quality.", 
    role: "Instructor, IBM/Allsoft Sol",
    rating: 5 
  },
  { 
    name: "Ashish Singh", 
    quote: "Jaspreet is a talented full-stack developer with a keen eye for detail. Focused and efficient, he tackles challenges with expertise, precision, and a problem-solving mindset, ensuring seamless project execution.", 
    role: "Founder, NICS",
    rating: 5 
  },
];

function MovingStars({ isMobile }: { isMobile: boolean }) {
  const starsRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      const time = clock.getElapsedTime();
      starsRef.current.rotation.y = time * (isMobile ? 0.01 : 0.02);
    }
  });

  return (
    <Stars 
      radius={isMobile ? 40 : 60} 
      depth={isMobile ? 20 : 30} 
      count={isMobile ? 1000 : 1500}
      factor={isMobile ? 2 : 2.5} 
      saturation={0} 
      fade 
      ref={starsRef}
    />
  );
}

function HeroModel() {
  const { scene } = useGLTF('/models/abstract1.glb', true); // Enable DRACO compression
  
  useEffect(() => {
    // Optimize materials and meshes
    scene.traverse((child: any) => {
      if (child.isMesh) {
        // Optimize material settings
        child.material.envMapIntensity = 1.5;
        child.material.needsUpdate = true;
        child.material.shadowSide = 2;
        child.material.metalness = 0.6;
        child.material.roughness = 0.2;
        child.material.emissiveIntensity = 0.4;
        
        // Enable frustum culling
        child.frustumCulled = true;
        
        // Optimize geometry if possible
        if (child.geometry) {
          child.geometry.computeBoundingSphere();
          child.geometry.computeBoundingBox();
        }
        
        // Only enable shadows where needed
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    // Clean up
    return () => {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.geometry?.dispose();
          child.material?.dispose();
        }
      });
    };
  }, [scene]);

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.4}
      floatIntensity={0.3}
      floatingRange={[-0.1, 0.1]}
    >
      <primitive
        object={scene}
        position={[0, 0, 0]}
        scale={8}
        rotation={[0, Math.PI / 4, 0]}
      />
    </Float>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Detect mobile and set initial state
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
    };

    handleResize();
    
    // Debounce resize event for better performance
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 250);
    };

    window.addEventListener("resize", debouncedResize);

    // Stagger loading of heavy components
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timer);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <ClientSideLayout>
      <div ref={containerRef} className="relative">
        {/* Hero Section */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]), opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) }}
          className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-between px-5 md:px-12 py-12 md:py-0 pt-24 md:pt-28"
        >
          {/* Stars Background - Optimized for all devices */}
          <div className="fixed inset-0 -z-20 bg-[#0a0014]">
            <Suspense fallback={null}>
              <Canvas 
                camera={{ position: [0, 0, 1], far: 100 }}
                dpr={isMobile ? [1, 1.5] : [1, 2]}
                performance={{ min: 0.5 }}
                gl={{
                  powerPreference: "high-performance",
                  antialias: !isMobile,
                  alpha: true,
                  stencil: false,
                  depth: true,
                  logarithmicDepthBuffer: true
                }}
              >
                <MovingStars isMobile={isMobile} />
                <fog attach="fog" args={['#0a0014', 2, 5]} />
              </Canvas>
            </Suspense>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0014]/50 via-transparent to-[#0a0014]/80" />
          </div>

          {/* Hero Content - Left Side */}
          <div className="relative z-10 w-full md:w-1/2 max-w-[540px] flex flex-col justify-center md:min-h-[calc(100vh-112px)]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 md:mb-6"
            >
              <div className="w-full text-left">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan">
                  Hi there! I&apos;m
                </h1>
                <div className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 smoke-effect">
                  Jaspreet Singh
                </div>
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-4 text-white">
                  Full Stack Developer
                </h2>
                <p className="text-base md:text-xl text-white/80 max-w-[100%] leading-relaxed mb-8 md:mb-8">
                  with expertise in building scalable web applications, AI-powered platforms, and secure authentication systems using Next.js, React.js, and cloud technologies.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col md:flex-row gap-3 md:gap-6 items-stretch md:items-center"
            >
              <Link href="/projects" className="w-full md:w-auto">
                <MagneticButton 
                  variant="filled" 
                  className="w-full md:w-auto text-[15px] md:text-lg py-4 md:py-3 px-6 md:px-8"
                >
                  View Projects
                </MagneticButton>
              </Link>
              <Link href="/contact" className="w-full md:w-auto">
                <MagneticButton 
                  variant="outlined" 
                  className="w-full md:w-auto text-[15px] md:text-lg py-4 md:py-3 px-6 md:px-8"
                >
                  Contact Me
                </MagneticButton>
              </Link>
            </motion.div>
          </div>

          {/* 3D Model - Only visible on desktop */}
          {!isMobile && (
            <div className="relative md:z-10 w-full md:w-1/2 h-[70vh] md:h-[calc(100vh-112px)]">
              <div className="w-full h-full">
                <Suspense 
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-primary/20 animate-pulse" />
                    </div>
                  }
                >
                  <HeroCanvas 
                    setIsModelLoaded={setIsModelLoaded}
                    isMobile={isMobile}
                  />
                </Suspense>
              </div>
            </div>
          )}

          {/* Dark overlay for better text readability on mobile */}
          <div className="fixed inset-0 bg-gradient-to-r from-[#0a0014]/80 to-transparent md:hidden -z-10" />

          {/* Scroll Indicator - Only show on desktop */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
                <motion.div
                  animate={{
                    y: [0, 12, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Remaining sections wrapped in Suspense for progressive loading */}
        <Suspense fallback={null}>
          {/* Stats Section */}
          <section className="py-12 sm:py-16 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[#0a0014]/90 w-screen" />
            <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/5 to-transparent"/>
            
            {/* Content */}
            <div className="w-full mx-auto px-4 sm:px-6 relative z-10">
              {/* Section Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-8 sm:mb-12 md:mb-16"
              >
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
                  Experience & <span className="text-accent-pink">Impact</span>
                </h2>
                <p className="text-xs sm:text-base md:text-lg text-white/60 max-w-[90%] sm:max-w-2xl mx-auto">
                  Delivering exceptional results through years of dedicated development and innovation
                </p>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    {/* Card Background with Glassmorphism */}
                    <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.05] transition-all duration-300" />
                    
                    {/* Gradient Accent */}
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent" />
                    <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-accent-pink/40 to-transparent" />
                    
                    {/* Content Container */}
                    <div className="relative p-4 sm:p-6 md:p-8">
                      {/* Icon */}
                      <div className="mb-3 md:mb-4 text-accent-purple/80">
                        <i className={`fas fa-${stat.icon} text-xl sm:text-2xl md:text-3xl`} />
                      </div>
                      
                      {/* Value */}
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                      
                      {/* Label */}
                      <p className="text-sm sm:text-base md:text-lg text-white/60 font-medium">
                        {stat.label}
                      </p>

                      {/* Hover Effect Indicator */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple to-accent-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </Suspense>

        <Suspense fallback={null}>
          {/* Featured Projects */}
          <section className="py-12 sm:py-16 relative overflow-hidden">
            {/* Simple gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0014] to-[#1a0a2a] top-[-100px] bottom-[-100px]" />
            
            <div className="relative z-10 container mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-2 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-accent-pink">
                Featured <span className="text-accent-pink">Projects</span>
              </h2>
              
              <p className="text-center text-white/60 mb-6 sm:mb-8 md:mb-12 max-w-[90%] sm:max-w-2xl mx-auto text-sm sm:text-base">
                Explore some of my recent work and innovative solutions
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {featuredProjects.map((project) => (
                  <div
                    key={project.title}
                    className="group bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-accent-pink/20 transition-colors duration-300"
                  >
                    <div className="relative h-44 sm:h-52 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-primary/50 to-transparent z-10" />
                      <div
                        style={{
                          backgroundImage: `url(${project.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        className="absolute inset-0 transform transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 z-20 flex gap-2">
                        <a
                          href={project.preview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-accent-pink/90 hover:bg-accent-pink text-white transition-colors duration-300"
                          title="Live Demo"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </a>
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/90 hover:bg-white text-primary transition-colors duration-300"
                          title="Source Code"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-accent-pink transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 text-xs font-medium rounded-full bg-accent-purple/10 text-accent-pink border border-accent-pink/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-12">
                <Link href="/projects">
                  <MagneticButton variant="filled" className="text-sm font-medium tracking-wide">
                    View All Projects
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </section>
        </Suspense>

        <Suspense fallback={null}>
          {/* Interactive 3D Section */}
          <Section className="py-16 bg-primary/95">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                    Experience the <span className="text-accent-pink">Futuristic Police Car Crash</span>
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/70 mb-6 md:mb-8">
                    Dive into an interactive experience with the futuristic police car model. Rotate, zoom, and explore its dynamic design as it crashes in real-time!
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-white/70">
                    Feel free to interact with the model by rotating and zooming in using your mouse or touch gestures.
                  </p>
                </motion.div>
                <div className="h-[400px]">
                  <Suspense fallback={<div className="w-full h-full bg-primary/50 animate-pulse" />}>
                    <ThreeScene />
                  </Suspense>
                </div>
              </div>
            </div>
          </Section>
        </Suspense>

        <Suspense fallback={null}>
          {/* Contact CTA */}
          <Section className="py-12 sm:py-16 relative overflow-hidden">
            {/* Content Container */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="relative glassmorphism border border-white/10 p-4 sm:p-8 md:p-12 lg:p-16 rounded-2xl sm:rounded-3xl overflow-hidden">
                {/* Content */}
                <div className="relative z-10">
                  <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center">
                    {/* Static decorative line */}
                    <div className="flex justify-center">
                      <div className="h-0.5 sm:h-1 w-[40px] sm:w-[80px] md:w-[100px] bg-gradient-to-r from-accent-purple to-accent-pink rounded-full" />
                    </div>

                    {/* Heading */}
                    <div className="space-y-2 sm:space-y-4">
                      <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
                        Let's Build Your
                        <span className="block mt-0.5 sm:mt-2">
                          <span className="text-accent-cyan">Digital </span>
                          <span className="text-accent-pink">Future</span>
                        </span>
                      </h2>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
                        Transform your vision into reality with cutting-edge technology 
                        and innovative design solutions.
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-3 sm:pt-6">
                      <Link href="/contact" className="inline-block w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-medium text-white bg-gradient-to-r from-accent-purple to-accent-pink rounded-lg hover:opacity-90 transition-opacity duration-300">
                          <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                            Start Your Project
                            <span className="text-lg sm:text-xl">→</span>
                          </span>
                        </button>
                      </Link>
                    </div>

                    {/* Tech stack icons */}
                    <div className="flex justify-center gap-6 sm:gap-8 pt-6 sm:pt-8">
                      {['react', 'next', 'three'].map((tech) => (
                        <div
                          key={tech}
                          className="text-white/30 hover:text-white/60 transition-colors duration-300"
                        >
                          <i className={`fab fa-${tech} text-xl sm:text-2xl md:text-3xl`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </Suspense>

        <Suspense fallback={null}>
          {/* Testimonials Section */}
          <section className="py-12 sm:py-16 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 top-[-100px] bg-gradient-to-r from-[#0a0014] to-[#1a0a2a] animate-pulse opacity-90 bottom-[-100px] mb-4" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-8 sm:mb-12 md:mb-16"
              >
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
                  Client <span className="text-accent-pink">Testimonials</span>
                </h2>
                <p className="text-xs sm:text-base md:text-lg text-white/60 max-w-[90%] sm:max-w-2xl mx-auto">
                  Don't just take my word for it - hear what my clients have to say about their experiences working with me.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative group"
                  >
                    <div className="relative glassmorphism rounded-2xl p-6 sm:p-8 h-full transition-all duration-300 border border-white/5 group-hover:border-accent-pink/20">
                      {/* Quote Icon */}
                      <div className="absolute top-4 right-4 text-4xl text-accent-pink/20 font-serif">
                        "
                      </div>
                      
                      {/* Content */}
                      <div className="flex flex-col h-full">
                        {/* Quote */}
                        <div className="mb-6 flex-grow">
                          <p className="text-sm sm:text-base text-white/80 leading-relaxed italic">
                            "{testimonial.quote}"
                          </p>
                        </div>
                        
                        {/* Divider */}
                        <div className="w-16 h-px bg-gradient-to-r from-accent-purple to-accent-pink mb-6" />
                        
                        {/* Author Info */}
                        <div className="flex flex-col gap-2">
                          <div>
                            <h4 className="text-base sm:text-lg font-semibold text-white group-hover:text-accent-pink transition-colors">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-white/60">
                              {testimonial.role}
                            </p>
                            {/* Rating Stars */}
                            <div className="flex gap-1 mt-2">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <motion.span
                                  key={i}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="text-accent-pink text-sm"
                                >
                                  ★
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effects */}
                      <div className="absolute inset-0 rounded-2xl transition-all duration-300 group-hover:bg-gradient-to-b from-accent-purple/5 to-transparent -z-10" />
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-accent-purple/5 via-accent-pink/5 to-accent-cyan/5 -z-10" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </Suspense>
      </div>
    </ClientSideLayout>
  );
}
