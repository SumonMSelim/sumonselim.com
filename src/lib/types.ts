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
}

// ─── About page ───────────────────────────────────────────────────────────────

export interface AboutData {
  bio: string;
  photo?: string;
  beyondCode: string;
  socials?: Social[];
}

// ─── Social ───────────────────────────────────────────────────────────────────

export interface Social {
  label: string;
  url: string;
  cmd: string;
}
