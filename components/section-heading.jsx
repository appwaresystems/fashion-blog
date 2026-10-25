import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  linkLabel,
  linkHref,
  align = "left",
}) {
  return (
    <div
      className={`flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between ${
        align === "center" ? "text-center sm:flex-col sm:items-center sm:text-center" : ""
      }`}
    >
      <div className="max-w-2xl">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="section-title mt-3">{title}</h2>
        {description ? (
          <p className="mt-4 max-w-xl font-sans text-sm leading-7 text-charcoal/75">{description}</p>
        ) : null}
      </div>
      {linkLabel && linkHref ? (
        <Link href={linkHref} className="text-link shrink-0 self-start sm:self-auto">
          {linkLabel}
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      ) : null}
    </div>
  );
}
