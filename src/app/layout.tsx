import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_URL = "https://mihirmahakalkar.github.io/portfolio";
const DESCRIPTION =
  "Engineer who cares about software that holds up where people actually use it.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mihir Mahakalkar",
  description: DESCRIPTION,
  openGraph: {
    title: "Mihir Mahakalkar",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Mihir Mahakalkar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mihir Mahakalkar",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistMono.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased">
        <noscript>
          <style>{`[data-fade]{opacity:1 !important;transform:none !important;filter:none !important;}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
