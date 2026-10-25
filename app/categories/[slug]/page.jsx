import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { NewsletterSection } from "@/components/newsletter-section";
import { getArticlesByCategory } from "@/lib/articles";
import { categories, getCategoryBySlug, getCategorySlugs } from "@/lib/categories";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return buildPageMetadata({
    title: category.name,
    description: category.description,
    path: `/categories/${category.slug}/`,
    image: category.image,
    imageAlt: category.imageAlt,
  });
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(category.slug);
  const otherCategories = categories.filter((item) => item.slug !== category.slug);
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories/" },
    { name: category.name, href: `/categories/${category.slug}/` },
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbItems)} />

      <div className="container-editorial pb-16 pt-6 sm:pt-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories/" },
            { label: category.name },
          ]}
        />

        <header className="mt-10 grid gap-10 border-b border-line pb-14 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow">{articles.length} stories in this edit</p>
            <h1 className="display-title mt-5 text-[3.4rem] sm:text-[5.4rem] lg:text-[6.2rem]">
              {category.name}
            </h1>
            <p className="mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-charcoal/80 sm:text-2xl">
              {category.introduction}
            </p>
            <p className="mt-5 font-sans text-sm leading-7 text-charcoal/65">{category.note}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-parchment">
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                priority
                loading="eager"
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </header>

        <section aria-labelledby="category-stories" className="py-14 sm:py-16">
          <div className="flex items-end justify-between gap-6 border-t border-line pt-6">
            <div>
              <p className="eyebrow">The collection</p>
              <h2 id="category-stories" className="section-title mt-3">
                {category.shortName}, considered.
              </h2>
            </div>
            <Link href="/blog/" className="text-link hidden sm:inline-flex">
              All stories
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} priority={index === 0} />
            ))}
          </div>
        </section>

        <section aria-labelledby="more-edits" className="border-t border-line py-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Keep browsing</p>
              <h2 id="more-edits" className="mt-3 font-serif text-3xl text-espresso">
                More wardrobe edits
              </h2>
            </div>
            <Link href="/categories/" className="text-link">
              All categories
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {otherCategories.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/categories/${item.slug}/`}
                  className="font-sans text-xs uppercase tracking-[0.1em] text-charcoal/70 transition-colors hover:text-burgundy"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <NewsletterSection />
    </>
  );
}
