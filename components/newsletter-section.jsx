import { NewsletterForm } from "./newsletter-form";

export function NewsletterSection() {
  return (
    <section id="newsletter" className="bg-espresso text-ivory">
      <div className="container-editorial grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24 lg:py-24">
        <div>
          <p className="eyebrow-light">The Style Edit Letter</p>
          <h2 className="mt-5 max-w-lg font-serif text-4xl font-normal leading-[1.02] tracking-[-0.03em] text-ivory sm:text-5xl">
            A slower kind of fashion inbox.
          </h2>
        </div>
        <div>
          <p className="max-w-xl font-sans text-sm leading-7 text-ivory/70">
            One thoughtful letter each month: a handful of outfits worth repeating, the pieces that
            earned their place, and a few ideas for wearing what you already own.
          </p>
          <NewsletterForm />
          <p className="mt-5 font-sans text-[0.62rem] uppercase tracking-editorial text-ivory/45">
            No daily emails. No clutter. Unsubscribe whenever you like.
          </p>
        </div>
      </div>
    </section>
  );
}
