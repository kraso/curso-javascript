export default function OgImage() {
  return new Response(null, {
    status: 404,
    headers: { "Content-Type": "image/png" },
  });
}
