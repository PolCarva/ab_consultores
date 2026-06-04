-- Limpia restos de un intento de CMS anterior (tablas/enum que ya no se usan).
-- Es seguro: NO toca las tablas Admin ni NewsArticle.
DROP TABLE IF EXISTS "SiteSection" CASCADE;
DROP TABLE IF EXISTS "SiteConfig" CASCADE;
DROP TABLE IF EXISTS "SocialLink" CASCADE;
DROP TABLE IF EXISTS "SiteContent" CASCADE;
DROP TYPE IF EXISTS "ContentType";

-- CreateTable
CREATE TABLE "SiteContent" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "draft" JSONB NOT NULL,
    "published" JSONB,
    "publishedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteContent_key_key" ON "SiteContent"("key");
