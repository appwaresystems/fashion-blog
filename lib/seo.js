import { absoluteUrl, siteConfig } from "./site-config";

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image = "/images/articles/chic-trench-dress.jpg",
  imageAlt = "Woman in a trench coat and dress walking on a city street",
  openGraphType = "website",
  publishedTime,
  modifiedTime,
  tags = [],
  titleAbsolute = false,
}) {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: openGraphType,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1800,
          alt: imageAlt,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(tags.length ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function buildArticleJsonLd(article) {
  const articleUrl = absoluteUrl(`/blog/${article.slug}/`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    headline: article.title,
    description: article.description,
    image: [absoluteUrl(article.cover)],
    datePublished: `${article.date}T12:00:00+00:00`,
    dateModified: `${article.updated || article.date}T12:00:00+00:00`,
    author: {
      "@type": "Organization",
      name: article.author,
      url: absoluteUrl("/about/"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/logo-mark.svg"),
      },
    },
    articleSection: article.category,
    keywords: article.tags.join(", "),
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
  };
}

export function buildBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
