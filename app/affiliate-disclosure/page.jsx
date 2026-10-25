import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "Affiliate Disclosure",
  description:
    "How The Style Edit approaches affiliate links, editorial independence, and transparent recommendations.",
  path: "/affiliate-disclosure/",
  image: "/images/articles/fall-outfits-with-jeans.jpg",
  imageAlt: "Tan ankle boots styled with blue jeans",
});

export default function AffiliateDisclosurePage() {
  return (
    <div className="container-editorial pb-20 pt-6 sm:pt-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Affiliate Disclosure" }]} />

      <header className="mx-auto mt-12 max-w-3xl sm:mt-16">
        <p className="eyebrow">Transparency</p>
        <h1 className="display-title mt-5 text-[3.2rem] sm:text-[4.8rem]">
          Affiliate Disclosure
        </h1>
        <p className="mt-5 font-sans text-[0.68rem] uppercase tracking-editorial text-charcoal/55">
          Effective date: [EFFECTIVE DATE]
        </p>
      </header>

      <div className="prose-editorial mx-auto mt-12 max-w-3xl">
        <p>
          {siteConfig.name} is an editorial fashion journal. Our goal is to recommend pieces and
          outfit ideas because they are useful, beautiful, or both, not because a retailer has paid
          for a mention.
        </p>

        <h2>Current status</h2>
        <p>
          At the time of this starter’s publication, no affiliate links are active on the website.
          If affiliate links are added, this page will be updated, and individual articles will
          disclose the relationship before or near the relevant links.
        </p>

        <h2>What affiliate links mean</h2>
        <p>
          An affiliate link is a link that contains a tracking identifier. If you click the link and
          make a purchase, the retailer may pay us a small commission. The price you pay is not
          increased by the commission. Affiliate relationships help support the cost of publishing
          the journal.
        </p>

        <h2>Editorial independence</h2>
        <p>
          Compensation does not guarantee a recommendation. We do not publish fabricated ratings,
          reviews, prices, or availability. When we describe an item, we aim to describe the
          qualities that make it useful for a real wardrobe: fabric, fit, proportion, color, care,
          and versatility. The images on this site are editorial inspiration unless a story states
          otherwise; they are not automatically pictures of a linked product.
        </p>

        <h2>Sponsored content</h2>
        <p>
          If a post is sponsored, gifted, or otherwise materially connected to a brand, that
          relationship should be disclosed clearly in the post. Sponsorship should not be presented
          as independent editorial coverage.
        </p>

        <h2>Third-party retailers</h2>
        <p>
          Retailers control their own pricing, availability, shipping, returns, and customer
          service. We do not control those terms and cannot guarantee that an item will remain in
          stock or look exactly as it does in a photograph. Always review the retailer’s product
          details and policies before purchasing.
        </p>

        <h2>Questions</h2>
        <p>
          For questions about affiliate relationships or editorial independence, see our{" "}
          <Link href="/contact/">contact page</Link> or read our{" "}
          <Link href="/privacy-policy/">Privacy Policy</Link>. Before launch, the site owner should
          replace placeholder contact details and configure any affiliate programs that are actually
          in use.
        </p>
      </div>
    </div>
  );
}
