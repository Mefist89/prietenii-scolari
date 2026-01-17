import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
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
        className={`${nunito.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
