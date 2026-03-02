import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { defaultSeo } from "./seo-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://bfccapital.com"),
  title: defaultSeo.title,
  description: defaultSeo.description,
  keywords: defaultSeo.keywords,
  openGraph: {
    ...defaultSeo.openGraph,
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://bfccapital.com",
  },
  alternates: {
    canonical: defaultSeo.canonical,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
