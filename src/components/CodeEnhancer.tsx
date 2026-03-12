import { useEffect } from "react";

/**
 * Progressively enhances Shiki-highlighted code blocks with:
 * - Language label in header
 * - Copy-to-clipboard button
 * (Line numbers are handled via CSS counters on .line spans)
 */
const CodeEnhancer = () => {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>("pre.astro-code").forEach((pre) => {
      if (pre.closest(".code-block-wrapper")) return; // already enhanced

      const lang = pre.getAttribute("data-language") ?? "";

      // Wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";

      // Header bar
      const header = document.createElement("div");
      header.className = "code-block-header";

      const langLabel = document.createElement("span");
      langLabel.className = "code-block-lang";
      langLabel.textContent = lang || "code";

      const copyBtn = document.createElement("button");
      copyBtn.className = "code-block-copy";
      copyBtn.setAttribute("aria-label", "Copy code");
      copyBtn.innerHTML =
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><span>copy</span>';

      copyBtn.addEventListener("click", async () => {
        const codeEl = pre.querySelector("code");
        const text = codeEl?.innerText ?? pre.innerText;
        try {
          await navigator.clipboard.writeText(text);
          const span = copyBtn.querySelector("span");
          if (span) {
            span.textContent = "copied!";
            setTimeout(() => { span.textContent = "copy"; }, 2000);
          }
        } catch {
          // clipboard not available
        }
      });

      header.append(langLabel, copyBtn);

      pre.parentNode!.insertBefore(wrapper, pre);
      wrapper.append(header, pre);
    });
  }, []);

  return null;
};

export default CodeEnhancer;
