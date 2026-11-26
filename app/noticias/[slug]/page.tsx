import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
    <article className="mx-auto max-w-[760px] px-6 py-14 md:py-20">
      <Link
        href={isPreview ? "/admin/noticias" : "/noticias"}
        className="mb-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#0f4a2a] no-underline hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        {isPreview ? "Volver al panel" : "Volver a noticias"}
      </Link>

      {isPreview && <PreviewBanner />}

      {article.publishedAt && (
        <p className="mb-3 text-sm font-semibold text-[#4b5d51]">
          {formatDate(article.publishedAt)}
        </p>
      )}

      <h1 className="m-0 text-[clamp(30px,4.4vw,46px)] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#0f4a2a]">
        {article.title}
      </h1>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[20px] bg-[#0f4a2a]">
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
        className="prose-noticias prose-ayb mt-10"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
