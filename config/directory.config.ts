import { DirectoryConfig } from '@/types/content';

export const directoryConfig: DirectoryConfig = {
    name: 'Directory Boilerplate',
    description: 'A customizable directory/blog template built with Next.js and MDX',
    itemsPerPage: 20,
    features: {
        audio: true,
        images: true,
        tags: true,
        search: true,
        pagination: true,
    },
    theme: {
        fonts: {
            // Google Font family names with fallback
            heading: 'Inter, sans-serif',
            body: 'Inter, sans-serif',
        },
        colors: {
            // Modern sophisticated color palette
            primary: '#2563eb',           // Vibrant blue
            'primary-foreground': '#ffffff',
            secondary: '#64748b',         // Slate gray
            'secondary-foreground': '#ffffff',
            destructive: '#dc2626',       // Modern red
            'destructive-foreground': '#ffffff',
            muted: '#f8fafc',            // Very light blue-gray
            'muted-foreground': '#64748b',
            accent: '#7c3aed',           // Purple accent
            'accent-foreground': '#ffffff',
            popover: '#ffffff',
            'popover-foreground': '#0f172a',
            card: '#ffffff',
            'card-foreground': '#0f172a',
            background: '#ffffff',        // Clean white background
            foreground: '#0f172a',       // Deep slate for text
            border: '#e2e8f0',           // Light border
            input: '#f1f5f9',            // Light input background
            ring: '#2563eb',             // Focus ring matches primary
            radius: '0.75rem',           // Slightly more rounded
        },
    },
};