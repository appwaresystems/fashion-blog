"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

const suggestions = ["Trench coat", "Jeans", "Capsule", "Boots", "Workwear", "Neutral"];

function normalise(value) {
  return value.toLowerCase().replace(/[’']/g, "").replace(/\s+/g, " ").trim();
}

export function SearchDialog({ articles, compact = false }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const panelId = useId();
  const router = useRouter();

  const results = useMemo(() => {
    const terms = normalise(query).split(" ").filter(Boolean);

    if (!terms.length) {
      return [];
    }

    return articles
      .map((article) => {
        const title = normalise(article.title);
        const category = normalise(article.category);
        const tags = normalise(article.tags.join(" "));
        const description = normalise(article.description);
        const haystack = `${title} ${category} ${tags} ${description}`;
        const matchesAll = terms.every((term) => haystack.includes(term));

        if (!matchesAll) {
          return null;
        }

        let score = 0;
        terms.forEach((term) => {
          if (title.includes(term)) score += 8;
          if (category.includes(term)) score += 4;
          if (tags.includes(term)) score += 2;
          if (description.includes(term)) score += 1;
        });

        return { article, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ article }) => article);
  }, [articles, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);

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

  function close() {
    setOpen(false);
    setQuery("");
  }

  function handleInputKeyDown(event) {
    if (!results.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % results.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + results.length) % results.length);
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selected = results[activeIndex] || results[0];
      close();
      router.push(`/blog/${selected.slug}/`);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex items-center gap-2 font-sans text-[0.64rem] font-semibold uppercase tracking-editorial text-espresso transition-colors hover:text-burgundy"
      >
        <Search aria-hidden="true" className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.5} />
        <span className={compact ? "sr-only" : "hidden sm:inline"}>Search</span>
        {compact ? <span className="sr-only">Search the journal</span> : null}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[8vh] sm:pt-[12vh]">
          <button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 cursor-default bg-espresso/55 backdrop-blur-[2px]"
            onClick={close}
          />
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Search the journal"
            className="relative z-10 w-full max-w-2xl border border-line bg-ivory shadow-[0_24px_80px_rgba(45,34,27,0.22)]"
          >
            <div className="flex items-center border-b border-line px-5 sm:px-7">
              <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-caramel" strokeWidth={1.5} />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search outfits, categories, or pieces"
                aria-label="Search articles"
                aria-controls={`${panelId}-results`}
                aria-activedescendant={
                  results[activeIndex] ? `${panelId}-result-${activeIndex}` : undefined
                }
                autoComplete="off"
                className="h-16 w-full border-0 bg-transparent px-4 font-serif text-xl text-espresso placeholder:font-sans placeholder:text-sm placeholder:tracking-wide placeholder:text-charcoal/50 focus:outline-none focus:ring-0 sm:text-2xl"
              />
              <button
                type="button"
                onClick={close}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-transparent text-charcoal transition hover:border-line hover:text-burgundy"
                aria-label="Close search"
              >
                <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="max-h-[62vh] overflow-y-auto px-5 py-6 sm:px-7">
              {!query.trim() ? (
                <div>
                  <p className="eyebrow">Start with a mood</p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setQuery(suggestion)}
                        className="border border-espresso/25 px-3.5 py-2 font-sans text-xs text-espresso transition hover:border-espresso hover:bg-parchment/60"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                  <p className="mt-6 font-sans text-xs leading-6 text-charcoal/70">
                    Search across every outfit guide, category, and styling note in the journal.
                  </p>
                </div>
              ) : null}

              {query.trim() && results.length ? (
                <div id={`${panelId}-results`} role="listbox" aria-label="Search results">
                  <p className="eyebrow">
                    {results.length} {results.length === 1 ? "story" : "stories"} found
                  </p>
                  <ul className="mt-4 divide-y divide-line">
                    {results.map((article, index) => (
                      <li key={article.slug}>
                        <a
                          id={`${panelId}-result-${index}`}
                          role="option"
                          aria-selected={index === activeIndex}
                          href={`/blog/${article.slug}/`}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={close}
                          className={`group block py-4 transition ${
                            index === activeIndex ? "bg-parchment/60 px-3" : "px-3"
                          }`}
                        >
                          <span className="eyebrow block">{article.category}</span>
                          <span className="mt-1.5 block font-serif text-xl leading-snug text-espresso transition-colors group-hover:text-burgundy">
                            {article.title}
                          </span>
                          <span className="mt-1 line-clamp-2 block font-sans text-xs leading-5 text-charcoal/70">
                            {article.description}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 font-sans text-[0.68rem] leading-5 text-charcoal/60">
                    Use the up and down arrow keys to move through results, then press Enter.
                  </p>
                </div>
              ) : null}

              {query.trim() && !results.length ? (
                <div className="py-8 text-center">
                  <p className="font-serif text-3xl italic text-espresso">Nothing in this edit yet.</p>
                  <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-6 text-charcoal/70">
                    No stories matched “{query}.” Try a broader term such as boots, neutral, denim,
                    coat, or capsule.
                  </p>
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="button-secondary mt-6"
                  >
                    Clear search
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
