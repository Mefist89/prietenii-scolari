import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Prietenii Școlari - Jocuri Educative pentru Copii",
  description: "Platformă educativă interactivă pentru copii cu jocuri distractive în matematică, informatică și limba română. Învață jucându-te cu Prietenii Școlari!",
  keywords: ["educație", "copii", "jocuri", "matematică", "informatică", "limba română", "învățare", "școală"],
  authors: [{ name: "Prietenii Școlari" }],
  openGraph: {
    title: "Prietenii Școlari - Jocuri Educative pentru Copii",
    description: "Platformă educativă interactivă pentru copii cu jocuri distractive în matematică, informatică și limba română.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prietenii Școlari - Jocuri Educative pentru Copii",
    description: "Platformă educativă interactivă pentru copii cu jocuri distractive în matematică, informatică și limba română.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
