import type { ReactNode } from "react";

interface TerminalCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const TerminalCard = ({ title = "terminal", children, className = "" }: TerminalCardProps) => (
  <div className={`terminal-card ${className}`} role="region" aria-label={title}>
    <div className="terminal-header">
      <span className="terminal-dot bg-destructive" />
      <span className="terminal-dot" style={{ backgroundColor: "hsl(45, 90%, 50%)" }} />
      <span className="terminal-dot bg-primary" />
      <span className="ml-2 text-xs font-mono text-muted-foreground">{title}</span>
    </div>
    {children}
  </div>
);

export default TerminalCard;
