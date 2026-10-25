"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { categories } from "@/lib/categories";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "./logo";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 30);

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center text-espresso transition hover:text-burgundy"
      >
        <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.4} />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[90] flex flex-col bg-cream" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Logo />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center border border-espresso/20 text-espresso transition hover:border-espresso hover:bg-espresso hover:text-ivory"
            >
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-8">
            <p className="eyebrow">The Journal</p>
            <nav aria-label="Mobile navigation" className="mt-4">
              <ul className="divide-y divide-line/80">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/categories/${category.slug}/`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-4 font-serif text-2xl text-espresso"
                    >
                      <span className="transition-colors group-hover:text-burgundy">
                        {category.name}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 text-caramel transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.4}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="eyebrow mt-10">Inside the edit</p>
            <nav aria-label="Secondary navigation" className="mt-4">
              <ul className="space-y-3">
                {siteConfig.navigation
                  .filter((item) => item.href !== "/categories/")
                  .map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="font-sans text-sm text-charcoal transition hover:text-burgundy"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link
                    href="/contact/"
                    onClick={() => setOpen(false)}
                    className="font-sans text-sm text-charcoal transition hover:text-burgundy"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="border-t border-line px-5 py-5">
            <p className="font-serif text-lg italic text-espresso">{siteConfig.tagline}</p>
            <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-editorial text-caramel">
              The Style Edit
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
