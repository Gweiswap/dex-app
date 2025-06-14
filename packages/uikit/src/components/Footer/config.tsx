import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon, RedditIcon, InstagramIcon, GithubIcon, DiscordIcon, YoutubeIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.yantra.exchange/contact-us",
      },
      {
        label: "Blog",
        href: "https://blog.yantra.exchange/",
      },
      {
        label: "Community",
        href: "https://docs.yantra.exchange/contact-us/telegram",
      },
      {
        label: "CAKE",
        href: "https://docs.yantra.exchange/tokenomics/cake",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://pancakeswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.yantra.exchange/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.yantra.exchange/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.yantra.exchange/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/pancakeswap",
      },
      {
        label: "Documentation",
        href: "https://docs.yantra.exchange",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.yantra.exchange/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.yantra.exchange/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/pancakeswap",
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
    items: [
      {
        label: "English",
        href: "https://t.me/pancakeswap",
      },
      {
        label: "Bahasa Indonesia",
        href: "https://t.me/pancakeswapIndonesia",
      },
      {
        label: "中文",
        href: "https://t.me/pancakeswap_CN",
      },
      {
        label: "Tiếng Việt",
        href: "https://t.me/PancakeSwapVN",
      },
      {
        label: "Italiano",
        href: "https://t.me/pancakeswap_Ita",
      },
      {
        label: "русский",
        href: "https://t.me/pancakeswap_ru",
      },
      {
        label: "Türkiye",
        href: "https://t.me/pancakeswapturkiye",
      },
      {
        label: "Português",
        href: "https://t.me/pancakeswapPortuguese",
      },
      {
        label: "Español",
        href: "https://t.me/pancakeswapES",
      },
      {
        label: "日本語",
        href: "https://t.me/pancakeswapJP",
      },
      {
        label: "Français",
        href: "https://t.me/pancakeswapFR",
      },
      {
        label: "Deutsch",
        href: "https://t.me/pancakeswap_DE",
      },
      {
        label: "Filipino",
        href: "https://t.me/pancakeswap_PH",
      },
      {
        label: "ქართული ენა",
        href: "https://t.me/pancakeswapGeorgia",
      },
      {
        label: "हिन्दी",
        href: "https://t.me/pancakeswap_INDIA",
      },
      {
        label: "Announcements",
        href: "https://t.me/PancakeSwapAnn",
      },
    ],
  },
  {
    label: "Reddit",
    icon: RedditIcon,
    href: "https://reddit.com/r/pancakeswap",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://instagram.com/pancakeswap_official",
  },
  {
    label: "Github",
    icon: GithubIcon,
    href: "https://github.com/pancakeswap/",
  },
  {
    label: "Discord",
    icon: DiscordIcon,
    href: "https://discord.gg/pancakeswap",
  },
  {
    label: "Youtube",
    icon: YoutubeIcon,
    href: "https://www.youtube.com/@pancakeswap_official",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
