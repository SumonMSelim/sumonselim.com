const buildDate = new Date().toISOString().slice(0, 10).replace(/-/g, ".");

const ascii = [
  "                                          _ _           ",
  " ___ _   _ _ __ ___   ___  _ __  ___  ___| (_)_ __ ___  ",
  "/ __| | | | '_ ` _ \\ / _ \\| '_ \\/ __|/ _ \\ | | '_ ` _ \\ ",
  "\\__ \\ |_| | | | | | | (_) | | | \\__ \\  __/ | | | | | | |",
  "|___/\\__,_|_| |_| |_|\\___/|_| |_|___/\\___|_|_|_| |_| |_|",
].join("\n");

const Footer = () => (
  <footer className="border-t border-border py-10 relative z-10" role="contentinfo">
    <div className="container mx-auto px-4 text-center">
      <div className="w-full overflow-x-auto mb-6" aria-hidden="true">
        <pre className="font-mono text-[9px] sm:text-[10px] leading-snug text-primary/60 block w-fit mx-auto select-none whitespace-pre">
          {ascii}
        </pre>
      </div>

      <p className="font-mono text-xs text-muted-foreground">
        <span className="text-primary">$</span>{" echo "}
        <span className="text-foreground/70">
          {"\"© "}{new Date().getFullYear()}{" Muhammad Sumon Molla Selim\""}
        </span>
      </p>
      <p className="font-mono text-[10px] text-muted-foreground/50 mt-1">
        {"# v"}{buildDate}
      </p>
      <p className="font-mono text-[10px] text-muted-foreground/50 mt-1">
        {"# exit 0"}
      </p>
    </div>
  </footer>
);

export default Footer;
