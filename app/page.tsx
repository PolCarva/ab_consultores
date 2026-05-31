import HomeClient from "./home-client";
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
  const raw = await getLatestPublishedNews(3);
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

  return <HomeClient latestNewsArticles={latestNewsArticles} />;
}
