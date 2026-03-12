import { useState } from "react";

interface Props {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-mono text-xs text-muted-foreground">// share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-xs px-2.5 py-1 rounded border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
      >
        Twitter / X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-xs px-2.5 py-1 rounded border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
      >
        LinkedIn
      </a>
      <button
        onClick={handleCopy}
        className="font-mono text-xs px-2.5 py-1 rounded border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
      >
        {copied ? "copied!" : "copy link"}
      </button>
    </div>
  );
};

export default ShareButtons;
