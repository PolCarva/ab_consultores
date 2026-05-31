import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getLatestPublishedNews(limit = 3) {
  return prisma.newsArticle.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
      coverImageUrl: true,
      publishedAt: true,
      content: true,
    },
  });
}

export async function getNoticiaBySlug(slug: string) {
  const session = await auth();
  const isAdmin = Boolean(session?.user?.id);

  return prisma.newsArticle.findFirst({
    where: {
      slug,
      ...(isAdmin ? {} : { published: true }),
    },
  });
}
