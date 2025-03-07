"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import Section from "@/components/Section";
import PageTransition from "@/components/PageTransition";
import MagneticButton from "@/components/MagneticButton";

const Toast = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white shadow-lg z-50 flex items-center gap-2"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m9.374-8.374l-6.75 6.75a2.121 2.121 0 01-3 0l-6.75-6.75a2.121 2.121 0 010-3l6.75-6.75a2.121 2.121 0 013 0l6.75 6.75a2.121 2.121 0 010 3z" />
    </svg>
    {message}
  </motion.div>
);

const projects = [
  {
    id: 1,
    title: "Portfolio 2.0",
    description: "A modern, responsive portfolio website built with Next.js 14 and TailwindCSS. Features smooth animations using Framer Motion, 3D elements with Three.js/Spline, and a clean, minimalist design. Showcases projects, skills, and contact information in an engaging way.",
    category: "Next.js",
    image: "/project/project-11.png",
    technologies: ["Next.js", "Spline/3JS", "TailwindCSS"],
    liveDemo: "https://www.jaspreeet.me/",
    sourceCode: "https://github.com/Jaspreet000/modernfolio",
  },
  {
    id: 2,
    title: "Promptalysis",
    description: "An AI-powered platform that analyzes and enhances prompts for better results with language models. Utilizes Google's Gemini API for advanced text analysis, features user authentication, and provides real-time prompt optimization suggestions.",
    category: "Next.js",
    image: "/project/project-10.png",
    technologies: ["Next.js", "MongoDB", "Gemini API"],
    liveDemo: "https://promptalysis-jet.vercel.app/",
    sourceCode: "https://github.com/Jaspreet000/promptalysis",
  },
  {
    id: 3,
    title: "Space Forecaster",
    description: "An immersive 3D space weather visualization platform using Three.js and Next.js. Integrates with NASA's API for real-time space weather data and features interactive 3D models of celestial bodies with Gemini API-powered explanations.",
    category: "Next.js",
    image: "/project/project-12.png",
    technologies: ["Three.js", "Next.js", "Gemini API"],
    liveDemo: "https://spaceforecaster.vercel.app/",
    sourceCode: "https://github.com/Jaspreet000/space_forecaster",
  },
  {
    id: 4,
    title: "Proton Datalabs Site",
    description: "A professional company website built with Next.js and MongoDB. Features secure authentication, dynamic content management, responsive design, and seamless integration with backend services. Showcases company services and portfolio with modern UI/UX.",
    category: "Next.js",
    image: "/project/project-14.png",
    technologies: ["Next.js", "MongoDB", "Next Auth"],
    liveDemo: "https://www.protondatalabs.com/",
    sourceCode: "",
  },
  {
    id: 5,
    title: "GE Copilot",
    description: "An AI-powered assistant for Grant Engine platform, built with React and FastAPI. Features real-time data processing, MongoDB integration for data persistence, and intelligent automation tools for grant writing and management.",
    category: "MERN Stack",
    image: "/project/project-13.png",
    technologies: ["React.js", "FastAPI", "MongoDB CRUD"],
    liveDemo: "http://ai.grantengine.com/",
    sourceCode: "",
  },
  {
    id: 6,
    title: "To Do List",
    description: "A feature-rich task management application built with the MERN stack. Includes real-time updates, task categorization, priority settings, and user authentication. Clean UI with TailwindCSS and responsive design for all devices.",
    category: "MERN Stack",
    image: "/project/project-2.jpg",
    technologies: ["TailwindCSS", "React.js", "MongoDB"],
    liveDemo: "https://todolist-tau-tan.vercel.app/",
    sourceCode: "https://github.com/Jaspreet000/todolist",
  },
  {
    id: 7,
    title: "Music Player",
    description: "A modern music player application built with Next.js and TypeScript. Features a sleek UI with TailwindCSS, audio visualization, playlist management, and seamless playback controls. Supports various audio formats and responsive design.",
    category: "Next.js",
    image: "/project/project-3.jpg",
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    liveDemo: "https://music-player-eight-orpin.vercel.app/",
    sourceCode: "https://github.com/Jaspreet000/music-player",
  },
  {
    id: 8,
    title: "E-Commerce Site",
    description: "A full-featured e-commerce platform built with the MERN stack. Includes Stripe integration for secure payments, product management, user authentication, shopping cart functionality, and order tracking. Styled with TailwindCSS for a modern look.",
    category: "MERN Stack",
    image: "/project/project-4.jpg",
    technologies: ["Stripe", "MERN", "TailwindCSS"],
    liveDemo: "https://e-comm-two-pied.vercel.app/",
    sourceCode: "https://github.com/Jaspreet000/e-comm",
  },
  {
    id: 9,
    title: "Gemini AI Clone",
    description: "A clone of Google's Gemini AI interface with React.js and Express.js. Features real-time AI responses, chat history, code highlighting, and markdown support. Clean and responsive design matching the original Gemini interface.",
    category: "MERN Stack",
    image: "/project/project-5.jpg",
    technologies: ["React.js", "Express.js", "Node.js"],
    liveDemo: "https://gemini-clone-repo.vercel.app/",
    sourceCode: "https://github.com/Jaspreet000/gemini-clone-repo",
  },
  {
    id: 10,
    title: "Simple Landing Page",
    description: "A clean and modern landing page built with pure HTML5, CSS3, and JavaScript. Features smooth scrolling, responsive design, animated sections, and optimized performance. Perfect showcase of fundamental web development skills.",
    category: "Others",
    image: "/project/project-6.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    liveDemo: "https://jaspreet000.github.io/landing-page-purehtmlcss/",
    sourceCode: "https://github.com/Jaspreet000/landing-page-purehtmlcss",
  },
  {
    id: 11,
    title: "Secure SignUp Page",
    description: "A secure authentication system built with the MERN stack. Features password hashing, JWT authentication, form validation, and MongoDB integration. Styled with TailwindCSS for a modern and responsive design.",
    category: "MERN Stack",
    image: "/project/project-7.jpg",
    technologies: ["MongoDB", "React.js", "TailwindCSS"],
    liveDemo: "https://signup-page-react-express.vercel.app/",
    sourceCode: "https://github.com/Jaspreet000/signup-page-react-express",
  },
  {
    id: 12,
    title: "Weather App",
    description: "A weather application built with vanilla JavaScript. Integrates with weather APIs for real-time forecasts, features geolocation, dynamic weather icons, and temperature unit conversion. Clean and responsive design with CSS3.",
    category: "Others",
    image: "/project/project-8.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    liveDemo: "https://jaspreet000.github.io/weather-app/",
    sourceCode: "https://github.com/Jaspreet000/weather-app",
  },
  {
    id: 13,
    title: "Landing Page 2.0",
    description: "An enhanced landing page for a book platform built with modern HTML5 and CSS3. Features parallax scrolling, CSS animations, responsive design, and interactive elements. Optimized for performance and user engagement.",
    category: "Others",
    image: "/project/project-9.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    liveDemo: "https://jaspreet000.github.io/cleverbooks/",
    sourceCode: "https://github.com/Jaspreet000/cleverbooks",
  },
  {
    id: 14,
    title: "Patchd Quiz",
    description: "An interactive quiz application built with the MERN stack. Features user authentication, quiz creation/management, real-time scoring, and progress tracking. Clean UI with React.js and MongoDB for data persistence.",
    category: "MERN Stack",
    image: "/project/project-1.jpg",
    technologies: ["Node.js/Express.js", "React.js", "MongoDB"],
    liveDemo: "https://patchdquiz.vercel.app/",
    sourceCode: "https://github.com/Jaspreet000/fsprom",
  },
  // Add more projects here
];

const categories = ["All", "Next.js", "MERN Stack", "Others"];

const ProjectCard = ({ project, setShowToast }: { project: (typeof projects)[0], setShowToast: (show: boolean) => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleSourceCodeClick = (sourceCode: string) => {
    if (!sourceCode) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      window.open(sourceCode, '_blank');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="glassmorphism rounded-xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10"
    >
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-primary/50 to-transparent z-10" />
        <motion.div
          initial={false}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0"
        />
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-accent-pink/90 hover:bg-accent-pink text-white transform hover:scale-110 transition-all duration-300"
              title="Live Demo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </a>
          )}
          <button
            onClick={() => handleSourceCodeClick(project.sourceCode)}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-primary transform hover:scale-110 transition-all duration-300"
            title={project.sourceCode ? "Source Code" : "Private Repository"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-accent-pink transition-colors">
          {project.title}
        </h3>
        <p className="text-white/80 mb-4 text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-accent-purple/20 text-accent-pink border border-accent-pink/20 shadow-sm transition-all duration-300 hover:shadow-accent-pink/20 hover:border-accent-pink/40"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showToast, setShowToast] = useState(false);

  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "All" || project.category === selectedCategory
  );

  return (
    <PageTransition>
      <main className="relative min-h-screen">
        <section className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-accent-pink"
          >
            My <span className="text-accent-pink">Projects</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center text-white/60 mb-8 sm:mb-12 max-w-2xl mx-auto"
          >
            Explore my latest works and creative endeavors
          </motion.p>

          {/* Categories */}
          <div className="flex justify-center gap-3 mb-8 sm:mb-12 flex-wrap">
            {categories.map((category) => (
              <MagneticButton
                key={category}
                variant={selectedCategory === category ? "filled" : "outlined"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105"
              >
                {category}
              </MagneticButton>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} setShowToast={setShowToast} />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <Toast message="🔒 Oops! This repo is private. It's like my secret recipe - I can't share all my coding secrets! 😉" />
          )}
        </AnimatePresence>
      </main>
    </PageTransition>
  );
}
