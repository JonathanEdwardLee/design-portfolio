"use client";

import { useState, useEffect } from "react";
import { LazyLoadSection } from "./LazyLoadSection";
import { AnimatedServiceCard } from "./AnimatedServiceCard";
import { AIDesignAssistant } from "./AIDesignAssistant";
import { useRouter } from "next/navigation";
import { useChat } from "../hooks/useChat";

interface Service {
  title: string;
  description: string;
  gifUrl: string;
}

const servicesData: Service[] = [
  {
    title: "Web Design",
    description:
      "Attract more visitors and convert them into customers with stunning, user-friendly websites. We specialize in responsive web design that ensures your site looks great on any device, optimized for SEO to boost your online visibility. Whether you need an e-commerce platform, a portfolio site, or a business website, we build custom web solutions that align with your goals, offering seamless navigation and fast performance.",
    gifUrl: "/images/web_design.gif",
  },
  {
    title: "Graphic Design",
    description:
      "Stand out with custom graphic design solutions that visually communicate your brand's message. From logo design and brand identity to digital illustrations and print materials, we provide comprehensive graphic design services that help businesses of all sizes make a lasting impression. Elevate your brand with engaging visuals that connect with your target audience across digital and traditional platforms.",
    gifUrl: "/images/graphic_design.gif",
  },
  {
    title: "Audio Design",
    description:
      "Bring your projects to life with professional audio design and production services tailored to your needs. Whether you're producing a podcast, video game, film, recording an album, or marketing content, we deliver high-quality soundscapes, music production, and audio branding that resonate with your audience. From recording and editing to mixing and mastering, we ensure your audio is crisp, clear, and engaging.",
    gifUrl: "/images/audio_design.gif",
  },
];

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const router = useRouter();
  const { sendMessage } = useChat();

  useEffect(() => {
    setServices(servicesData);
  }, []);

  const handleSendMessage = async (message: string, serviceTitle: string) => {
    console.log(message); // Keep this for debugging
    await sendMessage(message);
    router.push(
      `/project-blueprint?service=${encodeURIComponent(serviceTitle)}`
    );
  };

  return (
    <div className="space-y-12">
      {services.map((service, index) => (
        <LazyLoadSection key={index}>
          <AnimatedServiceCard
            title={service.title}
            description={service.description}
            gifUrl={service.gifUrl}
          >
            <AIDesignAssistant
              placeholder={`What is your ${service.title.toLowerCase()} idea?`}
              onSend={(message) => handleSendMessage(message, service.title)}
            />
          </AnimatedServiceCard>
        </LazyLoadSection>
      ))}
    </div>
  );
}
