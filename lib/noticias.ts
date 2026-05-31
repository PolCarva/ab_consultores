import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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
