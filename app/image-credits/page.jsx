import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { imageCredits } from "@/lib/image-credits";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Image Credits",
  description:
    "Photography credits and source links for The Style Edit, with images licensed through Pexels.",
  path: "/image-credits/",
  image: "/images/articles/neutral-coat-trousers.jpg",
  imageAlt: "Woman in a beige coat and matching trousers beside a wall",
});

export default function ImageCreditsPage() {
  return (
    <div className="container-editorial pb-20 pt-6 sm:pt-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Image credits" }]} />

      <header className="mx-auto mt-12 max-w-3xl sm:mt-16">
        <p className="eyebrow">Photography</p>
        <h1 className="display-title mt-5 text-[3.4rem] sm:text-[5.2rem]">Image credits.</h1>
        <p className="mt-6 font-sans text-sm leading-7 text-charcoal/75">
          All editorial photographs on this site are sourced from Pexels and used under the{" "}
          <a
            href="https://www.pexels.com/license/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-camel underline-offset-4 hover:text-burgundy"
          >
            Pexels License
          </a>
          . Pexels does not require attribution, but we credit the source for transparency. Follow
          each source link to view the original photographer and image page.
        </p>
        <p className="mt-4 font-sans text-sm leading-7 text-charcoal/75">
          These photographs are used as styling inspiration. They do not depict products sold by
          this site, and no endorsement by the people or photographers pictured is implied.
        </p>
      </header>

      <div className="mt-12 border-t border-line">
        <div className="grid gap-4 py-5 font-sans text-[0.6rem] font-semibold uppercase tracking-editorial text-caramel sm:grid-cols-[1.2fr_2fr_auto]">
          <span>Local asset</span>
          <span>Subject</span>
          <span>Source</span>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {imageCredits.map((image) => (
            <li
              key={image.path}
              className="grid gap-2 py-4 sm:grid-cols-[1.2fr_2fr_auto] sm:items-center sm:gap-4"
            >
              <code className="break-all font-sans text-[0.68rem] text-charcoal/70">
                {image.path}
              </code>
              <span className="font-sans text-sm leading-6 text-charcoal/80">
                {image.description}
              </span>
              <a
                href={`https://www.pexels.com/photo/${image.id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="justify-self-start font-sans text-[0.62rem] uppercase tracking-editorial text-espresso underline decoration-camel/60 underline-offset-4 hover:text-burgundy sm:justify-self-end"
              >
                Pexels #{image.id}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-10 font-sans text-sm leading-7 text-charcoal/65">
        Replacing an image? Keep the same file name or update the frontmatter and image paths in the
        relevant Markdown file. See the project README for the image workflow.{" "}
        <Link href="/" className="text-link">
          Return home
        </Link>
      </p>
    </div>
  );
}
