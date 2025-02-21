"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import Section from "@/components/Section";
import MagneticButton from "@/components/MagneticButton";
import Scene3D from "@/components/Scene3D";

// Spline Scene
import Spline from "@splinetool/react-spline";
import '../styles.css'; // Import the CSS file

// Stats data
const stats = [
  { label: "Years Experience", value: "5+", icon: "clock" },
  { label: "Projects Completed", value: "50+", icon: "check-circle" },
  { label: "Technologies", value: "20+", icon: "cogs" },
  { label: "Happy Clients", value: "30+", icon: "smile" },
];

// Featured projects
const featuredProjects = [
  {
    title: "AI Dashboard",
    description: "Real-time data visualization with AI insights",
    tech: ["React", "TypeScript", "Three.js"],
    color: "#6B2FD9",
  },
  {
    title: "3D Configurator",
    description: "Interactive product customization tool",
    tech: ["WebGL", "Three.js", "GSAP"],
    color: "#FF2E93",
  },
  {
    title: "Portfolio 3.0",
    description: "Modern portfolio with 3D elements",
    tech: ["Next.js", "Spline", "Framer"],
    color: "#00F0FF",
  },
];

const testimonials = [
  { name: "Client A", quote: "Jaspreet delivered exceptional work! Highly recommend.", image: "path/to/imageA.jpg" },
  { name: "Client B", quote: "A true professional who understands the needs of the project.", image: "path/to/imageB.jpg" },
  { name: "Client C", quote: "Great experience working together. Will hire again!", image: "path/to/imageC.jpg" },
];

function MovingStars() {
  const starsRef = useRef<any>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    // Update star positions based on time to create a moving effect
    starsRef.current.rotation.y = time * 0.1; // Adjust speed as needed
  });

  return <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade ref={starsRef} />;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <motion.div
        style={{ y, opacity }}
        className="relative min-h-screen flex flex-col items-center justify-center"
      >
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <Canvas>
            <MovingStars />
          </Canvas>
        </div>

        {/* Spline Scene */}
        <div className="absolute inset-0 -z-5">
          <Spline scene="https://prod.spline.design/vZ8hu14qlF4omSWv/scene.splinecode" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan">
              Hi there! I&apos;m
            </h1>
            <div className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 smoke-effect">
              Jaspreet Singh
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">Full Stack Developer</h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Passionate about building scalable web applications and creating seamless user experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <MagneticButton variant="filled">View Projects</MagneticButton>
            <MagneticButton variant="outlined">Contact Me</MagneticButton>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
      </motion.div>

      {/* Stats Section */}
      <Section className="py-24 bg-primary/95 relative overflow-hidden min-h-0">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-accent-pink/10 opacity-30 rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.h3
                whileHover={{ scale: 1.1, textShadow: "0 0 10px rgba(255, 255, 255, 0.8)" }}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent mb-2"
              >
                <span className="flex items-center justify-center mb-2">
                  <i className={`fas fa-${stat.icon} mr-2`}></i>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-4xl"
                  >
                    {stat.value}
                  </motion.span>
                </span>
              </motion.h3>
              <p className="text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Featured Projects */}
      <Section className="py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Featured <span className="text-accent-pink">Projects</span>
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="glassmorphism p-6 rounded-xl relative group cursor-pointer"
            >
              <div
                className="absolute inset-0 opacity-20 rounded-xl transition-opacity duration-300 group-hover:opacity-30"
                style={{
                  background: `radial-gradient(circle at center, ${project.color}55, transparent 70%)`,
                }}
              />
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-white/70 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm rounded-full bg-accent-purple/10 text-accent-pink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Interactive 3D Section */}
      <Section className="py-24 bg-primary/95">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Interactive <span className="text-accent-cyan">Experience</span>
              </h2>
              <p className="text-white/70 mb-8">
                Explore my work through interactive 3D elements and immersive
                animations. Each project is crafted with attention to detail and
                modern technologies.
              </p>
              <MagneticButton variant="filled">Explore More</MagneticButton>
            </motion.div>
            <div className="h-[400px]">
              <Scene3D
                scale={2}
                position={[0, -1, 0]}
                rotation={[0, Math.PI / 4, 0]}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-8"
          >
            Let's Create Something
            <span className="block text-accent-pink">Amazing Together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 mb-12 text-lg"
          >
            Have a project in mind? Let's discuss how we can bring your ideas to
            life with cutting-edge web technologies.
          </motion.p>
          <MagneticButton variant="filled">Get In Touch</MagneticButton>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section className="py-24 bg-secondary relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-12"
          >
            What My Clients Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
                <p className="text-lg italic">"{testimonial.quote}"</p>
                <p className="mt-4 font-semibold">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
