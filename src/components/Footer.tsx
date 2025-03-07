"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import { IconType } from "react-icons";

interface BaseLink {
  name: string;
  href: string;
}

interface NavLink extends BaseLink {}
interface SocialLink extends BaseLink {
  icon: IconType;
}

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Contact", href: "/contact" },
    ] as NavLink[],
  },
  {
    title: "Social",
    links: [
      { name: "GitHub", href: "https://github.com/Jaspreet000", icon: FaGithub },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/jaspreeet-singh/", icon: FaLinkedinIn },
      { name: "Twitter", href: "https://x.com/Jaspreeeeeeeet", icon: FaTwitter },
      { name: "Instagram", href: "https://www.instagram.com/__._jass_i_.__/", icon: FaInstagram },
    ] as SocialLink[],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-primary/95 to-black/95 border-t border-white/10">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex flex-col">
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-accent-pink to-accent-purple bg-clip-text text-transparent hover:scale-[1.02] transition-transform duration-300 tracking-tight">
                Jaspreet Singh
              </h2>
              <h3 className="text-2xl font-semibold mb-4 text-accent-pink">
                Full Stack Developer
              </h3>
              <p className="text-white/70 text-sm text-justify leading-relaxed max-w-md">
                Passionate about building scalable web applications, AI-driven platforms, and secure, high-performance solutions.  
  Bridging creativity with cutting-edge technology to deliver seamless digital experiences.
              </p>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <div className="relative mb-6">
                <h3 className="text-xl font-semibold">
                  {section.title}
                </h3>
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-accent-pink to-accent-purple transition-all duration-300 group-hover:w-24" />
              </div>
              <ul className="space-y-3">
                {section.links.map((link: NavLink | SocialLink) => (
                  <li key={link.name} className="transform-gpu transition-transform duration-300 hover:-translate-y-0.5">
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-white/70 hover:text-accent-pink transition-colors duration-300"
                    >
                      {'icon' in link ? (
                        <span className="relative">
                          <link.icon className="text-xl transition-transform duration-300 group-hover:scale-110" />
                          <span className="absolute inset-0 bg-accent-pink/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-pink/50 transition-transform duration-300 group-hover:scale-150" />
                      )}
                      <span className="relative overflow-hidden">
                        {link.name}
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent-pink transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 hover:text-white/70 transition-colors duration-300">
            © {new Date().getFullYear()} Jaspreet Singh. All rights reserved.
          </p>
        </div>

        {/* Simple Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-accent-pink to-transparent opacity-30" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-accent-pink/50 blur-sm" />
        </div>
      </div>
    </footer>
  );
}
