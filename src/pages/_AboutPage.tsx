import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import type { AboutData } from "@/lib/types";
import { formatDate } from "@/lib/types";

interface Props {
  about: AboutData;
}

const CREDLY_PROFILE = "https://www.credly.com/users/muhammad-sumon-molla-selim/badges";

const SocialIcon = ({ label }: { label: string }) => {
  const icons: Record<string, string> = {
    GitHub: "M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z",
    LinkedIn: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    "Twitter / X": "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    ADPList: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3a3 3 0 110 6 3 3 0 010-6zm0 14.5a7.5 7.5 0 01-6-3c.022-2 4-3.1 6-3.1s5.978 1.1 6 3.1a7.5 7.5 0 01-6 3z",
    "Stack Overflow": "M18.986 21.865v-6.404h2.134V24H0v-8.539h2.134v6.404h16.852zM3.723 13.708l10.002 2.107.403-1.973-10.002-2.107-.403 1.973zm1.218-4.922 9.22 4.2.891-1.804-9.22-4.2-.891 1.804zm2.542-4.58 7.726 6.168 1.29-1.647-7.726-6.169-1.29 1.647zM19.098 4.132l-1.638-1.228-4.879 6.563 1.638 1.228 4.879-6.563zM9.219 23.147h6.568v-2.14H9.219v2.14z",
    Email: "M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2l-8 5-8-5h16zm0 12H4V9l8 5 8-5v9z",
    SpeakerDeck: "M11.53 4.647c-.8.053-1.567.266-2.28.623a6.082 6.082 0 00-2.907 3.33 6.37 6.37 0 00-.41 2.108c.003.358.027.667.073.936.273 1.573 1.073 2.896 2.333 3.813l.27.198-.09.27c-.12.368-.373.883-.67 1.358-.197.31-.5.72-.768 1.047l-.14.16.17.053.447.137c.377.11.844.2 1.34.21.523.01.984-.07 1.373-.233.333-.14.573-.323.787-.6.1-.13.177-.266.247-.43l.07-.16.167.073c.72.303 1.49.46 2.28.463 3.363.01 6.117-2.7 6.127-6.04.01-3.34-2.737-6.073-6.12-6.066h-.02zm.02 2.77a3.313 3.313 0 110 6.627 3.313 3.313 0 010-6.627z",
    Sessionize: "M2 3a1 1 0 011-1h18a1 1 0 011 1v13a1 1 0 01-1 1h-7v2h3a1 1 0 010 2H7a1 1 0 010-2h3v-2H3a1 1 0 01-1-1V3zm2 1v11h16V4H4zm4 3h8v2H8V7zm0 4h6v2H8v-2z",
    Slides: "M4 3a2 2 0 00-2 2v14a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h16v14H4V5zm3 3v8l7-4-7-4z",
  };
  const d = icons[label];
  if (!d) return <span className="font-mono text-xs">{label.charAt(0)}</span>;
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
};

const AboutPage = ({ about }: Props) => {
  const hasBadges = about.credentials && about.credentials.length > 0;
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxSrc(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxSrc]);

  return (
    <main className="relative z-10 pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <AnimatedSection>
          <div className="mb-8">
            <a href="/" className="cli-command text-xs">&gt;<span className="cursor-blink">_</span> cd ~</a>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight mb-8">
            About Me
          </h1>

          {/* Photo + bio */}
          <div className="flex flex-col sm:flex-row gap-8 mb-10 items-stretch">
            {about.photo && (
              <motion.button
                onClick={() => setLightboxSrc(about.photo!)}
                aria-label="View profile photo fullscreen"
                className="shrink-0 w-full sm:w-72 rounded-lg overflow-hidden border border-border bg-card cursor-zoom-in group self-stretch"
                style={{ minHeight: "16rem" }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={about.photo}
                  alt="Sumon Molla Selim — speaking at Developers Conference 2023"
                  className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                  style={{ aspectRatio: "unset" }}
                />
              </motion.button>
            )}
            <div className="text-foreground/90 text-base sm:text-lg leading-[1.8] flex-1 self-center space-y-4">
              {about.bio.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Social links */}
          {about.socials && about.socials.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-10">
              {about.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-card text-foreground/70 hover:text-primary hover:border-primary/60 transition-colors font-mono text-xs"
                >
                  <SocialIcon label={s.label} />
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </AnimatedSection>
      </div>

      {/* Beyond Code */}
      <div className="container mx-auto px-4 max-w-4xl pb-10">
        <AnimatedSection delay={0.1}>
          <h2 className="font-display text-xl sm:text-2xl text-foreground mt-8 mb-4 leading-tight">Beyond Code</h2>
          <div className="text-foreground/90 text-base sm:text-lg leading-[1.8] space-y-4">
            {about.beyondCode.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Certifications */}
      <div className="container mx-auto px-4 max-w-4xl pb-10">
        <AnimatedSection delay={0.1}>
          <div className="flex items-center justify-between mt-8 mb-4">
            <h2 className="font-display text-xl sm:text-2xl text-foreground leading-tight">Certifications</h2>
            <a
              href={CREDLY_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary hover:text-primary/80 transition-colors"
            >
              View on Credly →
            </a>
          </div>

          {hasBadges ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {about.credentials!.map((cred, i) => (
                <motion.div
                  key={cred.badgeUrl || cred.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border bg-card text-center"
                >
                  <img
                    src={cred.imageUrl}
                    alt={cred.name}
                    className="w-20 h-20 object-contain"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-foreground text-xs font-medium leading-snug">
                      {cred.name}
                    </p>
                    {cred.issuer && (
                      <p className="text-muted-foreground text-[10px] mt-1">{cred.issuer}</p>
                    )}
                    {cred.issuedAt && (
                      <p className="font-mono text-[10px] text-muted-foreground/70 mt-0.5">
                        {formatDate(cred.issuedAt)}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {about.certifications.map((cert, i) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="p-4 rounded-lg border border-border bg-card"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-lg shrink-0">✦</span>
                    <p className="text-foreground text-sm font-medium">{cert}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatedSection>
      </div>

      {/* Photo lightbox */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {lightboxSrc && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Profile photo lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setLightboxSrc(null)}
            >
              <button
                autoFocus
                onClick={() => setLightboxSrc(null)}
                aria-label="Close lightbox"
                className="absolute top-4 right-4 p-2 rounded-md border border-border bg-card text-foreground hover:border-primary transition-colors font-mono text-xs z-10"
              >
                [x]
              </button>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="max-w-2xl max-h-[85vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightboxSrc}
                  alt="Sumon Molla Selim — speaking at Developers Conference 2023"
                  className="max-w-full max-h-[80vh] object-contain rounded-lg border border-border"
                />
                <p className="mt-4 font-mono text-sm text-muted-foreground text-center">
                  Speaking at Developers Conference 2023
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </main>
  );
};

export default AboutPage;
