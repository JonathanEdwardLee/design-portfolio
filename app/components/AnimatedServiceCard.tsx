"use client";

import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";

interface AnimatedServiceCardProps {
  title: string;
  description: string;
  gifUrl: string;
  children: React.ReactNode;
}

export const AnimatedServiceCard = React.memo(function AnimatedServiceCard({
  title,
  description,
  gifUrl,
  children,
}: AnimatedServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const cardPosition = cardRef.current.offsetTop;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollTrigger = cardPosition - windowHeight + 200; // Adjust this value to change when the card appears

      if (scrollPosition > scrollTrigger) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check visibility on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <ServiceCard title={title} description={description} gifUrl={gifUrl}>
        {children}
      </ServiceCard>
    </div>
  );
});
