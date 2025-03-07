"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/Section";
import PageTransition from "@/components/PageTransition";
import MagneticButton from "@/components/MagneticButton";
import Image from 'next/image';

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 92, color: "#61DAFB" },
      { name: "TypeScript", level: 85, color: "#3178C6" },
      { name: "Next.js", level: 92, color: "#000000" },
      { name: "Three.js", level: 75, color: "#000000" },
      { name: "TailwindCSS", level: 90, color: "#06B6D4" },
      { name: "Framer Motion", level: 85, color: "#FF0055" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 85, color: "#339933" },
      { name: "Express", level: 85, color: "#000000" },
      { name: "MongoDB", level: 90, color: "#47A248" },
      { name: "GraphQL", level: 55, color: "#E10098" },
      { name: "PostgreSQL", level: 60, color: "#336791" },
      { name: "REST APIs", level: 80, color: "#FF6B6B" },
    ],
  },
  {
    name: "Tools & Others",
    skills: [
      { name: "Git", level: 90, color: "#F05032" },
      { name: "Docker", level: 75, color: "#2496ED" },
      { name: "AWS", level: 75, color: "#FF9900" },
      { name: "CI/CD", level: 70, color: "#4CAF50" },
      { name: "Testing", level: 70, color: "#9C27B0" },
      { name: "Agile", level: 85, color: "#1976D2" },
    ],
  },
];

const SkillCard = ({
  skill,
}: {
  skill: { name: string; level: number; color: string };
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glassmorphism rounded-xl p-4 relative overflow-hidden group"
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-30"
        style={{
          background: `radial-gradient(circle at center, ${skill.color}55, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-3">{skill.name}</h3>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full"
            style={{ background: skill.color }}
          />
        </div>
        <div className="mt-2 flex justify-between items-center text-sm">
          <span className="text-white/70">Proficiency</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            className="text-accent-pink font-semibold"
          >
            {skill.level}%
          </motion.span>
        </div>
      </div>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 border-2 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{ borderColor: skill.color + "80" }}
      />
    </motion.div>
  );
};

const experiences = [
  {
    id: 1,
    role: "Web Developer Intern",
    company: "Proton Datalabs",
    period: "June 2024 - December 2024",
    location: "Seattle, WA",
    description: [
      "It was a paid internship where I worked on various projects and got to learn a lot of new things.",
      "Designed and developed responsive, dynamic UIs using Next.js, ShadCN, Aceternity UI, React.js, and Tailwind CSS, improving page load speed by 30%.",
      "Integrated Lottie animations to enhance user interaction and increase engagement.",
      "Implemented secure authentication using Auth0/NextAuth.js with JWT, optimizing user session handling and reducing login errors.",
      "Engineered real-time API communication, improving data retrieval efficiency and reducing backend request latency by 40%."
    ],
    technologies: ["React.js", "Next.js", "Typescript","TailwindCSS","MongoDB","Amazon AWS", "Docker"],
    color: "#EC4899",
  },
  {
    id: 2,
    role: "Frontend Dev Intern",
    company: "NICS",
    period: "June 2024 - August 2024",
    location: "Kullu, HP",
    description: [
      "Developed pixel-perfect, responsive web applications using HTML, CSS, and JavaScript, ensuring 100% cross-browser compatibility.",
      "Enhanced website performance by implementing lazy loading, code splitting, and optimized assets, reducing load time by 25%.",
      "Strengthened React.js skills, gaining experience in state management, component lifecycle methods, and React hooks such as useState, useEffect, useContext, and useReducer.",
    ],
    technologies: ["React.js", "Typescript", "MongoDB", "TailwindCSS", "CSS3","HTML5","JavaScript"],
    color: "#F472B6",
  },
  {
    id: 3,
    role: "Fullstack Dev Intern",
    company: "Allsoft Solutions Pvt. Ltd.",
    period: "June 2023 - July 2023",
    location: "Mohali, CH",
    description: [
      "Designed and deployed MERN stack web applications, integrating React.js frontend, Express.js backend, and MongoDB for efficient data management. ",
      "Implemented secure API authentication using JWT and OAuth, preventing unauthorized access.",
      "Developed secure payment processing systems with Stripe/Razorpay, ensuring PCI-DSS compliance and safe transactions.",
    ],
    technologies: ["React.js", "TypeScript", "Redux", "Express.js", "Node.js","MongoDB"],
    color: "#FBB6CE",
  },
];

const ExperienceCard = ({ experience, isSelected, onClick }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: isSelected ? 1 : 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`glassmorphism rounded-xl p-6 cursor-pointer transition-all duration-500 relative overflow-hidden group ${
        isSelected ? "md:col-span-2" : ""
      }`}
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20"
        style={{
          background: `radial-gradient(circle at center, ${experience.color}55, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col gap-2 mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-accent-pink transition-colors duration-300">
            {experience.role}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-pink-400 font-medium">{experience.company}</span>
            <span className="text-white/50">•</span>
            <span className="text-white/70">{experience.period}</span>
          </div>
          <p className="text-white/50 text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {experience.location}
          </p>
        </div>

        {/* Description Section */}
        <AnimatePresence mode="wait">
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ul className="space-y-3 mb-6">
                {experience.description.map((item: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3 group/item"
                  >
                    <span className="text-pink-400 mt-1.5 transition-transform duration-300 group-hover/item:scale-110">•</span>
                    <span className="text-white/80 text-sm leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technologies Section */}
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech: string, index: number) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="px-2.5 py-1 text-xs rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20 transition-all duration-300 hover:border-pink-500/40"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Timeline Connector */}
      <motion.div
        className="absolute left-0 top-8 w-2 h-2 rounded-full -translate-x-[1.35rem]"
        style={{ backgroundColor: experience.color }}
        whileHover={{ scale: 1.5 }}
        transition={{ duration: 0.3 }}
      />

      {/* Hover border effect */}
      <motion.div
        className="absolute inset-0 border-2 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ borderColor: experience.color + "40" }}
      />
    </motion.div>
  );
};

const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Animated Background */}
    <div 
      className="absolute inset-0 animate-pulse"
      style={{
        background: `
          radial-gradient(circle at 50% 50%, rgba(236,72,153,0.15) 0%, transparent 60%),
          radial-gradient(circle at 0% 0%, rgba(244,114,182,0.1) 0%, transparent 50%),
          radial-gradient(circle at 100% 100%, rgba(219,39,119,0.1) 0%, transparent 50%)
        `,
        animation: 'gradient 8s ease infinite',
      }}
    />

    {/* Grid Pattern */}
    <div 
      className="absolute inset-0 opacity-[0.2]"
      style={{
        backgroundImage: `
          linear-gradient(90deg, rgba(236,72,153,0.3) 1px, transparent 1px),
          linear-gradient(0deg, rgba(236,72,153,0.3) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px',
        transform: 'perspective(1000px) rotateX(60deg) translateY(-100px)',
        transformOrigin: 'center top',
      }}
    />

    {/* Moving Glow Effect */}
    <div 
      className="absolute inset-0 opacity-50"
      style={{
        background: 'linear-gradient(to right, transparent, rgba(236,72,153,0.1), transparent)',
        animation: 'moveGlow 3s ease-in-out infinite',
      }}
    />

    {/* Fade Out Edges */}
    <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary via-primary/95 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-primary via-primary/95 to-transparent" />
  </div>
);

export default function About() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  return (
    <PageTransition>
      <main className="relative min-h-screen">
        {/* Bio Section */}
        <Section className="pb-8 sm:pb-16" isFirstSection={true}>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start max-w-7xl mx-auto">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-4">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-accent-pink text-base sm:text-lg font-medium"
                >
                  Hello, I'm Jaspreet ! a
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  Full Stack <span className="text-accent-pink">Developer</span>
                </motion.h1>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-base text-justify sm:text-lg md:text-xl text-white/80 leading-relaxed"
              >
                I specialize in building high-performance, scalable web applications with modern frameworks like Next.js and React.js.  
    With experience in AI-driven solutions, real-time APIs, and secure authentication systems, I strive to create  
    seamless, user-friendly digital experiences. Passionate about innovation, I constantly explore new technologies  
    to enhance functionality and performance.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <MagneticButton 
                  variant="filled" 
                  className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/cv/resume.docx';
                    link.download = 'Jaspreet_Singh_Resume.docx';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <span className="flex items-center gap-2">
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                      />
                    </svg>
                    Download Resume
                  </span>
                </MagneticButton>
              </motion.div>
            </div>
            <motion.div 
              className="relative aspect-[4/5] w-full max-w-md mx-auto mt-6 md:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Image src="/images/me.jpg" alt="My Image" layout="fill" objectFit="cover" className="rounded-lg" />
            </motion.div>
          </div>
        </Section>

        {/* Skills Section */}
        <Section className="py-4 sm:py-12">
          <GridBackground />
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-1 sm:space-y-3 mb-4 sm:mb-8"
            >
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300">
                  Technical <span className="text-white">Skills</span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto mt-1 sm:mt-3">
                  A comprehensive overview of my technical expertise and proficiency in various technologies
                </p>
              </div>
            </motion.div>

            <div className="space-y-6 sm:space-y-12">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-3 sm:mb-6">
                    {category.name}{" "}
                    <span className="text-pink-400">Expertise</span>
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                      >
                        <SkillCard skill={skill} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Experience Section */}
        <Section className="py-8 sm:py-12">
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300">
                Work <span className="text-white">Experience</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">
                My professional journey and contributions in the tech industry
              </p>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="flex items-center justify-center gap-2 mt-2 text-pink-400/70 text-sm"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
                <span>Click on cards to reveal detailed experience</span>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </motion.div>
            </motion.div>

            <div className="relative max-w-7xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500 via-pink-400 to-pink-300 opacity-30" />

              {/* Experience Cards */}
              <div className="grid gap-8 relative pl-16">
                {experiences.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <ExperienceCard
                      experience={experience}
                      isSelected={selectedId === experience.id}
                      onClick={() => setSelectedId(selectedId === experience.id ? null : experience.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </main>
    </PageTransition>
  );
}
