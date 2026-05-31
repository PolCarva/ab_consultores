"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";

export type AdminArticle = {
  id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  published: boolean;
  publishedAt: string | null;
  updatedAt: string;
};

export default function AdminNewsList({ articles }: { articles: AdminArticle[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar "${title}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/noticias/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      alert("No se pudo eliminar");
    } finally {
      setDeletingId(null);
    }
  };

  if (articles.length === 0) {
    return (
      <p className="rounded-2xl border border-moss/10 bg-white px-6 py-12 text-center text-charcoal/60">
        Todavía no hay noticias.{" "}
        <Link href="/admin/noticias/nueva" className="font-semibold text-green-accent">
          Crear la primera
        </Link>
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {articles.map((article) => (
        <li
          key={article.id}
          className="flex flex-col gap-4 rounded-2xl border border-moss/10 bg-white p-4 sm:flex-row sm:items-center"
        >
          <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={article.coverImageUrl}
              alt=""
              fill
              className="object-cover"
              unoptimized={article.coverImageUrl.startsWith("/uploads")}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-sans-custom font-bold text-moss">{article.title}</h2>
            <p className="font-mono-custom text-xs text-charcoal/50">/noticias/{article.slug}</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-charcoal/60">
              {article.published ? (
                <>
                  <Eye className="h-3.5 w-3.5 text-green-accent" />
                  Publicada
                </>
              ) : (
                <>
                  <EyeOff className="h-3.5 w-3.5" />
                  Borrador
                </>
              )}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Link
              href={`/noticias/${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-moss/15 px-3 py-2 text-sm text-moss"
            >
              {article.published ? "Ver" : "Vista previa"}
            </Link>
            <Link
              href={`/admin/noticias/${article.id}/editar`}
              className="inline-flex items-center gap-1 rounded-lg bg-moss/10 px-3 py-2 text-sm font-medium text-moss"
            >
              <Pencil className="h-4 w-4" />
              Editar
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(article.id, article.title)}
              disabled={deletingId === article.id}
              className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              {deletingId === article.id ? "…" : "Eliminar"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
