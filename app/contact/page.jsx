import Link from "next/link";
import { Mail, PenLine, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact The Style Edit about editorial questions, corrections, partnerships, or permissions.",
  path: "/contact/",
  image: "/images/articles/chic-secondary.jpg",
  imageAlt: "Elegant woman in a coat standing among leafy trees",
});

const contactTopics = [
  {
    icon: PenLine,
    title: "Editorial questions",
    text: "Questions about a story, a styling formula, or a recommendation in the journal.",
  },
  {
    icon: ShieldCheck,
    title: "Corrections",
    text: "Spotted an inaccuracy? Send the article link and the detail that needs attention.",
  },
  {
    icon: Mail,
    title: "Partnerships & permissions",
    text: "Editorial collaborations, image permissions, or future advertising enquiries.",
  },
];

export default function ContactPage() {
  const hasEmail = Boolean(siteConfig.contactEmail);

  return (
    <div className="container-editorial pb-20 pt-6 sm:pt-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <header className="mx-auto mt-12 max-w-4xl text-center sm:mt-16">
        <p className="eyebrow">Correspondence</p>
        <h1 className="display-title mt-5 text-[3.4rem] sm:text-[5.4rem]">
          Write to the <span className="italic">editor.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-sm leading-7 text-charcoal/70">
          We welcome thoughtful notes, corrections, and editorial enquiries. This is a static site,
          so there is no contact form connected to a backend.
        </p>
      </header>

      <div className="mx-auto mt-14 max-w-4xl border-y border-line">
        <div className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {contactTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div key={topic.title} className="p-6 sm:p-7">
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 text-caramel"
                  strokeWidth={1.4}
                />
                <h2 className="mt-5 font-serif text-2xl text-espresso">{topic.title}</h2>
                <p className="mt-3 font-sans text-xs leading-6 text-charcoal/70">{topic.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-2xl text-center">
        {hasEmail ? (
          <>
            <p className="eyebrow">Email</p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-4 inline-block font-serif text-3xl text-espresso underline decoration-camel/50 underline-offset-8 transition hover:text-burgundy"
            >
              {siteConfig.contactEmail}
            </a>
            <p className="mt-4 font-sans text-xs leading-6 text-charcoal/60">
              We aim to reply to editorial correspondence within a reasonable timeframe. Response
              times may vary.
            </p>
          </>
        ) : (
          <div className="border border-line bg-ivory p-7 text-left sm:p-9">
            <p className="eyebrow">Contact details not connected</p>
            <p className="mt-4 font-serif text-2xl leading-snug text-espresso">
              Add an editorial email address before launch.
            </p>
            <p className="mt-4 font-sans text-sm leading-7 text-charcoal/70">
              This starter deliberately avoids inventing an email address or business address. Set
              the <code className="bg-parchment px-1.5 py-0.5 text-xs">contactEmail</code> value in{" "}
              <code className="bg-parchment px-1.5 py-0.5 text-xs">lib/site-config.js</code> and
              this page will show a working mail link. A contact form would require a third-party
              form or form endpoint because the site is exported as static files.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/about/" className="button-secondary">
            About the journal
          </Link>
          <Link href="/affiliate-disclosure/" className="button-secondary">
            Affiliate disclosure
          </Link>
        </div>
      </div>
    </div>
  );
}
