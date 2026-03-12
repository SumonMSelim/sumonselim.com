import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface PhotoGalleryProps {
  photos: { src: string; alt: string; caption?: string }[];
}

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const count = photos.length;

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowRight") setLightbox(prev => prev === null ? 0 : (prev + 1) % count);
      else if (e.key === "ArrowLeft") setLightbox(prev => prev === null ? 0 : (prev - 1 + count) % count);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox === null, count]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Single image = full-width 16/9; multiple = 2-col grid */}
      <div className={`grid gap-3 my-6 ${photos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
        {photos.map((photo, i) => (
          <motion.button
            key={i}
            onClick={() => setLightbox(i)}
            className={`group relative rounded-lg overflow-hidden border border-border bg-card cursor-pointer ${photos.length === 1 ? "aspect-video" : "aspect-[4/3]"}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <span className="font-mono text-xs text-foreground truncate">
                {photo.caption || photo.alt}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox — portaled to document.body to avoid transform stacking context issues */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Photo gallery lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
            >
              {/* Close button */}
              <button
                autoFocus
                onClick={() => setLightbox(null)}
                aria-label="Close lightbox"
                className="absolute top-4 right-4 p-2 rounded-md border border-border bg-card text-foreground hover:border-primary transition-colors font-mono text-xs z-10"
              >
                [x]
              </button>

              {/* Nav arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + photos.length) % photos.length); }}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-md border border-border bg-card text-foreground hover:border-primary transition-colors font-mono text-sm z-10"
                  >
                    ←
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-md border border-border bg-card text-foreground hover:border-primary transition-colors font-mono text-sm z-10"
                  >
                    →
                  </button>
                </>
              )}

              {/* Image */}
              <motion.div
                key={lightbox}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl max-h-[80vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={photos[lightbox].src}
                  alt={photos[lightbox].alt}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg border border-border"
                />
                {photos[lightbox].caption && (
                  <p className="mt-4 font-mono text-sm text-muted-foreground text-center">
                    {photos[lightbox].caption}
                  </p>
                )}
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  {lightbox + 1} / {photos.length}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default PhotoGallery;
