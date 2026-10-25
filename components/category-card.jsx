import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CategoryCard({ category, className = "", imageClassName = "aspect-[4/5]" }) {
  return (
    <article className={cn("group", className)}>
      <Link
        href={`/categories/${category.slug}/`}
        className={cn("image-zoom relative block overflow-hidden bg-parchment", imageClassName)}
        aria-label={`Browse ${category.name}`}
      >
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/70 to-transparent px-4 pb-4 pt-16">
          <span className="block font-sans text-[0.55rem] font-semibold uppercase tracking-editorial text-ivory/70">
            {category.shortName}
          </span>
          <span className="mt-1 block font-serif text-2xl leading-tight text-ivory">
            {category.name}
          </span>
        </span>
      </Link>
      <div className="flex items-start justify-between gap-4 pt-4">
        <p className="font-sans text-xs leading-5 text-charcoal/70">{category.description}</p>
        <ArrowUpRight
          aria-hidden="true"
          className="mt-1 h-4 w-4 shrink-0 text-caramel transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.4}
        />
      </div>
    </article>
  );
}
