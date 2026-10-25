import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PinterestShare } from "@/components/pinterest-share";
import { PostNavigation } from "@/components/post-navigation";
import { RelatedArticles } from "@/components/related-articles";
import { TableOfContents } from "@/components/table-of-contents";
import {
  getAdjacentArticles,
  getArticleBySlug,
  getArticleSlugs,
  getRelatedArticles,
  renderArticleBody,
} from "@/lib/articles";
import { getCategoryBySlug } from "@/lib/categories";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  const metadata = buildPageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}/`,
    image: article.cover,
    imageAlt: article.coverAlt,
    openGraphType: "article",
    publishedTime: `${article.date}T12:00:00+00:00`,
    modifiedTime: `${article.updated || article.date}T12:00:00+00:00`,
    tags: article.tags,
  });

  return {
    ...metadata,
    keywords: article.tags,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const category = getCategoryBySlug(article.categorySlug);
  const relatedArticles = getRelatedArticles(article, 3);
  const { previous, next } = getAdjacentArticles(article.slug);
  const { html, headings } = await renderArticleBody(article.body);
  const articlePath = `/blog/${article.slug}/`;

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: article.category, href: `/categories/${article.categorySlug}/` },
    { name: article.title, href: articlePath },
  ];

  return (
    <>
      <JsonLd data={buildArticleJsonLd(article)} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbItems)} />

      <div className="container-editorial pb-16 pt-6 sm:pt-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: article.category, href: `/categories/${article.categorySlug}/` },
            { label: article.title },
          ]}
        />

        <header className="mx-auto mt-10 max-w-5xl text-center sm:mt-14">
          <Link
            href={`/categories/${article.categorySlug}/`}
            className="eyebrow transition-colors hover:text-burgundy"
          >
            {article.category}
          </Link>
          <h1 className="display-title mx-auto mt-5 max-w-4xl text-[3rem] sm:text-[4.5rem] lg:text-[5.6rem]">
            {article.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-charcoal/80 sm:text-2xl">
            {article.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-sans text-[0.62rem] font-medium uppercase tracking-editorial text-charcoal/60">
            <span>{article.author}</span>
            <span className="h-1 w-1 rounded-full bg-camel" aria-hidden="true" />
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span className="h-1 w-1 rounded-full bg-camel" aria-hidden="true" />
            <span>{article.readingTime} min read</span>
          </div>
        </header>

        <figure className="mt-10 sm:mt-14">
          <div className="relative aspect-[4/5] overflow-hidden bg-parchment sm:aspect-[16/10] lg:aspect-[16/8.5]">
            <Image
              src={article.cover}
              alt={article.coverAlt}
              fill
              priority
              loading="eager"
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-3 flex flex-col gap-1 font-sans text-[0.58rem] uppercase tracking-[0.14em] text-charcoal/45 sm:flex-row sm:justify-between">
            <span>Photograph via Pexels · Editorial styling inspiration</span>
            <span>Pin the portrait cover to save this story</span>
          </figcaption>
        </figure>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-32">
              <PinterestShare
                title={article.title}
                description={article.description}
                path={articlePath}
                image={article.cover}
                variant="icon"
              />
              <p className="mt-3 max-w-[13rem] font-sans text-[0.62rem] leading-5 text-charcoal/55">
                Opens Pinterest's Pin creator in a new tab. This button does not post automatically.
              </p>
              <TableOfContents headings={headings} className="mt-8" />
              {category ? (
                <div className="mt-8 border-t border-line pt-5">
                  <p className="eyebrow">Filed under</p>
                  <Link
                    href={`/categories/${category.slug}/`}
                    className="mt-2 block font-serif text-xl text-espresso transition-colors hover:text-burgundy"
                  >
                    {category.name}
                  </Link>
                  <p className="mt-2 font-sans text-xs leading-5 text-charcoal/65">
                    {category.note}
                  </p>
                </div>
              ) : null}
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-line py-5 lg:hidden">
              <p className="font-sans text-[0.62rem] uppercase tracking-editorial text-charcoal/60">
                Save this story
              </p>
              <PinterestShare
                title={article.title}
                description={article.description}
                path={articlePath}
                image={article.cover}
                variant="button"
              />
            </div>

            {headings.length >= 4 ? (
              <details className="mb-10 border-y border-line py-5 lg:hidden">
                <summary className="cursor-pointer font-sans text-[0.62rem] font-semibold uppercase tracking-editorial text-caramel">
                  In this story
                </summary>
                <TableOfContents headings={headings} className="border-t-0 pt-4" />
              </details>
            ) : null}

            <div
              className="prose-editorial"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {article.affiliate ? (
              <div className="mt-12 border border-line bg-ivory p-5">
                <p className="eyebrow">Affiliate note</p>
                <p className="mt-2 font-sans text-xs leading-6 text-charcoal/70">
                  This story may contain affiliate links. If you shop through them, The Style Edit
                  may earn a small commission at no extra cost to you. See our{" "}
                  <Link href="/affiliate-disclosure/" className="underline underline-offset-4">
                    affiliate disclosure
                  </Link>
                  .
                </p>
              </div>
            ) : null}

            <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
              <div>
                <p className="eyebrow">Worth pinning</p>
                <p className="mt-2 font-serif text-2xl italic text-espresso">
                  Keep this outfit idea for later.
                </p>
              </div>
              <PinterestShare
                title={article.title}
                description={article.description}
                path={articlePath}
                image={article.cover}
              />
            </div>

            <div className="mt-12">
              <PostNavigation previous={previous} next={next} />
            </div>

            <div className="mt-16">
              <RelatedArticles articles={relatedArticles} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
