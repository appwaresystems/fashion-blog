import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ArticleCard({
  article,
  priority = false,
  className = "",
  imageClassName = "aspect-[2/3]",
  headingLevel = "h3",
  titleClassName = "",
  showDescription = true,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}) {
  const Heading = headingLevel;

  return (
    <article className={cn("group", className)}>
      <Link
        href={`/blog/${article.slug}/`}
        className={cn("image-zoom relative block overflow-hidden bg-parchment", imageClassName)}
        aria-label={article.title}
      >
        <Image
          src={article.cover}
          alt={article.coverAlt}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes={sizes}
          className="object-cover"
        />
        <span className="absolute left-4 top-4 bg-cream/95 px-2.5 py-1.5 font-sans text-[0.55rem] font-semibold uppercase tracking-editorial text-espresso backdrop-blur-sm">
          {article.category}
        </span>
      </Link>

      <div className="pt-5">
        <p className="font-sans text-[0.6rem] font-medium uppercase tracking-editorial text-caramel">
          {formatDate(article.date)}
          <span className="mx-2 text-line" aria-hidden="true">
            /
          </span>
          {article.readingTime} min read
        </p>
        <Heading
          className={cn(
            "mt-2.5 font-serif font-normal leading-[1.1] tracking-[-0.02em] text-espresso",
            titleClassName || "text-[1.75rem] sm:text-[1.95rem]",
          )}
        >
          <Link href={`/blog/${article.slug}/`} className="transition-colors hover:text-burgundy">
            {article.title}
          </Link>
        </Heading>
        {showDescription ? (
          <p className="mt-3 line-clamp-3 font-sans text-sm leading-6 text-charcoal/75">
            {article.description}
          </p>
        ) : null}
        <Link href={`/blog/${article.slug}/`} className="text-link mt-5">
          Read the story
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  );
}
