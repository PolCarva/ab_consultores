import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slug";

export async function GET() {
  const { session, error } = await requireAdmin();
  if (error) return error;

  const articles = await prisma.newsArticle.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      coverImageUrl: true,
      published: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(articles);
}

export async function POST(request: NextRequest) {
  const { session, error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { title, content, coverImageUrl, published } = body as {
      title?: string;
      content?: string;
      coverImageUrl?: string;
      published?: boolean;
    };

    if (!title?.trim() || !content?.trim() || !coverImageUrl?.trim()) {
      return NextResponse.json(
        { error: "Título, portada y contenido son obligatorios" },
        { status: 400 },
      );
    }

    const slug = await uniqueSlug(title, async (s) => {
      const existing = await prisma.newsArticle.findUnique({ where: { slug: s } });
      return Boolean(existing);
    });

    const isPublished = Boolean(published);

    const article = await prisma.newsArticle.create({
      data: {
        title: title.trim(),
        slug,
        content,
        coverImageUrl: coverImageUrl.trim(),
        published: isPublished,
        publishedAt: isPublished ? new Date() : null,
        authorId: session!.user!.id,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "No se pudo crear la noticia" }, { status: 500 });
  }
}
