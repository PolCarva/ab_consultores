import Link from "next/link";
import { auth } from "@/auth";
import AdminSignOut from "@/components/admin/AdminSignOut";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-cream">
      {session && (
        <header className="border-b border-moss/10 bg-white">
          <div className="container mx-auto flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-6">
              <Link href="/admin/noticias" className="font-sans-custom font-bold text-moss">
                Panel de noticias
              </Link>
              <Link
                href="/admin/noticias/nueva"
                className="text-sm font-medium text-green-accent link-hover"
              >
                Nueva noticia
              </Link>
              <Link href="/noticias" className="text-sm text-charcoal/60 link-hover">
                Ver sitio
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm text-charcoal/60">
              <span>{session.user?.email}</span>
              <AdminSignOut />
            </div>
          </div>
        </header>
      )}
      <div className="container mx-auto px-6 py-10">{children}</div>
    </div>
  );
}
