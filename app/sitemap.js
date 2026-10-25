import { getAllArticles } from "@/lib/articles";
import { categories } from "@/lib/categories";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap() {
  const articles = getAllArticles();
  const latestDate = articles[0] ? new Date(`${articles[0].date}T12:00:00Z`) : new Date();

  const staticPages = [
    { path: "/", priority: 1, changeFrequency: "weekly", lastModified: latestDate },
    { path: "/blog/", priority: 0.9, changeFrequency: "weekly", lastModified: latestDate },
    { path: "/top-outfits/", priority: 0.9, changeFrequency: "weekly", lastModified: latestDate },
    { path: "/categories/", priority: 0.8, changeFrequency: "monthly", lastModified: latestDate },
    { path: "/about/", priority: 0.5, changeFrequency: "yearly", lastModified: latestDate },
    { path: "/contact/", priority: 0.4, changeFrequency: "yearly", lastModified: latestDate },
    {
      path: "/privacy-policy/",
      priority: 0.2,
      changeFrequency: "yearly",
      lastModified: latestDate,
    },
    {
      path: "/affiliate-disclosure/",
      priority: 0.3,
      changeFrequency: "yearly",
      lastModified: latestDate,
    },
    {
      path: "/image-credits/",
      priority: 0.3,
      changeFrequency: "yearly",
      lastModified: latestDate,
    },
  ].map((page) => ({
    url: `${siteConfig.url}${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const categoryPages = categories.map((category) => {
    const categoryArticles = articles.filter((article) => article.categorySlug === category.slug);
    const categoryDate = categoryArticles[0]
      ? new Date(`${categoryArticles[0].date}T12:00:00Z`)
      : latestDate;

    return {
      url: `${siteConfig.url}/categories/${category.slug}/`,
      lastModified: categoryDate,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  const articlePages = articles.map((article) => ({
    url: `${siteConfig.url}/blog/${article.slug}/`,
    lastModified: new Date(`${article.updated || article.date}T12:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
