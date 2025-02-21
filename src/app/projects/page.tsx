"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/Section";
import PageTransition from "@/components/PageTransition";
import MagneticButton from "@/components/MagneticButton";

const projects = [
  {
    id: 1,
    title: "AI-Powered Dashboard",
    description:
      "A modern dashboard with real-time data visualization and AI insights.",
    category: "Web App",
    image: "/projects/dashboard.jpg",
    technologies: ["React", "TypeScript", "TailwindCSS"],
  },
  {
    id: 2,
    title: "3D Product Configurator",
    description:
      "Interactive 3D product customization tool with real-time previews.",
    category: "3D",
    image: "/projects/configurator.jpg",
    technologies: ["Three.js", "React", "WebGL"],
  },
  // Add more projects here
];

const categories = ["All", "Web App", "3D", "Mobile"];

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -10 }}
    className="glassmorphism rounded-xl overflow-hidden group"
  >
    <div className="relative h-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent z-10" />
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
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-accent-pink transition-colors">
        {project.title}
      </h3>
      <p className="text-white/70 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-sm rounded-full bg-accent-purple/10 text-accent-pink"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "All" || project.category === selectedCategory
  );

  return (
    <PageTransition>
      <main className="relative">
        <Section className="min-h-screen">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            My <span className="text-accent-pink">Projects</span>
          </motion.h1>

          {/* Categories */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <MagneticButton
                key={category}
                variant={selectedCategory === category ? "filled" : "outlined"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </MagneticButton>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </Section>
      </main>
    </PageTransition>
  );
}
