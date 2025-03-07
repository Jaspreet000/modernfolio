import { Inter } from "next/font/google";
import "./globals.css";
import { siteMetadata } from './metadata';
import { Metadata } from 'next';
import RootLayoutWrapper from "@/components/RootLayoutWrapper";
import Script from 'next/script';

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
        'https://www.linkedin.com/in/jaspreeet-singh/',
        'https://x.com/Jaspreeeeeeeet'
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
    creator: '@Jaspreeeeeeeet',
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteMetadata.locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" type="application/rss+xml" title="Jaspreet Singh's Blog" href="https://www.jaspreet.me/rss.xml" />
      </head>
      <body className={`${inter.className} bg-primary text-white min-h-screen`}>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}