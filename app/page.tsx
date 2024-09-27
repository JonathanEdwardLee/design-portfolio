"use client";

import { useState } from "react";
import { SnakeLogoWrapper } from "./components/SnakeLogoWrapper";
import { LazyLoadSection } from "./components/LazyLoadSection";
import { withAnimation } from "./components/WithAnimation";
import { AboutSection } from "./components/AboutSection";
import { DesignAssistantSection } from "./components/DesignAssistantSection";
import { Services } from "./components/Services";
import { Suspense } from "react";
import AIChatWindow from "./components/AIChatWindow";

const AnimatedAboutSection = withAnimation(AboutSection);
const AnimatedDesignAssistantSection = withAnimation(DesignAssistantSection);

export default function Page() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-12 md:pt-16 lg:pt-20 pb-24 md:pb-28 lg:pb-32">
        <h1 className="text-6xl font-bold text-center mb-20 neon-text">
          Hoop Snake Designs
        </h1>

        <div className="mb-24">
          <SnakeLogoWrapper />
        </div>

        <Services onOpenChat={handleOpenChat} />

        <div className="text-center text-neon-cyan neon-text flashing-arrow mb-20">
          <span>About</span>
          <svg
            className="arrow-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 21l-12-18h24z" />
          </svg>
        </div>

        <LazyLoadSection>
          <AnimatedAboutSection />
        </LazyLoadSection>

        <div className="text-center text-neon-cyan neon-text flashing-arrow mb-20">
          <span>Get A Quote</span>
          <svg
            className="arrow-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 21l-12-18h24z" />
          </svg>
        </div>

        <LazyLoadSection>
          <AnimatedDesignAssistantSection onOpenChat={handleOpenChat} />
        </LazyLoadSection>
      </div>
      <Suspense fallback={<div>Loading chat...</div>}>
        <AIChatWindow
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </Suspense>
    </main>
  );
}
