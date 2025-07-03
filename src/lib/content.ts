import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ContentItem, ContentMeta } from '@/types/content';

// Base directory where content is stored (nested folders and MDX files)
const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Recursively collect all MDX file paths under a directory.
 */
function collectMdxFiles(dir: string): string[] {
  let files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(collectMdxFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Get all content items by reading every MDX file recursively.
 */
export function getAllContent(): ContentItem[] {
  if (!fs.existsSync(contentDirectory)) return [];
  const files = collectMdxFiles(contentDirectory);
  return files.map((fullPath) => {
    const relative = path.relative(contentDirectory, fullPath);
    const slug = relative.replace(/\.mdx$/, '');
    const source = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(source);
    return { fileName: slug, content, meta: data as ContentMeta };
  });
}

/**
 * Get a single content item by its slug path (e.g., 'demo/region/city/listing-1').
 */
export function getContentBySlug(slug: string): ContentItem | null {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const source = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(source);
  return { fileName: slug, content, meta: data as ContentMeta };
}

/**
 * Search content by matching query against title, summary, and tags.
 */
export function searchContent(query: string): ContentItem[] {
  const term = query.toLowerCase();
  return getAllContent().filter((item) => {
    const text = [item.meta.title, item.meta.summary, ...(item.meta.tags || [])]
      .join(' ')
      .toLowerCase();
    return text.includes(term);
  });
}

/**
 * Filter content items by tag.
 */
export function getContentByTag(tag: string): ContentItem[] {
  return getAllContent().filter((item) => item.meta.tags?.includes(tag));
}

/**
 * List top-level slug directories (first-level).
 */
export function getSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs
    .readdirSync(contentDirectory, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

/**
 * List region directories under a given slug (second-level).
 */
export function getRegions(slug: string): string[] {
  const dir = path.join(contentDirectory, slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

/**
 * List city directories under a given slug and region (third-level).
 */
export function getCities(slug: string, region: string): string[] {
  const dir = path.join(contentDirectory, slug, region);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

/**
 * List listing slugs (file names without extension) under slug/region/city.
 */
export function getListingSlugs(slug: string, region: string, city: string): string[] {
  const dir = path.join(contentDirectory, slug, region, city);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

/**
 * Get all listings under slug/region/city as ContentItem[].
 */
export function getListings(slug: string, region: string, city: string): ContentItem[] {
  return getListingSlugs(slug, region, city).map((list) => {
    const fullPath = path.join(contentDirectory, slug, region, city, `${list}.mdx`);
    const source = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(source);
    const fileSlug = `${slug}/${region}/${city}/${list}`;
    return { fileName: fileSlug, content, meta: data as ContentMeta };
  });
}

/**
 * Get a single listing by its full path.
 */
export function getListing(
  slug: string,
  region: string,
  city: string,
  listing: string
): ContentItem | null {
  const fullPath = path.join(contentDirectory, slug, region, city, `${listing}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const source = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(source);
  const fileSlug = `${slug}/${region}/${city}/${listing}`;
  return { fileName: fileSlug, content, meta: data as ContentMeta };
}