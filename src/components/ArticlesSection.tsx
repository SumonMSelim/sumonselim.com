import AnimatedSection from "./AnimatedSection";
import RotatingText from "./RotatingText";
import TerminalCard from "./TerminalCard";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/types";

interface Props {
  posts?: Article[];
}

const ArticlesSection = ({ posts = [] }: Props) => {
  const articles = posts.slice(0, 5);

  const tagCounts = posts.reduce<Record<string, number>>((acc, p) => {
    if (p.tag) acc[p.tag] = (acc[p.tag] ?? 0) + 1;
    return acc;
  }, {});
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <AnimatedSection>
      <section id="articles" className="py-20 relative scroll-mt-20" aria-labelledby="articles-heading">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 id="articles-heading" className="font-display text-xl sm:text-2xl text-foreground leading-tight mb-10">
            <span className="font-mono text-primary text-lg sm:text-xl">$ ./</span>
            <RotatingText text="articles" interval={5000} />
          </h2>

          <div className="grid md:grid-cols-[1fr_260px] gap-8 items-start overflow-hidden">
            {/* Article list */}
            <div className="min-w-0">
              <h3 className="font-mono text-sm text-muted-foreground mb-4 tracking-wider">
                <span className="text-primary">$</span>{" ls articles"}
              </h3>
              <div className="space-y-3">
                {articles.map((article) => (
                  <div
                    key={article.slug}
                    className="card-hover flex items-start gap-3 p-4 rounded-lg border border-border bg-card group relative"
                  >
                    <span className="font-mono text-xs text-primary shrink-0 mt-0.5">▸</span>
                    <div className="flex-1 min-w-0">
                      <a href={`/${article.slug}`} className="block after:absolute after:inset-0">
                        <p className="font-mono text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 sm:truncate">
                          {article.title}
                        </p>
                        {article.excerpt && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{article.excerpt}</p>
                        )}
                      </a>
                      <div className="flex gap-2 mt-1 relative z-10">
                        <span className="text-xs text-muted-foreground">{formatDate(article.date)}</span>
                        <a
                          href={`/articles?tag=${encodeURIComponent(article.tag)}`}
                          className="text-xs px-1.5 rounded border border-border text-muted-foreground hover:border-primary/60 hover:text-primary transition-colors"
                        >
                          {article.tag}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-mono text-sm text-muted-foreground mt-3 mb-8">{"# ---"}</p>

              <a href="/articles" className="cli-command inline-block">
                &gt;<span className="cursor-blink">_</span> ls articles --all
              </a>
            </div>

            {/* Right panel — stats + tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:sticky md:top-24 min-w-0">
              <TerminalCard title="stats.sh">
                <div className="terminal-body space-y-1.5">
                  <div className="flex gap-2">
                    <span className="text-terminal-prompt select-none">$</span>
                    <span className="text-terminal-foreground">ls articles | wc -l</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-terminal-prompt select-none">{">"}</span>
                    <span className="text-primary font-mono">{posts.length}</span>
                    <span className="text-muted-foreground">articles published</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-terminal-prompt select-none">$</span>
                    <span className="text-terminal-foreground">ls tags | wc -l</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-terminal-prompt select-none">{">"}</span>
                    <span className="text-primary font-mono">{topTags.length}</span>
                    <span className="text-muted-foreground">topics covered</span>
                  </div>
                </div>
              </TerminalCard>

              <TerminalCard title="tags.sh">
                <div className="terminal-body">
                  <div className="flex gap-2 mb-3">
                    <span className="text-terminal-prompt select-none">$</span>
                    <span className="text-terminal-foreground">ls tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topTags.map(([tag, count]) => (
                      <a
                        key={tag}
                        href={`/articles?tag=${encodeURIComponent(tag)}`}
                        className="font-mono text-xs px-2 py-1 rounded border border-border bg-card hover:border-primary/60 hover:text-primary text-muted-foreground transition-colors"
                      >
                        {tag}
                        <span className="ml-1 text-primary/70">{count}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </TerminalCard>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default ArticlesSection;
