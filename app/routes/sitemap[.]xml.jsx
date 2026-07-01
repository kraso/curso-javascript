import { lecciones } from "../data/lessons";

const SITE_URL = "https://javascript-learning-app.dev";

export const loader = () => {
  const urls = [];

  urls.push({
    loc: SITE_URL,
    changefreq: "daily",
    priority: "1.0",
  });

  urls.push({
    loc: `${SITE_URL}/curso`,
    changefreq: "weekly",
    priority: "0.9",
  });

  for (const leccion of lecciones) {
    urls.push({
      loc: `${SITE_URL}/curso/${leccion.id}`,
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  urls.push({
    loc: `${SITE_URL}/login`,
    changefreq: "yearly",
    priority: "0.3",
  });

  urls.push({
    loc: `${SITE_URL}/registro`,
    changefreq: "yearly",
    priority: "0.3",
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
