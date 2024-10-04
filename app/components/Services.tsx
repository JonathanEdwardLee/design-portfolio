"use client";

import { LazyLoadSection } from "./LazyLoadSection";
import { AnimatedServiceCard } from "./AnimatedServiceCard";
import { Container } from "@radix-ui/themes";

interface Service {
  title: string;
  description: string;
  gifUrl: string;
}

interface ServicesProps {
  onOpenChat: () => void;
}

const servicesData: Service[] = [
  {
    title: "Web Design",
    description:
      "Attract more visitors and convert them into customers with stunning, user-friendly websites. I specialize in responsive web design that ensures your site looks great on any device, optimized for SEO to boost your online visibility. Whether you need an e-commerce platform, a portfolio site, or a business website, I build custom web solutions that align with your goals, offering seamless navigation and fast performance.",
    gifUrl: "/images/web_design.gif",
  },
  {
    title: "Graphic Design",
    description:
      "Stand out with custom graphic design solutions that visually communicate your brand's message. From logo design and brand identity to digital illustrations and print materials, I provide comprehensive graphic design services that help businesses of all sizes make a lasting impression. Elevate your brand with engaging visuals that connect with your target audience across digital and traditional platforms.",
    gifUrl: "/images/graphic_design.gif",
  },
  {
    title: "Audio Design",
    description:
      "Bring your projects to life with professional audio design and production services tailored to your needs. Whether you're producing a podcast, video game, film, recording an album, or marketing content, I deliver high-quality soundscapes, music production, and audio branding that resonate with your audience. From recording and editing to mixing and mastering, I ensure your audio is crisp, clear, and engaging.",
    gifUrl: "/images/audio_design.gif",
  },
];

export function Services({ onOpenChat }: ServicesProps) {
  return (
    <Container size="3">
      <div className="space-y-12">
        {servicesData.map((service, index) => (
          <LazyLoadSection key={index}>
            <AnimatedServiceCard
              title={service.title}
              description={service.description}
              gifUrl={service.gifUrl}
              onOpenChat={onOpenChat}
            />
          </LazyLoadSection>
        ))}
      </div>
    </Container>
  );
}
