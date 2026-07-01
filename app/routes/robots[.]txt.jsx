export const loader = () => {
  const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://javascript-learning-app.dev/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
