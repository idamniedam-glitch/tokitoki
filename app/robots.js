export default function robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: "https://twojadomena.pl/sitemap.xml",
  };
}