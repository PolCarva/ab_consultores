# ABC – Almada & Bado Consultores Agropecuarios

Landing page cinemática para ABC – Almada & Bado Consultores Agropecuarios, construida con diseño de alta fidelidad y animaciones profesionales. Consultoría agropecuaria y gestión basada en datos.

## 🎨 Sistema de Diseño - Organic Tech (Ajustado para Ganadería)

### Paleta de Colores (Predominancia del Verde)
- **Moss** `#2E4036` - Color primario
- **Moss Light** `#3D5447` - Variación tonal
- **Green Accent** `#4A7C59` - Color de acento (verde vibrante)
- **Cream** `#F2F0E9` - Fondo
- **Charcoal** `#1A1A1A` - Texto/Oscuro

### Tipografía
- **Títulos:** Plus Jakarta Sans + Outfit (tracking ajustado)
- **Drama:** Cormorant Garamond Italic
- **Datos:** IBM Plex Mono

### Identidad Visual
Un puente entre un laboratorio de investigación biológica y una revista de lujo vanguardista, adaptado al sector ganadero y agropecuario.

## 🚀 Stack Tecnológico

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Animaciones:** GSAP 3 (ScrollTrigger)
- **Íconos:** Lucide React

## ✨ Características Implementadas

### Secciones
1. **Navbar (La Isla Flotante)** - Tipo píldora con morphing en scroll
2. **Hero (El Plano Inicial)** - Full-bleed con imagen de campo/ganadería y gradiente
3. **Por qué ABC (Artefactos Funcionales)** - 3 cards interactivas:
   - Decisiones basadas en datos - Análisis de stock, forrajera, indicadores
   - Información más ordenada - Feed en tiempo real con cursor
   - Seguimiento técnico - Grid animado
4. **Quiénes somos** - Presentación de los licenciados y filosofía de trabajo
5. **Cómo trabajamos (Archivo en Capas)** - 6 pasos del proceso con animaciones
6. **Servicios** - 3 niveles: Funcional, Indicadores, Servicio Integral (Premium)
7. **Resultados esperados** - 4 beneficios clave
8. **Formulario de contacto** - Captura de leads con servicio de interés
9. **Footer** - Status indicator y navegación completa

### Contenido del Negocio

**Servicios:**
- **Funcional:** Ordenamiento de información productiva, análisis forrajero, evolución de stock
- **Indicadores:** Cálculo e interpretación de indicadores productivos, económicos y financieros
- **Servicio Integral (Premium):** Diagnóstico integral con visión productiva, económica y estratégica

**Proceso de Trabajo (6 pasos):**
1. Primer contacto (web, WhatsApp, Instagram, correo)
2. Recepción y análisis del formulario técnico inicial
3. Relevamiento de información del establecimiento
4. Análisis técnico interno y cálculo de indicadores
5. Entrega de informe profesional en PDF
6. Devolución técnica y seguimiento posterior

**Ubicación:** Trabajamos con productores ganaderos en todo Uruguay

### Micro-Interacciones
- Botones con efecto "magnético" (scale 1.03)
- Links con hover translateY(-1px)
- Overlay de ruido CSS (0.05 opacidad)
- Bordes con rounded-[2rem] a rounded-[3rem]
- Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)

### Ciclo de Animaciones
- GSAP context() en useEffect
- Easing: power3.out (entradas), power2.inOut (morphs)
- Stagger: 0.08 (texto), 0.15 (cards)

## 🛠️ Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## 📦 Scripts

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run start    # Inicia servidor de producción
npm run lint     # Ejecuta ESLint
```

## 🌐 Imágenes

Todas las imágenes son de Unsplash, alineadas con el mood "Organic Tech" adaptado a ganadería:
- Campos verdes con pastizales
- Establecimientos rurales
- Paisajes agropecuarios

## 📄 Licencia

© 2026 ABC – Almada & Bado Consultores Agropecuarios. Todos los derechos reservados.
