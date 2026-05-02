import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kruszywa Rzeszów – piasek, żwir, kliniec z dostawą | TOKITOKI",
  description:
    "Sprzedaż i transport kruszyw w Rzeszowie i okolicach. Piasek, żwir, grys, kliniec, pospółka i kamień ozdobny z dostawą.",
  keywords: [
    "kruszywa Rzeszów",
    "piasek Rzeszów",
    "żwir Rzeszów",
    "kliniec Rzeszów",
    "grys Rzeszów",
    "pospółka Rzeszów",
    "transport kruszyw Rzeszów",
  ],

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "TOKITOKI – kruszywa z dostawą w Rzeszowie",
    description:
      "Piasek, żwir, grys, kliniec, pospółka i kamień ozdobny z dostawą w Rzeszowie i okolicach.",
    url: "https://tokitoki.pl",
    siteName: "TOKITOKI",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}