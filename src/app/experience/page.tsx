"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/Section";
import PageTransition from "@/components/PageTransition";
import Scene3D from "@/components/Scene3D";

const experiences = [
  {
    id: 1,
    role: "Senior Web Developer",
    company: "TechCorp Inc.",
    period: "2021 - Present",
    location: "San Francisco, CA",
    description: [
      "Led the development of multiple high-impact web applications using modern technologies.",
      "Implemented complex 3D visualizations using Three.js and WebGL.",
      "Mentored junior developers and conducted code reviews.",
      "Optimized application performance and reduced load times by 40%.",
    ],
    technologies: ["React", "Next.js", "Three.js", "Node.js", "GraphQL"],
    color: "#6B2FD9",
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "InnovateLabs",
    period: "2019 - 2021",
    location: "New York, NY",
    description: [
      "Developed and maintained multiple client projects using React and Node.js.",
      "Implemented responsive designs and animations using Framer Motion.",
      "Collaborated with UX designers to create intuitive user interfaces.",
      "Integrated third-party APIs and services.",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "AWS"],
    color: "#FF2E93",
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "DigitalWave",
    period: "2018 - 2019",
    location: "Boston, MA",
    description: [
      "Built responsive web applications using React and TypeScript.",
      "Implemented state management using Redux and Context API.",
      "Created reusable component libraries and design systems.",
      "Collaborated with backend teams to integrate REST APIs.",
    ],
    technologies: ["React", "TypeScript", "Redux", "SASS", "Jest"],
    color: "#00F0FF",
  },
];

const ExperienceCard = ({ experience, isSelected, onClick }: any) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: isSelected ? 1 : 1.02 }}
      className={`glassmorphism rounded-xl p-6 cursor-pointer transition-all duration-300 ${
        isSelected ? "col-span-2 md:col-span-3" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className={`flex-1 ${isSelected ? "md:w-2/3" : "w-full"}`}>
          <h3 className="text-2xl font-bold mb-2">{experience.role}</h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-accent-pink">{experience.company}</span>
            <span className="text-white/50">•</span>
            <span className="text-white/70">{experience.period}</span>
          </div>
          <p className="text-white/50 mb-4">{experience.location}</p>

          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <ul className="space-y-2 mb-6">
                  {experience.description.map((item: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-accent-pink mt-1">•</span>
                      <span className="text-white/70">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`${isSelected ? "md:w-1/3" : "w-full"}`}>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm rounded-full bg-accent-purple/10 text-accent-pink"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Connector */}
      <div
        className="absolute left-0 top-1/2 w-2 h-2 rounded-full -translate-x-1/2"
        style={{ backgroundColor: experience.color }}
      />
    </motion.div>
  );
};

export default function Experience() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <PageTransition>
      <main className="relative">
        {/* Hero Section */}
        <Section className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Professional <span className="text-accent-pink">Journey</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/70 max-w-2xl mx-auto"
            >
              A timeline of my professional experience and achievements in the
              tech industry.
            </motion.p>
          </div>
        </Section>

        {/* Experience Timeline */}
        <Section>
          <div className="relative max-w-7xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple via-accent-pink to-accent-cyan" />

            {/* Experience Cards */}
            <div className="grid gap-12 relative pl-8">
              {experiences.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  isSelected={selectedId === experience.id}
                  onClick={() =>
                    setSelectedId(
                      selectedId === experience.id ? null : experience.id
                    )
                  }
                />
              ))}
            </div>
          </div>
        </Section>

        {/* 3D Scene */}
        <Section className="py-16">
          <div className="max-w-7xl mx-auto h-[400px]">
            <Scene3D
              scale={2}
              position={[0, -1, 0]}
              rotation={[0, Math.PI / 4, 0]}
            />
          </div>
        </Section>
      </main>
    </PageTransition>
  );
}
