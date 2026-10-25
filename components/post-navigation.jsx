import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function PostNavigation({ previous, next }) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav aria-label="Article navigation" className="grid border-y border-line sm:grid-cols-2">
      <div className="py-7 sm:border-r sm:border-line sm:pr-8">
        {previous ? (
          <Link href={`/blog/${previous.slug}/`} className="group block">
            <span className="inline-flex items-center gap-2 font-sans text-[0.62rem] font-semibold uppercase tracking-editorial text-caramel">
              <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
              Previous in the edit
            </span>
            <span className="mt-3 block font-serif text-2xl leading-tight text-espresso transition-colors group-hover:text-burgundy">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span className="block font-sans text-[0.62rem] uppercase tracking-editorial text-charcoal/40">
            The beginning of the edit
          </span>
        )}
      </div>
      <div className="border-t border-line py-7 sm:border-t-0 sm:pl-8 sm:text-right">
        {next ? (
          <Link href={`/blog/${next.slug}/`} className="group block">
            <span className="inline-flex items-center gap-2 font-sans text-[0.62rem] font-semibold uppercase tracking-editorial text-caramel">
              Next in the edit
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
            <span className="mt-3 block font-serif text-2xl leading-tight text-espresso transition-colors group-hover:text-burgundy">
              {next.title}
            </span>
          </Link>
        ) : (
          <span className="block font-sans text-[0.62rem] uppercase tracking-editorial text-charcoal/40">
            The end of this edit
          </span>
        )}
      </div>
    </nav>
  );
}
