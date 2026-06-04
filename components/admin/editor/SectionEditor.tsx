"use client";

import type {
  SiteContent,
  SectionId,
  ServiceCardContent,
  ProtocolStep,
  ResultItem,
  ResultIcon,
  NavLink,
  FeatureCardContent,
} from "@/lib/site-content";
import {
  ArrayEditor,
  ImageField,
  StringListEditor,
  TextField,
  TextareaField,
} from "./fields";

export type EditorKey = SectionId | "nav" | "social" | "footer";

export const EXTRA_LABELS: Record<"nav" | "social" | "footer", string> = {
  nav: "Barra de navegación",
  social: "Redes sociales / WhatsApp",
  footer: "Pie de página",
};

const RESULT_ICON_OPTIONS: { value: ResultIcon; label: string }[] = [
  { value: "file", label: "Documento" },
  { value: "target", label: "Objetivo" },
  { value: "chart", label: "Gráfico" },
  { value: "trending", label: "Tendencia" },
];

export default function SectionEditor({
  editorKey,
  content,
  onChange,
}: {
  editorKey: EditorKey;
  content: SiteContent;
  onChange: (next: SiteContent) => void;
}) {
  // Helper para actualizar una clave de primer nivel del contenido.
  function set<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    onChange({ ...content, [key]: value });
  }

  switch (editorKey) {
    case "nav": {
      const nav = content.nav;
      return (
        <div>
          <ArrayEditor<NavLink>
            label="Enlaces del menú"
            items={nav.links}
            onChange={(links) => set("nav", { ...nav, links })}
            newItem={() => ({ label: "Nuevo enlace", href: "#" })}
            itemLabel={(l) => l.label || "Enlace"}
            addLabel="Agregar enlace"
            renderItem={(link, update) => (
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={link.label}
                  placeholder="Texto"
                  onChange={(e) => update({ ...link, label: e.target.value })}
                  className="rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-accent"
                />
                <input
                  value={link.href}
                  placeholder="#seccion o /ruta"
                  onChange={(e) => update({ ...link, href: e.target.value })}
                  className="rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-accent"
                />
              </div>
            )}
          />
          <TextField
            label="Texto del botón"
            value={nav.ctaLabel}
            onChange={(v) => set("nav", { ...nav, ctaLabel: v })}
          />
          <TextField
            label="Destino del botón"
            value={nav.ctaHref}
            onChange={(v) => set("nav", { ...nav, ctaHref: v })}
          />
        </div>
      );
    }

    case "social": {
      const s = content.social;
      return (
        <div>
          <TextField
            label="URL de WhatsApp"
            value={s.whatsappUrl}
            onChange={(v) => set("social", { ...s, whatsappUrl: v })}
          />
          <TextField
            label="URL de Instagram"
            value={s.instagramUrl}
            onChange={(v) => set("social", { ...s, instagramUrl: v })}
          />
          <TextField
            label="Usuario de Instagram"
            value={s.instagramHandle}
            onChange={(v) => set("social", { ...s, instagramHandle: v })}
          />
          <TextField
            label="URL de Facebook"
            value={s.facebookUrl}
            onChange={(v) => set("social", { ...s, facebookUrl: v })}
          />
        </div>
      );
    }

    case "hero": {
      const h = content.hero;
      return (
        <div>
          <TextField
            label="Etiqueta superior"
            value={h.badge}
            onChange={(v) => set("hero", { ...h, badge: v })}
          />
          <TextField
            label="Título (línea 1)"
            value={h.titleLine1}
            onChange={(v) => set("hero", { ...h, titleLine1: v })}
          />
          <div className="grid grid-cols-2 gap-2">
            <TextField
              label="Título (línea 2)"
              value={h.titleLine2Pre}
              onChange={(v) => set("hero", { ...h, titleLine2Pre: v })}
            />
            <TextField
              label="Palabra destacada"
              value={h.titleLine2Highlight}
              onChange={(v) => set("hero", { ...h, titleLine2Highlight: v })}
            />
          </div>
          <TextareaField
            label="Párrafo"
            value={h.paragraph}
            onChange={(v) => set("hero", { ...h, paragraph: v })}
          />
          <div className="grid grid-cols-2 gap-2">
            <TextField
              label="Botón principal"
              value={h.primaryCtaLabel}
              onChange={(v) => set("hero", { ...h, primaryCtaLabel: v })}
            />
            <TextField
              label="Destino"
              value={h.primaryCtaHref}
              onChange={(v) => set("hero", { ...h, primaryCtaHref: v })}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <TextField
              label="Botón secundario"
              value={h.secondaryCtaLabel}
              onChange={(v) => set("hero", { ...h, secondaryCtaLabel: v })}
            />
            <TextField
              label="Destino"
              value={h.secondaryCtaHref}
              onChange={(v) => set("hero", { ...h, secondaryCtaHref: v })}
            />
          </div>
          <ImageField
            label="Imagen de fondo"
            value={h.backgroundImage}
            onChange={(v) => set("hero", { ...h, backgroundImage: v })}
          />
        </div>
      );
    }

    case "features": {
      const f = content.features;
      return (
        <div>
          <TextField
            label="Título"
            value={f.heading}
            onChange={(v) => set("features", { ...f, heading: v })}
          />
          <TextareaField
            label="Subtítulo"
            value={f.subheading}
            onChange={(v) => set("features", { ...f, subheading: v })}
          />
          <p className="mb-2 text-xs text-charcoal/40">
            Las 3 tarjetas tienen una animación fija; podés editar su texto.
          </p>
          <ArrayEditor<FeatureCardContent>
            label="Tarjetas"
            items={f.cards}
            onChange={(cards) => set("features", { ...f, cards })}
            newItem={() => ({ title: "Nueva tarjeta", description: "" })}
            itemLabel={(c) => c.title || "Tarjeta"}
            addLabel="Agregar tarjeta"
            minItems={1}
            renderItem={(card, update) => (
              <div className="space-y-2">
                <input
                  value={card.title}
                  placeholder="Título"
                  onChange={(e) => update({ ...card, title: e.target.value })}
                  className="w-full rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-accent"
                />
                <textarea
                  value={card.description}
                  placeholder="Descripción"
                  rows={2}
                  onChange={(e) =>
                    update({ ...card, description: e.target.value })
                  }
                  className="w-full resize-y rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-accent"
                />
              </div>
            )}
          />
        </div>
      );
    }

    case "philosophy": {
      const p = content.philosophy;
      return (
        <div>
          <TextareaField
            label="Párrafo 1"
            value={p.paragraph1}
            rows={3}
            hint="Admite negritas con <strong>texto</strong>."
            onChange={(v) => set("philosophy", { ...p, paragraph1: v })}
          />
          <TextareaField
            label="Párrafo 2"
            value={p.paragraph2}
            rows={4}
            hint="Admite negritas con <strong>texto</strong>."
            onChange={(v) => set("philosophy", { ...p, paragraph2: v })}
          />
          <TextareaField
            label="Frase destacada (texto)"
            value={p.highlightPre}
            onChange={(v) => set("philosophy", { ...p, highlightPre: v })}
          />
          <TextField
            label="Palabra resaltada"
            value={p.highlightWord}
            onChange={(v) => set("philosophy", { ...p, highlightWord: v })}
          />
          <ImageField
            label="Imagen de fondo"
            value={p.backgroundImage}
            onChange={(v) => set("philosophy", { ...p, backgroundImage: v })}
          />
        </div>
      );
    }

    case "protocol": {
      const p = content.protocol;
      return (
        <div>
          <TextField
            label="Título"
            value={p.heading}
            onChange={(v) => set("protocol", { ...p, heading: v })}
          />
          <TextareaField
            label="Subtítulo"
            value={p.subheading}
            onChange={(v) => set("protocol", { ...p, subheading: v })}
          />
          <ArrayEditor<ProtocolStep>
            label="Pasos"
            items={p.steps}
            onChange={(steps) => set("protocol", { ...p, steps })}
            newItem={() => ({
              number: String(p.steps.length + 1).padStart(2, "0"),
              title: "Nuevo paso",
              description: "",
            })}
            itemLabel={(s) => `${s.number} · ${s.title}`}
            addLabel="Agregar paso"
            renderItem={(step, update) => (
              <div className="space-y-2">
                <div className="grid grid-cols-[70px_1fr] gap-2">
                  <input
                    value={step.number}
                    placeholder="01"
                    onChange={(e) =>
                      update({ ...step, number: e.target.value })
                    }
                    className="rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-accent"
                  />
                  <input
                    value={step.title}
                    placeholder="Título"
                    onChange={(e) => update({ ...step, title: e.target.value })}
                    className="rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-accent"
                  />
                </div>
                <textarea
                  value={step.description}
                  placeholder="Descripción"
                  rows={2}
                  onChange={(e) =>
                    update({ ...step, description: e.target.value })
                  }
                  className="w-full resize-y rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-accent"
                />
              </div>
            )}
          />
        </div>
      );
    }

    case "services": {
      const s = content.services;
      return (
        <div>
          <TextField
            label="Título"
            value={s.heading}
            onChange={(v) => set("services", { ...s, heading: v })}
          />
          <TextareaField
            label="Subtítulo"
            value={s.subheading}
            onChange={(v) => set("services", { ...s, subheading: v })}
          />
          <ArrayEditor<ServiceCardContent>
            label="Servicios"
            items={s.cards}
            onChange={(cards) => set("services", { ...s, cards })}
            newItem={() => ({
              title: "Nuevo servicio",
              description: "",
              features: [],
              cta: "Consultar este servicio",
              servicio: "",
              premium: false,
            })}
            itemLabel={(c) => c.title || "Servicio"}
            addLabel="Agregar servicio"
            minItems={1}
            renderItem={(card, update) => (
              <div className="space-y-2">
                <input
                  value={card.title}
                  placeholder="Título"
                  onChange={(e) => update({ ...card, title: e.target.value })}
                  className="w-full rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-accent"
                />
                <textarea
                  value={card.description}
                  placeholder="Descripción"
                  rows={2}
                  onChange={(e) =>
                    update({ ...card, description: e.target.value })
                  }
                  className="w-full resize-y rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-accent"
                />
                <StringListEditor
                  label="Características"
                  items={card.features}
                  onChange={(features) => update({ ...card, features })}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={card.cta}
                    placeholder="Texto del botón"
                    onChange={(e) => update({ ...card, cta: e.target.value })}
                    className="rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-accent"
                  />
                  <input
                    value={card.servicio}
                    placeholder="id (funcional...)"
                    onChange={(e) =>
                      update({ ...card, servicio: e.target.value })
                    }
                    className="rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-accent"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-moss">
                  <input
                    type="checkbox"
                    checked={card.premium}
                    onChange={(e) =>
                      update({ ...card, premium: e.target.checked })
                    }
                    className="h-4 w-4 accent-green-accent"
                  />
                  Destacar como Premium
                </label>
              </div>
            )}
          />
        </div>
      );
    }

    case "results": {
      const r = content.results;
      return (
        <div>
          <TextField
            label="Título"
            value={r.heading}
            onChange={(v) => set("results", { ...r, heading: v })}
          />
          <TextareaField
            label="Subtítulo"
            value={r.subheading}
            onChange={(v) => set("results", { ...r, subheading: v })}
          />
          <ArrayEditor<ResultItem>
            label="Resultados"
            items={r.items}
            onChange={(items) => set("results", { ...r, items })}
            newItem={() => ({
              icon: "file",
              title: "Nuevo resultado",
              description: "",
            })}
            itemLabel={(it) => it.title || "Resultado"}
            addLabel="Agregar resultado"
            renderItem={(item, update) => (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={item.title}
                    placeholder="Título"
                    onChange={(e) => update({ ...item, title: e.target.value })}
                    className="rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-accent"
                  />
                  <select
                    value={item.icon}
                    onChange={(e) =>
                      update({ ...item, icon: e.target.value as ResultIcon })
                    }
                    className="rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-accent"
                  >
                    {RESULT_ICON_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  value={item.description}
                  placeholder="Descripción"
                  rows={2}
                  onChange={(e) =>
                    update({ ...item, description: e.target.value })
                  }
                  className="w-full resize-y rounded-lg border border-moss/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-accent"
                />
              </div>
            )}
          />
        </div>
      );
    }

    case "news": {
      const n = content.news;
      return (
        <div>
          <p className="mb-3 text-xs text-charcoal/40">
            Las noticias se administran en el Panel de noticias. Acá editás solo
            los textos de encabezado de la sección.
          </p>
          <TextField
            label="Etiqueta superior"
            value={n.eyebrow}
            onChange={(v) => set("news", { ...n, eyebrow: v })}
          />
          <TextField
            label="Título"
            value={n.heading}
            onChange={(v) => set("news", { ...n, heading: v })}
          />
          <TextareaField
            label="Subtítulo"
            value={n.subheading}
            onChange={(v) => set("news", { ...n, subheading: v })}
          />
          <TextField
            label="Texto del botón"
            value={n.ctaLabel}
            onChange={(v) => set("news", { ...n, ctaLabel: v })}
          />
        </div>
      );
    }

    case "contact": {
      const c = content.contact;
      return (
        <div>
          <TextField
            label="Título"
            value={c.heading}
            onChange={(v) => set("contact", { ...c, heading: v })}
          />
          <TextareaField
            label="Subtítulo"
            value={c.subheading}
            onChange={(v) => set("contact", { ...c, subheading: v })}
          />
          <TextField
            label="Texto del botón de envío"
            value={c.submitLabel}
            onChange={(v) => set("contact", { ...c, submitLabel: v })}
          />
        </div>
      );
    }

    case "footer": {
      const f = content.footer;
      return (
        <div>
          <TextareaField
            label="Descripción"
            value={f.tagline}
            onChange={(v) => set("footer", { ...f, tagline: v })}
          />
          <div className="grid grid-cols-2 gap-2">
            <TextField
              label="Título enlaces"
              value={f.linksHeading}
              onChange={(v) => set("footer", { ...f, linksHeading: v })}
            />
            <TextField
              label="Título contacto"
              value={f.contactHeading}
              onChange={(v) => set("footer", { ...f, contactHeading: v })}
            />
          </div>
          <TextField
            label="Email"
            value={f.email}
            onChange={(v) => set("footer", { ...f, email: v })}
          />
          <TextField
            label="Teléfono"
            value={f.phone}
            onChange={(v) => set("footer", { ...f, phone: v })}
          />
          <div className="grid grid-cols-2 gap-2">
            <TextField
              label="Usuario Instagram"
              value={f.instagramHandle}
              onChange={(v) => set("footer", { ...f, instagramHandle: v })}
            />
            <TextField
              label="URL Instagram"
              value={f.instagramUrl}
              onChange={(v) => set("footer", { ...f, instagramUrl: v })}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <TextField
              label="Texto Facebook"
              value={f.facebookLabel}
              onChange={(v) => set("footer", { ...f, facebookLabel: v })}
            />
            <TextField
              label="URL Facebook"
              value={f.facebookUrl}
              onChange={(v) => set("footer", { ...f, facebookUrl: v })}
            />
          </div>
          <TextField
            label="Ubicación"
            value={f.location}
            onChange={(v) => set("footer", { ...f, location: v })}
          />
          <TextField
            label="Copyright"
            value={f.copyright}
            onChange={(v) => set("footer", { ...f, copyright: v })}
          />
        </div>
      );
    }

    default:
      return null;
  }
}
