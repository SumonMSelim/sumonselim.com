import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

const THEME_KEY = "theme";
const THEME_CHANGE_EVENT = "app-theme-change";

const isTheme = (value: string | null): value is Theme => value === "light" || value === "dark";

const getStoredTheme = (): Theme => {
  const saved = localStorage.getItem(THEME_KEY);
  return isTheme(saved) ? saved : "dark";
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  root.style.colorScheme = theme;
};

const ThemeToggle = () => {
  // SSR default "dark" avoids hydration mismatch (#418/#423).
  // On mount, read from the DOM (already set correctly by the inline
  // script in Layout.astro) so we never re-apply the theme and cause a flash.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
    window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: next }));
  };

  useEffect(() => {
    const syncFromOtherToggle = (event: Event) => {
      const incoming = (event as CustomEvent<Theme>).detail;
      if (incoming && incoming !== theme) {
        setTheme(incoming);
        applyTheme(incoming);
      }
    };
    const syncFromStorage = (event: StorageEvent) => {
      if (event.key !== THEME_KEY || !isTheme(event.newValue)) return;
      if (event.newValue !== theme) {
        setTheme(event.newValue);
        applyTheme(event.newValue);
      }
    };
    window.addEventListener(THEME_CHANGE_EVENT, syncFromOtherToggle as EventListener);
    window.addEventListener("storage", syncFromStorage);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, syncFromOtherToggle as EventListener);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, [theme]);

  const Icon = theme === "dark" ? Moon : Sun;
  const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="p-2 rounded-md border border-border bg-secondary text-secondary-foreground hover:border-primary transition-colors"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
};

export default ThemeToggle;
