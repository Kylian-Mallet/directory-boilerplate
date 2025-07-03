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
            // Modern font pairing - Outfit for headings, Inter for body
            heading: 'Outfit, sans-serif',
            body: 'Inter, sans-serif',
        },
        colors: {
            // Premium dark theme with vibrant accents
            primary: '#6366f1',           // Indigo primary
            'primary-foreground': '#ffffff',
            secondary: '#8b5cf6',         // Purple secondary
            'secondary-foreground': '#ffffff',
            destructive: '#ef4444',       // Red for errors
            'destructive-foreground': '#ffffff',
            muted: '#f8fafc',            // Light gray background
            'muted-foreground': '#64748b',
            accent: '#06b6d4',           // Cyan accent
            'accent-foreground': '#ffffff',
            popover: '#ffffff',
            'popover-foreground': '#0f172a',
            card: '#ffffff',
            'card-foreground': '#0f172a',
            background: '#fafafa',        // Warm white background
            foreground: '#0f172a',       // Dark slate text
            border: '#e2e8f0',           // Subtle borders
            input: '#f1f5f9',            // Light input background
            ring: '#6366f1',             // Focus ring
            radius: '1rem',              // Rounded corners
            // Custom gradient colors
            'gradient-from': '#6366f1',   // Primary gradient start
            'gradient-to': '#8b5cf6',     // Primary gradient end
            'hero-bg': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            'card-shadow': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
    },
};