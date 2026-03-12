import { useEffect, useMemo, useState } from "react";

interface TerminalLine {
  text: string;
  prefix?: string;
  className?: string;
}

interface TerminalTypingProps {
  lines: Array<string | TerminalLine>;
  typingSpeed?: number;
  lineDelay?: number;
}

const normalizeLine = (line: string | TerminalLine): TerminalLine => {
  if (typeof line === "string") {
    return { text: line, prefix: "$", className: "text-terminal-foreground" };
  }

  return {
    prefix: "$",
    className: "text-terminal-foreground",
    ...line,
  };
};

const TerminalTyping = ({ lines, typingSpeed = 30, lineDelay = 420 }: TerminalTypingProps) => {
  const normalizedLines = useMemo(() => lines.map(normalizeLine), [lines]);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!normalizedLines.length) {
      setDisplayedLines([]);
      setIsComplete(true);
      return;
    }

    let timeoutId = 0;
    let cancelled = false;
    let lineIndex = 0;
    let charIndex = 0;

    setDisplayedLines([""]);
    setCurrentLine(0);
    setIsComplete(false);

    const typeNext = () => {
      if (cancelled) return;

      if (lineIndex >= normalizedLines.length) {
        setIsComplete(true);
        return;
      }

      const fullText = normalizedLines[lineIndex].text;

      if (charIndex <= fullText.length) {
        setDisplayedLines((prev) => {
          const next = [...prev];
          if (next.length <= lineIndex) next.push("");
          next[lineIndex] = fullText.slice(0, charIndex);
          return next;
        });

        setCurrentLine(lineIndex);
        charIndex += 1;
        timeoutId = window.setTimeout(typeNext, typingSpeed);
        return;
      }

      lineIndex += 1;
      charIndex = 0;

      if (lineIndex < normalizedLines.length) {
        setDisplayedLines((prev) => [...prev, ""]);
        setCurrentLine(lineIndex);
        timeoutId = window.setTimeout(typeNext, lineDelay);
      } else {
        setIsComplete(true);
      }
    };

    timeoutId = window.setTimeout(typeNext, typingSpeed);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [normalizedLines, typingSpeed, lineDelay]);

  return (
    <div className="terminal-body" role="log" aria-live="polite" aria-label="Terminal session">
      {displayedLines.map((_, i) => {
        const line = normalizedLines[i];
        if (!line) return null;

        return (
          <div key={`${line.prefix ?? "$"}-${i}`} className="flex gap-2">
            <span className="text-terminal-prompt select-none shrink-0">{line.prefix ?? "$"}</span>
            <span className={line.className}>
              {displayedLines[i] ?? ""}
              {i === currentLine && !isComplete && <span className="cursor-blink text-terminal-accent">▊</span>}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TerminalTyping;
