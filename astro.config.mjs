import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages project site. Dùng cho sitemap, RSS và canonical URL.
const SITE = "https://toannd021104.github.io";
// Repo name -> served dưới subpath này trên GitHub Pages.
const BASE = "/devops-blog2";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      // Theme code block: sáng và tối, dễ đọc
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      wrap: true,
    },
  },
});
