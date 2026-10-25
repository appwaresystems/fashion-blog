import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/categories";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "./logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const pinterestLink = siteConfig.pinterest.profileUrl;

  return (
    <footer className="border-t border-line bg-parchment/55">
      <div className="container-editorial">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.15fr_2fr] lg:gap-20 lg:py-20">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm font-serif text-2xl italic leading-snug text-espresso">
              Style is not about more. It is about proportion, texture, and the pieces that make you
              feel most like yourself.
            </p>
            <p className="mt-6 max-w-sm font-sans text-sm leading-7 text-charcoal/75">
              {siteConfig.description}
            </p>
            <div className="mt-7 flex items-center gap-4">
              {pinterestLink ? (
                <a
                  href={pinterestLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Pinterest
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              ) : (
                <span className="font-sans text-[0.65rem] uppercase tracking-editorial text-charcoal/55">
                  Pinterest sharing on every story
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {siteConfig.footerNavigation.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="font-sans text-[0.64rem] font-semibold uppercase tracking-editorial text-caramel">
                  {group.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-charcoal/80 transition-colors hover:text-burgundy"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="border-t border-line py-7">
          <p className="font-sans text-[0.62rem] uppercase tracking-editorial text-caramel">
            Browse the season
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/categories/${category.slug}/`}
                  className="font-sans text-xs text-charcoal/75 transition-colors hover:text-burgundy"
                >
                  {category.shortName}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/image-credits/"
                className="font-sans text-xs text-charcoal/75 transition-colors hover:text-burgundy"
              >
                Image credits
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-7 font-sans text-[0.65rem] leading-5 text-charcoal/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Editorial content is for inspiration only.
          </p>
          <p>
            Photography licensed through Pexels. See{" "}
            <Link href="/image-credits/" className="underline underline-offset-4 hover:text-burgundy">
              image credits
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
