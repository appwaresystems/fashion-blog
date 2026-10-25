import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { NewsletterSection } from "@/components/newsletter-section";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "The Style Edit is a fashion journal devoted to considered outfits, neutral style, and wardrobes built to be worn all year.",
  path: "/about/",
  image: "/images/articles/neutral-secondary.jpg",
  imageAlt: "Woman in a green coat and beige sweater in a leafy park",
});

export default function AboutPage() {
  return (
    <>
      <div className="container-editorial pb-16 pt-6 sm:pt-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

        <header className="mt-12 grid gap-10 border-b border-line pb-14 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">The publication</p>
            <h1 className="display-title mt-5 text-[3.5rem] sm:text-[5.4rem]">
              Clothes for the <span className="italic">life you live.</span>
            </h1>
            <p className="mt-7 max-w-2xl font-serif text-xl italic leading-relaxed text-charcoal/80 sm:text-2xl">
              The Style Edit is a small fashion journal about getting dressed well every day without
              turning your wardrobe into a trend report.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-parchment">
              <Image
                src="/images/articles/neutral-secondary.jpg"
                alt="Woman in a green coat and beige sweater standing among leafy trees"
                fill
                priority
                loading="eager"
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </header>

        <div className="mx-auto mt-14 max-w-reading">
          <div className="prose-editorial">
            <p>
              A good wardrobe becomes useful when the weather changes, the week gets busy, and you
              still need to leave the house looking like yourself. A coat earns its keep, a knit
              becomes a daily companion, and the right boots turn a walk across town into something
              that feels intentional. We made this journal for that moment.
            </p>
            <p>
              Our stories focus on women's outfits that can be repeated, adapted, and worn without a
              stylist. We are interested in proportion, fabric, color, and the small decisions that
              make an outfit feel like yours. We are less interested in buying more for the sake of
              it.
            </p>

            <h2>What we believe</h2>
            <p>
              <strong>Style should work in real life.</strong> An outfit has to survive a commute,
              a school pickup, a long dinner, or a cold walk home. The clothes we write about are
              chosen with that in mind.
            </p>
            <p>
              <strong>Texture is more interesting than excess.</strong> A smooth leather boot against
              a ribbed knit, or a brushed wool coat over crisp denim, can do more than five new
              accessories. We look for those contrasts first.
            </p>
            <p>
              <strong>Neutral does not mean invisible.</strong> Cream, camel, gray, espresso, olive,
              and burgundy can be as expressive as any bright color when the shades and surfaces are
              chosen with care.
            </p>
            <p>
              <strong>Inspiration should be actionable.</strong> Every guide is written to help you
              put an outfit together, not just admire a photograph. That is why our stories include
              formulas, alternatives, and notes on what to look for.
            </p>

            <h2>How we approach photography</h2>
            <p>
              Photography is central to the journal. The images on this site are licensed stock
              photographs, credited on our <Link href="/image-credits/">image credits page</Link>.
              They are used to communicate a mood, silhouette, or color story. Unless explicitly
              stated, a photograph is not a representation of a specific purchasable product, and we
              do not imply that the people pictured endorse anything on this site.
            </p>

            <h2>How we make recommendations</h2>
            <p>
              We do not invent reviews, ratings, prices, or availability. When we describe a piece,
              we describe the qualities that make it useful: the length of a coat, the rise of a
              jean, the shape of a toe, or the weight of a knit. If affiliate links are added in the
              future, they will be disclosed clearly and will not change our editorial judgment.
            </p>

            <h2>Who writes the journal</h2>
            <p>
              Stories are published under The Style Edit Editorial Team. Before launch, the site
              owner should replace this collective byline with real author names, bios, and
              credentials if individual authorship is used.
            </p>
          </div>

          <aside className="mt-12 border border-line bg-ivory p-6">
            <p className="eyebrow">A note for the site owner</p>
            <p className="mt-3 font-sans text-xs leading-6 text-charcoal/70">
              Customize the masthead, editorial team details, contact address, newsletter provider,
              analytics setup, and any affiliate relationships before publishing. These starter
              pages intentionally avoid invented contact details and unsupported claims.
            </p>
          </aside>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/categories/" className="button-primary">
              Browse the edits
            </Link>
            <Link href="/contact/" className="button-secondary">
              Contact the editor
            </Link>
          </div>
        </div>
      </div>

      <NewsletterSection />
    </>
  );
}
