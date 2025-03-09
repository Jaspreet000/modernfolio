"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/Section";
import PageTransition from "@/components/PageTransition";
import MagneticButton from "@/components/MagneticButton";
import { FaGithub, FaLinkedinIn, FaTwitter, FaDribbble, FaBehance, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsPerson, BsChatDots } from "react-icons/bs";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Float } from "@react-three/drei";
import type { Group } from 'three';
import emailjs from '@emailjs/browser';

function PhoneModel() {
  const { scene } = useGLTF('/models/phone.glb');
  const phoneRef = useRef<Group>(null!);

  useFrame((state) => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // Rotation intensity
      floatIntensity={0.5} // Float intensity
    >
      <primitive 
        ref={phoneRef}
        object={scene} 
        scale={[18.5, 18.5, 17.5]}
        position={[0, 0.2, 0]}
        rotation={[(18 * Math.PI) / 180, (138 * Math.PI) / 180, 0]}
      />
    </Float>
  );
}

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 5,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

const socialLinks = [
  { name: "GitHub", url: "https://github.com/Jaspreet000", icon: FaGithub, color: "#6e5494" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/jaspreeet-singh/", icon: FaLinkedinIn, color: "#0077b5" },
  { name: "Twitter", url: "https://x.com/Jaspreeeeeeeet", icon: FaTwitter, color: "#1DA1F2" },
  { name: "Instagram", url: "https://www.instagram.com/__._jass_i_.__/", icon: FaInstagram, color: "#E4405F" },
];

const Notification = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}
  >
    <div className="flex items-center gap-2">
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80">×</button>
    </div>
  </motion.div>
);

const InputField = ({ label, type = "text", icon: Icon, error, ...props }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-6 relative group"
  >
    <label className="text-white mb-2 font-semibold text-lg flex items-center gap-2">
      <span className="relative">
        <Icon className="text-accent-pink" size={20} />
        <motion.div
          className="absolute inset-0 bg-accent-pink/20 rounded-full blur-lg"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </span>
      {label}
    </label>
    <div className="relative">
      <div className="relative z-10">
        {type === "textarea" ? (
          <textarea
            {...props}
            className={`w-full bg-gray-800/50 backdrop-blur-sm border-2 ${
              error ? 'border-red-500' : 'border-gray-700'
            } rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-pink focus:ring-1 focus:ring-accent-pink transition-all duration-300 shadow-lg shadow-accent-pink/5 group-hover:shadow-accent-pink/10`}
            rows={5}
          />
        ) : (
          <input
            type={type}
            {...props}
            className={`w-full bg-gray-800/50 backdrop-blur-sm border-2 ${
              error ? 'border-red-500' : 'border-gray-700'
            } rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-pink focus:ring-1 focus:ring-accent-pink transition-all duration-300 shadow-lg shadow-accent-pink/5 group-hover:shadow-accent-pink/10`}
          />
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className={`absolute inset-0 border-2 border-accent-pink/0 rounded-xl ${
            error ? 'border-red-500/10' : ''
          }`}
          initial={false}
          whileHover={{ scale: 1.02, borderColor: error ? "rgba(239, 68, 68, 0.2)" : "rgba(236, 72, 153, 0.1)" }}
        />
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${
            error 
              ? 'from-red-500/10 to-red-400/10'
              : 'from-accent-pink/10 to-accent-purple/10'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
          initial={false}
          whileHover={{ scale: 1.05 }}
        />
      </div>
    </div>
  </motion.div>
);

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(236,72,153,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(147,51,234,0.1),transparent_50%)]" />
    </div>
  );
};

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formState.email)) {
      newErrors.email = "Invalid email address";
    }
    
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setNotification({
        type: 'error',
        message: 'Please fill in all required fields correctly.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Initialize EmailJS (add this at the start of your component or in a useEffect)
      emailjs.init("Kd7KVUGIFXpLEEVlb");

      const result = await emailjs.send(
        'modernfolio', // Replace with your EmailJS service ID
        'template_13v3o7f', // Replace with your EmailJS template ID
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
          to_name: 'Jaspreet',
          sent_at: new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          })
        }
      );

      if (result.status === 200) {
        setNotification({
          type: 'success',
          message: 'Thank you for your message! I will get back to you soon.'
        });
        
        // Reset form
        setFormState({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error('Failed to send message');
      }
      
    } catch (error) {
      console.error('Email sending error:', error);
      setNotification({
        type: 'error',
        message: 'Failed to send message. Please try again later or contact me directly via email.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <main className="relative overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5 pointer-events-none" />
        
        <AnimatePresence>
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}
        </AnimatePresence>

        <Section className="min-h-screen" isFirstSection={true}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <FloatingElement>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-accent-pink to-accent-purple bg-clip-text text-transparent"
                >
                  Let's <span className="text-accent-pink">Connect</span>
                </motion.h1>
              </FloatingElement>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/80 mb-8"
              >
                Have a project in mind? Let's discuss how we can work together
                to bring your ideas to life.
              </motion.p>

              <form onSubmit={handleSubmit} className="space-y-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-pink/20 to-accent-purple/20 blur-3xl -z-10" />
                <InputField
                  label="Name"
                  value={formState.name}
                  icon={BsPerson}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormState({ ...formState, name: e.target.value });
                    if (errors.name) {
                      setErrors({ ...errors, name: undefined });
                    }
                  }}
                  error={errors.name}
                />
                <InputField
                  label="Email"
                  type="email"
                  icon={HiOutlineMail}
                  value={formState.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormState({ ...formState, email: e.target.value });
                    if (errors.email) {
                      setErrors({ ...errors, email: undefined });
                    }
                  }}
                  error={errors.email}
                />
                <InputField
                  label="Message"
                  type="textarea"
                  icon={BsChatDots}
                  value={formState.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setFormState({ ...formState, message: e.target.value });
                    if (errors.message) {
                      setErrors({ ...errors, message: undefined });
                    }
                  }}
                  error={errors.message}
                />
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button type="submit" disabled={isSubmitting}>
                    <MagneticButton
                      className={`w-full bg-gradient-to-r from-[#FF2E93] to-[#FF8AAD] text-white py-4 rounded-xl font-semibold relative overflow-hidden group ${
                        isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </span>
                    </MagneticButton>
                  </button>
                </motion.div>
              </form>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12"
              >
                <h3 className="text-xl font-semibold mb-4 text-white/90">Connect with me</h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <FloatingElement delay={index * 0.2} key={link.name}>
                        <motion.a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative group"
                        >
                          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl text-2xl text-white transition-all duration-300 border-2 border-gray-700 shadow-lg relative z-10">
                            <Icon size={24} className="transition-colors duration-300" style={{ color: link.color }} />
                          </div>
                          <motion.div
                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                            style={{ backgroundColor: link.color }}
                          />
                        </motion.a>
                      </FloatingElement>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* 3D Phone Scene */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative h-[600px] hidden md:block"
            >
              <div className="absolute inset-0 bg-gradient-radial from-accent-purple/20 via-transparent to-transparent pointer-events-none" />
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <PhoneModel />
                <OrbitControls 
                  enableZoom={false}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 1.5}
                />
              </Canvas>
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />
            </motion.div>
          </div>
        </Section>
      </main>
    </PageTransition>
  );
}
