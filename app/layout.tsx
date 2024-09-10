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
      <body className="min-h-screen bg-wood-pattern bg-repeat text-copper-100">
        <header className="flex justify-between p-4 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md">
          <div className="flex items-center">
            <img
              src="/snakelogo.svg"
              alt="Hoop Snake Logo"
              className="h-12 neon-glow"
            />
            <h1 className="ml-4 text-2xl font-bold font-medieval neon-text">
              Hoop Snake Designs
            </h1>
          </div>
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
