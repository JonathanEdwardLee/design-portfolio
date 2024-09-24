"use client";

import { SnakeLogoWrapper } from "./components/SnakeLogoWrapper";
import dynamic from "next/dynamic";

import { AnimatedServiceCard } from "./components/AnimatedServiceCard";
import { AIDesignAssistant } from "./components/AIDesignAssistant";
import { SEOSection } from "./components/SEOSection";

const SnakeLogo3D = dynamic(
  () => import("./components/SnakeLogo3D").then((mod) => mod.SnakeLogo3D),
  { ssr: false }
);

export default function Home() {
  const services = [
    {
      title: "Web Design",
      description:
        "Attract more visitors and convert them into customers with stunning, user-friendly websites. We specialize in responsive web design that ensures your site looks great on any device, optimized for SEO to boost your online visibility. Whether you need an e-commerce platform, a portfolio site, or a business website, we build custom web solutions that align with your goals, offering seamless navigation and fast performance.",
      gifUrl: "/images/web_design.gif",
    },
    {
      title: "Graphic Design",
      description:
        "Stand out with custom graphic design solutions that visually communicate your brand’s message. From logo design and brand identity to digital illustrations and print materials, we provide comprehensive graphic design services that help businesses of all sizes make a lasting impression. Elevate your brand with engaging visuals that connect with your target audience across digital and traditional platforms.",
      gifUrl: "/images/graphic_design.gif",
    },
    {
      title: "Audio Design",
      description:
        "Bring your projects to life with professional audio design and production services tailored to your needs. Whether you're producing a podcast, video game, film, recording an album, or marketing content, we deliver high-quality soundscapes, music production, and audio branding that resonate with your audience. From recording and editing to mixing and mastering, we ensure your audio is crisp, clear, and engaging.",
      gifUrl: "/images/audio_design.gif",
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-16 sm:px-20 md:px-24 lg:px-32 py-20 md:py-24 lg:py-28">
        <h1 className="text-6xl font-bold text-center mb-20 neon-text">
          Hoop Snake Designs
        </h1>

        <div className="mb-24">
          <SnakeLogoWrapper />
        </div>

        {services.map((service, index) => (
          <AnimatedServiceCard
            key={index}
            index={index}
            title={service.title}
            description={service.description}
            gifUrl={service.gifUrl}
          >
            <AIDesignAssistant
              placeholder={`What is your ${service.title.toLowerCase()} idea?`}
            />
          </AnimatedServiceCard>
        ))}

        <SEOSection />
      </div>
    </main>
  );
}
