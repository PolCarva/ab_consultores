"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LatestNewsHome, { type LatestNewsArticle } from "@/components/home/LatestNewsHome";
import {
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  FileText,
  BarChart3,
  Star,
  Menu,
  X,
  MessageCircle,
  Instagram,
  Facebook,
} from "lucide-react";
import {
  DEFAULT_CONTENT,
  type SiteContent,
  type SectionId,
  type HeroContent,
  type FeaturesContent,
  type PhilosophyContent,
  type ProtocolContent,
  type ServicesContent,
  type ServiceCardContent,
  type ResultsContent,
  type ResultIcon,
  type ContactContent,
  type FooterContent,
  type NavContent,
  type SocialContent,
} from "@/lib/site-content";

gsap.registerPlugin(ScrollTrigger);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const RESULT_ICONS: Record<ResultIcon, React.ReactNode> = {
  file: <FileText className="w-8 h-8 text-green-accent" />,
  target: <Target className="w-8 h-8 text-green-accent" />,
  chart: <BarChart3 className="w-8 h-8 text-green-accent" />,
  trending: <TrendingUp className="w-8 h-8 text-green-accent" />,
};

export default function HomeClient({
  content = DEFAULT_CONTENT,
  latestNewsArticles = [],
  previewMode = false,
}: {
  content?: SiteContent;
  latestNewsArticles?: LatestNewsArticle[];
  previewMode?: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Navbar Morphing on Scroll
    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || 600;
      setIsScrolled(window.scrollY > heroHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current && mobileMenuContentRef.current) {
      if (mobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" },
        );

        gsap.fromTo(
          mobileMenuContentRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.1,
          },
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }
  }, [mobileMenuOpen]);

  const renderSection = (id: SectionId): React.ReactNode => {
    switch (id) {
      case "hero":
        return <HeroSection ref={heroRef} content={content.hero} />;
      case "features":
        return <FeaturesSection content={content.features} />;
      case "philosophy":
        return <PhilosophySection content={content.philosophy} />;
      case "protocol":
        return <ProtocolSection content={content.protocol} />;
      case "services":
        return <ServicesSection content={content.services} />;
      case "results":
        return <ResultsSection content={content.results} />;
      case "news":
        return (
          <LatestNewsHome
            articles={latestNewsArticles}
            content={content.news}
            previewMode={previewMode}
          />
        );
      case "contact":
        return <ContactSection content={content.contact} />;
      default:
        return null;
    }
  };

  const orderedVisible = content.order.filter((id) => content.visibility[id]);

  return (
    <div className="min-h-screen bg-cream">
      <SiteNav
        ref={navRef}
        isScrolled={isScrolled}
        nav={content.nav}
        social={content.social}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuRef={mobileMenuRef}
        mobileMenuContentRef={mobileMenuContentRef}
      />

      {/* Floating WhatsApp Button */}
      <a
        href={content.social.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-accent text-cream w-14 h-14 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {orderedVisible.map((id) => (
        <div key={id} data-cms-section={id} style={{ scrollMarginTop: "6rem" }}>
          {renderSection(id)}
        </div>
      ))}

      <Footer content={content.footer} />
    </div>
  );
}

// Navbar - La Isla Flotante
function SiteNav({
  ref,
  isScrolled,
  nav,
  social,
  mobileMenuOpen,
  setMobileMenuOpen,
  mobileMenuRef,
  mobileMenuContentRef,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  isScrolled: boolean;
  nav: NavContent;
  social: SocialContent;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  mobileMenuRef: React.RefObject<HTMLDivElement | null>;
  mobileMenuContentRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <>
      <nav
        ref={ref}
        className={`fixed top-5 left-1/2 z-50 box-border w-[calc(100%-1.5rem)] max-w-[90rem] -translate-x-1/2 rounded-full px-4 py-3 transition-all duration-500 sm:px-6 sm:py-3.5 xl:px-8 xl:py-4 ${
          isScrolled
            ? "bg-cream/60 backdrop-blur-xl border border-moss/10 shadow-lg"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex w-full items-center gap-3 sm:gap-4 xl:gap-6">
          <img
            src={isScrolled ? "/logo-small.svg" : "/logo-small-white.svg"}
            alt="A&B Consultores Agropecuarios"
            className="h-7 w-auto shrink-0 object-contain sm:h-9 xl:h-10"
          />
          <div className="hidden flex-1 items-center justify-center gap-3 xl:flex xl:gap-5 2xl:gap-6">
            {nav.links.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className={`whitespace-nowrap text-sm font-medium link-hover xl:text-[0.95rem] 2xl:text-base ${
                  isScrolled ? "text-moss" : "text-cream/80 hover:text-cream"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-2 xl:gap-3">
            <a
              href={nav.ctaHref}
              className="btn-magnetic btn-slide hidden cursor-pointer items-center justify-center rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap xl:inline-flex xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 2xl:text-base bg-green-accent text-cream"
            >
              {nav.ctaLabel}
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative flex min-h-[20px] min-w-[20px] touch-manipulation items-center justify-center rounded-xl p-3 transition-colors hover:bg-white/10 xl:hidden"
              aria-label="Toggle menu"
            >
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${mobileMenuOpen ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}
              >
                <Menu
                  className={`w-9 h-9 ${isScrolled ? "text-moss" : "text-cream"}`}
                  strokeWidth={2.25}
                />
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${mobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
              >
                <X
                  className={`w-9 h-9 ${isScrolled ? "text-moss" : "text-cream"}`}
                  strokeWidth={2.25}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="fixed inset-0 z-40 bg-charcoal">
          <div
            ref={mobileMenuContentRef}
            className="flex flex-col items-center justify-center h-full space-y-8 px-6"
          >
            <img
              src="/logo-white.svg"
              alt="A&B Consultores Agropecuarios"
              className="h-24 md:h-20 w-auto object-contain mb-4"
            />
            {nav.links.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-sans-custom font-bold text-cream hover:text-green-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={social.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-accent text-cream px-8 py-4 rounded-full font-bold text-lg hover:bg-green-accent/90 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp
            </a>
            <a
              href={social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-cream/40 text-cream px-8 py-4 rounded-full font-bold text-lg hover:bg-cream/10 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Instagram className="w-6 h-6" />
              Instagram
            </a>
            <a
              href={social.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-cream/40 text-cream px-8 py-4 rounded-full font-bold text-lg hover:bg-cream/10 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Facebook className="w-6 h-6" />
              Facebook
            </a>
          </div>
        </div>
      )}
    </>
  );
}

// Hero Section
function HeroSection({
  ref,
  content,
}: {
  ref: React.RefObject<HTMLElement | null>;
  content: HeroContent;
}) {
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, heroContentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(26, 26, 26, 0.9) 0%, rgba(26, 26, 26, 0.75) 70%, rgba(26, 26, 26, 0.65) 100%), url('${content.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div ref={heroContentRef} className=" container mx-auto px-6 pb-16 pt-20">
        <div className="max-w-5xl mt-4 md:mt-8">
          {/* Trust Badge */}
          <div className="hero-text mb-6 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-accent rounded-full animate-pulse" />
            <span className="text-cream/90 text-sm font-medium uppercase tracking-wider">
              {content.badge}
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-sans-custom font-bold text-cream hero-text">
            {content.titleLine1}
          </h1>
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif-custom italic text-cream hero-text leading-tighter">
            {content.titleLine2Pre}
            <span className="text-green-accent font-bold">
              {content.titleLine2Highlight}
            </span>
          </h2>
          <p className="text-cream/95 text-base md:text-xl mt-8 max-w-2xl hero-text leading-relaxed">
            {content.paragraph}
          </p>
          <div className="mt-10 hero-text flex flex-col sm:flex-row gap-4">
            <a
              href={content.primaryCtaHref}
              className="btn-magnetic bg-green-accent text-cream px-8 py-4 rounded-full font-medium text-lg hover:bg-green-accent/90 transition-colors inline-flex items-center justify-center whitespace-nowrap"
            >
              {content.primaryCtaLabel}
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </a>
            <a
              href={content.secondaryCtaHref}
              className="btn-magnetic border-2 border-cream/30 text-cream px-8 py-4 rounded-full font-medium text-lg hover:bg-cream/10 transition-colors inline-flex items-center justify-center whitespace-nowrap"
            >
              {content.secondaryCtaLabel}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronRight className="w-6 h-6 text-cream/50 rotate-90" />
      </div>
    </section>
  );
}

// Features Section - Por qué trabajar con ABC
function FeaturesSection({ content }: { content: FeaturesContent }) {
  const [shufflerIndex, setShufflerIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");

  const analysisCards = [
    "Stock y estructura del rodeo",
    "Oferta y demanda forrajera",
    "Indicadores productivos",
    "Indicadores económicos",
    "Resultados del sistema",
  ];

  const personalizationMessages = [
    "> Analizando stock del rodeo...",
    "> Calculando oferta forrajera...",
    "> Evaluando indicadores económicos...",
    "> Interpretando resultados del sistema...",
    "> Generando recomendaciones...",
  ];

  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
    visible: false,
  });
  const [isClicking, setIsClicking] = useState(false);
  const weeklyProgress = [
    { day: "L", fullDay: "Lunes", completed: true, progress: 85 },
    { day: "M", fullDay: "Martes", completed: true, progress: 92 },
    { day: "X", fullDay: "Miércoles", completed: false, progress: 45 },
    { day: "J", fullDay: "Jueves", completed: false, progress: 30 },
    { day: "V", fullDay: "Viernes", completed: false, progress: 15 },
    { day: "S", fullDay: "Sábado", completed: false, progress: 0 },
    { day: "D", fullDay: "Domingo", completed: false, progress: 0 },
  ];

  useEffect(() => {
    const shufflerInterval = setInterval(() => {
      setShufflerIndex((prev) => (prev + 1) % analysisCards.length);
    }, 3000);
    return () => clearInterval(shufflerInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let messageIndex = 0;
    let charIndex = 0;
    let currentMessage = personalizationMessages[0];

    const typeInterval = setInterval(() => {
      if (charIndex < currentMessage.length) {
        setTypewriterText(currentMessage.substring(0, charIndex + 1));
        charIndex++;
      } else {
        messageIndex = (messageIndex + 1) % personalizationMessages.length;
        currentMessage = personalizationMessages[messageIndex];
        charIndex = 0;
        setTypewriterText("");
      }
    }, 80);

    return () => clearInterval(typeInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const animationSequence = async () => {
      const followUpElement = document.getElementById("follow-up-card");
      if (!followUpElement) return;

      const playAnimation = async () => {
        let nextDay;
        do {
          nextDay = Math.floor(Math.random() * 7);
        } while (nextDay === activeDay);
        const randomDay = nextDay;

        setCursorPosition({ x: 10, y: 50, visible: true });
        await sleep(300);

        const dayX = 10 + randomDay * 12 + 6;
        setCursorPosition({ x: dayX, y: 50, visible: true });
        await sleep(400);

        setIsClicking(true);
        setActiveDay(randomDay);
        await sleep(300);
        setIsClicking(false);
        await sleep(200);

        setCursorPosition({ x: 85, y: 85, visible: true });
        await sleep(400);

        setIsClicking(true);
        await sleep(300);
        setIsClicking(false);
        await sleep(200);

        setCursorPosition((prev) => ({ ...prev, visible: false }));
        setActiveDay(null);
        await sleep(1000);

        playAnimation();
      };

      playAnimation();
    };

    const timeoutId = setTimeout(animationSequence, 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardIcons = [
    <Target key="t" className="w-8 h-8 text-green-accent" />,
    <Sparkles key="s" className="w-8 h-8 text-green-accent" />,
    <TrendingUp key="tr" className="w-8 h-8 text-green-accent" />,
  ];

  const card0 = content.cards[0] ?? { title: "", description: "" };
  const card1 = content.cards[1] ?? { title: "", description: "" };
  const card2 = content.cards[2] ?? { title: "", description: "" };

  return (
    <section id="features" className="py-24 px-6 bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold text-moss mb-4">
            {content.heading}
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Diagnostic Shuffler */}
          <FeatureCard
            title={card0.title}
            description={card0.description}
            icon={cardIcons[0]}
          >
            <div className="relative h-40 overflow-hidden">
              {analysisCards.map((card, index) => {
                const isActive = index === shufflerIndex;
                const isNext =
                  index === (shufflerIndex + 1) % analysisCards.length;
                const isPrev =
                  index ===
                  (shufflerIndex - 1 + analysisCards.length) %
                    analysisCards.length;

                return (
                  <div
                    key={index}
                    className={`absolute w-full p-4 bg-moss/10 rounded-xl border border-moss/20 transition-all duration-700 ease-in-out ${
                      isActive
                        ? "translate-y-0 opacity-100 scale-100 z-10"
                        : isNext
                          ? "translate-y-full opacity-0 scale-90 z-0"
                          : isPrev
                            ? "-translate-y-full opacity-0 scale-90 z-0"
                            : "opacity-0 scale-90 z-0"
                    }`}
                    style={{ willChange: "transform, opacity" }}
                  >
                    <p className="text-moss font-medium text-sm">{card}</p>
                  </div>
                );
              })}
            </div>
          </FeatureCard>

          {/* Card 2 - Telemetry Typewriter */}
          <FeatureCard
            title={card1.title}
            description={card1.description}
            icon={cardIcons[1]}
          >
            <div className="h-40 bg-moss/10 rounded-xl border border-moss/20 p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-accent rounded-full animate-pulse" />
                <span className="text-moss/60 text-xs font-mono-custom">
                  Retroalimentación en tiempo real
                </span>
              </div>
              <div className="flex-1 font-mono-custom text-sm text-moss overflow-hidden">
                <span>{typewriterText}</span>
                <span className="inline-block w-2 h-4 bg-green-accent animate-pulse ml-1" />
              </div>
            </div>
          </FeatureCard>

          {/* Card 3 - Cursor Protocol Scheduler */}
          <FeatureCard
            title={card2.title}
            description={card2.description}
            icon={cardIcons[2]}
          >
            <div
              id="follow-up-card"
              className="relative h-52 bg-moss/10 rounded-2xl border border-moss/20 p-5 flex flex-col overflow-hidden"
            >
              {cursorPosition.visible && (
                <div
                  className="absolute z-20 pointer-events-none transition-all duration-300"
                  style={{
                    left: `${cursorPosition.x}%`,
                    top: `${cursorPosition.y}%`,
                    transform: `translate(-50%, -50%) ${isClicking ? "scale(0.95)" : "scale(1)"}`,
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`transition-transform duration-150 ${isClicking ? "scale-90" : "scale-100"}`}
                  >
                    <path
                      d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z"
                      fill="#2E4036"
                      stroke="#4A7C59"
                      strokeWidth="1.5"
                    />
                  </svg>
                  {isClicking && (
                    <div className="absolute inset-0 border-2 border-green-accent/50 rounded-full animate-ping" />
                  )}
                </div>
              )}

              <div className="text-xs font-medium text-moss/70 mb-3 font-sans-custom">
                Avances semanales
              </div>

              <div className="flex justify-between mb-4 relative">
                {weeklyProgress.map((day, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <div
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-300 ${
                        activeDay === index
                          ? "bg-green-accent text-cream scale-95 shadow-lg"
                          : day.completed
                            ? "bg-moss/20 text-moss"
                            : "bg-moss/5 text-moss/50"
                      }`}
                    >
                      {day.day}
                    </div>
                    <div className="w-9 h-1 bg-moss/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          day.completed ? "bg-green-accent" : "bg-moss/30"
                        }`}
                        style={{ width: `${day.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="text-moss/60 text-xs font-mono-custom text-center">
                  {activeDay !== null
                    ? `Actualizando ${weeklyProgress[activeDay].fullDay}...`
                    : "Sincronizando datos"}
                </div>
              </div>

              <button
                className={`w-full mt-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeDay !== null
                    ? "bg-green-accent text-cream shadow-md"
                    : "bg-moss/10 text-moss/40"
                }`}
              >
                Guardar cambios
              </button>
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  children,
  title,
  description,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-cream rounded-4xl border border-moss/10 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="text-xl font-sans-custom font-bold text-moss">
            {title}
          </h3>
        </div>
        <p className="text-charcoal/60 text-sm mb-6">{description}</p>
        {children}
      </div>
    </div>
  );
}

// Philosophy Section
function PhilosophySection({ content }: { content: PhilosophyContent }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".philosophy-text", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        ease: "power3.out",
      });
    }, textRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-32 px-6 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(26, 26, 26, 0.97) 0%, rgba(46, 64, 54, 0.95) 100%), url('${content.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div ref={textRef} className="container mx-auto max-w-5xl">
        <div className="philosophy-text mb-12">
          <p
            className="text-cream/80 text-xl md:text-2xl font-sans-custom leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.paragraph1 }}
          />
        </div>
        <div className="philosophy-text mb-12">
          <p
            className="text-cream/80 text-lg md:text-xl font-sans-custom leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.paragraph2 }}
          />
        </div>
        <div className="philosophy-text">
          <p className="text-4xl md:text-6xl lg:text-7xl font-serif-custom italic text-cream leading-tight">
            {content.highlightPre}
            <span className="text-green-accent font-bold">
              {content.highlightWord}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

// Protocol Section
function ProtocolSection({ content }: { content: ProtocolContent }) {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".protocol-card",
        { scale: 0.9, opacity: 0.5, filter: "blur(20px)", y: 50 },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none play none",
          },
          stagger: 0.15,
          ease: "power2.inOut",
        },
      );
    }, cardsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" className="py-24 px-6 bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold text-moss mb-4">
            {content.heading}
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {content.steps.map((step, i) => (
            <ProtocolCard key={step.number + i} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProtocolCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="protocol-card bg-moss text-cream rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
      <div className="relative z-10">
        <div className="font-mono-custom text-green-accent text-3xl md:text-4xl font-bold mb-4">
          {number}
        </div>
        <h3 className="text-xl md:text-2xl font-sans-custom font-bold mb-3">
          {title}
        </h3>
        <p className="text-cream/80 text-base">{description}</p>
      </div>
      <div className="absolute right-8 bottom-8 w-16 h-16 opacity-10">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full animate-[spin_15s_linear_infinite]"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="25"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}

// Services Section
function ServicesSection({ content }: { content: ServicesContent }) {
  const serviceIcons = [
    <FileText key="f" className="w-12 h-12 text-green-accent" />,
    <BarChart3 key="b" className="w-12 h-12 text-green-accent" />,
    <Star key="s" className="w-12 h-12 text-green-accent" />,
  ];

  return (
    <section id="services" className="py-24 px-6 bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold text-moss mb-4">
            {content.heading}
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
          {content.cards.map((card, i) => (
            <ServiceCard
              key={card.servicio + i}
              card={card}
              icon={serviceIcons[i % serviceIcons.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  card,
  icon,
}: {
  card: ServiceCardContent;
  icon: React.ReactNode;
}) {
  const handleClick = () => {
    if (card.servicio) {
      window.history.pushState(
        { servicio: card.servicio },
        "",
        `?servicio=${card.servicio}#contact`,
      );
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(
        new CustomEvent("servicioSelected", { detail: card.servicio }),
      );
    }
  };

  return (
    <div
      className={`service-card flex h-full flex-col bg-cream rounded-[3rem] p-8 border-2 transition-all hover:shadow-xl ${
        card.premium ? "border-green-accent shadow-lg" : "border-moss/10"
      }`}
    >
      <div className="mb-6 flex flex-wrap items-center gap-2 md:gap-4">
        <div className="flex min-w-0 flex-nowrap items-center gap-2 md:gap-4">
          <span className="inline-flex shrink-0">{icon}</span>
          <h3 className="text-xl md:text-2xl font-sans-custom font-bold text-moss whitespace-nowrap">
            {card.title}
          </h3>
        </div>
        {card.premium && (
          <span className="bg-green-accent text-cream text-xs font-bold px-3 py-1 rounded-full shrink-0">
            Premium
          </span>
        )}
      </div>
      <p className="mb-6 text-lg text-charcoal/80">{card.description}</p>
      <ul className="mb-0 space-y-3">
        {card.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-moss/80">
            <div className="w-1.5 h-1.5 bg-green-accent rounded-full mt-2 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="min-h-8 flex-1 basis-0" aria-hidden />
      <button
        onClick={handleClick}
        className={`btn-magnetic inline-flex w-full shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-lg font-medium transition-colors ${
          card.premium
            ? "bg-green-accent text-cream hover:bg-green-accent/90"
            : "border-2 border-moss text-moss hover:bg-moss hover:text-cream"
        }`}
      >
        {card.cta}
      </button>
    </div>
  );
}

// Results Section
function ResultsSection({ content }: { content: ResultsContent }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".result-item", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="results" className="py-24 px-6 bg-moss text-cream">
      <div ref={sectionRef} className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold mb-4">
            {content.heading}
          </h2>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.items.map((item, i) => (
            <div key={i} className="result-item text-center">
              <div className="w-16 h-16 bg-green-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {RESULT_ICONS[item.icon] ?? RESULT_ICONS.file}
              </div>
              <h3 className="text-xl font-sans-custom font-bold mb-2">
                {item.title}
              </h3>
              <p className="text-cream/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection({ content }: { content: ContactContent }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    servicio: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-element", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const updateServicioFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const servicioParam = urlParams.get("servicio");
      if (servicioParam) {
        setFormData((prev) => ({ ...prev, servicio: servicioParam }));
      }
    };

    updateServicioFromUrl();

    const handleUrlChange = () => {
      setTimeout(updateServicioFromUrl, 100);
    };

    const handleServicioSelected = (e: CustomEvent) => {
      setFormData((prev) => ({ ...prev, servicio: e.detail }));
    };

    window.addEventListener("hashchange", handleUrlChange);
    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener(
      "servicioSelected",
      handleServicioSelected as EventListener,
    );

    return () => {
      window.removeEventListener("hashchange", handleUrlChange);
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener(
        "servicioSelected",
        handleServicioSelected as EventListener,
      );
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            data.message ||
            "¡Mensaje enviado correctamente! Te contactaremos pronto.",
        });
        setFormData({
          nombre: "",
          telefono: "",
          email: "",
          servicio: "",
          mensaje: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            data.error ||
            "Hubo un error al enviar el mensaje. Por favor intenta nuevamente.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message:
          "Hubo un error al enviar el mensaje. Por favor intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold text-moss mb-4">
            {content.heading}
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="contact-element">
              <label htmlFor="nombre" className="block text-moss font-medium mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-moss/20 focus:border-green-accent transition-colors bg-white"
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="contact-element">
              <label htmlFor="telefono" className="block text-moss font-medium mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-moss/20 focus:border-green-accent transition-colors bg-white"
                placeholder="+598 XX XXX XXX"
              />
            </div>

            <div className="contact-element">
              <label htmlFor="email" className="block text-moss font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-moss/20 focus:border-green-accent transition-colors bg-white"
                placeholder="tu@email.com"
              />
            </div>

            <div className="contact-element">
              <label htmlFor="servicio" className="block text-moss font-medium mb-2">
                Servicio de interés
              </label>
              <select
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-moss/20 focus:border-green-accent transition-colors bg-white"
              >
                <option value="">Seleccionar servicio</option>
                <option value="funcional">Funcional</option>
                <option value="indicadores">Indicadores</option>
                <option value="integral">Servicio Integral (Premium)</option>
              </select>
            </div>

            <div className="contact-element">
              <label htmlFor="mensaje" className="block text-moss font-medium mb-2">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-moss/20 focus:border-green-accent transition-colors bg-white resize-none"
                placeholder="Contanos qué necesitás analizar en tu establecimiento..."
              />
            </div>

            {submitStatus.type && (
              <div
                className={`contact-element p-4 rounded-xl ${
                  submitStatus.type === "success"
                    ? "bg-green-accent/10 text-green-accent border border-green-accent/30"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                <p className="font-medium">{submitStatus.message}</p>
              </div>
            )}

            <div className="contact-element">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-magnetic w-full bg-green-accent text-cream px-8 py-4 rounded-full font-medium text-lg hover:bg-green-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? "Enviando..." : content.submitLabel}
                {!isSubmitting && (
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-charcoal text-cream rounded-t-[4rem] pt-16 pb-8 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-3">
            <div className="mb-4">
              <img
                src="/logo-small-white.svg"
                alt="A&B Consultores Agropecuarios"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>
            <p className="text-cream/60 text-lg max-w-xs">{content.tagline}</p>
          </div>
          <div>
            <h4 className="font-sans-custom font-bold mb-4">
              {content.linksHeading}
            </h4>
            <ul className="space-y-2 text-cream/60 mb-6">
              <li>
                <Link
                  href="/noticias"
                  className="link-hover font-medium text-cream/90"
                >
                  Noticias
                </Link>
              </li>
            </ul>
            <h4 className="font-sans-custom font-bold mb-4">
              {content.contactHeading}
            </h4>
            <ul className="space-y-2 text-cream/60">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${content.email}`} className="link-hover">
                  {content.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a
                  href={`tel:${content.phone.replace(/\s+/g, "")}`}
                  className="link-hover"
                >
                  {content.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 shrink-0" />
                <a
                  href={content.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover break-all"
                >
                  {content.instagramHandle}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Facebook className="w-4 h-4 shrink-0" />
                <a
                  href={content.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover break-all"
                >
                  {content.facebookLabel}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{content.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono-custom text-sm text-cream/60">
              Sistema Operativo
            </span>
          </div>
          <p className="text-cream/40 text-sm">{content.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
