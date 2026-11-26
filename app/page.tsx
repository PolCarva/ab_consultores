import NewHome from "@/components/home/NewHome";
import { getLatestPublishedNews } from "@/lib/noticias";
import type { LatestNewsArticle } from "@/components/home/LatestNewsHome";

export const revalidate = 300;

function formatNewsDate(date: Date) {
  return new Intl.DateTimeFormat("es-UY", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default async function Home() {
  // Si la base no responde, la home se muestra igual, sin noticias.
  const raw = await getLatestPublishedNews(3).catch((error) => {
    console.error("No se pudieron cargar las noticias de la home:", error);
    return [];
  });
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

  return <NewHome latestNewsArticles={latestNewsArticles} />;
}
