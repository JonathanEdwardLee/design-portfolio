"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { SnakeLogoWrapper } from "./components/SnakeLogoWrapper";
import dynamic from "next/dynamic";
import Head from "next/head";

const SnakeLogo3D = dynamic(
  () => import("./components/SnakeLogo3D").then((mod) => mod.SnakeLogo3D),
  { ssr: false }
);

export default function Home() {
  const services = [
    {
      title: "Audio Design & Production",
      description:
        "Bring your projects to life with professional audio design and production services tailored to your needs. Whether you're producing a podcast, video game, film, or marketing content, we deliver high-quality soundscapes, music production, and audio branding that resonate with your audience. From recording and editing to mixing and mastering, we ensure your audio is crisp, clear, and engaging.",
    },
    {
      title: "Graphic Design",
      description:
        "Stand out with custom graphic design solutions that visually communicate your brand’s message. From logo design and brand identity to digital illustrations and print materials, we provide comprehensive graphic design services that help businesses of all sizes make a lasting impression. Elevate your brand with engaging visuals that connect with your target audience across digital and traditional platforms.",
    },
    {
      title: "Web Design",
      description:
        "Attract more visitors and convert them into customers with stunning, user-friendly websites. We specialize in responsive web design that ensures your site looks great on any device, optimized for SEO to boost your online visibility. Whether you need an e-commerce platform, a portfolio site, or a business website, we build custom web solutions that align with your goals, offering seamless navigation and fast performance.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hoop Snake Designs",
    description:
      "Professional audio, graphic, and web design services in Springfield, Missouri. Specializing in budget-friendly designs for local businesses.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Springfield",
      sameAs: "https://en.wikipedia.org/wiki/Springfield,_Missouri",
      addressRegion: "MO",
      postalCode: "65803",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.209, // Replace with actual coordinates
      longitude: -93.2923, // Replace with actual coordinates
    },
    url: "https://www.hoopsnakedesigns.com",
    telephone: "+1-417-496-1604",
    openingHours: "Mo-Fr 09:00-17:00",
    priceRange: "$$",
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Title moved to the top and enlarged */}
          <h1 className="text-6xl font-bold text-center mb-8 neon-text">
            Hoop Snake Designs
          </h1>

          {/* 3D logo placed beneath the title */}
          <div className="mb-12">
            <SnakeLogoWrapper />
          </div>

          {/* AI Design Assistant */}
          <div className="mb-12 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center text-copper-100">
              What can I design for you?
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
                    <p className="text-copper-300 mb-4">
                      {service.description}
                    </p>
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

        <section className="my-12 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-copper-100">
            Design Services in Springfield, Missouri
          </h2>
          <p className="text-copper-300 mb-4">
            Hoop Snake Designs proudly serves Springfield and the surrounding
            areas with cutting-edge design services. Our local team understands
            the unique needs of businesses throughout the Ozarks.
          </p>
          <p className="text-copper-300">
            We offer our services to clients throughout Springfield, including
            downtown, Commercial Street, Battlefield, and beyond. Whether you're
            in Greene County or neighboring Christian, Webster, or Polk
            counties, we're here to help your business stand out with our audio,
            graphic, and web design expertise.
          </p>
        </section>
      </main>
    </>
  );
}
