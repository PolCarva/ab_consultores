import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-helpers";
import { getDraftContent, saveDraftContent } from "@/lib/site-content.server";
import type { SiteContent } from "@/lib/site-content";

// Obtener el borrador actual (para el editor).
export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const content = await getDraftContent();
  return NextResponse.json({ content });
}

// Guardar el borrador (sin publicar).
export async function PUT(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = (await request.json()) as { content?: SiteContent };
    if (!body?.content) {
      return NextResponse.json(
        { error: "Falta el contenido" },
        { status: 400 },
      );
    }
    const saved = await saveDraftContent(body.content);
    return NextResponse.json({ content: saved });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al guardar";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
