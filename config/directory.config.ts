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
            heading: 'Roboto, serif',
            body: 'Inter, sans-serif',
        },
        colors: {
            primary: '#0f172a',
            'primary-foreground': '#f8fafc',
            secondary: '#475569',
            'secondary-foreground': '#f8fafc',
            destructive: '#e11d48',
            'destructive-foreground': '#f8fafc',
            muted: '#f1f5f9',
            'muted-foreground': '#475569',
            accent: '#7c3aed',
            'accent-foreground': '#f8fafc',
            popover: '#ffffff',
            'popover-foreground': '#334155',
            card: '#ffffff',
            'card-foreground': '#334155',
            background: '#f8fafc',
            foreground: '#334155',
            border: '#e2e8f0',
            input: '#f1f5f9',
            ring: '#6366f1',
            radius: '0.5rem',
        },
    },
};