import type { BunpressConfig } from 'bunpress'

const config: BunpressConfig = {
  name: 'ts-numbers',
  description: 'Comprehensive TypeScript library for formatting numbers, currencies, and numeric inputs',
  url: 'https://ts-numbers.stacksjs.org',
  theme: 'docs',

  nav: [
    { text: 'Guide', link: '/guide' },
    { text: 'Features', link: '/features' },
    { text: 'Advanced', link: '/advanced' },
    { text: 'API', link: '/api-reference' },
    { text: 'GitHub', link: 'https://github.com/stacksjs/ts-numbers' },
  ],

  sidebar: {
    '/guide/': [
      { text: 'Introduction', link: '/guide' },
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Currency Formatting', link: '/guide/currency' },
      { text: 'All Format Types', link: '/guide/formats' },
    ],
    '/features/': [
      { text: 'Overview', link: '/features' },
      { text: 'Core Formatting', link: '/features/core-formatting' },
      { text: 'Currency Support', link: '/features/currency-support' },
      { text: 'Internationalization', link: '/features/internationalization' },
      { text: 'Specialized Formats', link: '/features/specialized-formats' },
      { text: 'Input Events', link: '/features/input-events' },
    ],
    '/advanced/': [
      { text: 'Overview', link: '/advanced' },
      { text: 'Presets', link: '/advanced/presets' },
      { text: 'Scientific Notation', link: '/advanced/scientific-notation' },
      { text: 'Unit Conversion', link: '/advanced/unit-conversion' },
      { text: 'Style Rules', link: '/advanced/style-rules' },
      { text: 'Extended Persistence', link: '/advanced/extended-persistence' },
    ],
  },

  search: true,
  editLink: {
    pattern: 'https://github.com/stacksjs/ts-numbers/edit/main/docs/:path',
    text: 'Edit this page on GitHub',
  },

  socialLinks: [
    { icon: 'github', link: 'https://github.com/stacksjs/ts-numbers' },
    { icon: 'discord', link: 'https://discord.gg/stacksjs' },
  ],
}

export default config
