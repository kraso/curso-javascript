import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "@remix-run/react";
import "./styles/global.css";

const PROJECT_URL = "https://javascript-learning-app.dev";

export const meta = () => {
  return [
    { title: "JavaScript está en tus manos - Curso Interactivo" },
    { name: "description", content: "Aprende JavaScript de forma interactiva con ejercicios prácticos, un editor de código en el navegador y un sistema de progreso gamificado." },
    { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "author", content: "Marcos Calabrés Ibáñez" },
    { name: "robots", content: "index, follow" },
    { name: "theme-color", content: "#0a0a0a" },
    { property: "og:title", content: "JavaScript está en tus manos - Curso Interactivo" },
    { property: "og:description", content: "Aprende JavaScript de forma interactiva con ejercicios prácticos y sistema de progreso." },
    { property: "og:url", content: PROJECT_URL },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${PROJECT_URL}/og-image.svg` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/svg+xml" },
    { property: "og:locale", content: "es_ES" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "JavaScript está en tus manos" },
    { name: "twitter:description", content: "Curso interactivo de JavaScript con ejercicios prácticos." },
    { name: "twitter:image", content: `${PROJECT_URL}/og-image.svg` },
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
