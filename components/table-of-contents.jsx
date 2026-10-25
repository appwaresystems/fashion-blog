import { cn } from "@/lib/utils";

export function TableOfContents({ headings, className = "" }) {
  if (!headings || headings.length < 3) {
    return null;
  }

  return (
    <nav aria-label="Table of contents" className={cn("border-t border-line pt-5", className)}>
      <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-editorial text-caramel">
        In this story
      </p>
      <ol className="mt-4 space-y-2.5">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${heading.id}`}
              className="font-sans text-xs leading-5 text-charcoal/75 transition-colors hover:text-burgundy"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
