export const categories = [
  {
    slug: "casual-outfits",
    name: "Casual Outfits",
    shortName: "Casual",
    description:
      "Relaxed layers, broken-in denim, and everyday pieces that feel considered without looking too planned.",
    introduction:
      "Casual dressing is less about chasing trends and more about building a small rotation of relaxed layers that work with your real life. These stories focus on easy proportions, comfortable footwear, and the kind of outfits you can repeat all week.",
    image: "/images/articles/casual-knit-jeans.jpg",
    imageAlt: "Woman in a white knit sweater and blue jeans in a relaxed everyday outfit",
    note: "For school runs, coffee dates, errands, and long weekends.",
  },
  {
    slug: "chic-outfits",
    name: "Chic Outfits",
    shortName: "Chic",
    description:
      "Polished outfits built from beautiful coats, clean lines, and one thoughtful finishing detail.",
    introduction:
      "Chic does not require a closet full of new clothes. It comes from clear proportions, a restrained palette, and pieces that look as good in motion as they do standing still. These edits are designed to help you put those elements together.",
    image: "/images/articles/chic-trench-dress.jpg",
    imageAlt: "Woman in a trench coat and dress walking on a city street",
    note: "For dinners, gallery afternoons, and days that call for polish.",
  },
  {
    slug: "jeans-outfits",
    name: "Jeans Outfits",
    shortName: "Jeans",
    description:
      "The denim guide: straight-leg, wide-leg, and flared jeans styled with polished layers and comfortable shoes.",
    introduction:
      "Jeans are the backbone of most wardrobes, but the difference between an ordinary outfit and a memorable one is usually proportion, wash, and what you put around them. Here you will find practical ways to style the denim you already own.",
    image: "/images/articles/jeans-flared.jpg",
    imageAlt: "Woman in a white top and flared blue jeans",
    note: "For everyday outfits that still feel intentional.",
  },
  {
    slug: "neutral-outfits",
    name: "Neutral Outfits",
    shortName: "Neutral",
    description:
      "Cream, camel, gray, and espresso outfits with enough texture to keep a quiet palette interesting.",
    introduction:
      "A neutral wardrobe is not a boring one. The most elegant outfits often rely on subtle shifts in tone and texture: a soft knit against smooth leather, warm ivory beside cool gray, or a deep brown grounding a pale camel coat.",
    image: "/images/articles/neutral-coat-trousers.jpg",
    imageAlt: "Woman in a beige coat and matching trousers",
    note: "For a wardrobe that mixes easily and ages well.",
  },
  {
    slug: "capsule-wardrobe",
    name: "Capsule Wardrobe",
    shortName: "Capsule",
    description:
      "A practical approach to a smaller wardrobe, with versatile pieces and repeatable outfit formulas.",
    introduction:
      "A capsule wardrobe is a small, intentional collection of pieces that combine in many ways. It is not a strict uniform or a shopping challenge. It is a useful editing tool for people who want to get dressed quickly without losing the pleasure of personal style.",
    image: "/images/articles/capsule-flatlay.jpg",
    imageAlt: "Flat lay of a neutral jacket, knit, denim, and shoulder bag",
    note: "For fewer decisions and more outfits you actually wear.",
  },
  {
    slug: "boots-outfits",
    name: "Boots Outfits",
    shortName: "Boots",
    description:
      "Ankle boots, knee-high boots, and the hemlines, denim, and layers that make them look their best.",
    introduction:
      "The right pair of boots can change the mood of an entire outfit. This collection focuses on the details that matter: shaft height, toe shape, heel, and the space between the boot and the hem of your jeans, skirt, or dress.",
    image: "/images/articles/fall-outfits-with-jeans.jpg",
    imageAlt: "Tan ankle boots styled with cuffed blue jeans",
    note: "For polished walks, rainy commutes, and all-day wear.",
  },
  {
    slug: "work-outfits",
    name: "Work Outfits",
    shortName: "Workwear",
    description:
      "Office-ready outfits that balance polish, comfort, and the realities of a real working week.",
    introduction:
      "Workwear works best when it feels like a refined version of your personal style rather than a costume for the office. These stories focus on tailoring, versatile layers, comfortable shoes, and outfits that transition easily from desk to dinner.",
    image: "/images/articles/work-olive-suit.jpg",
    imageAlt: "Woman in an olive-green blazer and trousers on a city sidewalk",
    note: "For offices, presentations, and everything in between.",
  },
  {
    slug: "date-night-outfits",
    name: "Date Night Outfits",
    shortName: "Date Night",
    description:
      "Romantic but practical evening looks with boots, slip skirts, dark denim, and a little subtle shine.",
    introduction:
      "A good date-night outfit should feel like a more intentional version of you, not a departure from your everyday style. These ideas pair richer textures with comfortable shoes and pieces you can wear long after the evening ends.",
    image: "/images/articles/date-red-dress.jpg",
    imageAlt: "Woman in a red dress on a city street",
    note: "For dinners, theater nights, and long walks home.",
  },
];

export const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));
export const categoryByName = new Map(categories.map((category) => [category.name, category]));

export function getCategoryBySlug(slug) {
  return categoryBySlug.get(slug) || null;
}

export function getCategoryByName(name) {
  return categoryByName.get(name) || null;
}

export function getCategorySlugs() {
  return categories.map((category) => category.slug);
}
