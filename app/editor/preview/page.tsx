import EditorPreview from "@/components/admin/editor/EditorPreview";
import { getDraftContent } from "@/lib/site-content.server";
import { getLatestPublishedNews } from "@/lib/noticias";
import type { LatestNewsArticle } from "@/components/home/LatestNewsHome";

export const dynamic = "force-dynamic";

function formatNewsDate(date: Date) {
  return new Intl.DateTimeFormat("es-UY", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default async function EditorPreviewPage() {
  const [initialContent, raw] = await Promise.all([
    getDraftContent(),
    getLatestPublishedNews(3),
  ]);

  const latestNewsArticles: LatestNewsArticle[] = raw.map((article) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    coverImageUrl: article.coverImageUrl,
    content: article.content,
    publishedAtLabel: article.publishedAt
      ? formatNewsDate(article.publishedAt)
      : null,
  }));

  return (
    <EditorPreview
      initialContent={initialContent}
      latestNewsArticles={latestNewsArticles}
    />
  );
}
