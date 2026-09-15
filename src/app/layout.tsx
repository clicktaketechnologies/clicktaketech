import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClickTake — AI-Native Software Engineering · Multi-Agent Systems",
  description:
    "ClickTake Technologies ships production-grade software, autonomous AI agents, and cloud architecture for global enterprises — trusted by 150+ teams across 4 continents with 99.9% uptime and 10M+ API requests served every day.",
  keywords: [
    "AI agents",
    "custom software",
    "cloud devops",
    "web development",
    "AI automation",
    "SaaS",
    "Next.js",
    "LangGraph",
    "ClickTake",
  ],
  authors: [{ name: "ClickTake Technologies" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ClickTake — Engineering Tomorrow's Intelligence, Today.",
    description:
      "AI-native software engineering firm shipping autonomous agents, multi-tenant SaaS platforms and cloud architecture for enterprises across 4 continents.",
    siteName: "ClickTake Technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake — AI-Native Software Engineering",
    description:
      "Production-grade autonomous agents, multi-tenant SaaS platforms and cloud architecture for enterprises across 4 continents.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
