import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function saveCoverImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Formato no permitido. Usá JPG, PNG, WebP o GIF.");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("La imagen no puede superar 5 MB.");
  }

  const ext = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
  const filename = `cover-${Date.now()}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`noticias/${filename}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return blob.url;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Configurá BLOB_READ_WRITE_TOKEN en Vercel para subir imágenes en producción.",
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads", "noticias");
  await mkdir(uploadsDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  const localName = `${Date.now()}-${filename}`;
  await writeFile(path.join(uploadsDir, localName), buffer);
  return `/uploads/noticias/${localName}`;
}
