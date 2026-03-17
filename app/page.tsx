"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ChevronRight, Mail, MapPin, Phone, ArrowRight, Sparkles, Target, TrendingUp, FileText, BarChart3, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Color Constants - Ajustados para predominancia del verde
const colors = {
  moss: "#2E4036",
  mossLight: "#3D5447",
  clay: "#CC5833",
  cream: "#F2F0E9",
  charcoal: "#1A1A1A",
  greenAccent: "#4A7C59",
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);
  const protocolRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Navbar Morphing on Scroll
    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || 0;
      setIsScrolled(window.scrollY > heroHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navbar - Layout optimizado con naming "A&B Consultores" */}
      <nav
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full transition-all duration-500 ${
          isScrolled
            ? "bg-[var(--cream)]/60 backdrop-blur-xl border border-[var(--moss)]/10 shadow-lg"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex items-center gap-6 md:gap-8">
          <div className={`font-sans-custom font-bold text-base md:text-lg ${isScrolled ? "text-[var(--moss)]" : "text-[var(--cream)]"}`}>
            A&B Consultores
          </div>
          <div className="hidden md:flex items-center gap-5">
            <a
              href="#features"
              className={`text-sm font-medium link-hover ${
                isScrolled ? "text-[var(--moss)]" : "text-[var(--cream)]/80 hover:text-[var(--cream)]"
              }`}
            >
              Por qué ABC
            </a>
            <a
              href="#philosophy"
              className={`text-sm font-medium link-hover ${
                isScrolled ? "text-[var(--moss)]" : "text-[var(--cream)]/80 hover:text-[var(--cream)]"
              }`}
            >
              Quiénes somos
            </a>
            <a
              href="#protocol"
              className={`text-sm font-medium link-hover ${
                isScrolled ? "text-[var(--moss)]" : "text-[var(--cream)]/80 hover:text-[var(--cream)]"
              }`}
            >
              Cómo trabajamos
            </a>
            <a
              href="#services"
              className={`text-sm font-medium link-hover ${
                isScrolled ? "text-[var(--moss)]" : "text-[var(--cream)]/80 hover:text-[var(--cream)]"
              }`}
            >
              Servicios
            </a>
            <a
              href="#contact"
              className={`text-sm font-medium link-hover ${
                isScrolled ? "text-[var(--moss)]" : "text-[var(--cream)]/80 hover:text-[var(--cream)]"
              }`}
            >
              Contacto
            </a>
          </div>
          <button
            className={`btn-magnetic btn-slide px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium ${
              isScrolled
                ? "bg-[var(--green-accent)] text-[var(--cream)]"
                : "bg-[var(--green-accent)] text-[var(--cream)]"
            }`}
          >
            Solicitar asesoramiento
          </button>
        </div>
      </nav>

      {/* Hero - El Plano Inicial */}
      <HeroSection ref={heroRef} />

      {/* Data Analytics - Gráficos de crecimiento */}
      <DataAnalyticsSection />

      {/* Features - Por qué trabajar con ABC */}
      <FeaturesSection ref={featuresRef} />

      {/* Philosophy - Quiénes somos */}
      <PhilosophySection ref={philosophyRef} />

      {/* Protocol - Cómo trabajamos */}
      <ProtocolSection ref={protocolRef} />

      {/* Services */}
      <ServicesSection ref={servicesRef} />

      {/* Pricing Section */}
      <PricingSection />

      {/* Results */}
      <ResultsSection />

      {/* Contact Form */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Hero Section
function HeroSection({ ref }: { ref: React.RefObject<HTMLElement> }) {
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
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to top, rgba(46, 64, 54, 0.95) 0%, rgba(26, 26, 26, 0.8) 50%, transparent 100%), url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div ref={heroContentRef} className="container mx-auto px-6 pb-16">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans-custom font-bold text-[var(--cream)] hero-text">
            Gestión ganadera
          </h1>
          <h2 className="text-5xl font-bold md:text-8xl lg:text-9xl font-serif-custom italic text-[var(--cream)] hero-text mt-4">
            basada en{" "}
            <span className="text-[var(--green-accent)] font-bold">datos.</span>
          </h2>
          <p className="text-[var(--cream)]/80 text-lg md:text-xl mt-8 max-w-xl hero-text">
            En A&B Consultores ayudamos a productores ganaderos a entender mejor su sistema productivo para tomar decisiones técnicas más claras y rentables.
          </p>
          <div className="mt-10 hero-text flex flex-wrap gap-4">
            <button className="btn-magnetic bg-[var(--green-accent)] text-[var(--cream)] px-8 py-4 rounded-full font-medium text-lg hover:bg-[var(--green-accent)]/90 transition-colors">
              Solicitar asesoramiento
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
            <button className="btn-magnetic border-2 border-[var(--cream)] text-[var(--cream)] px-8 py-4 rounded-full font-medium text-lg hover:bg-[var(--cream)] hover:text-[var(--moss)] transition-colors">
              Ver servicios
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronRight className="w-6 h-6 text-[var(--cream)]/50 rotate-90" />
      </div>
    </section>
  );
}

// Features Section - Por qué trabajar con ABC
function FeaturesSection({ ref }: { ref: React.RefObject<HTMLElement> }) {
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

  const followUpSteps = ["1", "2", "3", "4", "5", "6"];
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    // Shuffler Animation
    const shufflerInterval = setInterval(() => {
      setShufflerIndex((prev) => (prev + 1) % analysisCards.length);
    }, 3000);

    return () => clearInterval(shufflerInterval);
  }, []);

  useEffect(() => {
    // Typewriter Animation
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
  }, []);

  useEffect(() => {
    // Follow Up Animation
    const followUpInterval = setInterval(() => {
      const randomStep = Math.floor(Math.random() * followUpSteps.length);
      setActiveStep(randomStep);
      setTimeout(() => setActiveStep(null), 1500);
    }, 2000);

    return () => clearInterval(followUpInterval);
  }, []);

  return (
    <section
      ref={ref}
      id="features"
      className="py-24 px-6 bg-[var(--cream)]"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold text-[var(--moss)] mb-4">
            Por qué trabajar con A&B
          </h2>
          <p className="text-[var(--charcoal)]/60 text-lg max-w-2xl mx-auto">
            Acompañamos al productor con una mirada técnica, práctica y enfocada en mejorar la gestión del establecimiento.
          </p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Card 1 - Decisiones basadas en datos */}
          <FeatureCardFullWidth
            title="Decisiones basadas en datos"
            description="Analizamos la información del predio para convertirla en decisiones más claras y fundamentadas."
            icon={<Target className="w-8 h-8 text-[var(--green-accent)]" />}
            position="left"
          >
            <div className="relative h-40 overflow-hidden">
              {analysisCards.map((card, index) => {
                const isActive = index === shufflerIndex;
                const isNext = index === (shufflerIndex + 1) % analysisCards.length;
                const isPrev = index === (shufflerIndex - 1 + analysisCards.length) % analysisCards.length;

                return (
                  <div
                    key={index}
                    className={`absolute w-full p-4 bg-[var(--moss)]/10 rounded-xl border border-[var(--moss)]/20 transition-all duration-700 ease-in-out ${
                      isActive
                        ? "translate-y-0 opacity-100 scale-100 z-10"
                        : isNext
                        ? "translate-y-full opacity-0 scale-90 z-0"
                        : isPrev
                        ? "-translate-y-full opacity-0 scale-90 z-0"
                        : "opacity-0 scale-90 z-0"
                    }`}
                    style={{
                      willChange: "transform, opacity",
                    }}
                  >
                    <p className="text-[var(--moss)] font-medium text-sm">{card}</p>
                  </div>
                );
              })}
            </div>
          </FeatureCardFullWidth>

          {/* Card 2 - Información más ordenada */}
          <FeatureCardFullWidth
            title="Información más ordenada"
            description="Organizamos los datos productivos y económicos para facilitar el seguimiento del sistema."
            icon={<Sparkles className="w-8 h-8 text-[var(--green-accent)]" />}
            position="right"
          >
            <div className="h-40 bg-[var(--moss)]/10 rounded-xl border border-[var(--moss)]/20 p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-[var(--green-accent)] rounded-full animate-pulse" />
                <span className="text-[var(--moss)]/60 text-xs font-mono-custom">Live Feed</span>
              </div>
              <div className="flex-1 font-mono-custom text-sm text-[var(--moss)] overflow-hidden">
                <span>{typewriterText}</span>
                <span className="inline-block w-2 h-4 bg-[var(--green-accent)] animate-pulse ml-1" />
              </div>
            </div>
          </FeatureCardFullWidth>

          {/* Card 3 - Seguimiento técnico */}
          <FeatureCardFullWidth
            title="Seguimiento técnico"
            description="Acompañamos al productor con análisis y observaciones que ayudan a mejorar el manejo."
            icon={<TrendingUp className="w-8 h-8 text-[var(--green-accent)]" />}
            position="left"
          >
            <div className="h-40 bg-[var(--moss)]/10 rounded-xl border border-[var(--moss)]/20 p-4 flex flex-col">
              <div className="flex justify-between mb-4">
                {followUpSteps.map((step, index) => (
                  <div
                    key={step}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
                      activeStep === index
                        ? "bg-[var(--green-accent)] text-[var(--cream)] scale-95"
                        : "text-[var(--moss)]/60"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-[var(--moss)]/60 text-xs font-mono-custom text-center">
                  {activeStep !== null ? "Analizando..." : "Esperando datos"}
                </div>
              </div>
              <button
                className={`w-full mt-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeStep !== null
                    ? "bg-[var(--green-accent)] text-[var(--cream)]"
                    : "bg-[var(--moss)]/20 text-[var(--moss)]/40"
                }`}
              >
                Mejores resultados
              </button>
            </div>
          </FeatureCardFullWidth>
        </div>
      </div>
    </section>
  );
}

function FeatureCardFullWidth({
  children,
  title,
  description,
  icon,
  position,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: "left" | "right";
}) {
  return (
    <div className={`flex flex-col md:flex-row gap-6 items-center bg-[var(--cream)] rounded-[2rem] border border-[var(--moss)]/10 shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${position === "left" ? "md:flex-row" : "md:flex-row-reverse"}`}>
      <div className="flex-1 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="text-2xl font-sans-custom font-bold text-[var(--moss)]">{title}</h3>
        </div>
        <p className="text-[var(--charcoal)]/70 text-base md:text-lg">{description}</p>
      </div>
      <div className="flex-1 p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}

// Data Analytics Section - Gráficos de crecimiento
function DataAnalyticsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".chart-item", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        ease: "power3.out",
      });

      gsap.from(".chart-line", {
        strokeDashoffset: 1000,
        duration: 2,
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-[var(--moss-light)]/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold text-[var(--moss)] mb-4">
            Análisis y visualización de datos
          </h2>
          <p className="text-[var(--charcoal)]/70 text-lg max-w-2xl mx-auto">
            Transformamos la información de tu establecimiento en gráficos claros que muestran el crecimiento y evolución de tu sistema productivo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Chart 1 - Producción Anual */}
          <div className="chart-item bg-[var(--cream)] rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-sans-custom font-bold text-[var(--moss)] mb-4">
              Evolución de Producción
            </h3>
            <div className="h-48 relative">
              <svg viewBox="0 0 300 200" className="w-full h-full">
                <defs>
                  <linearGradient id="chartGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(74, 124, 89, 0.3)" />
                    <stop offset="100%" stopColor="rgba(74, 124, 89, 0)" />
                  </linearGradient>
                </defs>
                <g transform="translate(40, 20)">
                  {/* Ejes */}
                  <line x1="0" y1="0" x2="0" y2="140" stroke="#2E4036" strokeWidth="2" />
                  <line x1="0" y1="140" x2="240" y2="140" stroke="#2E4036" strokeWidth="2" />

                  {/* Línea de datos con animación */}
                  <path
                    className="chart-line"
                    d="M0,120 Q30,100 60,80 T120,70 T180,40 T240,20"
                    fill="none"
                    stroke="#4A7C59"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: "1000",
                      strokeDashoffset: "1000",
                    }}
                  />

                  {/* Área bajo la línea */}
                  <path
                    className="chart-line"
                    d="M0,120 Q30,100 60,80 T120,70 T180,40 T240,20 L240,140 L0,140 Z"
                    fill="url(#chartGradient1)"
                    style={{
                      strokeDasharray: "1000",
                      strokeDashoffset: "1000",
                    }}
                  />

                  {/* Puntos de datos */}
                  {[{x: 0, y: 120}, {x: 60, y: 80}, {x: 120, y: 70}, {x: 180, y: 40}, {x: 240, y: 20}].map((point, index) => (
                    <circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="#4A7C59"
                      className="chart-line"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    />
                  ))}
                </g>
              </svg>
            </div>
            <p className="text-[var(--charcoal)]/60 text-sm mt-4">
              Tendencia positiva de +25% en producción anual
            </p>
          </div>

          {/* Chart 2 - Eficiencia Forrajera */}
          <div className="chart-item bg-[var(--cream)] rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-sans-custom font-bold text-[var(--moss)] mb-4">
              Eficiencia Forrajera
            </h3>
            <div className="h-48 relative">
              <svg viewBox="0 0 300 200" className="w-full h-full">
                <defs>
                  <linearGradient id="chartGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(204, 88, 51, 0.3)" />
                    <stop offset="100%" stopColor="rgba(204, 88, 51, 0)" />
                  </linearGradient>
                </defs>
                <g transform="translate(40, 20)">
                  {/* Ejes */}
                  <line x1="0" y1="0" x2="0" y2="140" stroke="#2E4036" strokeWidth="2" />
                  <line x1="0" y1="140" x2="240" y2="140" stroke="#2E4036" strokeWidth="2" />

                  {/* Barras animadas */}
                  {[60, 80, 100, 110, 120, 90, 85].map((height, index) => (
                    <rect
                      key={index}
                      x={index * 35 + 5}
                      y={140 - height}
                      width="25"
                      height={height}
                      fill="#CC5833"
                      rx="2"
                      className="chart-bar"
                      style={{
                        transform: "scaleY(0)",
                        transformOrigin: "bottom",
                        transition: "transform 1s ease-out",
                        animationDelay: `${index * 0.15}s`,
                      }}
                    />
                  ))}
                </g>
              </svg>
            </div>
            <p className="text-[var(--charcoal)]/60 text-sm mt-4">
              Uso eficiente de recursos forrajeros
            </p>
          </div>

          {/* Chart 3 - Rentabilidad */}
          <div className="chart-item bg-[var(--cream)] rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-sans-custom font-bold text-[var(--moss)] mb-4">
              Rentabilidad por Cabeza
            </h3>
            <div className="h-48 relative">
              <svg viewBox="0 0 300 200" className="w-full h-full">
                <g transform="translate(40, 20)">
                  {/* Ejes */}
                  <line x1="0" y1="0" x2="0" y2="140" stroke="#2E4036" strokeWidth="2" />
                  <line x1="0" y1="140" x2="240" y2="140" stroke="#2E4036" strokeWidth="2" />

                  {/* Línea múltiple */}
                  <path
                    className="chart-line"
                    d="M0,100 L40,95 L80,90 L120,85 L160,70 L200,60 L240,50"
                    fill="none"
                    stroke="#4A7C59"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: "1000",
                      strokeDashoffset: "1000",
                    }}
                  />

                  <path
                    className="chart-line"
                    d="M0,110 L40,105 L80,100 L120,95 L160,80 L200,70 L240,60"
                    fill="none"
                    stroke="#CC5833"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: "1000",
                      strokeDashoffset: "1000",
                    }}
                  />
                </g>
              </svg>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[var(--green-accent)] rounded-full" />
                <span className="text-[var(--charcoal)]/60 text-sm">Ingreso</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[var(--clay)] rounded-full" />
                <span className="text-[var(--charcoal)]/60 text-sm">Costo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Philosophy Section - Quiénes somos
function PhilosophySection({ ref }: { ref: React.RefObject<HTMLElement> }) {
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
      ref={ref}
      id="philosophy"
      className="relative py-32 px-6 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(26, 26, 26, 0.97) 0%, rgba(46, 64, 54, 0.95) 100%), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div ref={textRef} className="container mx-auto max-w-5xl">
        <div className="philosophy-text mb-12">
          <p className="text-[var(--cream)]/80 text-xl md:text-2xl font-sans-custom leading-relaxed">
            En <strong>A&B Consultores</strong> somos dos licenciados en gestión agropecuaria: <strong>Lic. Gastón Almada</strong> y <strong>Lic. Jorge Bado</strong>.
          </p>
        </div>
        <div className="philosophy-text mb-12">
          <p className="text-[var(--cream)]/80 text-lg md:text-xl font-sans-custom leading-relaxed">
            Acompañamos a productores y empresas rurales con una mirada técnica, clara y enfocada en la toma de decisiones. Nuestro trabajo combina análisis productivo, orden de información, interpretación de indicadores y seguimiento del sistema para transformar datos del predio en acciones concretas.
          </p>
        </div>
        <div className="philosophy-text">
          <p className="text-4xl md:text-6xl lg:text-7xl font-serif-custom italic text-[var(--cream)] leading-tight">
            Asesoramos a todo tipo de productores ganaderos en todo <span className="text-[var(--green-accent)]">Uruguay.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// Protocol Section - Cómo trabajamos
function ProtocolSection({ ref }: { ref: React.RefObject<HTMLElement> }) {
  const cardsRef = useRef<HTMLDivElement>(null);

  const protocols = [
    {
      number: "01",
      title: "Primer contacto",
      description: "Desde la web, WhatsApp, Instagram o correo electrónico",
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
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".protocol-card").forEach((card) => {
        gsap.fromTo(
          card,
          {
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(20px)",
            y: 50,
          },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 30%",
              scrub: 0.5,
            },
            ease: "power2.inOut",
          }
        );
      });
    }, cardsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="protocol"
      className="py-24 px-6 bg-[var(--cream)]"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold text-[var(--moss)] mb-4">
            Cómo trabajamos
          </h2>
          <p className="text-[var(--charcoal)]/60 text-lg max-w-2xl mx-auto">
            Un proceso claro, técnico y profesional para convertir datos del predio en decisiones concretas.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {protocols.map((protocol) => (
            <ProtocolCard key={protocol.number} {...protocol} />
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
    <div className="protocol-card bg-[var(--moss)] text-[var(--cream)] rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
      <div className="relative z-10">
        <div className="font-mono-custom text-[var(--green-accent)] text-3xl md:text-4xl font-bold mb-4">
          {number}
        </div>
        <h3 className="text-xl md:text-2xl font-sans-custom font-bold mb-3">{title}</h3>
        <p className="text-[var(--cream)]/80 text-base">{description}</p>
      </div>
      <div className="absolute right-8 bottom-8 w-16 h-16 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_15s_linear_infinite]">
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
function ServicesSection({ ref }: { ref: React.RefObject<HTMLElement> }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
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
    <section
      ref={ref}
      id="services"
      className="py-24 px-6 bg-[var(--cream)]"
    >
      <div ref={sectionRef} className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold text-[var(--moss)] mb-4">
            Servicios
          </h2>
          <p className="text-[var(--charcoal)]/60 text-lg max-w-2xl mx-auto">
            Diseñados para adaptarse al nivel de análisis y seguimiento que necesita cada establecimiento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Servicio Funcional */}
          <ServiceCard
            title="Funcional"
            description="Ordenamiento de información productiva, análisis forrajero, evolución de stock y base técnica para mejores decisiones."
            icon={<FileText className="w-12 h-12 text-[var(--green-accent)]" />}
            features={[
              "Descripción del predio y suelos",
              "Oferta y demanda forrajera",
              "Evolución de stock mensual",
              "Balance forrajero y resultados productivos",
            ]}
            cta="Consultar este servicio"
          />

          {/* Servicio Indicadores */}
          <ServiceCard
            title="Indicadores"
            description="Cálculo e interpretación de indicadores productivos, económicos y financieros para entender la rentabilidad del sistema."
            icon={<BarChart3 className="w-12 h-12 text-[var(--green-accent)]" />}
            features={[
              "Costos mensuales",
              "Ingreso bruto e ingreso neto",
              "Saldo de caja y estado patrimonial",
              "Indicadores descriptivos, productivos y financieros",
            ]}
            cta="Consultar este servicio"
          />

          {/* Servicio Integral Premium */}
          <ServiceCard
            title="Servicio Integral"
            description="Diagnóstico integral del sistema ganadero con visión productiva, económica y estratégica."
            icon={<Star className="w-12 h-12 text-[var(--green-accent)]" />}
            features={[
              "Todo lo de Funcional",
              "Todo lo de Indicadores",
              "Evaluación integral del sistema",
              "Recomendaciones personalizadas",
              "Seguimiento técnico continuo",
            ]}
            cta="Consultar este servicio"
            premium
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  title,
  description,
  icon,
  features,
  cta,
  premium = false,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  cta: string;
  premium?: boolean;
}) {
  return (
    <div
      className={`service-card bg-[var(--cream)] rounded-[3rem] p-8 border-2 transition-all hover:shadow-xl ${
        premium
          ? "border-[var(--green-accent)] shadow-lg"
          : "border-[var(--moss)]/10"
      }`}
    >
      <div className="flex items-center gap-4 mb-6">
        {icon}
        <h3 className="text-2xl font-sans-custom font-bold text-[var(--moss)]">{title}</h3>
        {premium && (
          <span className="bg-[var(--green-accent)] text-[var(--cream)] text-xs font-bold px-3 py-1 rounded-full">
            Premium
          </span>
        )}
      </div>
      <p className="text-[var(--charcoal)]/80 text-lg mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-[var(--moss)]/80">
            <div className="w-1.5 h-1.5 bg-[var(--green-accent)] rounded-full mt-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full btn-magnetic px-6 py-3 rounded-full font-medium text-lg transition-colors ${
          premium
            ? "bg-[var(--green-accent)] text-[var(--cream)] hover:bg-[var(--green-accent)]/90"
            : "border-2 border-[var(--moss)] text-[var(--moss)] hover:bg-[var(--moss)] hover:text-[var(--cream)]"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}

// Pricing Section
function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-card", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
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

  const plans = [
    {
      name: "Funcional",
      price: "Personalizado",
      description: "Ideal para establecimientos que necesitan ordenar información productiva",
      features: [
        "Análisis forrajero",
        "Evolución de stock",
        "Balance forrajero",
        "Base técnica para decisiones",
        "Informe PDF",
      ],
      cta: "Solicitar propuesta",
      color: "border-[var(--moss)]/30",
      buttonColor: "border-2 border-[var(--moss)] text-[var(--moss)] hover:bg-[var(--moss)] hover:text-[var(--cream)]",
    },
    {
      name: "Indicadores",
      price: "Personalizado",
      description: "Complemento ideal para análisis económico y financiero profundo",
      features: [
        "Todo lo de Funcional",
        "Cálculo de indicadores productivos",
        "Análisis de costos",
        "Estado patrimonial",
        "Análisis de rentabilidad",
      ],
      cta: "Solicitar propuesta",
      color: "border-[var(--green-accent)]",
      buttonColor: "bg-[var(--green-accent)] text-[var(--cream)] hover:bg-[var(--green-accent)]/90",
    },
    {
      name: "Integral Premium",
      price: "Personalizado",
      description: "Diagnóstico integral con seguimiento técnico continuo",
      features: [
        "Todo lo de Funcional e Indicadores",
        "Diagnóstico integral del sistema",
        "Evaluación estratégica",
        "Seguimiento técnico continuo",
        "Recomendaciones personalizadas",
        "Prioridad en atención",
      ],
      cta: "Solicitar propuesta",
      color: "border-[var(--green-accent)] shadow-2xl",
      buttonColor: "bg-[var(--clay)] text-[var(--cream)] hover:bg-[var(--clay)]/90",
      badge: "Más completo",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-[var(--cream)]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold text-[var(--moss)] mb-4">
            Planes de Asesoramiento
          </h2>
          <p className="text-[var(--charcoal)]/60 text-lg max-w-2xl mx-auto">
            Diseñamos propuestas adaptadas al nivel de análisis que necesita cada establecimiento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`pricing-card bg-[var(--cream)] rounded-[2.5rem] p-8 border-2 ${plan.color} transition-all hover:shadow-2xl relative ${index === 1 ? "md:scale-105" : ""}`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--clay)] text-[var(--cream)] px-4 py-1 rounded-full text-sm font-bold">
                  {plan.badge}
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-sans-custom font-bold text-[var(--moss)] mb-2">{plan.name}</h3>
                <p className="text-[var(--charcoal)]/60 text-sm">{plan.description}</p>
              </div>

              <div className="text-center mb-8">
                <div className="text-4xl font-sans-custom font-bold text-[var(--moss)]">
                  {plan.price}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[var(--charcoal)]/70">
                    <div className="w-5 h-5 bg-[var(--green-accent)]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-[var(--green-accent)] rounded-full" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-full font-medium text-lg transition-all ${plan.buttonColor}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[var(--charcoal)]/60 text-base">
            Todos los planes incluyen devolución técnica y seguimiento posterior al informe.
          </p>
        </div>
      </div>
    </section>
  );
}

// Results Section
function ResultsSection() {
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
    <section className="py-24 px-6 bg-[var(--moss)] text-[var(--cream)]">
      <div ref={sectionRef} className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold mb-4">
            Resultados que puede esperar
          </h2>
          <p className="text-[var(--cream)]/80 text-lg max-w-2xl mx-auto">
            En A&B Consultores ayudamos al productor a entender mejor su sistema y tomar decisiones más claras.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="result-item text-center">
            <div className="w-16 h-16 bg-[var(--green-accent)]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-[var(--green-accent)]" />
            </div>
            <h3 className="text-xl font-sans-custom font-bold mb-2">Mayor control</h3>
            <p className="text-[var(--cream)]/70">Información organizada para entender qué está pasando en el establecimiento.</p>
          </div>

          <div className="result-item text-center">
            <div className="w-16 h-16 bg-[var(--green-accent)]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-[var(--green-accent)]" />
            </div>
            <h3 className="text-xl font-sans-custom font-bold mb-2">Mejores decisiones</h3>
            <p className="text-[var(--cream)]/70">Datos claros para tomar decisiones sobre manejo, carga y producción.</p>
          </div>

          <div className="result-item text-center">
            <div className="w-16 h-16 bg-[var(--green-accent)]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-[var(--green-accent)]" />
            </div>
            <h3 className="text-xl font-sans-custom font-bold mb-2">Análisis económico</h3>
            <p className="text-[var(--cream)]/70">Comprender costos, ingresos y resultados del establecimiento.</p>
          </div>

          <div className="result-item text-center">
            <div className="w-16 h-16 bg-[var(--green-accent)]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-[var(--green-accent)]" />
            </div>
            <h3 className="text-xl font-sans-custom font-bold mb-2">Gestión profesional</h3>
            <p className="text-[var(--cream)]/70">Herramientas y análisis para mejorar la gestión ganadera.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 bg-[var(--cream)]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold text-[var(--moss)] mb-4">
            Solicitar contacto
          </h2>
          <p className="text-[var(--charcoal)]/60 text-lg max-w-2xl mx-auto">
            Dejá tus datos y contanos qué necesitás analizar en tu establecimiento.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="contact-element">
              <label htmlFor="nombre" className="block text-[var(--moss)] font-medium mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--moss)]/20 focus:border-[var(--green-accent)] focus:outline-none transition-colors bg-white"
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="contact-element">
              <label htmlFor="telefono" className="block text-[var(--moss)] font-medium mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--moss)]/20 focus:border-[var(--green-accent)] focus:outline-none transition-colors bg-white"
                placeholder="+598 XX XXX XXX"
              />
            </div>

            <div className="contact-element">
              <label htmlFor="email" className="block text-[var(--moss)] font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--moss)]/20 focus:border-[var(--green-accent)] focus:outline-none transition-colors bg-white"
                placeholder="tu@email.com"
              />
            </div>

            <div className="contact-element">
              <label htmlFor="servicio" className="block text-[var(--moss)] font-medium mb-2">
                Servicio de interés
              </label>
              <select
                id="servicio"
                name="servicio"
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--moss)]/20 focus:border-[var(--green-accent)] focus:outline-none transition-colors bg-white"
              >
                <option value="">Seleccionar servicio</option>
                <option value="funcional">Funcional</option>
                <option value="indicadores">Indicadores</option>
                <option value="integral">Servicio Integral (Premium)</option>
              </select>
            </div>

            <div className="contact-element">
              <label htmlFor="mensaje" className="block text-[var(--moss)] font-medium mb-2">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--moss)]/20 focus:border-[var(--green-accent)] focus:outline-none transition-colors bg-white resize-none"
                placeholder="Contanos qué necesitás analizar en tu establecimiento..."
              />
            </div>

            <div className="contact-element">
              <button
                type="submit"
                className="btn-magnetic w-full bg-[var(--green-accent)] text-[var(--cream)] px-8 py-4 rounded-full font-medium text-lg hover:bg-[var(--green-accent)]/90 transition-colors"
              >
                Enviar consulta
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] text-[var(--cream)] rounded-t-[4rem] pt-16 pb-8 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-sans-custom font-bold mb-4">A&B Consultores</h3>
            <p className="text-[var(--cream)]/60 text-lg max-w-md">
              Consultoría agropecuaria y gestión ganadera basada en datos.
            </p>
          </div>
          <div>
            <h4 className="font-sans-custom font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-[var(--cream)]/60">
              <li>
                <a href="#features" className="link-hover">Por qué A&B</a>
              </li>
              <li>
                <a href="#philosophy" className="link-hover">Quiénes somos</a>
              </li>
              <li>
                <a href="#protocol" className="link-hover">Cómo trabajamos</a>
              </li>
              <li>
                <a href="#services" className="link-hover">Servicios</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans-custom font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-[var(--cream)]/60">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contacto@abconsultores.uy</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+598 XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Uruguay</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--cream)]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono-custom text-sm text-[var(--cream)]/60">
              System Operational
            </span>
          </div>
          <p className="text-[var(--cream)]/40 text-sm">
            © 2026 A&B Consultores. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
