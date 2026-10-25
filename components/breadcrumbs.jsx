import Link from "next/link";

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[0.62rem] uppercase tracking-editorial text-charcoal/60">
        {items.map((item, index) => {
          const last = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-line">
                  /
                </span>
              ) : null}
              {item.href && !last ? (
                <Link href={item.href} className="transition-colors hover:text-burgundy">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="text-charcoal/80">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
