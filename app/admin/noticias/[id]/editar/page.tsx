import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import NewsForm from "@/components/admin/NewsForm";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditarNoticiaPage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");

  const { id } = await params;
  const article = await prisma.newsArticle.findFirst({
    where: { id },
  });

  if (!article) notFound();

  return (
    <div>
      <h1 className="mb-8 font-sans-custom text-3xl font-bold text-moss">Editar noticia</h1>
      <NewsForm
        mode="edit"
        articleId={article.id}
        slug={article.slug}
        initial={{
          title: article.title,
          content: article.content,
          coverImageUrl: article.coverImageUrl,
          published: article.published,
        }}
      />
    </div>
  );
}
