# SEO Agent Guidelines - Curso JavaScript

## Contexto del Proyecto

| Tecnología | Versión | Relevancia SEO |
|------------|---------|----------------|
| Remix | ^2.16.5 | SSR/SSG nativo, Meta tags dinámicos |
| React | ^18.3.1 | Hidratación, renderizado del lado del servidor |
| Vite | ^6.3.5 | Bundle splitting, optimización de assets |
| Tailwind CSS | ^4.1.8 | CSS mínimo, rendimiento de carga |

## Implementación en Remix

### Meta Tags en Routes

```typescript
// app/routes/tu-ruta.tsx
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Título descriptivo - Curso JavaScript" },
    { name: "description", content: "Descripción única de 150-160 caracteres" },
    { name: "robots", content: "index, follow" },
    { property: "og:title", content: "Título para redes sociales" },
    { property: "og:description", content: "Descripción para redes sociales" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://tu-dominio.com/ruta" },
    { property: "og:image", content: "https://tu-dominio.com/og-image.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Título para Twitter" },
    { name: "twitter:description", content: "Descripción para Twitter" },
  ];
};
```

### Datos Estructurados (JSON-LD)

```typescript
// app/components/JsonLd.tsx
interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Uso en route
export default function Pagina() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Curso de JavaScript",
    "description": "Aprende JavaScript desde cero",
    "provider": {
      "@type": "Organization",
      "name": "Tu Organización"
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      <h1>Curso de JavaScript</h1>
    </>
  );
}
```

### Sitemap Dinámico

```typescript
// app/routes/sitemap[.]xml.tsx
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const baseUrl = new URL(request.url).origin;
  
  const urls = [
    { loc: "/", changefreq: "weekly", priority: "1.0" },
    { loc: "/cursos", changefreq: "weekly", priority: "0.9" },
    { loc: "/about", changefreq: "monthly", priority: "0.7" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
    <url>
      <loc>${baseUrl}${url.loc}</loc>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
```

### Robots.txt

```typescript
// app/routes/robots[.]txt.tsx
export async function loader() {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://tu-dominio.com/sitemap.xml`;

  return new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
}
```

## Checklist de Implementación

### Estructura HTML
- [ ] Tag `<title>` único y descriptivo (50-60 caracteres)
- [ ] Meta description en cada página (150-160 caracteres)
- [ ] Tags H1-H6 en orden jerárquico correcto
- [ ] Alt text en todas las imágenes
- [ ] Lang attribute en `<html lang="es">`

### URLs y Navegación
- [ ] URLs amigables y descriptivas
- [ ] Canonical tags para contenido duplicado
- [ ] Breadcrumbs con schema markup
- [ ] Enlaces internos estratégicos

### Performance
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Imágenes optimizadas (WebP, lazy loading)
- [ ] CSS/JS minificado y comprimido
- [ ] Cache headers configurados

### Contenido
- [ ] Contenido original y de valor
- [ ] Keywords naturales en headings
- [ ] Actualizaciones regulares
- [ ] URLs canónicas configuradas

## Comandos de Verificación

```bash
# Linting de accesibilidad
npm run lint

# Build para producción
npm run build

# Verificar bundle size
npx vite-bundle-visualizer
```
