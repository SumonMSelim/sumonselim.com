// ─── Content block types ─────────────────────────────────────────────────────

export type TextBlock    = { type: "text";    value: string; html?: string };
export type CodeBlock    = { type: "code";    language: string; filename?: string; value: string };
export type GalleryBlock = { type: "gallery"; photos: Photo[] };
export type IframeBlock  = { type: "iframe";  url: string; title?: string; height?: number };
export type ContentBlock = TextBlock | CodeBlock | GalleryBlock | IframeBlock;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Formats "2025-12-15" → "15 December 2025". Passes through already-formatted strings. */
export function formatDate(date: string): string {
  if (/^\d{4}-\d{2}-\d{2}/.test(date)) {
    return new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  }
  return date;
}

// ─── Photo ───────────────────────────────────────────────────────────────────

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

// ─── Article ─────────────────────────────────────────────────────────────────

export interface Article {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt?: string;
  blocks: ContentBlock[];
}

// ─── About page ───────────────────────────────────────────────────────────────

export interface Credential {
  name: string;
  imageUrl: string;
  badgeUrl: string;
  issuer?: string;
  issuedAt?: string;
}

export interface AboutData {
  bio: string;
  photo?: string;
  certifications: string[];
  beyondCode: string;
  credentials?: Credential[];
  socials?: Social[];
}

// ─── Standalone page ──────────────────────────────────────────────────────────

export interface Page {
  slug: string;
  title: string;
  blocks: ContentBlock[];
}

// ─── Social ───────────────────────────────────────────────────────────────────

export interface Social {
  label: string;
  url: string;
  cmd: string;
}
