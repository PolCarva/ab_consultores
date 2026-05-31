import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-charcoal text-cream rounded-t-[3rem] px-6 py-12">
      <div className="container mx-auto flex flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <img
            src="/logo-small-white.svg"
            alt="A&B Consultores"
            className="mb-4 h-14 w-auto"
          />
          <p className="max-w-sm text-cream/60">
            Consultoría agropecuaria y gestión basada en datos.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-cream/60">
          <Link href="/noticias" className="link-hover font-semibold text-cream">
            Noticias
          </Link>
          <a href="mailto:almadabadoconsultores@gmail.com" className="link-hover flex items-center gap-2">
            <Mail className="h-4 w-4" />
            almadabadoconsultores@gmail.com
          </a>
          <a href="tel:+59899126042" className="link-hover flex items-center gap-2">
            <Phone className="h-4 w-4" />
            +598 99 126 042
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Uruguay
          </span>
        </div>
      </div>
      <p className="container mx-auto mt-8 border-t border-cream/10 pt-6 text-center text-sm text-cream/40">
        © 2026 A&B Consultores
      </p>
    </footer>
  );
}
