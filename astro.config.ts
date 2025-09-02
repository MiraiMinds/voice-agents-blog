import { loadEnv } from "vite";
import { defineConfig } from "astro/config";

import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import spectre from "./package/src";

import { spectreDark } from "./src/ec-theme";

// https://astro.build/config
const config = defineConfig({
  site: "https://blog.miraiminds.co",
  output: "static",
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx(),
    sitemap(),
    spectre({
      name: "Engineering Tales- Voice Agent",
      openGraph: {
        home: {
          title: "Engineering Tales - Voice Agent",
          description: "All tales of building a voice agent.",
        },
        blog: {
          title: "Blog",
          description: "Tales of Voice agent building.",
        },
      },
    }),
  ],
});

export default config;
