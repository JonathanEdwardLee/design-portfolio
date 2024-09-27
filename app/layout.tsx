import { ReactNode } from "react";
import type { Metadata } from "next";
import "./styles.css"; // Import the new combined CSS file
import SpaceBackground from "./components/SpaceBackground";
import { Gruppo } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import ChatWrapper from "./components/ChatWrapper";
import { ChatProvider } from "./components/ChatContext";

const gruppo = Gruppo({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gruppo",
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
                © 2024 Hoop Snake Designs
              </footer>
            </div>
            <ChatWrapper />
          </ChatProvider>
        </Theme>
      </body>
    </html>
  );
}
