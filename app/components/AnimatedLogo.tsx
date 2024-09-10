"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedLogo() {
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current.querySelectorAll("path"), {
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        fill: "#0ff",
        ease: "power2.inOut",
      });
    }
  }, []);

  return (
    <div className="flex justify-center mb-8">
      <svg
        ref={logoRef}
        id="snakeLogo"
        width="100"
        height="100"
        className="neon-glow"
      >
        <use href="/images/snakelogo.svg#snakeLogo" />
      </svg>
    </div>
  );
}
