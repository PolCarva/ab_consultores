import Link from "next/link";
import { PORTAL_URL } from "@/lib/site-content";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#0f4a2a] font-[family-name:var(--font-inter)] text-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-3.5">
        <Link href="/" className="flex items-center gap-3 text-white no-underline">
          <img src="/img/logo-ayb-blanco.png" alt="A&B" className="block h-9 w-auto" />
          <span className="h-[26px] w-px bg-white/35" />
          <span className="text-[11px] font-semibold uppercase leading-[1.3] tracking-[0.12em] text-[#d4e4d8]">
            Consultores
            <br />
            Agropecuarios
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] font-medium">
          <Link href="/noticias" className="text-white no-underline hover:text-[#f0bd3a]">
            Noticias
          </Link>
          <Link href="/#contacto" className="text-white no-underline hover:text-[#f0bd3a]">
            Contacto
          </Link>
          <a
            href={PORTAL_URL}
            className="inline-flex min-h-10 items-center rounded-[10px] bg-[#f0bd3a] px-4 text-[15px] font-bold text-[#0a3520] no-underline hover:bg-[#f5cb5c]"
          >
            Libreta A&amp;B
          </a>
        </nav>
      </div>
    </header>
  );
}
