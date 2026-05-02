/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/kruszywa",
        destination: "/",
        permanent: true,
      },
      {
        source: "/oferta",
        destination: "/",
        permanent: true,
      },
      {
        source: "/kontakt",
        destination: "/#kontakt",
        permanent: true,
      },
      {
        source: "/kruszywa/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/oferta/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;