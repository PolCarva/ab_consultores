/**
 * Modelo de contenido editable de la landing.
 * Todo el contenido textual e imágenes de la home viven acá.
 * El editor visual (/admin/editor) lee y escribe esta estructura.
 */

export const SECTION_IDS = [
  "hero",
  "features",
  "philosophy",
  "protocol",
  "services",
  "results",
  "news",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const SECTION_LABELS: Record<SectionId, string> = {
  hero: "Portada (Hero)",
  features: "Por qué A&B",
  philosophy: "Filosofía",
  protocol: "Cómo trabajamos",
  services: "Servicios",
  results: "Resultados",
  news: "Noticias",
  contact: "Contacto",
};

export type NavLink = { label: string; href: string };

export type NavContent = {
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
};

export type SocialContent = {
  whatsappUrl: string;
  instagramUrl: string;
  instagramHandle: string;
  facebookUrl: string;
};

export type HeroContent = {
  badge: string;
  titleLine1: string;
  titleLine2Pre: string;
  titleLine2Highlight: string;
  paragraph: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  backgroundImage: string;
};

export type FeatureCardContent = { title: string; description: string };

export type FeaturesContent = {
  heading: string;
  subheading: string;
  cards: FeatureCardContent[];
};

export type PhilosophyContent = {
  paragraph1: string;
  paragraph2: string;
  highlightPre: string;
  highlightWord: string;
  backgroundImage: string;
};

export type ProtocolStep = {
  number: string;
  title: string;
  description: string;
};

export type ProtocolContent = {
  heading: string;
  subheading: string;
  steps: ProtocolStep[];
};

export type ServiceCardContent = {
  title: string;
  description: string;
  features: string[];
  cta: string;
  servicio: string;
  premium: boolean;
};

export type ServicesContent = {
  heading: string;
  subheading: string;
  cards: ServiceCardContent[];
};

export type ResultIcon = "file" | "target" | "chart" | "trending";

export type ResultItem = {
  icon: ResultIcon;
  title: string;
  description: string;
};

export type ResultsContent = {
  heading: string;
  subheading: string;
  items: ResultItem[];
};

export type NewsContent = {
  eyebrow: string;
  heading: string;
  subheading: string;
  ctaLabel: string;
};

export type ContactContent = {
  heading: string;
  subheading: string;
  submitLabel: string;
};

export type FooterContent = {
  tagline: string;
  email: string;
  phone: string;
  instagramHandle: string;
  instagramUrl: string;
  facebookLabel: string;
  facebookUrl: string;
  location: string;
  linksHeading: string;
  contactHeading: string;
  copyright: string;
};

export type SiteContent = {
  order: SectionId[];
  visibility: Record<SectionId, boolean>;
  nav: NavContent;
  social: SocialContent;
  hero: HeroContent;
  features: FeaturesContent;
  philosophy: PhilosophyContent;
  protocol: ProtocolContent;
  services: ServicesContent;
  results: ResultsContent;
  news: NewsContent;
  contact: ContactContent;
  footer: FooterContent;
};

const INSTAGRAM_HANDLE = "ayb.gestionagro";
const INSTAGRAM_URL = `https://www.instagram.com/${encodeURIComponent(INSTAGRAM_HANDLE)}`;
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61568000957291";
const WHATSAPP_URL =
  "https://wa.me/+59899126042?text=Hola%2C%20me%20gustar%C3%ADa%20contratar%20sus%20servicios";

export const DEFAULT_CONTENT: SiteContent = {
  order: [
    "hero",
    "features",
    "philosophy",
    "protocol",
    "services",
    "results",
    "news",
    "contact",
  ],
  visibility: {
    hero: true,
    features: true,
    philosophy: true,
    protocol: true,
    services: true,
    results: true,
    news: true,
    contact: true,
  },
  nav: {
    links: [
      { label: "Por qué A&B", href: "#features" },
      { label: "Filosofía", href: "#philosophy" },
      { label: "Proceso", href: "#protocol" },
      { label: "Servicios", href: "#services" },
      { label: "Noticias", href: "/noticias" },
    ],
    ctaLabel: "Reservar consulta",
    ctaHref: "#contact",
  },
  social: {
    whatsappUrl: WHATSAPP_URL,
    instagramUrl: INSTAGRAM_URL,
    instagramHandle: INSTAGRAM_HANDLE,
    facebookUrl: FACEBOOK_URL,
  },
  hero: {
    badge: "Consultoría agropecuaria profesional",
    titleLine1: "Gestión agropecuaria",
    titleLine2Pre: "basada en ",
    titleLine2Highlight: "datos.",
    paragraph:
      "En A&B Consultores ayudamos a productores agropecuarios a transformar información del establecimiento en decisiones técnicas claras y rentables.",
    primaryCtaLabel: "Solicitar asesoramiento",
    primaryCtaHref: "#contact",
    secondaryCtaLabel: "Ver servicios",
    secondaryCtaHref: "#services",
    backgroundImage: "/hero-bg.jpg",
  },
  features: {
    heading: "Por qué trabajar con A&B",
    subheading:
      "Acompañamos al productor con una mirada técnica, práctica y enfocada en mejorar la gestión del establecimiento.",
    cards: [
      {
        title: "Decisiones basadas en datos",
        description:
          "Analizamos la información del predio para convertirla en decisiones más claras y fundamentadas.",
      },
      {
        title: "Información más ordenada",
        description:
          "Organizamos los datos productivos y económicos para facilitar el seguimiento del sistema.",
      },
      {
        title: "Seguimiento técnico",
        description:
          "Acompañamos al productor con análisis y observaciones que ayudan a mejorar el manejo.",
      },
    ],
  },
  philosophy: {
    paragraph1:
      "En <strong>A&B Consultores</strong> somos dos licenciados en gestión agropecuaria: <strong>Lic. Gastón Almada</strong> y <strong>Lic. Jorge Bado</strong>.",
    paragraph2:
      "Acompañamos a productores y empresas rurales con una mirada técnica, clara y enfocada en la toma de decisiones. Nuestro trabajo combina análisis productivo, orden de información, interpretación de indicadores y seguimiento del sistema para transformar datos del predio en acciones concretas.",
    highlightPre: "Asesoramos a una amplia variedad de productores en todo el ",
    highlightWord: "Uruguay.",
    backgroundImage:
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1920&q=80",
  },
  protocol: {
    heading: "Cómo trabajamos",
    subheading:
      "Un proceso claro, técnico y profesional para convertir datos del predio en decisiones concretas.",
    steps: [
      {
        number: "01",
        title: "Primer contacto",
        description:
          "Desde la web, WhatsApp, Instagram, Facebook o correo electrónico",
      },
      {
        number: "02",
        title: "Recepción y análisis",
        description: "Del formulario técnico inicial proporcionado",
      },
      {
        number: "03",
        title: "Relevamiento",
        description: "De información del establecimiento",
      },
      {
        number: "04",
        title: "Análisis técnico",
        description: "Interno y cálculo de indicadores",
      },
      {
        number: "05",
        title: "Entrega de informe",
        description: "Profesional en PDF",
      },
      {
        number: "06",
        title: "Devolución técnica",
        description: "Y seguimiento posterior",
      },
    ],
  },
  services: {
    heading: "Servicios",
    subheading:
      "Diseñados para adaptarse al nivel de análisis y seguimiento que necesita cada establecimiento.",
    cards: [
      {
        title: "Funcional",
        description:
          "Ordenamiento de información productiva, análisis forrajero, evolución de stock y base técnica para mejores decisiones.",
        features: [
          "Descripción del predio y suelos",
          "Oferta y demanda forrajera",
          "Evolución de stock mensual",
          "Balance forrajero y resultados productivos",
        ],
        cta: "Consultar este servicio",
        servicio: "funcional",
        premium: false,
      },
      {
        title: "Indicadores",
        description:
          "Cálculo e interpretación de indicadores productivos, económicos y financieros para entender la rentabilidad del sistema.",
        features: [
          "Costos mensuales",
          "Ingreso bruto e ingreso neto",
          "Saldo de caja y estado patrimonial",
          "Indicadores descriptivos, productivos y financieros",
        ],
        cta: "Consultar este servicio",
        servicio: "indicadores",
        premium: false,
      },
      {
        title: "Servicio Integral",
        description:
          "Diagnóstico integral del sistema ganadero con visión productiva, económica y estratégica.",
        features: [
          "Servicio funcional e indicadores incluidos",
          "Evaluación integral del sistema",
          "Recomendaciones personalizadas",
          "Seguimiento técnico continuo",
        ],
        cta: "Consultar este servicio",
        servicio: "integral",
        premium: true,
      },
    ],
  },
  results: {
    heading: "Resultados que puede esperar",
    subheading:
      "En A&B Consultores ayudamos al productor a entender mejor su sistema y tomar decisiones más claras.",
    items: [
      {
        icon: "file",
        title: "Mayor control",
        description:
          "Información organizada para entender qué está pasando en el establecimiento.",
      },
      {
        icon: "target",
        title: "Mejores decisiones",
        description:
          "Datos claros para tomar decisiones sobre manejo, carga y producción.",
      },
      {
        icon: "chart",
        title: "Análisis económico",
        description:
          "Comprender costos, ingresos y resultados del establecimiento.",
      },
      {
        icon: "trending",
        title: "Gestión profesional",
        description:
          "Herramientas y análisis para mejorar la gestión ganadera.",
      },
    ],
  },
  news: {
    eyebrow: "Novedades",
    heading: "Últimas noticias",
    subheading: "Artículos y novedades del equipo A&B.",
    ctaLabel: "Ver todas",
  },
  contact: {
    heading: "Solicitar contacto",
    subheading:
      "Dejá tus datos y contanos qué necesitás analizar en tu establecimiento.",
    submitLabel: "Enviar consulta",
  },
  footer: {
    tagline: "Consultoría agropecuaria y gestión basada en datos.",
    email: "almadabadoconsultores@gmail.com",
    phone: "+598 99 126 042",
    instagramHandle: INSTAGRAM_HANDLE,
    instagramUrl: INSTAGRAM_URL,
    facebookLabel: "AyB - Consultoría Agropecuaria",
    facebookUrl: FACEBOOK_URL,
    location: "Uruguay",
    linksHeading: "Enlaces",
    contactHeading: "Contacto",
    copyright: "© 2026 A&B Consultores. Todos los derechos reservados.",
  },
};

export const CONTENT_KEY = "home";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

/**
 * Mezcla el contenido guardado sobre los valores por defecto.
 * Garantiza que, si en el futuro se agregan campos nuevos al esquema,
 * el contenido viejo siga funcionando sin romper la landing.
 */
export function mergeWithDefaults(stored: unknown): SiteContent {
  function merge(base: unknown, override: unknown): unknown {
    if (isPlainObject(base) && isPlainObject(override)) {
      const result: Record<string, unknown> = { ...base };
      for (const key of Object.keys(override)) {
        result[key] = merge(base[key], override[key]);
      }
      return result;
    }
    // Arrays y primitivos: si hay valor guardado, se usa tal cual.
    return override === undefined ? base : override;
  }
  return merge(DEFAULT_CONTENT, stored) as SiteContent;
}
