import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { CategoryCard } from "@/components/category-card";
import { FeatureListItem } from "@/components/feature-list-item";
import { JsonLd } from "@/components/json-ld";
import { NewsletterSection } from "@/components/newsletter-section";
import { SectionHeading } from "@/components/section-heading";
import { getAllArticles, getFeaturedArticles, getLatestArticles } from "@/lib/articles";
import { categories } from "@/lib/categories";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { topOutfits } from "@/lib/top-outfits";

export const metadata = buildPageMetadata({
  title: "The Style Edit | Year-Round Outfit Ideas for Women",
  description:
    "Editorial outfit inspiration for women: casual and chic looks, neutral style, capsule wardrobes, jeans, boots, workwear, and date night ideas.",
  path: "/",
  image: "/images/articles/chic-trench-dress.jpg",
  imageAlt: "Woman in a trench coat and dress walking on a city street",
  titleAbsolute: true,
});

export default function HomePage() {
  const articles = getAllArticles();
  const heroStory = articles[0];
  const latest = getLatestArticles(6);
  const featuredPool = getFeaturedArticles(4).filter((article) => article.slug !== heroStory.slug);
  const featuredMain = featuredPool[0] || articles[1];
  const usedSlugs = new Set([heroStory.slug, featuredMain.slug]);
  const supportingStories = articles
    .filter((article) => !usedSlugs.has(article.slug))
    .slice(0, 2);
  const capsuleStory =
    articles.find((article) => article.categorySlug === "capsule-wardrobe") || articles[0];

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher,
      logo: absoluteUrl("/images/logo-mark.svg"),
    },
  };

  return (
    <>
      <JsonLd data={websiteJsonLd} />

      <section className="container-editorial pt-6 sm:pt-8 lg:pt-10">
        <div className="grid lg:grid-cols-12 lg:items-end">
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden bg-parchment sm:aspect-[5/6] lg:aspect-[4/5]">
              <Image
                src="/images/articles/chic-trench-dress.jpg"
                alt="Woman in a trench coat and dress walking on a city street"
                fill
                priority
                loading="eager"
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              <span className="absolute left-5 top-5 border border-ivory/45 bg-espresso/70 px-3 py-2 font-sans text-[0.55rem] font-semibold uppercase tracking-editorial text-ivory backdrop-blur-sm">
                Issue No. 01 · The Style Edit
              </span>
            </div>
            <p className="mt-3 font-sans text-[0.58rem] uppercase tracking-[0.14em] text-charcoal/45">
              Photograph via Pexels. Styling inspiration, not a product endorsement.
            </p>
          </div>

          <div className="relative z-10 bg-cream px-0 py-8 sm:px-2 sm:py-10 lg:col-span-5 lg:-ml-20 lg:mb-16 lg:border lg:border-line/80 lg:px-12 lg:py-14">
            <p className="eyebrow">A considered wardrobe</p>
            <h1 className="display-title mt-5 text-[3.7rem] sm:text-[5.2rem] lg:text-[4.6rem] xl:text-[5.2rem]">
              The Art of <span className="italic">Getting Dressed,</span> Every Day.
            </h1>
            <p className="mt-6 max-w-md font-sans text-[0.95rem] leading-7 text-charcoal/80">
              A warm, unhurried guide to year-round style: coats that do the work, knits you reach
              for daily, denim with the right boots, and a palette that makes the whole wardrobe
              easier.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link href={`/blog/${heroStory.slug}/`} className="button-primary">
                Read the latest edit
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <Link href="/categories/" className="text-link">
                Browse every mood
              </Link>
            </div>
            <div className="mt-9 border-t border-line pt-5">
              <p className="font-serif text-lg italic text-espresso">
                Twelve stories. Eight moods. A wardrobe that works harder.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 border-y border-line sm:mt-16">
        <div className="container-editorial grid gap-5 py-8 sm:grid-cols-[0.7fr_2fr] sm:items-center sm:gap-12 lg:py-10">
          <p className="eyebrow">An editor's note</p>
          <p className="max-w-4xl font-serif text-2xl italic leading-snug text-espresso sm:text-[1.75rem]">
            Good dressing is a study in layers and restraint. The best outfits rarely need more
            than a beautiful coat, a soft knit, and one detail that feels entirely your own.
          </p>
        </div>
      </section>

      <section className="container-editorial py-16 sm:py-20 lg:py-24">
        <SectionHeading
          eyebrow="The style edit"
          title="Outfits worth repeating."
          description="The stories leading the journal, chosen for ease, texture, and the quiet confidence of a well-edited wardrobe."
          linkLabel="All stories"
          linkHref="/blog/"
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <ArticleCard
            article={featuredMain}
            className="lg:col-span-7"
            imageClassName="aspect-[4/5]"
            titleClassName="text-3xl sm:text-5xl"
            showDescription
            sizes="(min-width: 1024px) 58vw, 100vw"
          />

          <div className="divide-y divide-line border-y border-line lg:col-span-5 lg:self-end lg:border-y-0">
            {supportingStories.map((article, index) => (
              <FeatureListItem key={article.slug} article={article} index={index + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ivory/50">
        <div className="container-editorial py-16 sm:py-20 lg:py-24">
          <SectionHeading
            eyebrow="Explore by mood"
            title="The eight edits."
            description="Start with the outfit mood you need today, then build outward from there."
            linkLabel="All categories"
            linkHref="/categories/"
          />
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-parchment/45">
        <div className="container-editorial grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-20">
          <div className="lg:col-span-5">
            <Link
              href={`/blog/${capsuleStory.slug}/`}
              className="image-zoom relative block aspect-[4/5] overflow-hidden bg-parchment"
            >
              <Image
                src={capsuleStory.cover}
                alt={capsuleStory.coverAlt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </Link>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">The capsule wardrobe</p>
            <h2 className="section-title mt-4 text-[2.8rem] sm:text-5xl">
              A wardrobe that dresses itself.
            </h2>
            <p className="mt-6 max-w-xl font-sans text-sm leading-7 text-charcoal/80">
              Fewer pieces, more combinations. A capsule wardrobe is built around a coat you love,
              two knit textures, dependable denim, and shoes that carry you through the week. It is
              not a uniform. It is a shortcut back to your own taste.
            </p>
            <ol className="mt-8 grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
              {["One coat, worn often", "Two knit weights", "Three repeatable formulas"].map(
                (item, index) => (
                  <li key={item} className="font-sans text-xs leading-5 text-charcoal/75">
                    <span className="mb-2 block font-serif text-2xl italic text-caramel">
                      0{index + 1}
                    </span>
                    {item}
                  </li>
                ),
              )}
            </ol>
            <Link href={`/blog/${capsuleStory.slug}/`} className="button-secondary mt-8">
              Build the capsule
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-editorial py-16 sm:py-20 lg:py-24">
        <SectionHeading
          eyebrow="New this week"
          title="Latest from the journal."
          description="Fresh outfit ideas, practical styling notes, and the pieces that keep coming back."
          linkLabel="All articles"
          linkHref="/blog/"
        />
        <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((article, index) => (
            <ArticleCard
              key={article.slug}
              article={article}
              priority={index === 0}
              showDescription={false}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-cream">
        <div className="container-editorial py-16 sm:py-20 lg:py-24">
          <SectionHeading
            eyebrow="The top outfits"
            title="The formulas that keep working."
            description="Twelve looks selected for proportion, texture, and the kind of repeat wear that makes a wardrobe feel settled."
            linkLabel="All top outfits"
            linkHref="/top-outfits/"
          />

          <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-3">
            {topOutfits.slice(0, 3).map((outfit) => (
              <article key={outfit.title} className="group">
                <Link
                  href={`/blog/${outfit.articleSlug}/`}
                  className="image-zoom relative block aspect-[4/5] overflow-hidden bg-parchment"
                >
                  <Image
                    src={outfit.image}
                    alt={outfit.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 31vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center border border-ivory/50 bg-espresso/75 font-serif text-base text-ivory backdrop-blur-sm">
                    {String(outfit.rank).padStart(2, "0")}
                  </span>
                </Link>
                <p className="eyebrow mt-5">{outfit.category}</p>
                <h3 className="mt-2 font-serif text-3xl leading-[1.05] tracking-[-0.02em] text-espresso">
                  <Link
                    href={`/blog/${outfit.articleSlug}/`}
                    className="transition-colors hover:text-burgundy"
                  >
                    {outfit.title}
                  </Link>
                </h3>
                <p className="mt-3 font-sans text-sm leading-6 text-charcoal/70">{outfit.note}</p>
                <Link
                  href={`/blog/${outfit.articleSlug}/`}
                  className="text-link mt-5"
                  aria-label={`Read ${outfit.articleTitle}`}
                >
                  See the full guide
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
