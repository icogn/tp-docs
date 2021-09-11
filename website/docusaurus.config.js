const path = require('path');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'TP Docs',
  tagline: 'Twilight Princess at your fingertips',
  url: 'https://icogn.github.io',
  baseUrl: '/tp-docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'icogn',
  projectName: 'tp-docs',
  trailingSlash: false,
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
    },
    navbar: {
      title: 'TP Docs',
      logo: {
        alt: 'TP Docs Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   type: 'doc',
        //   docId: 'intro',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        // { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/icogn/tp-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      // links: [
      //   {
      //     title: 'Docs',
      //     items: [
      //       {
      //         label: 'Save File',
      //         to: '/docs/save-file/introduction',
      //       },
      //       {
      //         label: 'Technical Explanations',
      //         to: '/docs/technical-explanations/ostickstocalendartime',
      //       },
      //     ],
      //   },
      //   // {
      //   //   title: 'Community',
      //   //   items: [
      //   //     {
      //   //       label: 'Stack Overflow',
      //   //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //   //     },
      //   //     {
      //   //       label: 'Discord',
      //   //       href: 'https://discordapp.com/invite/docusaurus',
      //   //     },
      //   //     {
      //   //       label: 'Twitter',
      //   //       href: 'https://twitter.com/docusaurus',
      //   //     },
      //   //   ],
      //   // },
      //   {
      //     title: 'More',
      //     items: [
      //       // {
      //       //   label: 'Blog',
      //       //   to: '/blog',
      //       // },
      //       {
      //         label: 'GitHub',
      //         href: 'https://github.com/facebook/docusaurus',
      //       },
      //     ],
      //   },
      // ],
      copyright: `Copyright © ${new Date().getFullYear()} icogn`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/icogn/tp-docs/edit/main/website/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    path.resolve(__dirname, 'plugins/webpack-provide-plugin'),
    [
      path.resolve(__dirname, 'plugins/alias-plugin'),
      {
        alias: {
          '@local': path.resolve(__dirname, './src/components'),
        },
      },
    ],
    // [
    //   'docusaurus-plugin-module-alias',
    //   {
    //     alias: {
    //       '@local': path.resolve(__dirname, './src/components'),
    //     },
    //   },
    // ],
  ],
};
