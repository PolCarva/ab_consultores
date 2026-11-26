import Link from "next/link";
import Image from "next/image";
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
    <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 py-[72px] md:py-[88px]">
      <div className="flex max-w-[680px] flex-col gap-3">
        <span className="text-[13px] font-bold tracking-[0.1em] text-[#7a5a0c]">NOVEDADES</span>
        <h1 className="m-0 text-[clamp(32px,4vw,44px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#0f4a2a]">
          Noticias
        </h1>
        <p className="m-0 text-lg leading-[1.55] text-[#3f5146]">
          Artículos y novedades del equipo A&amp;B sobre mercados, economía y gestión del campo.
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="rounded-[18px] bg-[#eef4e8] px-6 py-12 text-center text-[#3f5146]">
          Próximamente publicaremos contenido aquí.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-x-6 gap-y-12">
          {articles.map((article) => {
            const text = article.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
            const excerpt = text.length > 140 ? `${text.slice(0, 140).trimEnd()}…` : text;

            return (
              <Link
                key={article.id}
                href={`/noticias/${article.slug}`}
                className="group flex flex-col gap-4 text-[#13241a] no-underline"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-[#0f4a2a]">
                  <Image
                    src={article.coverImageUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized={article.coverImageUrl.startsWith("/uploads")}
                  />
                </div>
                {article.publishedAt && (
                  <span className="text-sm font-semibold text-[#4b5d51]">{formatDate(article.publishedAt)}</span>
                )}
                <h2 className="m-0 text-[21px] font-extrabold leading-[1.3] text-[#13241a] group-hover:text-[#0f4a2a]">
                  {article.title}
                </h2>
                <p className="m-0 line-clamp-3 text-[15px] leading-[1.55] text-[#3f5146]">{excerpt}</p>
                <span className="text-[15px] font-bold text-[#0f4a2a]">Leer más →</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
