import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hoop Snake Designs",
  description: "Cyberpunk medieval design services",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gruppo&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-wood-pattern bg-repeat text-copper-100 font-gruppo">
        <header className="flex justify-between p-4 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md">
          <h1 className="text-2xl font-bold neon-text">Hoop Snake Designs</h1>
          <nav className="flex gap-4">
            <a href="#about" className="hover:text-neon-cyan transition-colors">
              About
            </a>
            <a
              href="#projects"
              className="hover:text-neon-cyan transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-neon-cyan transition-colors"
            >
              Contact
            </a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="p-4 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md text-center text-copper-300">
          © 2024 Hoop Snake Designs
        </footer>
      </body>
    </html>
  );
}
