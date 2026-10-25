const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thestyleedit.pages.dev";

export const siteConfig = {
  name: "The Style Edit",
  shortName: "Style Edit",
  tagline: "A considered guide to getting dressed.",
  description:
    "The Style Edit is a fashion journal devoted to women's everyday outfits, elevated basics, capsule wardrobes, and the quiet pleasure of getting dressed well.",
  url: configuredUrl.replace(/\/$/, ""),
  locale: "en_US",
  language: "en-US",
  publisher: "The Style Edit",
  author: {
    name: "The Style Edit Editorial Team",
    url: "/about/",
  },
  contactEmail: "",
  pinterest: {
    profileUrl: "",
    verificationCode: "",
  },
  navigation: [
    { label: "The Edit", href: "/" },
    { label: "Top Outfits", href: "/top-outfits/" },
    { label: "Categories", href: "/categories/" },
    { label: "Capsule", href: "/categories/capsule-wardrobe/" },
    { label: "About", href: "/about/" },
  ],
  footerNavigation: [
    {
      title: "Explore",
      links: [
        { label: "Home", href: "/" },
        { label: "Top outfits", href: "/top-outfits/" },
        { label: "All categories", href: "/categories/" },
        { label: "About", href: "/about/" },
        { label: "Contact", href: "/contact/" },
      ],
    },
    {
      title: "The Journal",
      links: [
        { label: "Casual outfits", href: "/categories/casual-outfits/" },
        { label: "Chic outfits", href: "/categories/chic-outfits/" },
        { label: "Neutral outfits", href: "/categories/neutral-outfits/" },
        { label: "Date night outfits", href: "/categories/date-night-outfits/" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy/" },
        { label: "Affiliate Disclosure", href: "/affiliate-disclosure/" },
      ],
    },
  ],
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
