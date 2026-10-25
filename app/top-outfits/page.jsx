import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { NewsletterSection } from "@/components/newsletter-section";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { topOutfits } from "@/lib/top-outfits";

export const metadata = buildPageMetadata({
  title: "Top Outfits: The Looks Worth Repeating",
  description:
    "The twelve best outfit formulas from The Style Edit, from camel coats and cream knits to wide-leg denim, leather jackets, and polished workwear.",
  path: "/top-outfits/",
  image: "/images/articles/chic-trench-dress.jpg",
  imageAlt: "Woman in a trench coat and dress walking on a city street",
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Top Outfits", href: "/top-outfits/" },
];

export default function TopOutfitsPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top Outfits from The Style Edit",
    description:
      "The most useful outfit formulas from The Style Edit, selected for proportion, texture, and repeat wear.",
    url: absoluteUrl("/top-outfits/"),
    numberOfItems: topOutfits.length,
    itemListElement: topOutfits.map((outfit) => ({
      "@type": "ListItem",
      position: outfit.rank,
      name: outfit.title,
      url: absoluteUrl(`/blog/${outfit.articleSlug}/`),
    })),
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />

      <div className="container-editorial pb-16 pt-6 sm:pt-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Top Outfits" }]} />

        <header className="mx-auto mt-12 max-w-4xl text-center sm:mt-16">
          <p className="eyebrow">The best of the edit</p>
          <h1 className="display-title mt-5 text-[3.4rem] sm:text-[5.4rem]">
            Outfits worth <span className="italic">repeating.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-sm leading-7 text-charcoal/70">
            Twelve outfit formulas that earn their place in a real wardrobe. Each one starts with a
            clear proportion, uses pieces that work together, and leaves room for your own version.
          </p>
        </header>

        <div className="mt-14 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {topOutfits.map((outfit) => (
            <article key={outfit.title} className="group flex h-full flex-col">
              <Link
                href={`/blog/${outfit.articleSlug}/`}
                className="image-zoom relative block aspect-[4/5] overflow-hidden bg-parchment"
              >
                <Image
                  src={outfit.image}
                  alt={outfit.imageAlt}
                  fill
                  loading={outfit.rank <= 3 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 47vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center border border-ivory/50 bg-espresso/75 font-serif text-lg text-ivory backdrop-blur-sm">
                  {String(outfit.rank).padStart(2, "0")}
                </span>
              </Link>

              <div className="flex flex-1 flex-col pt-5">
                <p className="eyebrow">{outfit.category}</p>
                <h2 className="mt-2 font-serif text-[2rem] leading-[1.05] tracking-[-0.02em] text-espresso">
                  <Link
                    href={`/blog/${outfit.articleSlug}/`}
                    className="transition-colors hover:text-burgundy"
                  >
                    {outfit.title}
                  </Link>
                </h2>
                <p className="mt-3 font-sans text-sm leading-6 text-charcoal/70">{outfit.note}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {outfit.pieces.map((piece) => (
                    <li
                      key={piece}
                      className="border border-line px-2.5 py-1 font-sans text-[0.58rem] uppercase tracking-[0.12em] text-charcoal/60"
                    >
                      {piece}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/blog/${outfit.articleSlug}/`}
                  className="text-link mt-6 self-start"
                  aria-label={`Read ${outfit.articleTitle}`}
                >
                  Read the full guide
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 border-y border-line py-8 text-center">
          <p className="mx-auto max-w-2xl font-serif text-2xl italic leading-snug text-espresso">
            The best outfit is not the most complicated one. It is the one you understand well
            enough to make your own.
          </p>
          <Link href="/categories/" className="button-secondary mt-6">
            Browse every category
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <NewsletterSection />
    </>
  );
}
