import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import MatrixRainToggle from "./MatrixRainToggle";
import RotatingText from "./RotatingText";

const navItems = [
  { label: "About", page: "/about" },
  { label: "Articles", page: "/articles" },
  { label: "Mentorship", page: "/mentorship" },
  { label: "Privacy", page: "/privacy-policy" },
];

interface NavbarProps {
  currentPath?: string;
}

const Navbar = ({ currentPath = "/" }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/80 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-background/50" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <a href="/" className="font-mono text-sm text-primary font-semibold tracking-wider flex items-center gap-1">
            <span className="text-muted-foreground">~/</span>
            <RotatingText text="sumonselim" className="text-primary" interval={4000} />
            <span className="cursor-blink">_</span>
          </a>

          <div className="hidden sm:flex items-center gap-1">
            {navItems.map(({ label, page }) => (
              <a
                key={label}
                href={page}
                aria-current={currentPath === page ? "page" : undefined}
                className="nav-hover font-mono text-sm text-muted-foreground px-2 py-1"
              >
                <span className="text-primary">./</span>
                <RotatingText text={label.toLowerCase()} interval={6000} />
              </a>
            ))}
            <MatrixRainToggle />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <MatrixRainToggle />
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="p-2 rounded-md border border-border bg-secondary text-secondary-foreground hover:border-primary transition-colors font-mono text-xs"
            >
              {open ? "[x]" : "[=]"}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center transition-opacity duration-250 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-md border border-border bg-secondary text-secondary-foreground hover:border-primary transition-colors font-mono text-xs"
          aria-label="Close menu"
        >
          [x]
        </button>

        <div className="terminal-card w-[85vw] max-w-sm">
          <div className="terminal-header">
            <span className="terminal-dot bg-destructive" />
            <span className="terminal-dot" style={{ backgroundColor: "hsl(45, 90%, 50%)" }} />
            <span className="terminal-dot bg-primary" />
            <span className="ml-2 text-xs font-mono text-muted-foreground">navigation.sh</span>
          </div>
          <div className="p-5 space-y-1">
            <p className="font-mono text-xs text-muted-foreground mb-4">
              <span className="text-primary">#!/bin/sh</span>{" # navigate"}
            </p>
            {navItems.map(({ label, page }, i) => (
              <a
                key={label}
                href={page}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 font-mono text-base text-foreground hover:text-primary transition-colors py-2.5 px-3 -mx-3 rounded hover:bg-secondary/50"
                style={{ transitionDelay: open ? `${0.05 + i * 0.04}s` : "0s" }}
              >
                <span className="text-primary text-sm shrink-0">▸</span>
                <span className="text-muted-foreground text-sm">./</span>
                <RotatingText text={label.toLowerCase()} interval={5000 + i * 500} />
              </a>
            ))}
            <p className="font-mono text-xs text-muted-foreground mt-4">{"# done"}</p>
          </div>
        </div>

        <p className="font-mono text-[10px] text-muted-foreground mt-6">
          // press <span className="text-primary">ESC</span> to close
        </p>
      </div>
    </>
  );
};

export default Navbar;
