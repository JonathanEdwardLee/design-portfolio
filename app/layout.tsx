import { ReactNode } from "react";
import type { Metadata } from "next";
import "./styles.css";
import SpaceBackground from "./components/SpaceBackground";
import { Gruppo } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import ChatWrapper from "./components/ChatWrapper";
import { ChatProvider } from "./components/ChatContext";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

const gruppo = Gruppo({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gruppo",
});

export const metadata: Metadata = {
  title: "Hoop Snake Designs | Web, Graphic & Audio Design in Springfield, MO",
  description:
    "Discover the most creative web, graphic, and audio design services in Springfield, MO. Hoop Snake Designs specializes in AI-powered websites, branding, and digital marketing to make your local business stand out.",
  keywords:
    "web design Springfield MO, graphic design Springfield MO, AI development Springfield MO, custom websites Springfield, local business branding, Springfield digital marketing, Springfield MO music production, audio mixing and mastering Springfield MO, affordable web design Springfield, best graphic designer Springfield MO, AI website solutions Springfield",
  authors: [{ name: "Jonathan Edward Lee" }],
  creator: "Jonathan Edward Lee",
  publisher: "Hoop Snake Designs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Hoop Snake Designs | Creative Design Services in Springfield, MO",
    description:
      "Hoop Snake Designs offers web, graphic, and audio design services in Springfield, Missouri, specializing in unique, AI-powered solutions for local businesses.",
    url: "https://www.hoopsnakedesigns.com",
    siteName: "Hoop Snake Designs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.hoopsnakedesigns.com/images/hoop_snake_simple.png",
        width: 1200,
        height: 630,
        alt: "Hoop Snake Designs Logo - Unique Design Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Hoop Snake Designs | Web, Graphic & Audio Design in Springfield, MO",
    description:
      "Springfield's unique web, graphic, and audio design studio. Expert in AI-powered design solutions for local businesses.",
    images: ["https://www.hoopsnakedesigns.com/images/hoop_snake_simple.png"],
  },
  alternates: {
    canonical: "https://www.hoopsnakedesigns.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: [
    {
      rel: "icon",
      url: "/favicon/HoopSnakeVectorFavicon.svg",
      type: "image/svg+xml",
    },
    { rel: "apple-touch-icon", url: "/favicon/HoopSnakeVectorFavicon.svg" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${gruppo.variable} font-gruppo`}>
      <body className="min-h-screen text-copper-100">
        <Theme
          appearance="dark"
          accentColor="cyan"
          radius="large"
          scaling="95%"
          panelBackground={"transparent" as "solid"}
        >
          <ChatProvider>
            <SpaceBackground />
            <div>
              <main>{children}</main>
              <footer className="p-4 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md text-center text-copper-300">
                © {new Date().getFullYear()} Hoop Snake Designs
              </footer>
            </div>
            <ChatWrapper />
          </ChatProvider>
        </Theme>
        <Analytics />
        <GoogleTagManager gtmId="G-X45GW26X65" />
      </body>
    </html>
  );
}
