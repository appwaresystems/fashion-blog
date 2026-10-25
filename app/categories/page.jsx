import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryCard } from "@/components/category-card";
import { NewsletterSection } from "@/components/newsletter-section";
import { categories } from "@/lib/categories";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Outfit Categories",
  description:
    "Browse every Style Edit category: casual outfits, chic looks, jeans, neutral outfits, capsule wardrobes, boots, workwear, and date night inspiration.",
  path: "/categories/",
  image: "/images/articles/chic-secondary.jpg",
  imageAlt: "Elegant woman in a coat surrounded by leafy trees",
});

export default function CategoriesPage() {
  return (
    <>
      <div className="container-editorial pb-16 pt-6 sm:pt-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Categories" }]} />

        <header className="mx-auto mt-12 max-w-4xl text-center sm:mt-16">
          <p className="eyebrow">The style index</p>
          <h1 className="display-title mt-5 text-[3.4rem] sm:text-[5.4rem]">
            Eight ways to <span className="italic">get dressed.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-sm leading-7 text-charcoal/70">
            Every story in The Style Edit belongs to one of eight wardrobe moods. Start with the one
            that matches your day, your weather, or the version of yourself you want to feel like.
          </p>
        </header>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.slug}
              category={category}
              className={index < 2 ? "lg:col-span-2" : ""}
              imageClassName={index < 2 ? "aspect-[16/11]" : "aspect-[4/5]"}
            />
          ))}
        </div>
      </div>

      <NewsletterSection />
    </>
  );
}
