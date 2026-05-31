/**
 * Evita el warning de pg v8 cuando Neon usa ?sslmode=require.
 * @see https://www.postgresql.org/docs/current/libpq-ssl.html
 */
export function normalizeDatabaseUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const sslmode = parsed.searchParams.get("sslmode");

    if (sslmode === "require" && !parsed.searchParams.has("uselibpqcompat")) {
      parsed.searchParams.set("uselibpqcompat", "true");
    }

    return parsed.toString();
  } catch {
    return url;
  }
}
