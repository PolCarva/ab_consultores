import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Noticias | A&B Consultores",
  description: "Novedades y artículos de consultoría agropecuaria.",
};

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("es-UY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function NoticiasPage() {
  const articles = await prisma.newsArticle.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      coverImageUrl: true,
      publishedAt: true,
      content: true,
    },
  });

  return (
    <div className="container mx-auto px-6 py-16 md:py-24">
      <div className="mb-16 max-w-2xl">
        <p className="font-mono-custom text-sm uppercase tracking-widest text-green-accent">
          Novedades
        </p>
        <h1 className="mt-3 font-sans-custom text-4xl font-bold text-moss md:text-5xl">
          Noticias
        </h1>
        <p className="mt-4 text-lg text-charcoal/70">
          Artículos, novedades y reflexiones del equipo A&B.
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="rounded-2xl border border-moss/10 bg-white/60 px-6 py-12 text-center text-charcoal/60">
          Próximamente publicaremos contenido aquí.
        </p>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const excerpt = article.content
              .replace(/<[^>]+>/g, " ")
              .replace(/\s+/g, " ")
              .trim()
              .slice(0, 140);

            return (
              <article
                key={article.id}
                className="group overflow-hidden rounded-3xl border border-moss/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <Link href={`/noticias/${article.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.coverImageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized={article.coverImageUrl.startsWith("/uploads")}
                    />
                  </div>
                  <div className="p-6">
                    {article.publishedAt && (
                      <p className="mb-2 flex items-center gap-2 font-mono-custom text-xs text-charcoal/50">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(article.publishedAt)}
                      </p>
                    )}
                    <h2 className="font-sans-custom text-xl font-bold text-moss group-hover:text-green-accent">
                      {article.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-charcoal/70">{excerpt}…</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-accent">
                      Leer más
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
