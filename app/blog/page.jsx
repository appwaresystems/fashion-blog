import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { NewsletterSection } from "@/components/newsletter-section";
import { getAllArticles } from "@/lib/articles";
import { categories } from "@/lib/categories";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "All Outfit Stories",
  description:
    "Read every outfit guide from The Style Edit, from casual layering and neutral style to trench coats, jeans, boots, workwear, and date night looks.",
  path: "/blog/",
  image: "/images/articles/chic-fall-outfits.jpg",
  imageAlt: "Woman in a coat walking along a city sidewalk",
});

export default function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <>
      <div className="container-editorial pb-16 pt-6 sm:pt-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All stories" }]} />

        <header className="mt-12 grid gap-8 border-b border-line pb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">The full journal</p>
            <h1 className="display-title mt-5 text-[3.4rem] sm:text-[5.4rem]">
              Every story, <span className="italic">in the edit.</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="font-sans text-sm leading-7 text-charcoal/70">
              Outfit ideas, wardrobe notes, and practical styling advice for every day. Browse the
              complete archive or start with a mood.
            </p>
            <Link href="/categories/" className="text-link mt-5">
              Browse categories
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </header>

        <nav aria-label="Browse by category" className="border-b border-line py-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/categories/${category.slug}/`}
                  className="font-sans text-[0.62rem] font-semibold uppercase tracking-editorial text-charcoal/65 transition-colors hover:text-burgundy"
                >
                  {category.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="py-14" aria-label="All articles">
          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} priority={index < 2} />
            ))}
          </div>
        </section>
      </div>

      <NewsletterSection />
    </>
  );
}
