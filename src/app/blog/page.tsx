"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

const blogPosts = [
  {
    title: "Building Modern Web Applications with Next.js 14",
    description: "Learn how to leverage Next.js 14's new features for better performance and developer experience.",
    date: "2024-03-20",
    category: "Web Development",
    slug: "building-modern-web-applications-nextjs-14"
  },
  {
    title: "Creating Immersive 3D Experiences with Three.js",
    description: "A deep dive into Three.js and WebGL for creating interactive 3D web experiences.",
    date: "2024-03-15",
    category: "3D Development",
    slug: "creating-immersive-3d-experiences-threejs"
  },
  {
    title: "Optimizing React Applications for Performance",
    description: "Best practices and techniques for building high-performance React applications.",
    date: "2024-03-10",
    category: "React",
    slug: "optimizing-react-applications-performance"
  }
];

export default function Blog() {
  return (
    <PageTransition>
      <main className="container mx-auto px-4 pt-28 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4"
        >
          Technical <span className="text-accent-pink">Blog</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center text-white/60 mb-12 max-w-2xl mx-auto"
        >
          Insights and tutorials about web development, 3D graphics, and modern technologies
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism rounded-xl p-6 border border-white/10 hover:border-accent-pink/20 transition-all duration-300"
            >
              <span className="text-sm text-accent-pink">{post.category}</span>
              <h2 className="text-xl font-bold mt-2 mb-3">{post.title}</h2>
              <p className="text-white/60 text-sm mb-4">{post.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/40">{post.date}</span>
                <button className="text-accent-pink hover:text-white transition-colors">
                  Read More →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </PageTransition>
  );
} 