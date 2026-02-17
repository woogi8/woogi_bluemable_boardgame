import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "부루마블 - Blue Marble",
  description: "Next.js 기반 온라인 부루마블 보드게임",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
