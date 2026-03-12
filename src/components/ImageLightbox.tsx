import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  containerClass?: string;
}

const ImageLightbox = ({ containerClass = "rich-content" }: Props) => {
  const [active, setActive] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const containers = document.querySelectorAll(`.${containerClass}`);
    const cleanup: (() => void)[] = [];

    containers.forEach((container) => {
      container.querySelectorAll("img").forEach((img) => {
        (img as HTMLElement).style.cursor = "zoom-in";
        const handler = () => setActive({ src: img.src, alt: img.alt ?? "" });
        img.addEventListener("click", handler);
        cleanup.push(() => img.removeEventListener("click", handler));
      });
    });

    return () => cleanup.forEach((fn) => fn());
  }, [containerClass]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {active && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <button
            autoFocus
            onClick={() => setActive(null)}
            aria-label="Close lightbox"
            className="absolute top-4 right-4 p-2 rounded-md border border-border bg-card text-foreground hover:border-primary transition-colors font-mono text-xs z-10"
          >
            [x]
          </button>
          <motion.div
            key={active.src}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg border border-border"
            />
            {active.alt && (
              <p className="mt-4 font-mono text-sm text-muted-foreground text-center">
                {active.alt}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ImageLightbox;
