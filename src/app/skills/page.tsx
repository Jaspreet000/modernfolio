"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import PageTransition from "@/components/PageTransition";
import Scene3D from "@/components/Scene3D";

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 90, color: "#61DAFB" },
      { name: "TypeScript", level: 85, color: "#3178C6" },
      { name: "Next.js", level: 85, color: "#000000" },
      { name: "Three.js", level: 75, color: "#000000" },
      { name: "TailwindCSS", level: 90, color: "#06B6D4" },
      { name: "Framer Motion", level: 80, color: "#FF0055" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 80, color: "#339933" },
      { name: "Express", level: 75, color: "#000000" },
      { name: "MongoDB", level: 70, color: "#47A248" },
      { name: "GraphQL", level: 65, color: "#E10098" },
      { name: "PostgreSQL", level: 70, color: "#336791" },
      { name: "REST APIs", level: 85, color: "#FF6B6B" },
    ],
  },
  {
    name: "Tools & Others",
    skills: [
      { name: "Git", level: 85, color: "#F05032" },
      { name: "Docker", level: 70, color: "#2496ED" },
      { name: "AWS", level: 65, color: "#FF9900" },
      { name: "CI/CD", level: 75, color: "#4CAF50" },
      { name: "Testing", level: 80, color: "#9C27B0" },
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
      className="glassmorphism rounded-xl p-6 relative overflow-hidden group"
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-30"
        style={{
          background: `radial-gradient(circle at center, ${skill.color}55, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-4">{skill.name}</h3>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full"
            style={{ background: skill.color }}
          />
        </div>
        <div className="mt-2 flex justify-between items-center">
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

export default function Skills() {
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
              Technical <span className="text-accent-pink">Arsenal</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/70 max-w-2xl mx-auto"
            >
              A comprehensive showcase of my technical expertise and
              professional capabilities in modern web development and software
              engineering.
            </motion.p>
          </div>
        </Section>

        {/* Skills Grid */}
        {skillCategories.map((category, index) => (
          <Section key={category.name} className="py-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-center mb-12"
            >
              {category.name}{" "}
              <span className="text-accent-cyan">Expertise</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {category.skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </Section>
        ))}

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
