import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const ProfileLightbox = ({ photoSrc }: { photoSrc: string }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const btn = document.getElementById("profile-photo-btn");
    if (!btn) return;
    const onClick = () => setOpen(true);
    btn.addEventListener("click", onClick);
    return () => btn.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Profile photo lightbox"
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={() => setOpen(false)}
    >
      <button
        autoFocus
        onClick={() => setOpen(false)}
        aria-label="Close lightbox"
        className="absolute top-4 right-4 p-2 rounded-md border border-border bg-card text-foreground hover:border-primary transition-colors font-mono text-xs z-10"
      >
        [x]
      </button>
      <div
        className="max-w-2xl max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photoSrc}
          alt="Sumon Molla Selim — speaking at Developers Conference 2023"
          className="max-w-full max-h-[80vh] object-contain rounded-lg border border-border"
          loading="lazy"
          decoding="async"
        />
        <p className="mt-4 font-mono text-sm text-muted-foreground text-center">
          Speaking at Developers Conference 2023
        </p>
      </div>
    </div>,
    document.body
  );
};

export default ProfileLightbox;
