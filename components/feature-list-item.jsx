import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export function FeatureListItem({ article, index }) {
  return (
    <article className="group grid grid-cols-[7rem_1fr] gap-5 py-6 first:pt-0 last:pb-0 sm:grid-cols-[8.5rem_1fr]">
      <Link
        href={`/blog/${article.slug}/`}
        className="image-zoom relative aspect-[2/3] overflow-hidden bg-parchment"
        aria-label={article.title}
      >
        <Image
          src={article.cover}
          alt={article.coverAlt}
          fill
          loading="lazy"
          sizes="140px"
          className="object-cover"
        />
      </Link>
      <div className="self-center">
        <p className="font-sans text-[0.58rem] font-medium uppercase tracking-editorial text-caramel">
          <span className="mr-2">{String(index + 1).padStart(2, "0")}</span>
          {article.category}
        </p>
        <h3 className="mt-2 font-serif text-[1.55rem] font-normal leading-[1.12] tracking-[-0.02em] text-espresso">
          <Link href={`/blog/${article.slug}/`} className="transition-colors hover:text-burgundy">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 font-sans text-[0.65rem] uppercase tracking-[0.12em] text-charcoal/50">
          {formatDate(article.date)} · {article.readingTime} min
        </p>
      </div>
    </article>
  );
}
