import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  themeColor: "#1B5E20",
};

export const metadata: Metadata = {
  title: "부루마블 - Blue Marble",
  description: "Next.js 기반 온라인 부루마블 보드게임",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "부루마블",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="antialiased">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
