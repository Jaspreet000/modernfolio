import { MetadataRoute } from 'next'
import { siteMetadata } from './metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/projects',
    '/contact',
  ]

  const projects = [
    'promptalysis',
    'space-forecaster',
    'portfolio',
    // Add more project slugs
  ]

  return [
    ...routes.map((route) => ({
      url: `${siteMetadata.siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteMetadata.siteUrl}/projects/${project}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
} 