import { Metadata } from 'next';
import { directoryConfig } from '@config/directory.config';

export function generateMetadata(
  title?: string,
  description?: string
): Metadata {
  return {
    title: title ? {
      default: title,
      template: `%s | ${directoryConfig.name}`,
    } : {
      default: directoryConfig.name,
      template: `%s | ${directoryConfig.name}`,
    },
    description: description || directoryConfig.description,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: process.env.NEXT_PUBLIC_URL || 'https://your-domain.com',
      siteName: directoryConfig.name,
      title: title || directoryConfig.name,
      description: description || directoryConfig.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: title || directoryConfig.name,
      description: description || directoryConfig.description,
    },
  };
}