"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { SnakeLogoWrapper } from "./components/SnakeLogoWrapper";
import dynamic from "next/dynamic";

const SnakeLogo3D = dynamic(
  () => import("./components/SnakeLogo3D").then((mod) => mod.SnakeLogo3D),
  { ssr: false }
);

export default function Home() {
  const services = [
    {
      title: "Audio Design & Production",
      description: "Blend medieval instruments with futuristic soundscapes.",
    },
    {
      title: "Graphic Design",
      description: "Merge ancient scrolls with holographic displays.",
    },
    {
      title: "Web Design",
      description: "Craft websites that feel like digital castles.",
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <SnakeLogoWrapper />

        <h1 className="text-4xl font-bold text-center mb-8 neon-text">
          Hoop Snake Designs
        </h1>

        {/* Local Service Finder */}
        <div className="mb-12 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center text-copper-100">
            Find Services Near You
          </h2>
          <div className="flex items-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-md rounded-lg overflow-hidden shadow-lg">
            <Input
              type="text"
              placeholder="Enter your location"
              className="flex-grow border-none focus:ring-0 bg-transparent text-copper-100 placeholder-copper-300/70"
            />
            <Button
              variant="secondary"
              className="text-neon-cyan neon-glow p-2"
            >
              <Search className="h-6 w-6" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-md rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-copper-100">
                    {service.title}
                  </h3>
                  <p className="text-copper-300 mb-4">{service.description}</p>
                </div>
                <Link
                  href={`/services/${service.title
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  passHref
                >
                  <Button variant="primary" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
