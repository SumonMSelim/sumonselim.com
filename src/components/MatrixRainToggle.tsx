import { useState, useEffect } from "react";
import { Zap, ZapOff } from "lucide-react";

export const RAIN_KEY = "matrix-rain";
export const RAIN_EVENT = "matrix-rain-change";

const MatrixRainToggle = () => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(RAIN_KEY) !== "off";
  });

  // Sync if another instance changes state (e.g. mobile menu toggle)
  useEffect(() => {
    const handler = (e: Event) => {
      setEnabled((e as CustomEvent<boolean>).detail);
    };
    window.addEventListener(RAIN_EVENT, handler as EventListener);
    return () => window.removeEventListener(RAIN_EVENT, handler as EventListener);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(RAIN_KEY, next ? "on" : "off");
    window.dispatchEvent(new CustomEvent<boolean>(RAIN_EVENT, { detail: next }));
  };

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Disable matrix rain" : "Enable matrix rain"}
      title={enabled ? "Disable matrix rain" : "Enable matrix rain"}
      className="p-2 rounded-md border border-border bg-secondary text-secondary-foreground hover:border-primary transition-colors"
    >
      {enabled ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
    </button>
  );
};

export default MatrixRainToggle;
