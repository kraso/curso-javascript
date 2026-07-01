# Accesibilidad Agent Guidelines - Curso JavaScript

## Contexto del Proyecto

| Componente | Stack | Accesibilidad |
|------------|-------|---------------|
| UI Framework | React 18 | WAI-ARIA, Keyboard navigation |
| Estilos | Tailwind CSS | Focus states, contrast |
| Router | Remix | Route-based a11y |
| Animaciones | Framer Motion | Reduced motion support |

## Standards de Accesibilidad

### Niveles de Cumplimiento
- **Nivel A**: Mínimo requerido
- **Nivel AA**: Estándar recomendado (WCAG 2.1)
- **Nivel AAA**: Óptimo para proyectos gubernamentales/educativos

## Implementación en Componentes

### Componentes Accesibles Base

```typescript
// app/components/ui/Button.tsx
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500": variant === "primary",
            "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500": variant === "secondary",
            "bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500": variant === "ghost",
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-base": size === "md",
            "h-12 px-6 text-lg": size === "lg",
          },
          className
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
```

### Navegación por Teclado

```typescript
// app/components/ui/Navigation.tsx
import { useNavigate } from "@remix-run/react";

export function Navigation() {
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent, path: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(path);
    }
  };

  return (
    <nav aria-label="Navegación principal">
      <ul role="menubar">
        <li role="none">
          <a
            href="/"
            role="menuitem"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, "/")}
            className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            Inicio
          </a>
        </li>
        <li role="none">
          <a
            href="/cursos"
            role="menuitem"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, "/cursos")}
            className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            Cursos
          </a>
        </li>
      </ul>
    </nav>
  );
}
```

### Skip Links

```typescript
// app/components/SkipLink.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:p-4 focus:shadow-lg focus:outline-none"
    >
      Saltar al contenido principal
    </a>
  );
}
```

### Focus Management en Modales

```typescript
// app/components/Modal.tsx
import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      closeRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          {title}
        </h2>
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Cerrar modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
```

### Live Regions para Anuncios

```typescript
// app/components/Announcer.tsx
import { useEffect, useState } from "react";

export function Announcer({ message }: { message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}
```

### Contraste y Colores

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Colores con contraste WCAG AA (4.5:1 mínimo)
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6", // Texto principal
          600: "#2563eb", // Enlaces
          700: "#1d4ed8", // Hover states
        },
        // Texto con contraste adecuado
        text: {
          primary: "#111827", // Gray-900
          secondary: "#4b5563", // Gray-600
          muted: "#6b7280", // Gray-500
        }
      }
    }
  }
}
```

### Formularios Accesibles

```typescript
// app/components/ui/FormField.tsx
interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, error, required, children }: FormFieldProps) {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;

  return (
    <div className="space-y-1">
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// Input con accesibilidad
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, id, ...props }, ref) => {
    const fieldId = useId();
    const inputId = id || fieldId;
    const errorId = `${inputId}-error`;

    return (
      <input
        ref={ref}
        id={inputId}
        className={clsx(
          "block w-full rounded-md border px-3 py-2",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
    );
  }
);
```

## Checklist de Accesibilidad

### Estructura Semántica
- [ ] Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
- [ ] Headings jerárquicos (h1 → h2 → h3)
- [ ] Listas para contenido de lista
- [ ] Tablas con `<th>`, `<caption>`

### Navegación
- [ ] Skip link al contenido principal
- [ ] Tab order lógico
- [ ] Focus visible en todos los elementos interactivos
- [ ] No trap de focus

### Contenido
- [ ] Alt text descriptivo en imágenes
- [ ] Labels explícitos en todos los inputs
- [ ] Error messages asociados con `aria-describedby`
- [ ] Contraste mínimo 4.5:1 para texto, 3:1 para gráficos

### Interacciones
- [ ] Keyboard: todos los elementos accesibles
- [ ] Touch targets mínimo 44x44px
- [ ] Animaciones respetan `prefers-reduced-motion`
- [ ] Live regions para contenido dinámico

### Imágenes y Multimedia
- [ ] Videos con subtítulos
- [ ] Audio con transcripciones
- [ ] Imágenes decorativas: `aria-hidden="true"`
- [ ] Imágenes informativas: alt text descriptivo

## Comandos de Verificación

```bash
# Linting de accesibilidad
npm run lint

# Instalar axe-core para testing
npm install -D @axe-core/react axe-core

# Testing manual de accesibilidad
npx axe http://localhost:5173

# Storybook addon de accesibilidad (opcional)
npm install -D @storybook/addon-a11y
```
