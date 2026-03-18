"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ChevronRight, Mail, MapPin, Phone, ArrowRight, Sparkles, Target, TrendingUp, FileText, BarChart3, Star, Menu, X, MessageCircle } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-cream">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navbar - La Isla Flotante */}
      <nav
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full transition-all duration-500 ${
          isScrolled
            ? "bg-cream/60 backdrop-blur-xl border border-moss/10 shadow-lg"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex items-center gap-8">
          <div className={`font-sans-custom font-bold text-lg ${isScrolled ? "text-moss" : "text-cream"}`}>
            A&B
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className={`text-sm font-medium link-hover ${
                isScrolled ? "text-moss" : "text-cream/80 hover:text-cream"
              }`}
            >
              Por qué A&B
            </a>
            <a
              href="#services"
              className={`text-sm font-medium link-hover ${
                isScrolled ? "text-moss" : "text-cream/80 hover:text-cream"
              }`}
            >
              Servicios
            </a>
            <a
              href="#philosophy"
              className={`text-sm font-medium link-hover ${
                isScrolled ? "text-moss" : "text-cream/80 hover:text-cream"
              }`}
            >
              Filosofía
            </a>
            <a
              href="#protocol"
              className={`text-sm font-medium link-hover ${
                isScrolled ? "text-moss" : "text-cream/80 hover:text-cream"
              }`}
            >
              Proceso
            </a>
            <a
              href="#contact"
              className={`text-sm font-medium link-hover ${
                isScrolled ? "text-moss" : "text-cream/80 hover:text-cream"
              }`}
            >
              Contacto
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className={`cursor-pointer btn-magnetic btn-slide hidden md:block px-5 py-2 rounded-full text-sm font-medium ${
                isScrolled
                  ? "bg-green-accent text-cream"
                  : "bg-green-accent text-cream"
              }`}
            >
              Reservar consulta
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? "text-moss" : "text-cream"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? "text-moss" : "text-cream"}`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-charcoal">
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-sans-custom font-bold text-cream hover:text-green-accent transition-colors"
            >
              Por qué A&B
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-sans-custom font-bold text-cream hover:text-green-accent transition-colors"
            >
              Servicios
            </a>
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-sans-custom font-bold text-cream hover:text-green-accent transition-colors"
            >
              Filosofía
            </a>
            <a
              href="#protocol"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-sans-custom font-bold text-cream hover:text-green-accent transition-colors"
            >
              Proceso
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-sans-custom font-bold text-cream hover:text-green-accent transition-colors"
            >
              Contacto
            </a>
            <a
              href="https://wa.me/59899123456"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-accent text-cream px-8 py-4 rounded-full font-bold text-lg hover:bg-green-accent/90 transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/59898266917?text=Hola%2C%20me%20gustar%C3%ADa%20contratar%20sus%20servicios"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-accent text-cream w-14 h-14 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Hero - El Plano Inicial */}
      <HeroSection ref={heroRef} />

      {/* Features - Artefactos Funcionales Interactivos */}
      <FeaturesSection ref={featuresRef} />

      {/* Philosophy - Quiénes somos */}
      <PhilosophySection ref={philosophyRef} />

      {/* Protocol - Cómo trabajamos */}
      <ProtocolSection ref={protocolRef} />

      {/* Services */}
      <ServicesSection ref={servicesRef} />

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
          "linear-gradient(to top, rgba(26, 26, 26, 0.9) 0%, rgba(26, 26, 26, 0.75) 70%, rgba(26, 26, 26, 0.65) 100%), url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div ref={heroContentRef} className="container mx-auto px-6 pb-16">
        <div className="max-w-4xl">
          {/* Trust Badge */}
          <div className="hero-text mb-6 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-accent rounded-full animate-pulse" />
            <span className="text-cream/90 text-sm font-medium uppercase tracking-wider">
              Consultoría agropecuaria profesional
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans-custom font-bold text-cream hero-text">
            Gestión ganadera
          </h1>
          <h2 className="text-5xl  font-bold md:text-8xl lg:text-9xl font-serif-custom italic text-cream hero-text mt-4 leading-12">
            basada en{" "}
            <span className="text-green-accent font-bold">datos.</span>
          </h2>
          <p className="text-cream/95 text-lg md:text-xl mt-8 max-w-2xl hero-text leading-relaxed">
            En A&B Consultores ayudamos a productores ganaderos a transformar información del predio en decisiones técnicas claras y rentables.
          </p>
          <div className="mt-10 hero-text flex flex-wrap gap-4">
            <a
              href="#contact"
              className="btn-magnetic bg-green-accent text-cream px-8 py-4 rounded-full font-medium text-lg hover:bg-green-accent/90 transition-colors inline-flex items-center"
            >
              Solicitar asesoramiento
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </a>
            <a
              href="#services"
              className="btn-magnetic border-2 border-cream/30 text-cream px-8 py-4 rounded-full font-medium text-lg hover:bg-cream/10 transition-colors inline-flex items-center"
            >
              Ver servicios
            </a>
          </div>

          {/* Social Proof Stats */}
          <div className="hero-text mt-12 pt-8 border-t border-cream/20 grid grid-cols-3 gap-6 md:gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-cream">+100</div>
              <div className="text-cream/70 text-sm md:text-base">Productores asesorados</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-cream">95%</div>
              <div className="text-cream/70 text-sm md:text-base">Satisfacción</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-cream">+20%</div>
              <div className="text-cream/70 text-sm md:text-base">Mejora promedio</div>
            </div>
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
      className="py-24 px-6 bg-cream"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold text-moss mb-4">
            Por qué trabajar con A&B
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            Acompañamos al productor con una mirada técnica, práctica y enfocada en mejorar la gestión del establecimiento.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Diagnostic Shuffler (Decisiones basadas en datos) */}
          <FeatureCard
            title="Decisiones basadas en datos"
            description="Analizamos la información del predio para convertirla en decisiones más claras y fundamentadas."
            icon={<Target className="w-8 h-8 text-green-accent" />}
          >
            <div className="relative h-40 overflow-hidden">
              {analysisCards.map((card, index) => {
                const isActive = index === shufflerIndex;
                const isNext = index === (shufflerIndex + 1) % analysisCards.length;
                const isPrev = index === (shufflerIndex - 1 + analysisCards.length) % analysisCards.length;

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
                    style={{
                      willChange: "transform, opacity",
                    }}
                  >
                    <p className="text-moss font-medium text-sm">{card}</p>
                  </div>
                );
              })}
            </div>
          </FeatureCard>

          {/* Card 2 - Telemetry Typewriter (Información más ordenada) */}
          <FeatureCard
            title="Información más ordenada"
            description="Organizamos los datos productivos y económicos para facilitar el seguimiento del sistema."
            icon={<Sparkles className="w-8 h-8 text-green-accent" />}
          >
            <div className="h-40 bg-moss/10 rounded-xl border border-moss/20 p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-accent rounded-full animate-pulse" />
                <span className="text-moss/60 text-xs font-mono-custom">Live Feed</span>
              </div>
              <div className="flex-1 font-mono-custom text-sm text-moss overflow-hidden">
                <span>{typewriterText}</span>
                <span className="inline-block w-2 h-4 bg-green-accent animate-pulse ml-1" />
              </div>
            </div>
          </FeatureCard>

          {/* Card 3 - Cursor Protocol Scheduler (Seguimiento técnico) */}
          <FeatureCard
            title="Seguimiento técnico"
            description="Acompañamos al productor con análisis y observaciones que ayudan a mejorar el manejo."
            icon={<TrendingUp className="w-8 h-8 text-green-accent" />}
          >
            <div className="h-40 bg-moss/10 rounded-xl border border-moss/20 p-4 flex flex-col">
              <div className="flex justify-between mb-4">
                {followUpSteps.map((step, index) => (
                  <div
                    key={step}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
                      activeStep === index
                        ? "bg-green-accent text-cream scale-95"
                        : "text-moss/60"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-moss/60 text-xs font-mono-custom text-center">
                  {activeStep !== null ? "Analizando..." : "Esperando datos"}
                </div>
              </div>
              <button
                className={`w-full mt-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeStep !== null
                    ? "bg-green-accent text-cream"
                    : "bg-moss/20 text-moss/40"
                }`}
              >
                Mejores resultados
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
          <h3 className="text-xl font-sans-custom font-bold text-moss">{title}</h3>
        </div>
        <p className="text-charcoal/60 text-sm mb-6">{description}</p>
        {children}
      </div>
    </div>
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
          <p className="text-cream/80 text-xl md:text-2xl font-sans-custom leading-relaxed">
            En <strong>A&B Consultores</strong> somos dos licenciados en gestión agropecuaria: <strong>Lic. Gastón Almada</strong> y <strong>Lic. Jorge Bado</strong>.
          </p>
        </div>
        <div className="philosophy-text mb-12">
          <p className="text-cream/80 text-lg md:text-xl font-sans-custom leading-relaxed">
            Acompañamos a productores y empresas rurales con una mirada técnica, clara y enfocada en la toma de decisiones. Nuestro trabajo combina análisis productivo, orden de información, interpretación de indicadores y seguimiento del sistema para transformar datos del predio en acciones concretas.
          </p>
        </div>
        <div className="philosophy-text">
          <p className="text-4xl md:text-6xl lg:text-7xl font-serif-custom italic text-cream leading-tight">
            Asesoramos a todo tipo de productores ganaderos en todo <span className="text-green-accent font-bold">Uruguay.</span>
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
      gsap.fromTo(
        ".protocol-card",
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
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none play none",
          },
          stagger: 0.15,
          ease: "power2.inOut",
        }
      );
    }, cardsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="protocol"
      className="py-24 px-6 bg-cream"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold text-moss mb-4">
            Cómo trabajamos
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            Un proceso claro, técnico y profesional para convertir datos del predio en decisiones concretas.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
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
    <div className="protocol-card bg-moss text-cream rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
      <div className="relative z-10">
        <div className="font-mono-custom text-green-accent text-3xl md:text-4xl font-bold mb-4">
          {number}
        </div>
        <h3 className="text-xl md:text-2xl font-sans-custom font-bold mb-3">{title}</h3>
        <p className="text-cream/80 text-base">{description}</p>
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
  return (
    <section
      ref={ref}
      id="services"
      className="py-24 px-6 bg-cream"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold text-moss mb-4">
            Servicios
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            Diseñados para adaptarse al nivel de análisis y seguimiento que necesita cada establecimiento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Servicio Funcional */}
          <ServiceCard
            title="Funcional"
            description="Ordenamiento de información productiva, análisis forrajero, evolución de stock y base técnica para mejores decisiones."
            icon={<FileText className="w-12 h-12 text-green-accent" />}
            features={[
              "Descripción del predio y suelos",
              "Oferta y demanda forrajera",
              "Evolución de stock mensual",
              "Balance forrajero y resultados productivos",
            ]}
            cta="Consultar este servicio"
            servicio="funcional"
            price="$300"
          />

          {/* Servicio Indicadores */}
          <ServiceCard
            title="Indicadores"
            description="Cálculo e interpretación de indicadores productivos, económicos y financieros para entender la rentabilidad del sistema."
            icon={<BarChart3 className="w-12 h-12 text-green-accent" />}
            features={[
              "Costos mensuales",
              "Ingreso bruto e ingreso neto",
              "Saldo de caja y estado patrimonial",
              "Indicadores descriptivos, productivos y financieros",
            ]}
            cta="Consultar este servicio"
            servicio="indicadores"
            price="$450"
          />

          {/* Servicio Integral Premium */}
          <ServiceCard
            title="Servicio Integral"
            description="Diagnóstico integral del sistema ganadero con visión productiva, económica y estratégica."
            icon={<Star className="w-12 h-12 text-green-accent" />}
            features={[
              "Todo lo de Funcional",
              "Todo lo de Indicadores",
              "Evaluación integral del sistema",
              "Recomendaciones personalizadas",
              "Seguimiento técnico continuo",
            ]}
            cta="Consultar este servicio"
            servicio="integral"
            premium
            price="$700"
          />
        </div>
        <p className="text-center text-charcoal/60 text-sm mt-8">
          *Precios mensuales según tamaño del establecimiento. Consultar por opciones personalizadas.
        </p>
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
  price,
  servicio,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  cta: string;
  premium?: boolean;
  price?: string;
  servicio?: string;
}) {
  const handleClick = () => {
    if (servicio) {
      // Update URL with service parameter and scroll to contact
      window.location.hash = "contact";
      window.history.replaceState(null, "", `?servicio=${servicio}#contact`);
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`service-card bg-cream rounded-[3rem] p-8 border-2 transition-all hover:shadow-xl ${
        premium
          ? "border-green-accent shadow-lg"
          : "border-moss/10"
      }`}
    >
      <div className="flex items-center gap-4 mb-6">
        {icon}
        <h3 className="text-2xl font-sans-custom font-bold text-moss">{title}</h3>
        {premium && (
          <span className="bg-green-accent text-cream text-xs font-bold px-3 py-1 rounded-full">
            Premium
          </span>
        )}
      </div>
      {price && (
        <div className="mb-4">
          <span className="text-3xl md:text-4xl font-sans-custom font-bold text-green-accent">{price}</span>
          <span className="text-sm text-charcoal/60">/mes</span>
        </div>
      )}
      <p className="text-charcoal/80 text-lg mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-moss/80">
            <div className="w-1.5 h-1.5 bg-green-accent rounded-full mt-2 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={handleClick}
        className={`w-full btn-magnetic px-6 py-3 rounded-full font-medium text-lg transition-colors inline-flex items-center justify-center cursor-pointer ${
          premium
            ? "bg-green-accent text-cream hover:bg-green-accent/90"
            : "border-2 border-moss text-moss hover:bg-moss hover:text-cream"
        }`}
      >
        {cta}
      </button>
    </div>
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
    <section className="py-24 px-6 bg-moss text-cream">
      <div ref={sectionRef} className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans-custom font-bold mb-4">
            Resultados que puede esperar
          </h2>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto">
            En A&B Consultores ayudamos al productor a entender mejor su sistema y tomar decisiones más claras.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="result-item text-center">
            <div className="w-16 h-16 bg-green-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-green-accent" />
            </div>
            <h3 className="text-xl font-sans-custom font-bold mb-2">Mayor control</h3>
            <p className="text-cream/70">Información organizada para entender qué está pasando en el establecimiento.</p>
          </div>

          <div className="result-item text-center">
            <div className="w-16 h-16 bg-green-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-accent" />
            </div>
            <h3 className="text-xl font-sans-custom font-bold mb-2">Mejores decisiones</h3>
            <p className="text-cream/70">Datos claros para tomar decisiones sobre manejo, carga y producción.</p>
          </div>

          <div className="result-item text-center">
            <div className="w-16 h-16 bg-green-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-green-accent" />
            </div>
            <h3 className="text-xl font-sans-custom font-bold mb-2">Análisis económico</h3>
            <p className="text-cream/70">Comprender costos, ingresos y resultados del establecimiento.</p>
          </div>

          <div className="result-item text-center">
            <div className="w-16 h-16 bg-green-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-accent" />
            </div>
            <h3 className="text-xl font-sans-custom font-bold mb-2">Gestión profesional</h3>
            <p className="text-cream/70">Herramientas y análisis para mejorar la gestión ganadera.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    servicio: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

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
    // Check URL for servicio parameter
    const urlParams = new URLSearchParams(window.location.search);
    const servicioParam = urlParams.get("servicio");
    if (servicioParam) {
      setFormData(prev => ({ ...prev, servicio: servicioParam }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "¡Mensaje enviado correctamente! Te contactaremos pronto."
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
          message: data.error || "Hubo un error al enviar el mensaje. Por favor intenta nuevamente."
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Hubo un error al enviar el mensaje. Por favor intenta nuevamente."
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
            Solicitar contacto
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            Dejá tus datos y contanos qué necesitás analizar en tu establecimiento.
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
              <div className={`contact-element p-4 rounded-xl ${
                submitStatus.type === "success"
                  ? "bg-green-accent/10 text-green-accent border border-green-accent/30"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}>
                <p className="font-medium">{submitStatus.message}</p>
              </div>
            )}

            <div className="contact-element">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-magnetic w-full bg-green-accent text-cream px-8 py-4 rounded-full font-medium text-lg hover:bg-green-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : "Enviar consulta"}
                {!isSubmitting && <ArrowRight className="inline-block ml-2 w-5 h-5" />}
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
    <footer className="bg-charcoal text-cream rounded-t-[4rem] pt-16 pb-8 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-sans-custom font-bold mb-4">A&B Consultores</h3>
            <p className="text-cream/60 text-lg max-w-md">
              Consultoría agropecuaria y gestión ganadera basada en datos.
            </p>
          </div>
          <div>
            <h4 className="font-sans-custom font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-cream/60">
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
            <ul className="space-y-2 text-cream/60">
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

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono-custom text-sm text-cream/60">
              Sistema Operativo
            </span>
          </div>
          <p className="text-cream/40 text-sm">
            © 2026 A&B Consultores. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
