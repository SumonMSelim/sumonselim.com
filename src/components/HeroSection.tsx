import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const taglines = [
  "Homo sapiens by birth",
  "Software engineer by profession",
  "Traveler & entrepreneur by passion",
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center relative py-20" aria-label="Introduction">
      <div className="container mx-auto px-4 max-w-5xl flex flex-col items-center text-center">
        <div className="space-y-6 animate-fade-in w-full">
          <p className="font-mono text-s text-primary glow-text tracking-[0.2em] uppercase"># Muhammad Sumon Molla Selim</p>

          <div className="h-[4rem] sm:h-[5rem] lg:h-[6.5rem] overflow-hidden" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.h1
                key={index}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="font-display text-2xl sm:text-3xl lg:text-5xl leading-[1.15] text-foreground"
              >
                {taglines[index]}
                <span className="text-primary glow-text">;</span>
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap justify-center gap-3 -mt-3">
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}
              className="cli-command inline-block"
            >
              &gt;<span className="cursor-blink">_</span> ./about
            </a>
            <a
              href="#articles"
              onClick={(e) => { e.preventDefault(); document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" }); }}
              className="cli-command inline-block"
            >
              &gt;<span className="cursor-blink">_</span> ./articles
            </a>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2 }, y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Scroll down"
      >
        <span className="font-mono text-[10px]">scroll</span>
        <span className="text-lg">↓</span>
      </motion.button>
    </section>
  );
};

export default HeroSection;
