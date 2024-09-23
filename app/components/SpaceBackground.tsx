"use client";

import React, { useEffect, useRef } from "react";

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: {
      x: number;
      y: number;
      z: number;
      radius: number;
      speedX: number;
      speedY: number;
    }[] = [];
    const numStars = 200;
    let mouseX = 0;
    let mouseY = 0;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
        radius: Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.4, // Add random horizontal speed
        speedY: (Math.random() - 0.5) * 0.4, // Add random vertical speed
      });
    }

    function drawStar(star: (typeof stars)[0]) {
      if (!ctx) return;
      const distanceToMouse = Math.hypot(star.x - mouseX, star.y - mouseY);
      const interactionRadius = 80; // Keep the current interaction radius

      let x = star.x;
      let y = star.y;

      // Apply mouse interaction effect
      if (distanceToMouse < interactionRadius) {
        const angle = Math.atan2(star.y - mouseY, star.x - mouseX);
        const pushStrength = (1 - distanceToMouse / interactionRadius) * 6; // Keep the current push strength
        x += Math.cos(angle) * pushStrength;
        y += Math.sin(angle) * pushStrength;
      }

      // Apply constant background movement
      x += star.speedX;
      y += star.speedY;

      // Wrap stars around the screen
      if (canvas) {
        x = (x + canvas.width) % canvas.width;
        y = (y + canvas.height) % canvas.height;
      }

      ctx.beginPath();
      ctx.arc(x, y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle =
        "rgba(255, 255, 255, " + (1 - star.z / (canvas?.width ?? 1)) + ")";
      ctx.fill();

      // Update star position
      star.x = x;
      star.y = y;
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        drawStar(star);
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default SpaceBackground;
