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
  ],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'ModernFolio',
    title: 'ModernFolio - Futuristic Portfolio',
    description: 'A futuristic portfolio showcasing my work and skills',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
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
    creator: '@yourusername',
    images: ['https://your-domain.com/twitter-image.jpg'],
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