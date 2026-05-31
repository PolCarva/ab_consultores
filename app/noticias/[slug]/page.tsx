import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import PreviewBanner from "@/components/noticias/PreviewBanner";
import { getNoticiaBySlug } from "@/lib/noticias";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNoticiaBySlug(slug);

  if (!article) return { title: "Noticia no encontrada" };

  const title = article.published
    ? `${article.title} | A&B Consultores`
    : `Vista previa: ${article.title}`;

  return {
    title,
    openGraph: article.published ? { images: [article.coverImageUrl] } : undefined,
    robots: article.published ? undefined : { index: false, follow: false },
  };
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("es-UY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function NoticiaDetallePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNoticiaBySlug(slug);

  if (!article) notFound();

  const isPreview = !article.published;

  return (
    <article className="container mx-auto max-w-3xl px-6 py-12 md:py-20">
      <Link
        href={isPreview ? "/admin/noticias" : "/noticias"}
        className="mb-8 inline-flex items-center gap-2 font-sans-custom text-sm font-medium text-green-accent link-hover"
      >
        <ArrowLeft className="h-4 w-4" />
        {isPreview ? "Volver al panel" : "Volver a noticias"}
      </Link>

      {isPreview && <PreviewBanner />}

      {article.publishedAt && (
        <p className="mb-4 flex items-center gap-2 font-mono-custom text-sm text-charcoal/50">
          <Calendar className="h-4 w-4" />
          {formatDate(article.publishedAt)}
        </p>
      )}

      <h1 className="font-sans-custom text-3xl font-bold text-moss md:text-5xl">
        {article.title}
      </h1>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl">
        <Image
          src={article.coverImageUrl}
          alt={article.title}
          fill
          className="object-cover"
          priority
          unoptimized={article.coverImageUrl.startsWith("/uploads")}
        />
      </div>

      <div
        className="prose-noticias mt-10"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
