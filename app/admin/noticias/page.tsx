import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminNewsList from "@/components/admin/AdminNewsList";

export default async function AdminNoticiasPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");

  const articles = await prisma.newsArticle.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      coverImageUrl: true,
      published: true,
      publishedAt: true,
      updatedAt: true,
    },
  });

  const serialized = articles.map((a) => ({
    ...a,
    publishedAt: a.publishedAt?.toISOString() ?? null,
    updatedAt: a.updatedAt.toISOString(),
  }));

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-sans-custom text-3xl font-bold text-moss">Noticias</h1>
        <Link
          href="/admin/noticias/nueva"
          className="btn-magnetic rounded-full bg-green-accent px-6 py-3 font-semibold text-cream"
        >
          Nueva noticia
        </Link>
      </div>
      <AdminNewsList articles={serialized} />
    </div>
  );
}
