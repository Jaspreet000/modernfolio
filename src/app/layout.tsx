"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatePresence } from "framer-motion";
import Loading from "@/components/Loading";
import { usePageTransition } from "@/hooks/usePageTransition";
import Head from 'next/head';
import { siteMetadata } from './metadata'
import { Metadata } from 'next'

const inter = Inter({ subsets: ["latin"] });

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.jaspreet.me/#website',
      'url': 'https://www.jaspreet.me',
      'name': 'Jaspreet Singh - Full Stack Developer',
      'description': 'Expert Full Stack Developer specializing in Next.js, React, and Three.js',
      'publisher': { '@id': 'https://www.jaspreet.me/#person' }
    },
    {
      '@type': 'Person',
      '@id': 'https://www.jaspreet.me/#person',
      'name': 'Jaspreet Singh',
      'image': {
        '@type': 'ImageObject',
        '@id': 'https://www.jaspreet.me/#logo',
        'url': 'https://www.jaspreet.me/profile-image.jpg',
        'caption': 'Jaspreet Singh'
      },
      'description': 'Full Stack Developer specializing in Next.js, React, and Three.js',
      'sameAs': [
        'https://github.com/Jaspreet000',
        'your-linkedin-url',
        'your-twitter-url'
      ],
      'jobTitle': 'Full Stack Developer',
      'worksFor': {
        '@type': 'Organization',
        'name': 'Freelance'
      },
      'knowsAbout': [
        'Web Development',
        'Next.js',
        'React',
        'Three.js',
        'JavaScript',
        'TypeScript'
      ]
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.jaspreet.me/#breadcrumb',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'item': {
            '@id': 'https://www.jaspreet.me',
            'name': 'Home'
          }
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'item': {
            '@id': 'https://www.jaspreet.me/projects',
            'name': 'Projects'
          }
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'item': {
            '@id': 'https://www.jaspreet.me/blog',
            'name': 'Blog'
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jaspreet.me'),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  openGraph: {
    type: 'website',
    locale: siteMetadata.locale,
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.socialBanner],
    creator: '@YourTwitterHandle', // Add your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google verification code
    yandex: 'your-yandex-verification-code', // Add if needed
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isTransitioning, pathname } = usePageTransition();

  return (
    <html lang={siteMetadata.locale}>
      <head>
        <title>{metadata.title.default}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.authors[0].name} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title.default} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={metadata.twitter.creator} />
        <meta name="twitter:title" content={metadata.title.default} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />

        {/* Additional SEO tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={metadata.metadataBase} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F0F1A" />
        
        {/* Preload fonts */}
        <link
          rel="preload"
          href="/fonts/your-font.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: metadata.authors[0].name,
              url: metadata.metadataBase,
              sameAs: [
                'https://github.com/Jaspreet000',
                'https://www.linkedin.com/in/your-linkedin', // Add your LinkedIn
                // Add other social profiles
              ],
              jobTitle: 'Full Stack Developer',
              worksFor: {
                '@type': 'Organization',
                name: 'Freelance',
              },
            }),
          }}
        />
        
        {/* Enhanced Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* RSS Feed */}
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="Jaspreet Singh's Blog" 
          href="https://www.jaspreet.me/rss.xml" 
        />
      </head>
      <body className={`