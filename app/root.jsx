import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "@remix-run/react";
import "./styles/global.css";
import { pageMeta, PROJECT_URL } from "./utils/meta";
import CrossDomainAuth from "./components/CrossDomainAuth";

export const meta = () => {
  return [
    { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "author", content: "Marcos Calabrés Ibáñez" },
    { name: "robots", content: "index, follow" },
    { name: "theme-color", content: "#0a0a0a" },
    ...pageMeta({
      title: "JavaScript está en tus manos - Curso Interactivo",
      description: "Aprende JavaScript de forma interactiva con ejercicios prácticos, un editor de código en el navegador y un sistema de progreso gamificado.",
      url: PROJECT_URL,
    }),
  ];
};

export const links = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap",
    },
    { rel: "canonical", href: PROJECT_URL },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
    { rel: "apple-touch-icon", sizes: "192x192", href: "/favicon-192.png" },
  ];
};

export default function App() {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body className="bg-dark-900 text-zinc-100 font-sans antialiased min-h-screen safe-top safe-bottom" suppressHydrationWarning>
        <CrossDomainAuth />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="es" className="dark">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-dark-900 text-zinc-100 font-sans antialiased min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-xl text-zinc-400 mb-8">Página no encontrada</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-dark-900 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
