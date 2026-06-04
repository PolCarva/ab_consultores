"use client";

import { useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-moss/70">
      {children}
    </label>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="mb-4">
      <FieldLabel>{label}</FieldLabel>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-moss/20 bg-white px-3 py-2 text-sm text-charcoal outline-none transition-colors focus:border-green-accent"
      />
    </div>
  );
}

export function TextareaField({
  label,
  value,
  onChange,
  rows = 3,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <div className="mb-4">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-lg border border-moss/20 bg-white px-3 py-2 text-sm text-charcoal outline-none transition-colors focus:border-green-accent"
      />
      {hint && <p className="mt-1 text-xs text-charcoal/40">{hint}</p>}
    </div>
  );
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir");
      onChange(data.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error al subir");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex items-start gap-3">
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-moss/20 bg-moss/5">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-moss/30">
              <ImageIcon className="h-6 w-6" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-xs font-semibold text-moss transition-colors hover:bg-moss/5 disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5" />
            )}
            {uploading ? "Subiendo…" : "Subir imagen"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
          <input
            type="text"
            value={value}
            placeholder="o pegá una URL"
            onChange={(e) => onChange(e.target.value)}
            className="mt-2 w-full rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-xs text-charcoal outline-none focus:border-green-accent"
          />
          {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
        </div>
      </div>
    </div>
  );
}

/** Editor genérico de listas con reordenar (subir/bajar), agregar y eliminar. */
export function ArrayEditor<T>({
  label,
  items,
  onChange,
  renderItem,
  newItem,
  itemLabel,
  addLabel = "Agregar",
  minItems = 0,
}: {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, update: (v: T) => void, index: number) => React.ReactNode;
  newItem: () => T;
  itemLabel: (item: T, index: number) => string;
  addLabel?: string;
  minItems?: number;
}) {
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    onChange(next);
  };
  const remove = (i: number) => {
    if (items.length <= minItems) return;
    onChange(items.filter((_, idx) => idx !== i));
  };
  const updateAt = (i: number, v: T) => {
    onChange(items.map((it, idx) => (idx === i ? v : it)));
  };

  return (
    <div className="mb-4">
      <FieldLabel>{label}</FieldLabel>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-moss/15 bg-moss/[0.03] p-3"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="truncate text-xs font-semibold text-moss">
                {itemLabel(item, i)}
              </span>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(i, i - 1)}
                  disabled={i === 0}
                  className="rounded p-1 text-moss/60 hover:bg-moss/10 disabled:opacity-30"
                  aria-label="Subir"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, i + 1)}
                  disabled={i === items.length - 1}
                  className="rounded p-1 text-moss/60 hover:bg-moss/10 disabled:opacity-30"
                  aria-label="Bajar"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  disabled={items.length <= minItems}
                  className="rounded p-1 text-red-500 hover:bg-red-50 disabled:opacity-30"
                  aria-label="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {renderItem(item, (v) => updateAt(i, v), i)}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, newItem()])}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-moss/30 px-3 py-1.5 text-xs font-semibold text-moss transition-colors hover:bg-moss/5"
      >
        <Plus className="h-3.5 w-3.5" />
        {addLabel}
      </button>
    </div>
  );
}

/** Editor simple de lista de strings (ej: features de un servicio). */
export function StringListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <ArrayEditor
      label={label}
      items={items}
      onChange={onChange}
      newItem={() => ""}
      itemLabel={(_, i) => `Ítem ${i + 1}`}
      addLabel="Agregar ítem"
      renderItem={(item, update) => (
        <input
          type="text"
          value={item}
          onChange={(e) => update(e.target.value)}
          className="w-full rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm text-charcoal outline-none focus:border-green-accent"
        />
      )}
    />
  );
}
