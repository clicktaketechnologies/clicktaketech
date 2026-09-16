import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SeoStructuredData } from "@/components/site/seo-structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://clicktaketech.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      "ClickTake Technologies — AI-Native Software Engineering & Digital Agency",
    template: "%s | ClickTake Technologies",
  },
  description:
    "ClickTake Technologies ships production-grade software, autonomous AI agents, cloud architecture, digital marketing & creative services. 24 services across 4 practices — serving 13 cities in 4 continents. Trusted by 150+ teams with 99.9% uptime.",
  keywords: [
    "AI agents",
    "custom software development",
    "cloud devops",
    "web development",
    "AI automation",
    "SaaS platform engineering",
    "Next.js development",
    "LangGraph",
    "LLM solutions",
    "digital marketing agency",
    "SEO services",
    "PPC paid ads",
    "WordPress web design",
    "ecommerce web design",
    "AI chatbots",
    "computer vision NLP",
    "graphic design",
    "video production",
    "responsive web design",
    "ClickTake Technologies",
  ],
  authors: [{ name: "ClickTake Technologies" }],
  creator: "ClickTake Technologies",
  publisher: "ClickTake Technologies",
  applicationName: "ClickTake Technologies",
  category: "technology",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo-dark.png", type: "image/png", sizes: "192x192" },
      { url: "/logo-dark.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/logo-dark.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "ClickTake — Engineering Tomorrow's Intelligence, Today.",
    description:
      "AI-native software engineering firm shipping autonomous agents, multi-tenant SaaS platforms, cloud architecture, digital marketing & creative services for enterprises across 4 continents.",
    url: BASE_URL,
    siteName: "ClickTake Technologies",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo-white.png",
        width: 1200,
        height: 630,
        alt: "ClickTake Technologies — AI-Native Software Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake — AI-Native Software Engineering",
    description:
      "24 services across Digital Marketing, Web & Software, AI & Automation, and Creative & Brand — one delivery engine. Serving 13 cities in 4 continents.",
    images: ["/logo-white.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "google-site-verification-token",
  },
};

export const viewport: Viewport = {
  themeColor: "#136DFF",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <SeoStructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
