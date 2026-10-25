import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { getCategoryByName } from "./categories";

const articlesDirectory = path.join(process.cwd(), "content", "articles");
const publicDirectory = path.join(process.cwd(), "public");
const fallbackImage = "/images/fallback-editorial.svg";

let articleCache = null;

function logWarning(message) {
  console.warn(`[content] ${message}`);
}

function sanitiseSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normaliseDate(value) {
  if (!value) {
    return null;
  }

  const raw = value instanceof Date ? value.toISOString().slice(0, 10) : String(value).slice(0, 10);
  const parsed = new Date(`${raw}T12:00:00Z`);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return raw;
}

function normaliseTags(value) {
  if (!value) {
    return [];
  }

  const values = Array.isArray(value) ? value : String(value).split(",");
  return [...new Set(values.map((tag) => String(tag).trim()).filter(Boolean))];
}

function isSafeLocalImage(src) {
  if (typeof src !== "string" || !src.startsWith("/images/")) {
    return false;
  }

  const relativePath = src.replace(/^\/+/, "");
  const absolutePath = path.resolve(publicDirectory, relativePath);
  const publicRoot = path.resolve(publicDirectory);

  if (!absolutePath.startsWith(`${publicRoot}${path.sep}`)) {
    return false;
  }

  return fs.existsSync(absolutePath) && fs.statSync(absolutePath).isFile();
}

function resolveImage(src, fallbackAlt) {
  if (isSafeLocalImage(src)) {
    return src;
  }

  if (src) {
    logWarning(`Image not found: ${src}. Using the editorial fallback image.`);
  }

  return fallbackImage;
}

function estimateReadingTime(markdown) {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/[#>*_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = plainText ? plainText.split(" ").length : 0;
  return {
    wordCount,
    readingTime: Math.max(1, Math.ceil(wordCount / 225)),
  };
}

function parseArticleFile(fileName) {
  const fullPath = path.join(articlesDirectory, fileName);

  try {
    const source = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(source);
    const title = typeof data.title === "string" ? data.title.trim() : "";
    const description = typeof data.description === "string" ? data.description.trim() : "";
    const date = normaliseDate(data.date);
    const category = getCategoryByName(data.category);

    if (!title || !description || !date) {
      logWarning(`Skipping ${fileName}: title, description, and a valid date are required.`);
      return null;
    }

    if (!category) {
      logWarning(`Skipping ${fileName}: category "${data.category || ""}" is not defined.`);
      return null;
    }

    const slug = sanitiseSlug(data.slug || fileName.replace(/\.md$/, ""));

    if (!slug) {
      logWarning(`Skipping ${fileName}: a valid slug could not be generated.`);
      return null;
    }

    const body = content.trim();
    const cover = resolveImage(
      typeof data.cover === "string" ? data.cover : "",
      title,
    );
    const coverAlt =
      typeof data.coverAlt === "string" && data.coverAlt.trim()
        ? data.coverAlt.trim()
        : `Editorial cover image for ${title}`;
    const { wordCount, readingTime } = estimateReadingTime(body);

    return {
      slug,
      title,
      description,
      date,
      category: category.name,
      categorySlug: category.slug,
      tags: normaliseTags(data.tags),
      cover,
      coverAlt,
      featured: Boolean(data.featured),
      draft: Boolean(data.draft),
      affiliate: Boolean(data.affiliate),
      author:
        typeof data.author === "string" && data.author.trim()
          ? data.author.trim()
          : "The Style Edit Editorial Team",
      updated: normaliseDate(data.updated),
      body,
      wordCount,
      readingTime,
    };
  } catch (error) {
    logWarning(`Could not read ${fileName}: ${error.message}`);
    return null;
  }
}

function loadArticles() {
  if (articleCache) {
    return articleCache;
  }

  if (!fs.existsSync(articlesDirectory)) {
    logWarning(`Articles directory not found at ${articlesDirectory}.`);
    articleCache = [];
    return articleCache;
  }

  const files = fs
    .readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort();

  const parsed = files.map(parseArticleFile).filter(Boolean);
  const seenSlugs = new Set();

  articleCache = parsed.filter((article) => {
    if (seenSlugs.has(article.slug)) {
      logWarning(`Skipping duplicate article slug: ${article.slug}`);
      return false;
    }

    seenSlugs.add(article.slug);
    return true;
  });

  return articleCache;
}

function sortByDateDescending(articles) {
  return [...articles].sort((a, b) => {
    const dateComparison = b.date.localeCompare(a.date);
    return dateComparison || a.title.localeCompare(b.title);
  });
}

export function getAllArticles({ includeDrafts = false } = {}) {
  const articles = loadArticles();
  return sortByDateDescending(
    includeDrafts ? articles : articles.filter((article) => !article.draft),
  );
}

export function getArticleBySlug(slug) {
  return getAllArticles().find((article) => article.slug === slug) || null;
}

export function getArticleSlugs() {
  return getAllArticles().map((article) => article.slug);
}

export function getFeaturedArticles(limit = 3) {
  const articles = getAllArticles();
  const featured = articles.filter((article) => article.featured);
  const remainder = articles.filter((article) => !article.featured);
  return [...featured, ...remainder].slice(0, limit);
}

export function getArticlesByCategory(categorySlug) {
  return getAllArticles().filter((article) => article.categorySlug === categorySlug);
}

export function getLatestArticles(limit = 6) {
  return getAllArticles().slice(0, limit);
}

export function getAdjacentArticles(slug) {
  const articles = getAllArticles();
  const index = articles.findIndex((article) => article.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? articles[index - 1] : null,
    next: index < articles.length - 1 ? articles[index + 1] : null,
  };
}

export function getRelatedArticles(article, limit = 3) {
  if (!article) {
    return [];
  }

  const scored = getAllArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => article.tags.includes(tag)).length;
      const categoryScore = candidate.categorySlug === article.categorySlug ? 4 : 0;
      return { candidate, score: categoryScore + sharedTags * 2 };
    })
    .sort((a, b) => {
      return b.score - a.score || b.candidate.date.localeCompare(a.candidate.date);
    });

  return scored.slice(0, limit).map(({ candidate }) => candidate);
}

export function getSearchIndex() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category,
    categorySlug: article.categorySlug,
    tags: article.tags,
    cover: article.cover,
    coverAlt: article.coverAlt,
    date: article.date,
    readingTime: article.readingTime,
  }));
}

function nodeToText(node) {
  if (!node) {
    return "";
  }

  if (typeof node.value === "string") {
    return node.value;
  }

  if (Array.isArray(node.children)) {
    return node.children.map(nodeToText).join("");
  }

  return "";
}

function replaceContentImages(html) {
  return html.replace(/<img\b[^>]*>/g, (tag) => {
    const srcMatch = tag.match(/\bsrc="([^"]*)"/i);
    const altMatch = tag.match(/\balt="([^"]*)"/i);
    const src = resolveImage(srcMatch ? srcMatch[1] : "", "Fashion editorial");
    const alt = altMatch ? altMatch[1] : "Fashion editorial";

    return `<img src="${src}" alt="${alt}" width="1200" height="1800" loading="lazy" decoding="async" />`;
  });
}

export async function renderArticleBody(markdown) {
  const headings = [];

  const processor = remark()
    .use(() => (tree) => {
      const slugger = new GithubSlugger();

      function visit(node) {
        if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
          const text = nodeToText(node).trim();
          const headingSlug = slugger.slug(text);

          node.data = {
            ...(node.data || {}),
            hProperties: {
              ...((node.data && node.data.hProperties) || {}),
              id: headingSlug,
            },
          };

          headings.push({
            id: `user-content-${headingSlug}`,
            text,
            level: node.depth,
          });
        }

        if (Array.isArray(node.children)) {
          node.children.forEach(visit);
        }
      }

      visit(tree);
    })
    .use(remarkHtml, {
      sanitize: true,
      allowDangerousHtml: false,
    });

  const rendered = await processor.process(markdown || "");
  const html = replaceContentImages(String(rendered));

  return { html, headings };
}
