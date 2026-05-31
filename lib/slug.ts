export function slugify(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function uniqueSlug(
  title: string,
  exists: (slug: string) => Promise<boolean>,
  excludeSlug?: string,
): Promise<string> {
  const base = slugify(title) || "noticia";
  let candidate = base;
  let suffix = 2;

  while (await exists(candidate)) {
    if (excludeSlug && candidate === excludeSlug) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}
