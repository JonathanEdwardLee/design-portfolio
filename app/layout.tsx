import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import SpaceBackground from "./components/SpaceBackground";
import { Gruppo } from "next/font/google";

const gruppo = Gruppo({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Hoop Snake Designs | Graphic, Audio, and Web Design Services in Springfield, MO",
  description:
    "Professional audio, graphic, and web design services in Springfield, Missouri. Specializing in budget-friendly designs for local businesses.",
  keywords:
    "design services, Springfield MO, audio design, graphic design, web design",
  openGraph: {
    title: "Hoop Snake Designs | Springfield MO Design Services",
    description:
      "Professional audio, graphic, and web design services in Springfield, Missouri.",
    url: "https://www.hoopsnakedesigns.com",
    siteName: "Hoop Snake Designs",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={gruppo.className}>
      <body className="min-h-screen text-copper-100">
        <SpaceBackground />
        <main>{children}</main>
        <footer className="p-4 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md text-center text-copper-300">
          © 2024 Hoop Snake Designs
        </footer>
      </body>
    </html>
  );
}
