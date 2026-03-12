import { useEffect, useRef, useState } from "react";
import { RAIN_KEY, RAIN_EVENT } from "./MatrixRainToggle";

const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[];=+-*&^%$#@!";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(RAIN_KEY) !== "off";
  });

  useEffect(() => {
    const handler = (e: Event) => {
      setVisible((e as CustomEvent<boolean>).detail);
    };
    window.addEventListener(RAIN_EVENT, handler as EventListener);
    return () => window.removeEventListener(RAIN_EVENT, handler as EventListener);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!visible) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const fontSize = 14;
    let drops: number[] = [];
    let drawInterval = 0;

    let trailColor = "rgba(0, 0, 0, 0.05)";
    let primaryColor = "#00ff41";
    let glowColor = "#00ff8c";
    let isDark = true;

    const updateThemeColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const background = styles.getPropertyValue("--background").trim();
      const primary = styles.getPropertyValue("--primary").trim();
      const glow = styles.getPropertyValue("--glow").trim();
      isDark = document.documentElement.classList.contains("dark");

      trailColor = `hsl(${background} / ${isDark ? "0.10" : "0.12"})`;
      primaryColor = `hsl(${primary})`;
      glowColor = `hsl(${glow})`;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.max(1, Math.floor(canvas.width / fontSize));
      drops = Array.from({ length: columns }, () => Math.random() * -120);
    };

    const draw = () => {
      ctx.fillStyle = trailColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = Math.random() > 0.88 ? glowColor : primaryColor;
        ctx.globalAlpha = Math.random() * 0.4 + 0.6;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }

      ctx.globalAlpha = 1;
    };

    const themeObserver = new MutationObserver(updateThemeColors);

    updateThemeColors();
    resize();
    drawInterval = window.setInterval(draw, 55);

    window.addEventListener("resize", resize);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => {
      window.clearInterval(drawInterval);
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
    };
  }, [visible]);

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
};

export default MatrixRain;
