"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { PORTAL_URL } from "@/lib/site-content";
import type { LatestNewsArticle } from "@/components/home/LatestNewsHome";

/* Home de A&B: verde campo #0f4a2a, dorado #f0bd3a, crema #eef4e8; Inter. */

const WA_URL = "https://wa.me/59899126042";
const EMAIL = "almadabadoconsultores@gmail.com";
const IG_URL = "https://www.instagram.com/ayb.gestionagro";
const FB_URL = "https://www.facebook.com/profile.php?id=61568000957291";

const EYEBROW = "text-[13px] font-bold tracking-[0.1em] text-[#7a5a0c]";
const H2_BASE = "m-0 font-extrabold tracking-[-0.02em] text-[#0f4a2a]";
const H2 =
  "m-0 font-extrabold leading-[1.1] tracking-[-0.02em] text-[#0f4a2a] text-[clamp(32px,4vw,44px)]";
const BTN_GOLD =
  "inline-flex items-center justify-center rounded-xl bg-[#f0bd3a] font-bold text-[#0a3520] no-underline transition-colors hover:bg-[#f5cb5c]";
const BTN_OUTLINE_LIGHT =
  "inline-flex items-center justify-center rounded-xl border-[1.5px] border-white/75 font-semibold text-white no-underline transition-colors hover:bg-white/10";
const BTN_GREEN =
  "inline-flex items-center justify-center rounded-xl bg-[#0f4a2a] font-bold text-white no-underline transition-colors hover:bg-[#0a3520]";

function Icon({ children, size = 24, width = 1.8 }: { children: ReactNode; size?: number; width?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const WaIcon = ({ size = 20 }: { size?: number }) => (
  <Icon size={size} width={2}>
    <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z" />
  </Icon>
);

function Brand() {
  return (
    <span className="flex items-center gap-3 text-white">
      <img src="/img/logo-ayb-blanco.png" alt="A&B" className="block h-10 w-auto" />
      <span className="h-[30px] w-px bg-white/35" />
      <span className="text-[11px] font-semibold uppercase leading-[1.3] tracking-[0.12em] text-[#d4e4d8]">
        Consultores
        <br />
        Agropecuarios
      </span>
    </span>
  );
}

/* ───────────────────────── Header + Hero ───────────────────────── */

const NAV = [
  { label: "Libreta A&B", href: PORTAL_URL },
  { label: "Quiénes somos", href: "#quienes-somos" },
  { label: "Filosofía", href: "#filosofia" },
  { label: "Noticias", href: "#noticias" },
  { label: "Contacto", href: "#contacto" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-[2] mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-[18px] max-[820px]:gap-3 max-[820px]:px-4 max-[820px]:pt-[14px] max-[820px]:pb-3">
      <a href="#inicio" className="no-underline">
        <Brand />
      </a>
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="ml-auto hidden h-11 w-11 cursor-pointer items-center justify-center rounded-[10px] border border-white/30 bg-transparent text-white max-[820px]:flex"
      >
        <Icon size={22} width={2}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </Icon>
      </button>
      <nav
        className={`flex flex-wrap gap-x-[26px] gap-y-1.5 text-[15px] font-medium max-[820px]:order-3 max-[820px]:w-full max-[820px]:flex-col max-[820px]:gap-0 max-[820px]:border-t max-[820px]:border-white/15 ${
          open ? "" : "max-[820px]:hidden"
        }`}
      >
        {NAV.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => setOpen(false)}
            className="py-2.5 text-white no-underline hover:text-[#f0bd3a] max-[820px]:border-b max-[820px]:border-white/10 max-[820px]:py-[13px]"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <div className="flex flex-wrap items-center gap-2.5 max-[820px]:order-2 max-[820px]:grid max-[820px]:w-full max-[820px]:grid-cols-2">
        <a href={PORTAL_URL} className={`${BTN_OUTLINE_LIGHT} min-h-11 gap-2 rounded-[10px] px-[18px] text-[15px]`}>
          <Icon size={18} width={2}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
          </Icon>
          Iniciar sesión
        </a>
        <a href={PORTAL_URL} className={`${BTN_GOLD} min-h-11 rounded-[10px] px-5 text-[15px]`}>
          Crear cuenta
        </a>
      </div>
    </header>
  );
}

const HERO_BARS = [62, 57, 53, 45, 38, 33, 35, 41, 51, 60, 64, 63];
const HERO_MONTHS = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function HeroMockup() {
  return (
    <div className="relative min-w-0 flex-[1_1_540px] pr-11 max-[600px]:pr-0">
      <div className="rounded-[14px] bg-[#1c2a22] p-2.5 shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col overflow-hidden rounded-md bg-[#f6f8f4] text-[#13241a]">
          <div className="flex items-center justify-between gap-2 border-b border-[#dfe8dc] bg-white px-3.5 py-[9px]">
            <img src="/img/logo-libreta-claro.svg" alt="Libreta A&B" className="block h-3 w-auto" />
            <span className="rounded-full bg-[#eef4e8] px-2.5 py-1 text-[10.5px] font-semibold text-[#0f4a2a]">
              Las Margaritas · Salto · 740 ha ▾
            </span>
          </div>
          <div className="flex">
            <div className="flex w-24 flex-none flex-col gap-0.5 border-r border-[#dfe8dc] bg-white px-2 py-2.5 text-[10.5px] text-[#4b5d51]">
              <span className="rounded-md bg-[#0f4a2a] px-2 py-1.5 font-semibold text-white">Resumen</span>
              {["Stock", "Pasto", "Lluvias", "Indicadores", "Económico", "Informes"].map((s) => (
                <span key={s} className="px-2 py-1.5">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-3">
              <div className="rounded-lg border border-[#f0bd3a] bg-[#fdf3dc] px-2.5 py-2 text-[10.5px] text-[#5c4306]">
                <strong>Aviso:</strong> 2 meses con déficit de pasto en el año. Revisá la carga de los potreros.
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(92px,1fr))] gap-2">
                {[
                  ["Superficie", "740 ha", "CONEAT 110,3"],
                  ["Carga", "0,85", "UG por hectárea"],
                  ["Destete", "92 %", "Preñez 95 %"],
                  ["Balance de pasto", "+405 t", "materia seca en el año"],
                ].map(([k, v, s]) => (
                  <div key={k} className="flex flex-col gap-0.5 rounded-lg border border-[#dfe8dc] bg-white px-2.5 py-2">
                    <span className="text-[9.5px] font-semibold text-[#4b5d51]">{k}</span>
                    <span className="text-base font-extrabold text-[#0f4a2a]">{v}</span>
                    <span className="text-[9px] text-[#4b5d51]">{s}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-[#dfe8dc] bg-white p-2.5">
                <div className="flex justify-between gap-2 text-[10.5px] font-bold text-[#13241a]">
                  <span>Pasto: cobertura por mes</span>
                  <span className="font-semibold text-[#b3261e]">En rojo, meses con déficit</span>
                </div>
                <div className="mt-2 flex h-[70px] items-end gap-1 border-b border-[#c9d6c6]">
                  {HERO_BARS.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-[3px]"
                      style={{ height: h, background: i === 5 || i === 6 ? "#c0392b" : "#2f7a4a" }}
                    />
                  ))}
                </div>
                <div className="mt-1 flex gap-1">
                  {HERO_MONTHS.map((m, i) => (
                    <span key={i} className="flex-1 text-center text-[9px] text-[#4b5d51]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-[-18px] h-3 rounded-b-2xl bg-[#2a3a30]" />
      <p className="mt-3.5 mb-0 text-xs text-[#d4e4d8]">Pantalla de ejemplo con un campo y datos ficticios.</p>

      <div className="absolute right-0 bottom-9 w-[150px] rounded-3xl bg-[#1c2a22] p-1.5 shadow-[0_24px_48px_rgba(0,0,0,0.4)] max-[600px]:hidden">
        <div className="flex flex-col gap-[7px] rounded-[19px] bg-[#f6f8f4] px-2.5 pt-3.5 pb-3 text-[#13241a]">
          <img src="/img/logo-libreta-claro.svg" alt="Libreta A&B" className="block h-[11px] w-auto self-start" />
          <span className="text-[12.5px] font-bold">Las Margaritas</span>
          {[
            ["Carga", "0,85 UG/ha"],
            ["Destete", "92 %"],
            ["Lluvia 2026", "988 mm"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex items-baseline justify-between rounded-lg border border-[#dfe8dc] bg-white px-2 py-[7px] text-[9.5px] text-[#4b5d51]"
            >
              {k} <strong className="text-xs text-[#0f4a2a]">{v}</strong>
            </div>
          ))}
          <div className="rounded-lg bg-[#dcefd9] px-2 py-[7px] text-[9.5px] leading-[1.35] text-[#0f4a2a]">
            Anotado: nacieron 12 terneros en el potrero 3.
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-[#0f4a2a] bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(10,53,32,0.94) 0%, rgba(15,74,42,0.82) 50%, rgba(15,74,42,0.55) 100%), url(/hero-bg.jpg)",
      }}
    >
      <Header />
      <div className="relative z-[2] mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-14 gap-y-12 px-6 pt-10 pb-[130px]">
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-[22px]">
          <span className="self-start rounded-full border border-[rgba(240,189,58,0.55)] bg-[rgba(240,189,58,0.12)] px-3.5 py-1.5 text-xs font-bold tracking-[0.08em] text-[#f0bd3a]">
            NUEVO · LIBRETA A&amp;B, TU ASISTENTE VIRTUAL DE CAMPO
          </span>
          <h1 className="m-0 text-[clamp(40px,5vw,62px)] font-extrabold leading-[1.04] tracking-[-0.025em]">
            Gestión agropecuaria <span className="text-[#f0bd3a]">basada en datos.</span>
          </h1>
          <p className="m-0 max-w-[540px] text-[19px] leading-[1.55] text-[#d4e4d8]">
            Ayudamos a productores a transformar la información del establecimiento en decisiones técnicas claras y
            rentables. Y con Libreta A&amp;B tenés todo tu campo anotado y al día, en el celular o en la computadora.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={PORTAL_URL} className={`${BTN_GOLD} min-h-[52px] px-[26px] text-base`}>
              Crear mi cuenta en Libreta
            </a>
            <a href="#contacto" className={`${BTN_OUTLINE_LIGHT} min-h-[52px] px-6 text-base`}>
              Solicitar asesoramiento
            </a>
          </div>
          <p className="m-0 text-sm text-[#a9c3b1]">
            ¿Ya usás Libreta A&amp;B?{" "}
            <a href={PORTAL_URL} className="font-semibold text-[#f0bd3a] underline">
              Iniciá sesión
            </a>
          </p>
        </div>
        <HeroMockup />
      </div>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-[-2px] left-0 z-[1] h-[122px] w-full"
        aria-hidden
      >
        <path d="M0 72 C 220 18, 470 22, 720 62 S 1180 104, 1440 38 L1440 120 L0 120 Z" fill="#155c35" />
        <path d="M0 100 C 300 64, 620 74, 920 94 S 1300 84, 1440 76 L1440 120 L0 120 Z" fill="#ffffff" />
      </svg>
    </section>
  );
}

const FEATURES = [
  {
    t: "Stock",
    d: "Tus animales mes a mes, por categoría, con cada nacimiento, compra, venta y muerte.",
    icon: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h4" />
      </>
    ),
  },
  {
    t: "Pasto",
    d: "Si alcanza o falta, cada mes del año, con aviso de los meses con déficit.",
    icon: (
      <>
        <path d="M12 21V11" />
        <path d="M12 11c0-4 3-6 7-6 0 4-3 6-7 6z" />
        <path d="M12 14c0-3-2.5-5-6-5 0 3 2.5 5 6 5z" />
        <path d="M4 21h16" />
      </>
    ),
  },
  {
    t: "Lluvias",
    d: "Lo que llovió en tu campo, comparado con la normal histórica de tu zona.",
    icon: (
      <>
        <path d="M7 15a4 4 0 0 1 .5-8A5.5 5.5 0 0 1 18 8a3.5 3.5 0 0 1-.5 7H7z" />
        <path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3" />
      </>
    ),
  },
  {
    t: "Plata",
    d: "Costos, caja y resultado del año, con un contador que lleva tus facturas al día.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5V8M12 16v1.5" />
      </>
    ),
  },
];

function Features() {
  return (
    <section className="relative z-[3] -mt-0.5 bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-7 px-6 pt-6 pb-[72px]">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div className="flex flex-col gap-2">
            <span className={EYEBROW}>LIBRETA A&amp;B</span>
            <h2 className="m-0 text-[32px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#0f4a2a]">
              Todo tu campo, anotado y al día.
            </h2>
          </div>
          <a href="#libreta" className="inline-flex min-h-11 items-center text-base font-bold text-[#0f4a2a] underline">
            Conocé cómo funciona →
          </a>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
          {FEATURES.map((f) => (
            <div key={f.t} className="flex flex-col gap-2.5 rounded-2xl bg-[#eef4e8] p-6">
              <span className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-white text-[#0f4a2a]">
                <Icon>{f.icon}</Icon>
              </span>
              <h3 className="m-0 text-[19px] font-bold text-[#13241a]">{f.t}</h3>
              <p className="m-0 text-[15px] leading-[1.5] text-[#4b5d51]">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Libreta: cómo funciona ───────────────────────── */

const STEPS = [
  ["Nos mandás un audio, una foto o un mensaje", "Un nacimiento, una venta, la lluvia del día o una factura."],
  ["Los técnicos de A&B lo cargan", "No hace falta saber de computación ni llenar planillas."],
  ["Lo ves en tu libreta", "Desde el celular o la computadora, cuando quieras."],
];

const AUDIO_BARS = [8, 14, 10, 17, 7, 12, 15, 9, 13, 6];

function Bubble({ me, children, className = "" }: { me?: boolean; children: ReactNode; className?: string }) {
  return (
    <div
      className={`max-w-[80%] px-3.5 py-2.5 ${
        me
          ? "self-end rounded-[14px_14px_4px_14px] bg-[#dcefd9]"
          : "self-start rounded-[14px_14px_14px_4px] border border-[#dfe8dc] bg-white"
      } text-[#13241a] ${className}`}
    >
      {children}
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="w-full max-w-[400px] overflow-hidden rounded-[22px] bg-white shadow-[0_20px_50px_rgba(15,74,42,0.16)]">
      <div className="flex items-center gap-3 bg-[#0f4a2a] px-[18px] py-3.5 text-white">
        <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#f0bd3a] text-[13px] font-extrabold text-[#0a3520]">
          A&amp;B
        </span>
        <div className="flex flex-col">
          <strong className="text-[15px]">A&amp;B Consultores</strong>
          <span className="text-xs text-[#a9c3b1]">Libreta de Las Margaritas</span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 bg-[#f3f6ef] p-[18px] text-sm leading-[1.4]">
        <div className="flex items-center gap-2.5 self-end rounded-[14px_14px_4px_14px] bg-[#dcefd9] px-3.5 py-2.5 text-[#0f4a2a]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="flex h-[18px] items-center gap-0.5">
            {AUDIO_BARS.map((h, i) => (
              <span key={i} className="w-[3px] rounded-sm bg-[#2f7a4a]" style={{ height: h }} />
            ))}
          </span>
          <span className="text-xs">0:12</span>
        </div>
        <Bubble me>Nacieron 12 terneros en el potrero 3.</Bubble>
        <Bubble>Listo, ya quedó anotado en tu libreta.</Bubble>
        <div className="w-[180px] self-end rounded-[14px_14px_4px_14px] bg-[#dcefd9] p-1.5">
          <div className="flex h-24 items-center justify-center rounded-[10px] border border-dashed border-[#9fb8a6] bg-white text-xs text-[#4b5d51]">
            Foto de una factura
          </div>
        </div>
        <Bubble>Recibida. El contador la pasa a tus costos.</Bubble>
        <Bubble me>Hoy llovieron 32 mm.</Bubble>
        <Bubble>Anotado en tus lluvias de octubre.</Bubble>
      </div>
    </div>
  );
}

function Libreta() {
  return (
    <>
      <section id="libreta" className="scroll-mt-4 bg-[#eef4e8]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-14 px-6 pt-[88px] pb-20">
          <div className="flex max-w-[760px] flex-col gap-3.5">
            <span className={EYEBROW}>LIBRETA A&amp;B · TU ASISTENTE VIRTUAL DE CAMPO</span>
            <h2 className={`${H2_BASE} text-[clamp(34px,4vw,46px)] leading-[1.08]`}>
              La libreta de campo de siempre, ahora virtual.
            </h2>
            <p className="m-0 text-[19px] leading-[1.55] text-[#3f5146]">
              Libreta A&amp;B anota lo que pasa en tu campo y te lo devuelve en números claros, para que decidas con
              datos. Stock, pasto, lluvias y plata, en un solo lugar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-12">
            <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-[26px]">
              <h3 className="m-0 text-[26px] font-extrabold leading-[1.2] text-[#13241a]">
                Le escribís por WhatsApp. Nosotros lo anotamos.
              </h3>
              {STEPS.map(([t, d], i) => (
                <div key={t} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#f0bd3a] text-[17px] font-extrabold text-[#0a3520]">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <strong className="text-lg text-[#13241a]">{t}</strong>
                    <span className="text-base leading-[1.5] text-[#3f5146]">{d}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex min-w-0 flex-[1_1_400px] justify-center">
              <ChatMockup />
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-5">
            <div className="flex flex-col gap-4 rounded-[20px] bg-white p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fdf3dc] text-[#7a5a0c]">
                <Icon>
                  <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
                  <path d="M10 21h4" />
                </Icon>
              </span>
              <h3 className="m-0 text-[23px] font-extrabold leading-[1.2] text-[#13241a]">
                Y te avisa lo que hay que atender.
              </h3>
              <p className="m-0 text-base leading-[1.55] text-[#3f5146]">
                Al entrar ves tu campo de un vistazo y, arriba de todo, lo que no puede esperar.
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  ["Los meses en que va a faltar pasto", "bg-[#fbeceb] text-[#8c1d16]", "#c0392b"],
                  ["Las tareas que vencen", "bg-[#fdf3dc] text-[#5c4306]", "#d99a12"],
                  ["Los potreros con mucha carga", "bg-[#eef4e8] text-[#0f4a2a]", "#2f7a4a"],
                ].map(([t, c, dot]) => (
                  <div key={t} className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-[15px] font-semibold ${c}`}>
                    <span className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: dot }} />
                    {t}
                  </div>
                ))}
              </div>
              <p className="m-0 text-[15px] leading-[1.5] text-[#3f5146]">
                Así decidís a tiempo: vender, mover lotes o reservar pasto.
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-[20px] bg-white p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef4e8] text-[#0f4a2a]">
                <Icon>
                  <path d="M3 20l5-9 4 6 3-4 6 7z" />
                  <circle cx="17" cy="6" r="2.5" />
                </Icon>
              </span>
              <h3 className="m-0 text-[23px] font-extrabold leading-[1.2] text-[#13241a]">
                ¿Más de un campo? Cada uno con su libreta.
              </h3>
              <p className="m-0 text-base leading-[1.55] text-[#3f5146]">
                Al crear la cuenta elegís cuántos campos tenés y les ponés nombre y hectáreas. Cada campo tiene sus
                propios datos, paneles e informes, y nunca se mezclan.
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-3 rounded-xl border-2 border-[#0f4a2a] bg-[#eef4e8] px-4 py-3.5">
                  <span className="flex flex-col">
                    <strong className="text-base text-[#0f4a2a]">Las Margaritas</strong>
                    <span className="text-[13px] text-[#3f5146]">Salto · 740 ha</span>
                  </span>
                  <span className="rounded-full bg-[#0f4a2a] px-2.5 py-1 text-xs font-bold text-white">Viendo ahora</span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#d6e2d4] bg-white px-4 py-3.5">
                  <span className="flex flex-col">
                    <strong className="text-base text-[#13241a]">El Ombú</strong>
                    <span className="text-[13px] text-[#3f5146]">Tacuarembó · 320 ha</span>
                  </span>
                  <span className="text-[13px] font-semibold text-[#0f4a2a]">Cambiar →</span>
                </div>
              </div>
              <p className="m-0 text-[13px] text-[#4b5d51]">Campos de ejemplo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f4a2a] text-white">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-9 px-6 py-[72px]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <h2 className="m-0 max-w-[620px] text-[clamp(30px,3.4vw,40px)] font-extrabold leading-[1.1] tracking-[-0.02em]">
              No es solo una aplicación. <span className="text-[#f0bd3a]">Es un equipo.</span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              <a href={PORTAL_URL} className={`${BTN_GOLD} min-h-12 px-[22px] text-[15px]`}>
                Crear cuenta
              </a>
              <a href={PORTAL_URL} className={`${BTN_OUTLINE_LIGHT} min-h-12 px-5 text-[15px]`}>
                Iniciar sesión
              </a>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4">
            {[
              ["TÉCNICOS DE A&B", "Cargan tus datos y arman tus informes cada 1, 3, 6 o 12 meses, como prefieras."],
              ["UN CONTADOR", "Lleva tus costos y facturas al día, para que el resultado del año sea real."],
              ["VOS", "Mirás tus números cuando quieras y decidís con datos."],
            ].map(([k, d]) => (
              <div key={k} className="flex flex-col gap-2.5 rounded-[18px] border border-white/15 bg-white/[0.07] p-[26px]">
                <span className="text-[13px] font-bold tracking-[0.08em] text-[#f0bd3a]">{k}</span>
                <p className="m-0 text-[17px] leading-[1.5] text-[#e4eee6]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────────────────────── Libreta por dentro (pestañas) ───────────────────────── */

const MONTHS_FULL = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"];

function SpeciesPills() {
  return (
    <div className="flex gap-1.5 text-[13px] font-semibold">
      <span className="rounded-full bg-[#0f4a2a] px-3 py-[5px] text-white">Bovinos</span>
      <span className="rounded-full bg-[#eef4e8] px-3 py-[5px] text-[#0f4a2a]">Ovinos</span>
      <span className="rounded-full bg-[#eef4e8] px-3 py-[5px] text-[#0f4a2a]">Equinos</span>
    </div>
  );
}

function Kpi({ label, value, tone = "ok", small }: { label: string; value: string; tone?: "ok" | "bad"; small?: boolean }) {
  const bad = tone === "bad";
  return (
    <div className={`flex flex-col gap-0.5 rounded-xl px-3.5 py-3 ${bad ? "bg-[#fbeceb]" : "bg-[#eef4e8]"}`}>
      <span className={`text-xs font-semibold ${bad ? "text-[#8c1d16]" : "text-[#3f5146]"}`}>{label}</span>
      <strong className={`${small ? "text-base leading-[1.35]" : "text-[22px]"} ${bad ? "text-[#8c1d16]" : "text-[#0f4a2a]"}`}>
        {value}
      </strong>
    </div>
  );
}

const STOCK_ROWS: [string, (string | [string, "down" | "up"])[]][] = [
  ["Vacas de cría", ["320", "320", "320", ["318", "down"], "318"]],
  ["Vaquillonas 1 a 2 años", ["85", "85", "85", "85", "85"]],
  ["Terneros y terneras", ["270", "270", "270", "270", "270"]],
  ["Novillos 1 a 2 años", ["110", "110", ["95", "up"], "95", ["80", "up"]]],
  ["Toros", ["12", "12", "12", "12", "12"]],
];

function StockPanel() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <strong className="text-[17px] text-[#13241a]">Stock bovino, al inicio de cada mes</strong>
        <SpeciesPills />
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#dfe8dc]">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#eef4e8] text-right text-[#0f4a2a]">
              <th className="px-3.5 py-2.5 text-left font-bold">Categoría</th>
              {["Abr", "May", "Jun", "Jul", "Ago"].map((m) => (
                <th key={m} className="px-3.5 py-2.5 font-bold">
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-right text-[#13241a]">
            {STOCK_ROWS.map(([cat, vals]) => (
              <tr key={cat} className="border-t border-[#e6ede3]">
                <td className="px-3.5 py-[9px] text-left">{cat}</td>
                {vals.map((v, i) =>
                  Array.isArray(v) ? (
                    <td
                      key={i}
                      className={`px-3.5 py-[9px] font-semibold ${v[1] === "down" ? "text-[#b3261e]" : "text-[#0f4a2a]"}`}
                    >
                      {v[0]}
                    </td>
                  ) : (
                    <td key={i} className="px-3.5 py-[9px]">
                      {v}
                    </td>
                  ),
                )}
              </tr>
            ))}
            <tr className="border-t-2 border-[#c9d6c6] bg-[#f6f8f4] font-bold">
              <td className="px-3.5 py-2.5 text-left">Total</td>
              {["797", "797", "782", "780", "765"].map((v, i) => (
                <td key={i} className="px-3.5 py-2.5">
                  {v}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-2 text-[13px]">
        <span className="rounded-lg bg-[#eef4e8] px-3 py-1.5 text-[#0f4a2a]">Mayo: venta de 15 novillos</span>
        <span className="rounded-lg bg-[#fbeceb] px-3 py-1.5 text-[#8c1d16]">Junio: 2 vacas muertas</span>
        <span className="rounded-lg bg-[#eef4e8] px-3 py-1.5 text-[#0f4a2a]">Julio: venta de 15 novillos</span>
      </div>
    </div>
  );
}

const PASTO_BARS = [165, 150, 140, 118, 102, 88, 92, 108, 135, 160, 170, 168];

function PastoPanel() {
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
        <Kpi label="Balance del año" value="+405 t MS" />
        <Kpi label="Meses con déficit" value="2 · jun y jul" tone="bad" />
        <Kpi label="Cobertura más baja" value="88 % · junio" />
      </div>
      <strong className="text-[15px] text-[#13241a]">Cobertura de pasto por mes (oferta ÷ demanda)</strong>
      <div className="relative flex h-[180px] items-end gap-2 border-b border-[#c9d6c6]">
        <div className="absolute right-0 bottom-[100px] left-0 border-t-[1.5px] border-dashed border-[#7a5a0c]" />
        <span className="absolute right-0 bottom-[104px] text-[11px] font-bold text-[#7a5a0c]">100 %</span>
        {PASTO_BARS.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t"
            style={{ height: h, background: i === 5 || i === 6 ? "#c0392b" : "#2f7a4a" }}
          />
        ))}
      </div>
      <div className="-mt-2.5 flex gap-2">
        {MONTHS_FULL.map((m) => (
          <span key={m} className="flex-1 text-center text-[11px] text-[#3f5146]">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

const LLUVIA_BARS: [number, number][] = [
  [116, 126],
  [137, 131],
  [131, 137],
  [147, 131],
  [100, 105],
  [84, 89],
  [74, 89],
  [103, 89],
  [147, 119],
];

function LluviasPanel() {
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
        <Kpi label="Llovido en 2026" value="988 mm" />
        <Kpi label="Frente a lo normal" value="+2 %" />
        <Kpi label="Comparado con" value="Normal INUMET, Salto" small />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <strong className="text-[15px] text-[#13241a]">Lluvia por mes, enero a setiembre (mm)</strong>
        <div className="flex gap-3.5 text-xs text-[#3f5146]">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-[3px] bg-[#0f4a2a]" />
            2026
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-[3px] bg-[#bcd0b8]" />
            Normal de la zona
          </span>
        </div>
      </div>
      <div className="flex h-40 items-end gap-3.5 border-b border-[#c9d6c6]">
        {LLUVIA_BARS.map(([a, b], i) => (
          <div key={i} className="flex h-full flex-1 items-end gap-[3px]">
            <div className="flex-1 rounded-t-[3px] bg-[#0f4a2a]" style={{ height: a }} />
            <div className="flex-1 rounded-t-[3px] bg-[#bcd0b8]" style={{ height: b }} />
          </div>
        ))}
      </div>
      <div className="-mt-2.5 flex gap-3.5">
        {MONTHS_FULL.slice(0, 9).map((m) => (
          <span key={m} className="flex-1 text-center text-[11px] text-[#3f5146]">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

function IndicadoresPanel() {
  const items: [string, string, string, boolean][] = [
    ["Preñez", "95 %", "Muy bueno", true],
    ["Destete", "92 %", "Muy bueno", true],
    ["Mortandad", "1,6 %", "Bueno", true],
    ["Carne por hectárea forrajera", "35,9 kg", "Para mejorar", false],
  ];
  return (
    <div className="flex flex-col gap-4">
      <SpeciesPills />
      <div className="grid grid-cols-2 gap-3">
        {items.map(([k, v, tag, good]) => (
          <div key={k} className="flex flex-col gap-1.5 rounded-[14px] border border-[#dfe8dc] p-[18px]">
            <span className="text-[13px] font-semibold text-[#3f5146]">{k}</span>
            <strong className="text-[32px] tracking-[-0.02em] text-[#0f4a2a]">{v}</strong>
            <span
              className={`self-start rounded-full px-2.5 py-[3px] text-xs font-bold ${
                good ? "bg-[#dcefd9] text-[#0f4a2a]" : "bg-[#fdf3dc] text-[#5c4306]"
              }`}
            >
              {tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const CAJA: [string, number][] = [
  ["Ene", 12.4],
  ["Feb", 8.1],
  ["Mar", -3.2],
  ["Abr", 5.6],
  ["May", 14.2],
  ["Jun", -6.1],
  ["Jul", -2.4],
  ["Ago", 9.8],
  ["Set", 4.3],
];

function EconomicoPanel() {
  const scale = 72 / 14.2;
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
        <Kpi label="Ingreso bruto" value="USD 115.177" />
        <Kpi label="Costo de producción" value="USD 103.204" />
        <Kpi label="Costos a la fecha" value="USD 87.846" />
      </div>
      <strong className="text-[15px] text-[#13241a]">Saldo de caja por mes (miles de USD)</strong>
      <div className="relative flex h-40 items-start gap-3">
        <div className="absolute top-20 right-0 left-0 border-t border-[#9fb3a3]" />
        {CAJA.map(([m, v]) => {
          const h = Math.round(Math.abs(v) * scale);
          return (
            <div
              key={m}
              className="flex-1 rounded-[3px]"
              style={{ marginTop: v >= 0 ? 80 - h : 80, height: h, background: v >= 0 ? "#2f7a4a" : "#c0392b" }}
            />
          );
        })}
      </div>
      <div className="-mt-2 flex gap-3">
        {CAJA.map(([m, v]) => (
          <span key={m} className="flex flex-1 flex-col items-center text-[11px] text-[#3f5146]">
            <span>{m}</span>
            <strong className={v < 0 ? "text-[#b3261e]" : "text-[#0f4a2a]"}>{v.toFixed(1).replace(".", ",")}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

const TABS: { name: string; panel: ReactNode; eyebrow: string; title: string; body: ReactNode }[] = [
  {
    name: "Stock",
    panel: <StockPanel />,
    eyebrow: "STOCK",
    title: "Tu stock, mes a mes.",
    body: (
      <>
        <p>
          Cada categoría, al inicio de cada mes. Los nacimientos, compras, ventas y muertes que se registran explican
          cada cambio.
        </p>
        <p>También ovinos y equinos, cada uno con su tabla.</p>
      </>
    ),
  },
  {
    name: "Pasto",
    panel: <PastoPanel />,
    eyebrow: "BALANCE FORRAJERO",
    title: "¿Alcanza el pasto? Lo sabés antes.",
    body: (
      <>
        <p>
          Libreta compara, mes a mes, el pasto que da tu campo con lo que comen tus animales, y te avisa de los meses
          con déficit.
        </p>
        <p className="text-[15px]">
          <strong className="text-[#13241a]">Oferta:</strong> el pasto que produce tu campo.{" "}
          <strong className="text-[#13241a]">Demanda:</strong> lo que comen tus animales. Por debajo de 100 %, ese mes
          falta pasto.
        </p>
      </>
    ),
  },
  {
    name: "Lluvias",
    panel: <LluviasPanel />,
    eyebrow: "LLUVIAS",
    title: "Tus lluvias, comparadas con la zona.",
    body: <p>Registrás la lluvia de cada mes y Libreta la compara con la normal histórica de INUMET para tu zona.</p>,
  },
  {
    name: "Indicadores",
    panel: <IndicadoresPanel />,
    eyebrow: "INDICADORES",
    title: "Tus indicadores, y cómo vienen.",
    body: (
      <>
        <p>
          Preñez, parición, destete, mortandad y kilos de carne por hectárea. Cada uno con una etiqueta que te dice cómo
          está.
        </p>
        <p>Para bovinos, ovinos y equinos.</p>
      </>
    ),
  },
  {
    name: "Económico",
    panel: <EconomicoPanel />,
    eyebrow: "ECONÓMICO",
    title: "Y la plata: costos, caja y resultado.",
    body: (
      <>
        <p>Un contador lleva tus costos y facturas al día. Vos ves el resultado del año y cómo queda la caja cada mes.</p>
        <p>Y tu técnico arma tus informes cada 1, 3, 6 o 12 meses, como prefieras.</p>
      </>
    ),
  },
];

function PorDentro() {
  const [tab, setTab] = useState(0);
  const t = TABS[tab];
  return (
    <section id="por-dentro" className="bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-[88px]">
        <div className="flex max-w-[760px] flex-col gap-3.5">
          <span className={EYEBROW}>LIBRETA A&amp;B POR DENTRO</span>
          <h2 className={H2}>Así se ven los números de tu campo.</h2>
          <p className="m-0 text-lg leading-[1.55] text-[#3f5146]">
            Recorré las pantallas con un campo de ejemplo. En la computadora, la tablet o el celular.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5" role="tablist">
          {TABS.map((x, i) => (
            <button
              key={x.name}
              type="button"
              role="tab"
              aria-selected={i === tab}
              onClick={() => setTab(i)}
              className={`min-h-11 cursor-pointer rounded-full border-[1.5px] px-5 text-[15px] font-semibold ${
                i === tab ? "border-[#0f4a2a] bg-[#0f4a2a] text-white" : "border-[#c9d6c6] bg-white text-[#0f4a2a]"
              }`}
            >
              {x.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-start gap-10">
          <div className="min-w-0 flex-[1_1_660px] overflow-hidden rounded-[18px] border border-[#d6e2d4] bg-white shadow-[0_18px_44px_rgba(15,74,42,0.12)]">
            <div className="flex items-center gap-2 border-b border-[#dfe8dc] bg-[#f3f6ef] px-4 py-[11px]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d6e2d4]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#d6e2d4]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#d6e2d4]" />
              <span className="ml-2.5 text-[13px] font-semibold text-[#3f5146]">
                Libreta A&amp;B · Las Margaritas · {t.name}
              </span>
            </div>
            <div className="min-h-[380px] p-6">{t.panel}</div>
          </div>

          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3.5 pt-2">
            <span className="text-[13px] font-bold tracking-[0.08em] text-[#7a5a0c]">{t.eyebrow}</span>
            <h3 className="m-0 text-[28px] font-extrabold leading-[1.15] text-[#13241a]">{t.title}</h3>
            <div className="flex flex-col gap-3.5 text-base leading-[1.6] text-[#3f5146] [&_p]:m-0">{t.body}</div>
            <p className="mt-2 mb-0 text-[13px] text-[#4b5d51]">Pantallas con un campo de ejemplo y datos ficticios.</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-5 rounded-[22px] bg-[#eef4e8] p-8">
          <div className="flex min-w-0 flex-[1_1_340px] flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <strong className="text-xl text-[#13241a]">¿Ya tenés tu libreta?</strong>
              <span className="text-[15px] text-[#3f5146]">Entrá con tu email y contraseña.</span>
            </div>
            <a href={PORTAL_URL} className={`${BTN_GREEN} min-h-12 px-[22px] text-[15px]`}>
              Iniciar sesión
            </a>
          </div>
          <div className="w-px self-stretch bg-[#c9d6c6]" />
          <div className="flex min-w-0 flex-[1_1_340px] flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <strong className="text-xl text-[#13241a]">¿Todavía no?</strong>
              <span className="text-[15px] text-[#3f5146]">
                Creá tu cuenta o{" "}
                <a href="#contacto" className="font-semibold text-[#0f4a2a] underline">
                  escribinos
                </a>{" "}
                y te ayudamos.
              </span>
            </div>
            <a href={PORTAL_URL} className={`${BTN_GOLD} min-h-12 px-[22px] text-[15px]`}>
              Crear cuenta
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Quiénes somos + Por qué A&B ───────────────────────── */

const PinIcon = () => (
  <Icon size={20}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Icon>
);

function QuienesSomos() {
  return (
    <>
      <section id="quienes-somos" className="bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-14 px-6 pt-[88px] pb-20">
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-[18px]">
            <span className={EYEBROW}>QUIÉNES SOMOS</span>
            <h2 className={H2}>Dos licenciados en gestión agropecuaria, al lado del productor.</h2>
            <p className="m-0 text-lg leading-[1.6] text-[#3f5146]">
              En A&amp;B Consultores somos el <strong className="text-[#13241a]">Lic. Gastón Almada</strong> y el{" "}
              <strong className="text-[#13241a]">Lic. Jorge Bado</strong>.
            </p>
            <p className="m-0 text-[17px] leading-[1.65] text-[#3f5146]">
              Acompañamos a productores y empresas rurales con una mirada técnica, clara y enfocada en la toma de
              decisiones. Nuestro trabajo combina análisis productivo, orden de información, interpretación de
              indicadores y seguimiento del sistema para transformar datos del predio en acciones concretas.
            </p>
            <span className="inline-flex items-center gap-2.5 self-start rounded-xl bg-[#eef4e8] px-4 py-2.5 text-[15px] font-semibold text-[#0f4a2a]">
              <PinIcon />
              Asesoramos a productores en todo el Uruguay
            </span>
          </div>
          <div className="grid min-w-0 flex-[1_1_480px] grid-cols-2 gap-5">
            {[
              ["/img/gaston.jpg", "Lic. Gastón Almada", ""],
              ["/img/jorge.jpg", "Lic. Jorge Bado", "pt-10"],
            ].map(([src, name, pad]) => (
              <div key={name} className={`flex flex-col gap-3.5 ${pad}`}>
                <img
                  src={src}
                  alt={name}
                  className="block aspect-[4/5] w-full rounded-[20px] bg-[#eef4e8] object-cover"
                />
                <div className="flex flex-col gap-0.5">
                  <strong className="text-[19px] text-[#13241a]">{name}</strong>
                  <span className="text-sm text-[#3f5146]">Licenciado en Gestión Agropecuaria</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef4e8]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-9 px-6 pt-20 pb-[88px]">
          <div className="flex max-w-[720px] flex-col gap-3">
            <span className={EYEBROW}>POR QUÉ A&amp;B</span>
            <h2 className={`${H2_BASE} text-[clamp(30px,3.4vw,38px)] leading-[1.12]`}>Por qué trabajar con nosotros</h2>
            <p className="m-0 text-lg leading-[1.55] text-[#3f5146]">
              Acompañamos al productor con una mirada técnica, práctica y enfocada en mejorar la gestión del
              establecimiento.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
            <div className="flex flex-col gap-3.5 rounded-[20px] bg-white p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0f4a2a] text-[#f0bd3a]">
                <Icon>
                  <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
                </Icon>
              </span>
              <h3 className="m-0 text-[21px] font-extrabold text-[#13241a]">Decisiones basadas en datos</h3>
              <p className="m-0 text-base leading-[1.55] text-[#3f5146]">
                Analizamos la información del predio para convertirla en decisiones más claras y fundamentadas.
              </p>
              <div className="flex flex-wrap gap-1.5 text-[13px] font-semibold text-[#0f4a2a]">
                {[
                  "Stock y estructura del rodeo",
                  "Oferta y demanda forrajera",
                  "Indicadores productivos",
                  "Indicadores económicos",
                  "Resultados del sistema",
                ].map((s) => (
                  <span key={s} className="rounded-lg bg-[#eef4e8] px-2.5 py-[5px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3.5 rounded-[20px] bg-white p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0f4a2a] text-[#f0bd3a]">
                <Icon>
                  <rect x="5" y="3" width="14" height="18" rx="2" />
                  <path d="M9 8h6M9 12h6M9 16h3" />
                </Icon>
              </span>
              <h3 className="m-0 text-[21px] font-extrabold text-[#13241a]">Información más ordenada</h3>
              <p className="m-0 text-base leading-[1.55] text-[#3f5146]">
                Somos tu libreta virtual personalizada: con un simple mensaje registramos los movimientos del
                establecimiento, ya sean compras, ventas o nacimientos. Ordenamos los datos productivos y económicos para
                facilitar el seguimiento del sistema.
              </p>
              <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#dcefd9] px-3 py-1.5 text-[13px] font-bold text-[#0f4a2a]">
                <span className="h-2 w-2 rounded-full bg-[#2f7a4a]" />
                Retroalimentación en tiempo real
              </span>
            </div>

            <div className="flex flex-col gap-3.5 rounded-[20px] bg-white p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0f4a2a] text-[#f0bd3a]">
                <Icon>
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 10h18M8 3v4M16 3v4" />
                  <path d="M9 15l2 2 4-4" />
                </Icon>
              </span>
              <h3 className="m-0 text-[21px] font-extrabold text-[#13241a]">Seguimiento técnico</h3>
              <p className="m-0 text-base leading-[1.55] text-[#3f5146]">
                Acompañamos al productor diariamente con análisis y observaciones que ayudan a mejorar el manejo.
              </p>
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-[#3f5146]">
                {[
                  ["L", "#2f7a4a"],
                  ["M", "#2f7a4a"],
                  ["X", "#2f7a4a"],
                  ["J", "#2f7a4a"],
                  ["V", "#f0bd3a"],
                  ["S", "#d6e2d4"],
                  ["D", "#d6e2d4"],
                ].map(([d, c]) => (
                  <span key={d} className="flex flex-col items-center gap-1.5">
                    {d}
                    <span className="h-[22px] w-[22px] rounded-full" style={{ background: c }} />
                  </span>
                ))}
              </div>
              <span className="text-sm font-semibold text-[#0f4a2a]">Avances semanales</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Filosofia() {
  return (
    <section id="filosofia" className="bg-[#0f4a2a] text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-14 px-6 pt-24 pb-[88px]">
        <div className="flex max-w-[900px] flex-col gap-[22px]">
          <span className="text-[13px] font-bold tracking-[0.1em] text-[#f0bd3a]">NUESTRA FILOSOFÍA</span>
          <h2 className="m-0 text-[clamp(34px,4.6vw,56px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
            Transformar los datos del predio en decisiones <span className="text-[#f0bd3a]">claras y rentables.</span>
          </h2>
          <p className="m-0 max-w-[720px] text-[19px] leading-[1.6] text-[#d4e4d8]">
            Creemos en una gestión agropecuaria basada en datos: el productor conoce su campo mejor que nadie, y nuestro
            trabajo es ordenar esa información para que cada decisión tenga un número que la respalde.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] border-t border-white/20">
          {[
            ["01", "Técnica", "Interpretamos indicadores productivos y económicos para entender cómo funciona el sistema."],
            ["02", "Práctica", "Convertimos el análisis en acciones concretas para el manejo: carga, pasto, ventas y costos."],
            ["03", "Cercana", "Acompañamos al productor con seguimiento diario y devoluciones claras, sin vueltas."],
          ].map(([n, t, d]) => (
            <div key={n} className="flex flex-col gap-2.5 pt-7 pr-7">
              <span className="text-sm font-extrabold text-[#f0bd3a]">{n}</span>
              <h3 className="m-0 text-2xl font-extrabold">{t}</h3>
              <p className="m-0 text-base leading-[1.6] text-[#d4e4d8]">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Noticias (las reales, de la base) ───────────────────────── */

function excerptOf(html: string) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > 100 ? `${text.slice(0, 100).trimEnd()}…` : text;
}

function Noticias({ articles }: { articles: LatestNewsArticle[] }) {
  return (
    <section id="noticias" className="bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-9 px-6 py-[88px]">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div className="flex max-w-[680px] flex-col gap-3">
            <span className={EYEBROW}>NOVEDADES</span>
            <h2 className={H2}>Últimas noticias</h2>
            <p className="m-0 text-lg leading-[1.55] text-[#3f5146]">
              Artículos y novedades del equipo A&amp;B sobre mercados, economía y gestión del campo.
            </p>
          </div>
          <Link
            href="/noticias"
            className="inline-flex min-h-12 items-center rounded-xl border-[1.5px] border-[#0f4a2a] px-5 text-[15px] font-bold text-[#0f4a2a] no-underline hover:bg-[#eef4e8]"
          >
            Ver todas las noticias
          </Link>
        </div>
        {articles.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
            {articles.map((a) => (
              <Link
                key={a.id}
                href={`/noticias/${a.slug}`}
                className="group flex flex-col gap-4 text-[#13241a] no-underline"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-[18px] bg-[#0f4a2a]">
                  {a.coverImageUrl && (
                    <img
                      src={a.coverImageUrl}
                      alt={a.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                {a.publishedAtLabel && (
                  <span className="text-sm font-semibold text-[#4b5d51]">{a.publishedAtLabel}</span>
                )}
                <h3 className="m-0 text-[21px] font-extrabold leading-[1.3] text-[#13241a]">{a.title}</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-[#3f5146]">{excerptOf(a.content)}</p>
                <span className="text-[15px] font-bold text-[#0f4a2a]">Leer más →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── Contacto + Footer ───────────────────────── */

const INPUT =
  "min-h-12 rounded-[10px] border-[1.5px] border-[#c9d6c6] bg-white px-3.5 text-[15px] text-[#13241a] outline-none focus:border-[#0f4a2a]";

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Hubo un error al enviar el mensaje.");
      setStatus("ok");
      setMsg(json.message || "¡Mensaje enviado! Te contactaremos pronto.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Hubo un error al enviar el mensaje.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex min-w-0 flex-[1_1_480px] flex-col gap-[18px] rounded-3xl bg-white p-8 shadow-[0_20px_50px_rgba(15,74,42,0.10)] max-[600px]:p-6"
    >
      <h3 className="m-0 text-[22px] font-extrabold text-[#13241a]">Solicitar contacto</h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#13241a]">
          Nombre
          <input name="nombre" type="text" required placeholder="Tu nombre" className={INPUT} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#13241a]">
          Teléfono
          <input name="telefono" type="tel" placeholder="099 000 000" className={INPUT} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#13241a]">
        Email
        <input name="email" type="email" required placeholder="nombre@correo.com" className={INPUT} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#13241a]">
        Servicio de interés
        <select name="servicio" defaultValue="" className={INPUT}>
          <option value="">Seleccionar servicio</option>
          <option value="funcional">Funcional</option>
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#13241a]">
        Mensaje
        <textarea
          name="mensaje"
          rows={4}
          required
          placeholder="Contanos sobre tu campo: zona, hectáreas y qué querés analizar."
          className={`${INPUT} resize-y py-3 leading-[1.5]`}
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-[52px] cursor-pointer rounded-xl border-none bg-[#0f4a2a] text-base font-bold text-white hover:bg-[#0a3520] disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Enviar consulta"}
      </button>
      {status === "ok" || status === "error" ? (
        <p
          role="status"
          className={`m-0 rounded-[10px] px-3.5 py-2.5 text-center text-sm font-semibold ${
            status === "ok" ? "bg-[#dcefd9] text-[#0f4a2a]" : "bg-[#fbeceb] text-[#8c1d16]"
          }`}
        >
          {msg}
        </p>
      ) : (
        <p className="m-0 text-center text-[13px] text-[#4b5d51]">Asesoramos a productores en todo el Uruguay.</p>
      )}
    </form>
  );
}

function ContactCard({
  href,
  label,
  value,
  icon,
  dark,
}: {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  dark?: boolean;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`flex items-center gap-3.5 rounded-[14px] px-4 py-3.5 no-underline ${
        dark ? "bg-[#0f4a2a] text-white" : "bg-white text-[#13241a]"
      }`}
    >
      <span
        className={`flex h-10 w-10 flex-none items-center justify-center rounded-[10px] ${
          dark ? "bg-white/[0.12] text-[#f0bd3a]" : "bg-[#eef4e8] text-[#0f4a2a]"
        }`}
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className={`text-[13px] ${dark ? "text-[#a9c3b1]" : "text-[#4b5d51]"}`}>{label}</span>
        <strong className={`${dark ? "text-[17px]" : "text-base"} [overflow-wrap:anywhere]`}>{value}</strong>
      </span>
    </a>
  );
}

function Contacto() {
  return (
    <section id="contacto" className="bg-[#eef4e8]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-12 px-6 py-[88px]">
        <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-5">
          <span className={EYEBROW}>CONTACTO</span>
          <h2 className={H2}>Ponete en contacto con nosotros.</h2>
          <p className="m-0 text-lg leading-[1.55] text-[#3f5146]">
            Dejá tus datos y contanos qué necesitás analizar en tu establecimiento. También te ayudamos a crear tu cuenta
            en Libreta A&amp;B y a cargar tus datos.
          </p>
          <div className="mt-1.5 flex flex-col gap-2.5">
            <ContactCard dark href={WA_URL} label="WhatsApp" value="099 126 042" icon={<WaIcon />} />
            <ContactCard
              href={`mailto:${EMAIL}`}
              label="Email"
              value={EMAIL}
              icon={
                <Icon size={20}>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </Icon>
              }
            />
            <ContactCard
              href={IG_URL}
              label="Instagram"
              value="@ayb.gestionagro"
              icon={
                <Icon size={20}>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" />
                </Icon>
              }
            />
            <ContactCard
              href={FB_URL}
              label="Facebook"
              value="AyB - Consultoría Agropecuaria"
              icon={
                <Icon size={20}>
                  <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z" />
                </Icon>
              }
            />
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

export function Footer() {
  const linkCls = "text-[#d4e4d8] no-underline hover:text-white";
  return (
    <footer className="bg-[#0a3520] font-[family-name:var(--font-inter)] text-[#d4e4d8]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 pt-16 pb-7">
        <div className="flex flex-wrap justify-between gap-x-14 gap-y-10">
          <div className="flex max-w-[340px] flex-[1_1_260px] flex-col gap-3.5">
            <Brand />
            <p className="m-0 text-[15px] leading-[1.6]">Consultoría agropecuaria y gestión basada en datos.</p>
          </div>
          <nav className="flex min-w-[150px] flex-col gap-2.5 text-[15px]">
            <strong className="text-[13px] tracking-[0.08em] text-[#f0bd3a]">LA WEB</strong>
            <a href="/#quienes-somos" className={linkCls}>
              Quiénes somos
            </a>
            <a href="/#filosofia" className={linkCls}>
              Filosofía
            </a>
            <Link href="/noticias" className={linkCls}>
              Noticias
            </Link>
          </nav>
          <nav className="flex min-w-[150px] flex-col gap-2.5 text-[15px]">
            <strong className="text-[13px] tracking-[0.08em] text-[#f0bd3a]">LIBRETA A&amp;B</strong>
            <a href={PORTAL_URL} className={linkCls}>
              Iniciar sesión
            </a>
            <a href={PORTAL_URL} className={linkCls}>
              Crear cuenta
            </a>
            <a href="/#libreta" className={linkCls}>
              Cómo funciona
            </a>
          </nav>
          <div className="flex min-w-[200px] flex-col gap-2.5 text-[15px]">
            <strong className="text-[13px] tracking-[0.08em] text-[#f0bd3a]">CONTACTO</strong>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
              WhatsApp 099 126 042
            </a>
            <a href={`mailto:${EMAIL}`} className={`${linkCls} [overflow-wrap:anywhere]`}>
              {EMAIL}
            </a>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
              Instagram @ayb.gestionagro
            </a>
            <span>Uruguay</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/15 pt-[22px] text-[13px] text-[#a9c3b1]">
          <span>© 2026 A&amp;B Consultores. Todos los derechos reservados.</span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#5cc77f]" />
            Libreta A&amp;B: sistema operativo
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── Página ───────────────────────── */

export default function NewHome({ latestNewsArticles }: { latestNewsArticles: LatestNewsArticle[] }) {
  return (
    <div id="inicio" className="overflow-x-clip bg-white font-[family-name:var(--font-inter)] text-[#13241a]">
      <div className="bg-[#0a3520] text-[13px] text-[#d4e4d8] max-[820px]:hidden">
        <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-x-6 gap-y-1 px-6 py-2">
          <span>Asesoramos a productores en todo el Uruguay</span>
          <span>
            WhatsApp 099 126 042 · {EMAIL}
          </span>
        </div>
      </div>
      <Hero />
      <Features />
      <Libreta />
      <PorDentro />
      <QuienesSomos />
      <Filosofia />
      <Noticias articles={latestNewsArticles} />
      <Contacto />
      <Footer />
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp"
        className="fixed right-[18px] bottom-[22px] z-20 hidden h-14 w-14 items-center justify-center rounded-full bg-[#2f9e5a] text-white shadow-[0_10px_24px_rgba(0,0,0,0.3)] max-[820px]:flex"
      >
        <WaIcon size={26} />
      </a>
    </div>
  );
}
