import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Yantra',
  defaultTitle: 'Yantra',
  description:
    'Developed on Blast, Yantra is an immutable, decentralized, community-driven DEX with the goal of revolutionizing liquidity solutions.Our platform provides developers and consumers with deep and simply accessible liquidity by providing stable and effective liquidity settings. Providing "Real Yields" to all participants, Yantra hopes to establish a new benchmark as the Liquidity Hub of this ecosystem, being the first of its kind on Blast.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@Yantra',
    site: '@Yantra',
  },
  openGraph: {
    title: 'Yantra - immutable, decentralized, community-driven DEX on Blast',
    description:
      'Developed on Blast, Yantra is an immutable, decentralized, community-driven DEX with the goal of revolutionizing liquidity solutions.Our platform provides developers and consumers with deep and simply accessible liquidity by providing stable and effective liquidity settings. Providing "Real Yields" to all participants, Yantra hopes to establish a new benchmark as the Liquidity Hub of this ecosystem, being the first of its kind on Blast.',
    images: [{ url: 'https://yantra-assets.netlify.app/web/og/hero.jpg' }],
  },
}
