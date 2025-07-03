export interface ContentMeta {
  title: string;
  topic?: string;
  image?: string;
  summary?: string;
  virtue?: string;
  audioUrl?: string;
  author?: string;
  date?: string;
  tags?: string[];
  [key: string]: any; // Allow custom metadata
}

export interface ContentItem {
  fileName: string;
  content: string;
  meta: ContentMeta;
}

export interface DirectoryConfig {
  name: string;
  description: string;
  itemsPerPage?: number;
  features: {
    audio?: boolean;
    images?: boolean;
    tags?: boolean;
    search?: boolean;
    pagination?: boolean;
  };
  /** Theme customization for colors and typography */
  theme: {
    /** Font family definitions for heading and body text */
    fonts: {
      heading: string;
      body: string;
    };
    /** Optional color palette overrides using CSS variable values (HSL, HEX, etc.) */
    colors?: {
      primary?: string;
      'primary-foreground'?: string;
      secondary?: string;
      'secondary-foreground'?: string;
      destructive?: string;
      'destructive-foreground'?: string;
      muted?: string;
      'muted-foreground'?: string;
      accent?: string;
      'accent-foreground'?: string;
      popover?: string;
      'popover-foreground'?: string;
      card?: string;
      'card-foreground'?: string;
      background?: string;
      foreground?: string;
      border?: string;
      input?: string;
      ring?: string;
      radius?: string;
    };
  };
}