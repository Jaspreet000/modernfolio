"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import Scene3D from "@/components/Scene3D";
import PageTransition from "@/components/PageTransition";
import MagneticButton from "@/components/MagneticButton";

const skills = [
  { name: "React", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Three.js", level: 75 },
  { name: "Next.js", level: 85 },
  { name: "TailwindCSS", level: 90 },
];

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="text-white/80">{name}</span>
      <span className="text-accent-pink">{level}%</span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-accent-purple to-accent-pink"
      />
    </div>
  </div>
);

export default function About() {
  return (
    <PageTransition>
      <main className="relative">
        {/* Bio Section */}
        <Section className="flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                About <span className="text-accent-pink">Me</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-white/80 mb-8"
              >
                I'm a passionate web developer with a love for creating
                immersive digital experiences. My journey in tech has led me to
                explore the fascinating intersection of design and
                functionality, always pushing the boundaries of what's possible
                on the web.
              </motion.p>
              <MagneticButton variant="filled">Download Resume</MagneticButton>
            </div>
            <div className="relative h-[400px]">
              <Scene3D
                scale={2}
                position={[0, -1, 0]}
                rotation={[0, Math.PI / 4, 0]}
              />
            </div>
          </div>
        </Section>

        {/* Skills Section */}
        <Section className="bg-primary/95">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              Technical <span className="text-accent-cyan">Skills</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        </Section>

        {/* Experience Section */}
        <Section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Work <span className="text-accent-purple">Experience</span>
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Add your experience items here */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glassmorphism p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold mb-2">
                Senior Web Developer
              </h3>
              <p className="text-accent-pink mb-2">2021 - Present</p>
              <p className="text-white/80">
                Led the development of multiple high-impact web applications
                using modern technologies like React, Next.js, and Three.js.
              </p>
            </motion.div>
          </div>
        </Section>
      </main>
    </PageTransition>
  );
}
