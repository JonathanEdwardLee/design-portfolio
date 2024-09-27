"use client";

import { useState, useEffect } from "react";
import { LazyLoadSection } from "./LazyLoadSection";
import { AnimatedServiceCard } from "./AnimatedServiceCard";
import { Container } from "@radix-ui/themes";

interface Service {
  title: string;
  description: string;
  imageUrl: string; // Add this line
  gifUrl: string;
}

interface ServicesProps {
  onOpenChat: () => void;
}

const servicesData: Service[] = [
  {
    title: "Web Design",
    description:
      "Attract more visitors and convert them into customers with stunning, user-friendly websites. We specialize in responsive web design that ensures your site looks great on any device, optimized for SEO to boost your online visibility. Whether you need an e-commerce platform, a portfolio site, or a business website, we build custom web solutions that align with your goals, offering seamless navigation and fast performance.",
    gifUrl: "/images/web_design.gif",
    imageUrl: "/images/web_design.png", // Add this line (adjust the path as needed)
  },
  {
    title: "Graphic Design",
    description:
      "Stand out with custom graphic design solutions that visually communicate your brand's message. From logo design and brand identity to digital illustrations and print materials, we provide comprehensive graphic design services that help businesses of all sizes make a lasting impression. Elevate your brand with engaging visuals that connect with your target audience across digital and traditional platforms.",
    gifUrl: "/images/graphic_design.gif",
    imageUrl: "/images/graphic_design.png", // Add this line (adjust the path as needed)
  },
  {
    title: "Audio Design",
    description:
      "Bring your projects to life with professional audio design and production services tailored to your needs. Whether you're producing a podcast, video game, film, recording an album, or marketing content, we deliver high-quality soundscapes, music production, and audio branding that resonate with your audience. From recording and editing to mixing and mastering, we ensure your audio is crisp, clear, and engaging.",
    gifUrl: "/images/audio_design.gif",
    imageUrl: "/images/audio_design.png", // Add this line (adjust the path as needed)
  },
];

export function Services({ onOpenChat }: ServicesProps) {
  const [services, setServices] = useState<Service[]>([]);
  // const router = useRouter(); // Removed this line as per the instructions

  useEffect(() => {
    setServices(servicesData);
  }, []);

  const handleServiceClick = (serviceTitle: string) => {
    // Instead of navigating, we'll just open the chat
    onOpenChat();
    // You might want to set some context for the chat based on the service selected
    // For example, you could use a global state or context to store the selected service
    // setSelectedService(serviceTitle);
  };

  return (
    <Container size="3">
      <div className="space-y-12">
        {services.map((service, index) => (
          <LazyLoadSection key={index}>
            <AnimatedServiceCard
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl} // Add this line
              gifUrl={service.gifUrl}
              onOpenChat={() => handleServiceClick(service.title)} // Change this line
            />
          </LazyLoadSection>
        ))}
      </div>
    </Container>
  );
}
