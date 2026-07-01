# Responsividad Agent Guidelines - Curso JavaScript

## Contexto del Proyecto

| Herramienta | Versión | Estrategia |
|-------------|---------|------------|
| Tailwind CSS | ^4.1.8 | Mobile-first, breakpoints nativos |
| Framer Motion | ^12.7.4 | Animaciones adaptativas |
| React | ^18.3.1 | Componentes adaptables |
| Vite | ^6.3.5 | Code splitting por ruta |

## Estrategia Mobile-First

### Breakpoints de Tailwind CSS

```
sm: 640px    → Mobile landscape
md: 768px    → Tablet portrait
lg: 1024px   → Tablet landscape / Desktop pequeño
xl: 1280px   → Desktop
2xl: 1536px  → Desktop grande
```

### Grid System Responsivo

```typescript
// app/components/ui/Grid.tsx
import { clsx } from "clsx";

interface GridProps {
  children: React.ReactNode;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
}

export function Grid({
  children,
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 6,
  className
}: GridProps) {
  return (
    <div
      className={clsx(
        "grid",
        `grid-cols-${cols.sm}`,
        `md:grid-cols-${cols.md}`,
        `lg:grid-cols-${cols.lg}`,
        `xl:grid-cols-${cols.xl}`,
        `gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
}

// Uso
<Grid cols={{ sm: 1, md: 2, lg: 3 }}>
  <Card />
  <Card />
  <Card />
</Grid>
```

### Container Responsivo

```typescript
// app/components/ui/Container.tsx
import { clsx } from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

export function Container({
  children,
  size = "lg",
  className
}: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto px-4 sm:px-6 lg:px-8",
        {
          "max-w-screen-sm": size === "sm",
          "max-w-screen-md": size === "md",
          "max-w-screen-lg": size === "lg",
          "max-w-screen-xl": size === "xl",
          "max-w-full": size === "full",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
```

## Componentes Adaptativos

### Card Responsivo

```typescript
// app/components/ui/Card.tsx
import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg";
  className?: string;
}

export function Card({
  children,
  padding = "md",
  shadow = "md",
  className
}: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg",
        {
          "p-4 sm:p-6": padding === "sm",
          "p-6 sm:p-8": padding === "md",
          "p-8 sm:p-10": padding === "lg",
        },
        {
          "shadow-sm": shadow === "sm",
          "shadow-md": shadow === "md",
          "shadow-lg": shadow === "lg",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
```

### Navigation Responsiva

```typescript
// app/components/ui/Navigation.tsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-xl font-bold text-blue-600">
              Curso JS
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-900 hover:text-blue-600">
              Inicio
            </a>
            <a href="/cursos" className="text-gray-900 hover:text-blue-600">
              Cursos
            </a>
            <a href="/about" className="text-gray-900 hover:text-blue-600">
              Nosotros
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:bg-gray-100"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Inicio
            </a>
            <a
              href="/cursos"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Cursos
            </a>
            <a
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Nosotros
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
```

### Hero Section Responsivo

```typescript
// app/components/ui/Hero.tsx
import { clsx } from "clsx";

interface HeroProps {
  title: string;
  subtitle: string;
  cta?: {
    label: string;
    href: string;
  };
}

export function Hero({ title, subtitle, cta }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {title}
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-blue-100">
            {subtitle}
          </p>
          {cta && (
            <div className="mt-8 sm:mt-10">
              <a
                href={cta.href}
                className={clsx(
                  "inline-block px-8 py-3 rounded-lg font-semibold",
                  "bg-white text-blue-600 hover:bg-blue-50",
                  "transition-colors duration-200",
                  "text-sm sm:text-base md:text-lg"
                )}
              >
                {cta.label}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

### Footer Responsivo

```typescript
// app/components/ui/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Curso JavaScript</h3>
            <p className="text-gray-400 text-sm">
              Aprende programación web moderna.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/cursos" className="hover:text-white">Cursos</a></li>
              <li><a href="/tutoriales" className="hover:text-white">Tutoriales</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/privacidad" className="hover:text-white">Privacidad</a></li>
              <li><a href="/terminos" className="hover:text-white">Términos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>email@ejemplo.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; 2024 Curso JavaScript. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
```

## Utilidades de Responsive Design

### Hook useMediaQuery

```typescript
// app/hooks/useMediaQuery.ts
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}

// Uso
const isMobile = useMediaQuery("(max-width: 768px)");
const isDesktop = useMediaQuery("(min-width: 1024px)");
```

### Hook useBreakpoint

```typescript
// app/hooks/useBreakpoint.ts
import { useMediaQuery } from "./useMediaQuery";

export function useBreakpoint() {
  const isSm = useMediaQuery("(min-width: 640px)");
  const isMd = useMediaQuery("(min-width: 768px)");
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isXl = useMediaQuery("(min-width: 1280px)");
  const is2xl = useMediaQuery("(min-width: 1536px)");

  return {
    isMobile: !isSm,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    current: is2xl ? "2xl" : isXl ? "xl" : isLg ? "lg" : isMd ? "md" : isSm ? "sm" : "xs",
  };
}
```

### Utilities de Tailwind

```css
/* Custom utilities en app/styles/global.css */
@layer utilities {
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  .safe-top {
    padding-top: env(safe-area-inset-top);
  }
  
  .text-balance {
    text-wrap: balance;
  }
}
```

## Imágenes Responsivas

### Imagen con Art Direction

```typescript
// app/components/ui/ResponsiveImage.tsx
import { clsx } from "clsx";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export function ResponsiveImage({
  src,
  alt,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
}: ResponsiveImageProps) {
  return (
    <div className={clsx("relative overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
```

## Viewport y Meta Tags

```typescript
// app/root.tsx
import type { LinksFunction, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    { name: "theme-color", content: "#ffffff" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
  ];
};
```

## Checklist de Responsividad

### Layout
- [ ] Mobile-first: estilos base para móvil
- [ ] Contenido visible sin scroll horizontal
- [ ] Texto legible sin zoom (16px mínimo)
- [ ] Touch targets mínimo 44x44px

### Breakpoints
- [ ] sm (640px): Landscape móvil
- [ ] md (768px): Tablet portrait
- [ ] lg (1024px): Tablet landscape
- [ ] xl (1280px): Desktop
- [ ] 2xl (1536px): Desktop grande

### Imágenes
- [ ] Formatos modernos (WebP, AVIF)
- [ ] Lazy loading implementado
- [ ] Art direction para diferentes tamaños
- [ ] Dimensiones explícitas para evitar CLS

### Performance
- [ ] CSS crítico inline
- [ ] JavaScript diferido
- [ ] Fuentes optimizadas (font-display: swap)
- [ ] Cache headers apropiados

### Touch/Mobile
- [ ] Gestos intuitivos
- [ ] Sin hover states en elementos críticos
- [ ] Formularios optimizados para teclado
- [ ] Safe areas para notch

## Comandos de Verificación

```bash
# Linting
npm run lint

# Build para producción
npm run build

# Testing responsive (Herramientas del navegador)
# Chrome DevTools > Toggle device toolbar
# Firefox > Responsive Design Mode

# Testing con Lighthouse
npx lighthouse http://localhost:5173 --view
```
