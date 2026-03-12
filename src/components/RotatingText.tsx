import { useState, useEffect } from "react";

const glitchChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface RotatingTextProps {
  text: string;
  className?: string;
  interval?: number;
  duration?: number;
}

const RotatingText = ({ text, className = "", interval = 3000, duration = 600 }: RotatingTextProps) => {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const timer = setInterval(() => {
      let step = 0;
      const totalSteps = text.length * 2;
      const stepInterval = duration / totalSteps;

      const scramble = setInterval(() => {
        step++;
        const resolved = Math.floor(step / 2);
        const chars = text.split("").map((ch, i) => {
          if (i < resolved) return ch;
          if (ch === " ") return " ";
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        });
        setDisplay(chars.join(""));

        if (step >= totalSteps) {
          clearInterval(scramble);
          setDisplay(text);
        }
      }, stepInterval);
    }, interval);

    return () => clearInterval(timer);
  }, [text, interval, duration]);

  return <span className={className}>{display}</span>;
};

export default RotatingText;
