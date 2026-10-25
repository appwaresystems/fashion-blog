import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { SearchDialog } from "./search-dialog";

export function SiteHeader({ searchIndex }) {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-espresso text-ivory">
        <div className="container-editorial flex min-h-9 items-center justify-center py-1.5 text-center">
          <p className="font-sans text-[0.58rem] font-medium uppercase tracking-[0.22em] text-ivory/80">
            The Style Edit
            <span className="mx-2.5 text-camel" aria-hidden="true">
              /
            </span>
            Twelve outfit guides for a considered wardrobe
          </p>
        </div>
      </div>

      <div className="border-b border-line bg-cream/95 backdrop-blur-md">
        <div className="container-editorial">
          <div className="flex items-center justify-between py-4 lg:hidden">
            <MobileMenu />
            <Logo />
            <SearchDialog articles={searchIndex} compact />
          </div>

          <div className="hidden grid-cols-[1fr_auto_1fr] items-center py-4 lg:grid">
            <nav aria-label="Main navigation">
              <ul className="flex items-center gap-7">
                {siteConfig.navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group relative font-sans text-[0.62rem] font-semibold uppercase tracking-editorial text-espresso transition-colors hover:text-burgundy"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1.5 left-0 h-px w-0 bg-burgundy transition-all duration-300 ease-editorial group-hover:w-full"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Logo className="px-10" />

            <div className="flex items-center justify-end gap-6">
              <SearchDialog articles={searchIndex} />
              <span className="h-4 w-px bg-line" aria-hidden="true" />
              <Link
                href="/#newsletter"
                className="group inline-flex items-center gap-2 font-sans text-[0.62rem] font-semibold uppercase tracking-editorial text-espresso transition-colors hover:text-burgundy"
              >
                The letter
                <ArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
