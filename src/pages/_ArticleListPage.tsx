import { useState, useEffect } from "react";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/types";

const PAGE_SIZE = 10;

interface Props {
  posts: Article[];
}

const ArticleListPage = ({ posts }: Props) => {
  const allTags = ["All", ...Array.from(new Set(posts.map(p => p.tag)))];

  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  // Read tag from URL after mount (avoids SSR/client mismatch)
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("tag");
    if (param && allTags.includes(param)) setFilter(param);
  }, []);

  // Keep URL in sync with filter
  useEffect(() => {
    const url = new URL(window.location.href);
    if (filter === "All") {
      url.searchParams.delete("tag");
    } else {
      url.searchParams.set("tag", filter);
    }
    history.replaceState(null, "", url.toString());
  }, [filter]);

  const filtered = filter === "All" ? posts : posts.filter(p => p.tag === filter);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (tag: string) => {
    setFilter(tag);
    setPage(1);
  };

  return (
    <main className="relative z-10 pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="animate-fade-in">
          <div className="mb-6">
            <a href="/" className="cli-command text-xs">&gt;<span className="cursor-blink">_</span> cd ~</a>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight mb-2">
            <span className="font-mono text-primary text-xl sm:text-2xl lg:text-3xl">$ ./</span>articles
          </h1>
          <p className="font-mono text-sm text-muted-foreground mb-8">
            // all articles, guides, and writings
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleFilter(tag)}
                className={`cli-command text-xs ${filter === tag ? "bg-primary text-primary-foreground border-primary" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-terminal-prompt select-none">$</span>{" ls articles | grep "}<span className="text-primary">{filter === "All" ? "*" : filter}</span>
            <span className="text-muted-foreground">{" # "}{filtered.length} found</span>
          </p>

          {paginated.map((article, i) => (
            <div
              key={article.slug}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 0.04}s`, animationFillMode: "both", opacity: 0 }}
            >
              <div className="card-hover flex items-start gap-3 p-4 rounded-lg border border-border bg-card group relative">
                <span className="font-mono text-xs text-primary shrink-0 mt-0.5">▸</span>
                <div className="flex-1 min-w-0">
                  <a href={`/${article.slug}`} className="block after:absolute after:inset-0">
                    <p className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </p>
                    {article.excerpt && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{article.excerpt}</p>
                    )}
                  </a>
                  <div className="flex gap-2 mt-2 relative z-10">
                    <span className="text-xs text-muted-foreground">{formatDate(article.date)}</span>
                    <a
                      href={`/articles?tag=${encodeURIComponent(article.tag)}`}
                      className="text-xs px-1.5 rounded border border-border text-muted-foreground hover:border-primary/60 hover:text-primary transition-colors"
                    >
                      {article.tag}
                    </a>
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground shrink-0">→</span>
              </div>
            </div>
          ))}

          <p className="font-mono text-sm text-muted-foreground">{"# ---"}</p>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="cli-command text-xs disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← prev
            </button>
            <span className="font-mono text-xs text-muted-foreground">
              page <span className="text-primary">{page}</span> / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="cli-command text-xs disabled:opacity-30 disabled:cursor-not-allowed"
            >
              next →
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ArticleListPage;
