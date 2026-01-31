import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Continuous Carousel 🎠",
  description: "Lightweight vanilla JS carousel with CSS animations",
  base: "/continuous-carousel/",

  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Examples", link: "/examples/horizontal" },
      { text: "API", link: "/guide/api" },
      {
        text: "v0.4.1",
        items: [
          { text: "Changelog", link: "/changelog" },
          { text: "Migration", link: "/migration" },
        ],
      },
      {
        text: "GitHub",
        link: "https://github.com/jonchretien/continuous-carousel",
      },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Configuration", link: "/guide/configuration" },
          { text: "API Methods", link: "/guide/api" },
          { text: "Styling", link: "/guide/styling" },
        ],
      },
      {
        text: "Examples",
        items: [
          { text: "Horizontal", link: "/examples/horizontal" },
          { text: "Vertical", link: "/examples/vertical" },
          { text: "Reverse", link: "/examples/reverse" },
          { text: "Advanced", link: "/examples/advanced" },
        ],
      },
      {
        text: "Resources",
        items: [
          { text: "Migration from v0.2", link: "/migration" },
          { text: "Changelog", link: "/changelog" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/jonchretien/continuous-carousel",
      },
    ],

    footer: {
      message: "Released under the MIT License.",
    },
  },
});
