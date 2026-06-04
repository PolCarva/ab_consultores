import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-helpers";
import { publishContent, saveDraftContent } from "@/lib/site-content.server";
import type { SiteContent } from "@/lib/site-content";

// Publica: guarda el borrador recibido (si viene) y lo copia a publicado.
export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = (await request
      .json()
      .catch(() => ({}))) as { content?: SiteContent };

    if (body?.content) {
      await saveDraftContent(body.content);
    }

    const published = await publishContent();

    // Refresca la landing pública inmediatamente.
    revalidatePath("/");

    return NextResponse.json({ content: published, publishedAt: new Date() });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al publicar";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
