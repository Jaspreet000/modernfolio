"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import PageTransition from "@/components/PageTransition";
import Scene3D from "@/components/Scene3D";
import MagneticButton from "@/components/MagneticButton";

const socialLinks = [
  { name: "GitHub", url: "https://github.com", icon: "🐙" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "💼" },
  { name: "Twitter", url: "https://twitter.com", icon: "🐦" },
];

const InputField = ({ label, type = "text", ...props }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-6"
  >
    <label className="block text-white/80 mb-2">{label}</label>
    {type === "textarea" ? (
      <textarea
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-pink focus:ring-1 focus:ring-accent-pink transition-colors"
        rows={5}
      />
    ) : (
      <input
        type={type}
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-pink focus:ring-1 focus:ring-accent-pink transition-colors"
      />
    )}
  </motion.div>
);

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formState);
  };

  return (
    <PageTransition>
      <main className="relative">
        <Section className="min-h-screen">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Let's <span className="text-accent-pink">Connect</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/80 mb-8"
              >
                Have a project in mind? Let's discuss how we can work together
                to bring your ideas to life.
              </motion.p>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  label="Name"
                  value={formState.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                />
                <InputField
                  label="Email"
                  type="email"
                  value={formState.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                />
                <InputField
                  label="Message"
                  type="textarea"
                  value={formState.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                />
                <MagneticButton type="submit" variant="filled">
                  Send Message
                </MagneticButton>
              </form>

              {/* Social Links */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="glassmorphism p-4 rounded-full text-2xl hover:text-accent-pink transition-colors"
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* 3D Scene */}
            <div className="relative h-[600px] hidden md:block">
              <Scene3D
                scale={2}
                position={[0, -1, 0]}
                rotation={[0, Math.PI / 4, 0]}
              />
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-radial from-accent-purple/20 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />
            </div>
          </div>
        </Section>
      </main>
    </PageTransition>
  );
}
