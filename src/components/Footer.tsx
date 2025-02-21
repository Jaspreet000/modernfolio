"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Social",
    links: [
      { name: "GitHub", href: "https://github.com" },
      { name: "LinkedIn", href: "https://linkedin.com" },
      { name: "Twitter", href: "https://twitter.com" },
      { name: "Instagram", href: "https://instagram.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-primary/95 border-t border-white/10">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/95 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-4"
            >
              ModernFolio
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-white/70 mb-6"
            >
              Creating futuristic digital experiences with cutting-edge web
              technologies.
            </motion.p>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={section.title}>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="text-lg font-semibold mb-4"
              >
                {section.title}
              </motion.h3>
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="space-y-2"
              >
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-accent-pink transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 text-center text-white/50"
        >
          <p>© {new Date().getFullYear()} ModernFolio. All rights reserved.</p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-pink to-transparent opacity-30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-accent-pink blur-sm opacity-50" />
      </div>
    </footer>
  );
}
