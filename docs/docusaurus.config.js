module.exports = {
  title: "FurPort Docs",
  tagline: "FurPort ドキュメント",
  url: "https://www.furport.tk/docs",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "lapi.gq", // Usually your GitHub org/user name.
  projectName: "FurPort", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "FurPort Docs",
      logo: {
        alt: "FurPort Logo",
        src: "img/furportLogoImageTrimmed.png",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        {
          href: "https://github.com/lapi-hotel-group/furport-front",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Style Guide",
              to: "docs/",
            },
            {
              label: "Second Doc",
              to: "docs/doc2/",
            },
          ],
        },
        {
          title: "FurPort",
          items: [
            {
              label: "FurPort",
              href: "https://www.furport.tk/",
            },
            {
              label: "FurPort API",
              href: "https://api.furport.tk/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/lapi-hotel-group/furport-front",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} lapi.gq. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: "doc1",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/lapi-hotel-group/furport-front",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
