import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { DEFAULT_CONTENT, type NewsContent } from "@/lib/site-content";

export type LatestNewsArticle = {
  id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  content: string;
  publishedAtLabel: string | null;
};

export default function LatestNewsHome({
  articles,
  content = DEFAULT_CONTENT.news,
  previewMode = false,
}: {
  articles: LatestNewsArticle[];
  content?: NewsContent;
  previewMode?: boolean;
}) {
  // En el sitio público se oculta si no hay noticias.
  // En el editor (previewMode) siempre se muestra para poder editar los textos.
  if (articles.length === 0 && !previewMode) return null;

  return (
    <section id="noticias" className="bg-cream px-6 py-24">
      <div className="container mx-auto">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-custom text-sm uppercase tracking-widest text-green-accent">
              {content.eyebrow}
            </p>
            <h2 className="mt-2 font-sans-custom text-4xl font-bold text-moss md:text-5xl">
              {content.heading}
            </h2>
            <p className="mt-3 max-w-xl text-lg text-charcoal/70">
              {content.subheading}
            </p>
          </div>
          <Link
            href="/noticias"
            className="btn-magnetic inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-moss px-6 py-3 font-sans-custom font-semibold text-moss link-hover"
          >
            {content.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {articles.length === 0 && previewMode ? (
          <div className="rounded-3xl border border-dashed border-moss/30 bg-white/50 p-12 text-center text-charcoal/50">
            Las noticias publicadas aparecerán aquí automáticamente.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const excerpt = article.content
                .replace(/<[^>]+>/g, " ")
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, 100);

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
                      {article.publishedAtLabel && (
                        <p className="mb-2 flex items-center gap-2 font-mono-custom text-xs text-charcoal/50">
                          <Calendar className="h-3.5 w-3.5" />
                          {article.publishedAtLabel}
                        </p>
                      )}
                      <h3 className="font-sans-custom text-xl font-bold text-moss group-hover:text-green-accent">
                        {article.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-charcoal/70">
                        {excerpt}…
                      </p>
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
    </section>
  );
}
