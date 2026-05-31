import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slug";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const { session, error } = await requireAdmin();
  if (error) return error;

  const { id } = await context.params;
  const article = await prisma.newsArticle.findFirst({
    where: { id },
  });

  if (!article) {
    return NextResponse.json({ error: "No encontrada" }, { status: 404 });
  }

  return NextResponse.json(article);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { session, error } = await requireAdmin();
  if (error) return error;

  const { id } = await context.params;

  try {
    const existing = await prisma.newsArticle.findFirst({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "No encontrada" }, { status: 404 });
    }

    const body = await request.json();
    const { title, content, coverImageUrl, published } = body as {
      title?: string;
      content?: string;
      coverImageUrl?: string;
      published?: boolean;
    };

    const data: {
      title?: string;
      slug?: string;
      content?: string;
      coverImageUrl?: string;
      published?: boolean;
      publishedAt?: Date | null;
    } = {};

    if (title !== undefined) {
      data.title = title.trim();
      data.slug = await uniqueSlug(
        data.title,
        async (s) => {
          const clash = await prisma.newsArticle.findUnique({ where: { slug: s } });
          return Boolean(clash && clash.id !== id);
        },
        existing.slug,
      );
    }

    if (content !== undefined) data.content = content;
    if (coverImageUrl !== undefined) data.coverImageUrl = coverImageUrl.trim();

    if (published !== undefined) {
      data.published = published;
      if (published && !existing.published) {
        data.publishedAt = new Date();
      }
      if (!published) {
        data.publishedAt = null;
      }
    }

    const article = await prisma.newsArticle.update({
      where: { id },
      data,
    });

    return NextResponse.json(article);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "No se pudo actualizar" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { session, error } = await requireAdmin();
  if (error) return error;

  const { id } = await context.params;

  const existing = await prisma.newsArticle.findFirst({
    where: { id },
  });

  if (!existing) {
    return NextResponse.json({ error: "No encontrada" }, { status: 404 });
  }

  await prisma.newsArticle.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
