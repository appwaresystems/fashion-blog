import { ArticleCard } from "./article-card";

export function RelatedArticles({ articles }) {
  if (!articles.length) {
    return null;
  }

  return (
    <section aria-labelledby="related-heading" className="border-t border-line pt-12">
      <p className="eyebrow">Continue the edit</p>
      <h2 id="related-heading" className="section-title mt-3">
        More from the season
      </h2>
      <div className="mt-8 grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} showDescription={false} />
        ))}
      </div>
    </section>
  );
}
