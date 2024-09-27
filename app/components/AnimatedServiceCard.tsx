"use client";

import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";
import { Box } from "@radix-ui/themes";

interface AnimatedServiceCardProps {
  title: string;
  description: string;
  imageUrl: string; // Add this line
  gifUrl: string;
  onOpenChat: () => void; // Changed from onClick to onOpenChat
}

export const AnimatedServiceCard = React.memo(function AnimatedServiceCard({
  title,
  description,
  imageUrl, // Add this line
  gifUrl,
  onOpenChat, // Changed from onClick to onOpenChat
}: AnimatedServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const cardPosition = cardRef.current.offsetTop;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollTrigger = cardPosition - windowHeight + 200;

      if (scrollPosition > scrollTrigger) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      ref={cardRef}
      className={`transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <ServiceCard
        title={title}
        description={description}
        gifUrl={gifUrl} // Add this line
        onOpenChat={onOpenChat} // Changed from onClick to onOpenChat
      />
    </Box>
  );
});
