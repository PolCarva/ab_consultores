import { prisma } from "@/lib/prisma";
import {
  CONTENT_KEY,
  DEFAULT_CONTENT,
  mergeWithDefaults,
  type SiteContent,
} from "@/lib/site-content";

/**
 * Auto-reparación de la tabla SiteContent.
 *
 * En este proyecto quedaron restos de un intento de CMS anterior: la tabla
 * "SiteContent" existía con una forma distinta (columna `type` del enum
 * `ContentType`, sin las columnas `draft`/`published`). Esto rompía el guardado.
 *
 * Esta función comprueba si la tabla tiene la forma correcta y, si no, la
 * recrea limpia. Es segura: solo actúa cuando falta la columna `draft` (es
 * decir, cuando la tabla NO contiene contenido del CMS actual), así que no se
 * pierde nada nuestro. No toca las tablas Admin ni NewsArticle.
 *
 * Se ejecuta una sola vez por proceso (flag en memoria). Una vez que la tabla
 * queda bien, este chequeo es un no-op.
 */
let schemaEnsured = false;

async function ensureSiteContentSchema(): Promise<void> {
  if (schemaEnsured) return;

  const rows = await prisma.$queryRawUnsafe<{ exists: boolean }[]>(
    `SELECT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_schema = current_schema()
         AND table_name = 'SiteContent'
         AND column_name = 'draft'
     ) AS exists`,
  );

  const hasDraftColumn = rows?.[0]?.exists === true;

  if (!hasDraftColumn) {
    // Tabla inexistente o con la forma vieja: recrear limpia.
    await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "SiteContent" CASCADE`);
    await prisma.$executeRawUnsafe(
      `CREATE TABLE "SiteContent" (
         "id" TEXT NOT NULL,
         "key" TEXT NOT NULL,
         "draft" JSONB NOT NULL,
         "published" JSONB,
         "publishedAt" TIMESTAMP(3),
         "updatedAt" TIMESTAMP(3) NOT NULL,
         "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
         CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
       )`,
    );
    await prisma.$executeRawUnsafe(
      `CREATE UNIQUE INDEX IF NOT EXISTS "SiteContent_key_key" ON "SiteContent"("key")`,
    );
  }

  schemaEnsured = true;
}

/** Contenido publicado (lo que ve el público en la landing). */
export async function getPublishedContent(): Promise<SiteContent> {
  try {
    const row = await prisma.siteContent.findUnique({
      where: { key: CONTENT_KEY },
    });
    if (!row || row.published == null) return DEFAULT_CONTENT;
    return mergeWithDefaults(row.published);
  } catch {
    return DEFAULT_CONTENT;
  }
}

/** Contenido en borrador (lo que se edita en el admin). */
export async function getDraftContent(): Promise<SiteContent> {
  try {
    const row = await prisma.siteContent.findUnique({
      where: { key: CONTENT_KEY },
    });
    if (!row) return DEFAULT_CONTENT;
    return mergeWithDefaults(row.draft);
  } catch {
    return DEFAULT_CONTENT;
  }
}

/** Guarda el borrador (sin publicar). */
export async function saveDraftContent(
  content: SiteContent,
): Promise<SiteContent> {
  await ensureSiteContentSchema();
  const merged = mergeWithDefaults(content);
  const data = merged as unknown as object;
  await prisma.siteContent.upsert({
    where: { key: CONTENT_KEY },
    create: { key: CONTENT_KEY, draft: data },
    update: { draft: data },
  });
  return merged;
}

/** Publica: copia el borrador a publicado. */
export async function publishContent(): Promise<SiteContent> {
  await ensureSiteContentSchema();
  const row = await prisma.siteContent.findUnique({
    where: { key: CONTENT_KEY },
  });
  const draft = row ? mergeWithDefaults(row.draft) : DEFAULT_CONTENT;
  const data = draft as unknown as object;
  await prisma.siteContent.upsert({
    where: { key: CONTENT_KEY },
    create: {
      key: CONTENT_KEY,
      draft: data,
      published: data,
      publishedAt: new Date(),
    },
    update: { published: data, publishedAt: new Date() },
  });
  return draft;
}
