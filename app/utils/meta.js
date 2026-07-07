export const PROJECT_URL = "https://www.javascript-learning-app.dev";
const OG_IMAGE = `${PROJECT_URL}/og-image.png`;
const FB_APP_ID = "1525887815232269";

export function pageMeta({ title, description, url, type = "website" }) {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/png" },
    { property: "og:locale", content: "es_ES" },
    { property: "fb:app_id", content: FB_APP_ID },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}
