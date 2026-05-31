"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Upload } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { slugify } from "@/lib/slug";

export type NewsFormValues = {
  title: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
};

type NewsFormProps = {
  mode: "create" | "edit";
  articleId?: string;
  slug?: string;
  initial?: Partial<NewsFormValues>;
};

export default function NewsForm({ mode, articleId, slug, initial }: NewsFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.coverImageUrl ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewSlug = slugify(title) || "tu-noticia";

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al subir");
      setCoverImageUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = { title, content, coverImageUrl, published };
    const url =
      mode === "create" ? "/api/admin/noticias" : `/api/admin/noticias/${articleId}`;
    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al guardar");
      router.push("/admin/noticias");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="mb-2 block font-sans-custom font-semibold text-moss">
          Título
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-moss/20 bg-white px-4 py-3 text-charcoal"
          placeholder="Ej: Nueva campaña de pastoreo"
        />
        <p className="mt-2 font-mono-custom text-sm text-charcoal/50">
          URL: /noticias/{previewSlug}
        </p>
      </div>

      <div>
        <span className="mb-2 block font-sans-custom font-semibold text-moss">
          Imagen de portada
        </span>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {coverImageUrl ? (
            <div className="relative h-40 w-full max-w-xs overflow-hidden rounded-xl border border-moss/10">
              <Image
                src={coverImageUrl}
                alt="Portada"
                fill
                className="object-cover"
                unoptimized={coverImageUrl.startsWith("/uploads")}
              />
            </div>
          ) : (
            <div className="flex h-40 w-full max-w-xs items-center justify-center rounded-xl border border-dashed border-moss/30 bg-cream/50 text-charcoal/40">
              Sin imagen
            </div>
          )}
          <label className="btn-magnetic inline-flex cursor-pointer items-center gap-2 rounded-full bg-moss px-5 py-3 text-sm font-semibold text-cream">
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {uploading ? "Subiendo…" : "Subir portada"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleCoverUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      <div>
        <span className="mb-2 block font-sans-custom font-semibold text-moss">Contenido</span>
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-5 w-5 rounded border-moss/30 text-green-accent"
        />
        <span className="font-sans-custom text-charcoal">Publicar (visible en /noticias)</span>
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={saving || uploading || !coverImageUrl}
          className="btn-magnetic rounded-full bg-green-accent px-8 py-3 font-semibold text-cream disabled:opacity-50"
        >
          {saving ? "Guardando…" : mode === "create" ? "Crear noticia" : "Guardar cambios"}
        </button>
        {mode === "edit" && slug && (
          <a
            href={`/noticias/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-amber-200 bg-amber-50 px-6 py-3 text-sm font-semibold text-amber-950 link-hover"
          >
            Vista previa
          </a>
        )}
        <button
          type="button"
          onClick={() => router.push("/admin/noticias")}
          className="rounded-full border border-moss/20 px-8 py-3 font-semibold text-moss"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
