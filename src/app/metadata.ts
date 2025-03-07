import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ModernFolio - Futuristic Portfolio',
  description: 'A futuristic portfolio showcasing my work and skills',
  keywords: [
    'portfolio',
    'web development',
    'react',
    'next.js',
    'three.js',
    'framer motion',
    'gsap',
    'tailwindcss',
    'spline',
    'react-three',
    'react-three-fiber',
    'react-three-drei',
    'react-three-gsap',
    'react-three-framer-motion',
    'react-three-tailwindcss',
    'jaspreet singh',
    'jaspreet',
    'jaspreet singh portfolio',
    'jaspreet singh website',
    'jaspreet singh portfolio website',
    'jaspreet singh portfolio website 2025',
    'jaspreet singh portfolio website 2025',
  ],
  authors: [{ name: 'Jaspreet Singh' }],
  creator: 'Jaspreet Singh',
  publisher: 'Jaspreet Singh',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jaspreet.me',
    siteName: 'ModernFolio',
    title: 'ModernFolio - Futuristic Portfolio',
    description: 'A futuristic portfolio showcasing my work and skills',
    images: [
      {
        url: 'https://www.jaspreet.me/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ModernFolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ModernFolio - Futuristic Portfolio',
    description: 'A futuristic portfolio showcasing my work and skills',
    creator: '@Jaspreeeeeeeet',
    images: ['https://www.jaspreet.me/twitter-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#0F0F1A',
};

export const siteMetadata = {
  title: 'Jaspreet Singh - Full Stack Developer & Next.js Expert | 3D Web Developer',
  description: 'Expert Full Stack Developer specializing in Next.js, React, Three.js, and modern web applications. Creating innovative digital experiences with cutting-edge technology. Hire me for your next web project.',
  author: 'Jaspreet Singh',
  siteUrl: 'https://www.jaspreet.me',
  siteRepo: 'https://github.com/Jaspreet000/modernfolio',
  socialBanner: '/og-image.png',
  locale: 'en-US',
  analytics: {
    googleAnalyticsId: '', // Add your Google Analytics ID
    microsoftClarity: '', // Add Microsoft Clarity ID for better analytics
  },
  keywords: [
    'Jaspreet Singh',
    'Jaspreet',
    'Jaspreet Singh Portfolio',
    'Jaspreet Singh Website',
    'Jaspreet Singh Portfolio Website',
    'Jaspreet Singh Portfolio Website 2025',
    'Jaspreet Singh Portfolio Website 2025',
    'Full Stack Developer',
    'Next.js Expert',
    'React Developer',
    'Three.js Developer',
    'Web Developer India',
    'Frontend Developer',
    'JavaScript Expert',
    'TypeScript Developer',
    'Modern Web Applications',
    'Interactive Web Design',
    '3D Web Development',
    'UI/UX Developer',
    'MERN Stack Developer',
    'Portfolio Website',
    'Hire Web Developer',
    'Remote Developer',
    'Freelance Developer',
    'Web Development Services',
    'Custom Web Applications'
  ],
  alternateLocales: ['en_US', 'en_GB', 'en_IN'],
  socialProfiles: {
    github: 'https://github.com/Jaspreet000',
    linkedin: 'https://www.linkedin.com/in/jaspreeet-singh/',
    twitter: 'https://x.com/Jaspreeeeeeeet',
    instagram: 'https://www.instagram.com/__._jass_i_.__/'
  },
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jaspreet Singh',
    url: 'https://www.jaspreet.me',
    image: '/profile-image.jpg',
    jobTitle: 'Full Stack Developer',
    description: 'Expert Full Stack Developer specializing in Next.js, React, and Three.js',
    knowsAbout: [
      'Web Development',
      'Next.js',
      'React',
      'Three.js',
      'JavaScript',
      'TypeScript',
      'Node.js',
      'MongoDB'
    ],
    workLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'India'
      }
    },
    skills: [
      'Next.js Development',
      'React Applications',
      '3D Web Development',
      'Full Stack Development',
      'UI/UX Design',
      'API Development',
      'Database Management',
      'Cloud Deployment'
    ],
    portfolioProjects: [
      {
        '@type': 'CreativeWork',
        name: 'Promptalysis',
        url: 'https://promptalysis-jet.vercel.app/',
        description: 'AI-powered platform using Google Gemini API'
      },
      {
        '@type': 'CreativeWork',
        name: 'Space Forecaster',
        url: 'https://spaceforecaster.vercel.app',
        description: 'Real-time space weather tracking system'
      }
    ]
  }
} 