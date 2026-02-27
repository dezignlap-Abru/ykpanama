import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yeshivas Kayitz Panama 5786 | Summer Program",
  description:
    "Join Yeshivas Kayitz Panama 5786 — three weeks of adventure across Boquete, Bocas del Toro, and Panama City. June 22 – July 14, 2026.",
  icons: {
    icon: "/favicon.jpeg",
  },
  openGraph: {
    title: "Yeshivas Kayitz Panama 5786",
    description:
      "Adventure, Mountains, Ocean & City — Summer 2026 in Panama",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
