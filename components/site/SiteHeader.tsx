import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-moss/10 bg-cream/90 glass-blur">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="link-hover">
          <img
            src="/logo-small.svg"
            alt="A&B Consultores"
            className="h-10 w-auto object-contain md:h-12"
          />
        </Link>
        <nav className="flex items-center gap-6 font-sans-custom text-sm font-medium text-moss">
          <Link href="/noticias" className="link-hover">
            Noticias
          </Link>
          <Link
            href="/#contacto"
            className="btn-magnetic hidden rounded-full bg-moss px-5 py-2 text-cream sm:inline-block"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
