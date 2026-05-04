export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "TOKITOKI",
    legalName: "Kruszywa Polska Sp. z o.o.",
    telephone: "+48692988692",
    email: "biuro@kruszywapolska.pl",
    url: "https://tokitoki.pl",
    image: "https://tokitoki.pl/hero-taczki-rzeszow.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Porąbki 13",
      postalCode: "35-317",
      addressLocality: "Rzeszów",
      addressCountry: "PL",
    },
    areaServed: ["Rzeszów", "okolice Rzeszowa"],
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}