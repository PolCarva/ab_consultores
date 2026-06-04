"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  GripVertical,
  Loader2,
  Monitor,
  Smartphone,
  UploadCloud,
} from "lucide-react";
import {
  SECTION_LABELS,
  type SiteContent,
  type SectionId,
} from "@/lib/site-content";
import SectionEditor, {
  EXTRA_LABELS,
  type EditorKey,
} from "./SectionEditor";

type Viewport = "desktop" | "mobile";

export default function EditorClient({
  initialContent,
}: {
  initialContent: SiteContent;
}) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [selected, setSelected] = useState<EditorKey | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [publishedFlash, setPublishedFlash] = useState(false);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Empuja el contenido al preview cada vez que cambia.
  const postToPreview = (next: SiteContent) => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "cms:update", content: next },
      "*",
    );
  };

  useEffect(() => {
    postToPreview(content);
  }, [content]);

  const update = (next: SiteContent) => {
    setContent(next);
    setDirty(true);
  };

  // ---- Reordenar / visibilidad de secciones ----
  const moveSection = (from: number, to: number) => {
    if (to < 0 || to >= content.order.length) return;
    const order = [...content.order];
    const [m] = order.splice(from, 1);
    order.splice(to, 0, m);
    update({ ...content, order });
  };

  const toggleVisible = (id: SectionId) => {
    update({
      ...content,
      visibility: { ...content.visibility, [id]: !content.visibility[id] },
    });
  };

  const scrollPreviewTo = (id: SectionId) => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "cms:scrollTo", sectionId: id },
      "*",
    );
  };

  // ---- Guardar / Publicar ----
  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error();
      setDirty(false);
      setSavedAt(new Date().toLocaleTimeString("es-UY"));
    } catch {
      alert("No se pudo guardar el borrador.");
    } finally {
      setSaving(false);
    }
  };

  const publish = async () => {
    setPublishing(true);
    try {
      const res = await fetch("/api/admin/content/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error();
      setDirty(false);
      setPublishedFlash(true);
      setTimeout(() => setPublishedFlash(false), 2500);
    } catch {
      alert("No se pudo publicar.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 top-0 z-30 flex flex-col bg-moss/5">
      {/* Barra superior */}
      <header className="flex items-center justify-between gap-4 border-b border-moss/10 bg-white px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/noticias"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal/60 hover:text-moss"
          >
            <ArrowLeft className="h-4 w-4" />
            Salir
          </Link>
          <span className="hidden text-sm font-bold text-moss sm:inline">
            Editor de la web
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center rounded-lg border border-moss/15 p-0.5 md:flex">
            <button
              onClick={() => setViewport("desktop")}
              className={`rounded-md p-1.5 ${viewport === "desktop" ? "bg-moss/10 text-moss" : "text-charcoal/40"}`}
              aria-label="Vista escritorio"
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewport("mobile")}
              className={`rounded-md p-1.5 ${viewport === "mobile" ? "bg-moss/10 text-moss" : "text-charcoal/40"}`}
              aria-label="Vista móvil"
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>

          <span className="hidden text-xs text-charcoal/40 lg:inline">
            {dirty
              ? "Cambios sin guardar"
              : savedAt
                ? `Borrador guardado ${savedAt}`
                : ""}
          </span>

          <button
            onClick={save}
            disabled={saving || !dirty}
            className="inline-flex items-center gap-1.5 rounded-full border border-moss/20 px-4 py-1.5 text-sm font-semibold text-moss transition-colors hover:bg-moss/5 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            Guardar borrador
          </button>

          <button
            onClick={publish}
            disabled={publishing}
            className="inline-flex items-center gap-1.5 rounded-full bg-green-accent px-4 py-1.5 text-sm font-semibold text-cream transition-colors hover:bg-green-accent/90 disabled:opacity-50"
          >
            {publishing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : publishedFlash ? (
              <Check className="h-4 w-4" />
            ) : (
              <UploadCloud className="h-4 w-4" />
            )}
            {publishedFlash ? "¡Publicado!" : "Publicar"}
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Panel lateral */}
        <aside className="flex w-full max-w-[380px] shrink-0 flex-col border-r border-moss/10 bg-white">
          {selected ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex items-center gap-2 border-b border-moss/10 px-4 py-3">
                <button
                  onClick={() => setSelected(null)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-moss hover:text-green-accent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Secciones
                </button>
                <span className="ml-auto truncate text-sm font-bold text-charcoal">
                  {selected in EXTRA_LABELS
                    ? EXTRA_LABELS[selected as keyof typeof EXTRA_LABELS]
                    : SECTION_LABELS[selected as SectionId]}
                </span>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-4">
                <SectionEditor
                  editorKey={selected}
                  content={content}
                  onChange={update}
                />
              </div>
            </div>
          ) : (
            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-moss/50">
                Secciones de la página
              </p>
              <p className="mb-3 px-1 text-xs text-charcoal/40">
                Arrastrá para reordenar. Tocá el ojo para ocultar/mostrar.
              </p>
              <ul className="space-y-1.5">
                {content.order.map((id, index) => {
                  const visible = content.visibility[id];
                  return (
                    <li
                      key={id}
                      draggable
                      onDragStart={() => setDragIndex(index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        if (dragIndex !== null && dragIndex !== index)
                          moveSection(dragIndex, index);
                        setDragIndex(null);
                      }}
                      onDragEnd={() => setDragIndex(null)}
                      className={`flex items-center gap-2 rounded-xl border bg-white px-2 py-2 transition-shadow ${
                        dragIndex === index
                          ? "border-green-accent shadow-md"
                          : "border-moss/15 hover:border-moss/30"
                      } ${visible ? "" : "opacity-55"}`}
                    >
                      <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-moss/30" />
                      <button
                        onClick={() => {
                          setSelected(id);
                          scrollPreviewTo(id);
                        }}
                        className="flex-1 truncate text-left text-sm font-semibold text-charcoal hover:text-green-accent"
                      >
                        {SECTION_LABELS[id]}
                      </button>
                      <div className="flex shrink-0 items-center">
                        <button
                          onClick={() => moveSection(index, index - 1)}
                          disabled={index === 0}
                          className="rounded p-1 text-moss/50 hover:bg-moss/10 disabled:opacity-25"
                          aria-label="Subir"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveSection(index, index + 1)}
                          disabled={index === content.order.length - 1}
                          className="rounded p-1 text-moss/50 hover:bg-moss/10 disabled:opacity-25"
                          aria-label="Bajar"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => toggleVisible(id)}
                          className="rounded p-1 text-moss/60 hover:bg-moss/10"
                          aria-label={visible ? "Ocultar" : "Mostrar"}
                        >
                          {visible ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p className="mb-2 mt-6 px-1 text-xs font-semibold uppercase tracking-wide text-moss/50">
                Elementos globales
              </p>
              <ul className="space-y-1.5">
                {(Object.keys(EXTRA_LABELS) as (keyof typeof EXTRA_LABELS)[]).map(
                  (k) => (
                    <li key={k}>
                      <button
                        onClick={() => setSelected(k)}
                        className="w-full rounded-xl border border-moss/15 bg-white px-3 py-2.5 text-left text-sm font-semibold text-charcoal transition-colors hover:border-moss/30 hover:text-green-accent"
                      >
                        {EXTRA_LABELS[k]}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </aside>

        {/* Preview */}
        <main className="min-w-0 flex-1 overflow-auto bg-[#e9e7df] p-4">
          <div
            className="mx-auto h-full bg-white shadow-xl transition-all duration-300"
            style={{
              maxWidth: viewport === "mobile" ? "390px" : "100%",
              borderRadius: viewport === "mobile" ? "1.5rem" : "0.5rem",
              overflow: "hidden",
            }}
          >
            <iframe
              ref={iframeRef}
              src="/editor/preview"
              title="Vista previa"
              className="h-full w-full border-0"
              onLoad={() => postToPreview(content)}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
