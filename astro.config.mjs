import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://www.sumonselim.com",

  markdown: {
    shikiConfig: {
      // Dual theme: light and dark variants switch via CSS variables
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },

  integrations: [
    // MDX — explicitly pass shiki dual-theme so code blocks in .mdx highlight correctly
    mdx({
      shikiConfig: {
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      },
    }),

    // React islands — only hydrates components with client:* directives
    react(),

    // Tailwind — applyBaseStyles: false because we manage base styles in src/index.css
    tailwind({ applyBaseStyles: false }),

    // Auto-generate sitemap at build time
    sitemap(),
  ],

  // Static Site Generation — pre-render everything at build time
  output: "static",

  // Dev server settings (matches Docker compose port)
  server: {
    port: 4321,
    host: true, // bind to 0.0.0.0 so Docker can expose the port
  },

  // Vite passthrough for path aliases and Docker file-watching
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      watch: {
        // Polling required inside Docker on macOS/Windows (inotify doesn't work)
        usePolling: !!process.env.CHOKIDAR_USEPOLLING,
      },
    },
  },
});
