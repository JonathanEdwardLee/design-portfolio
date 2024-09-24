import Image from "next/image";
import { useState } from "react";

export function AboutSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-cyan-500 bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-lg overflow-hidden shadow-lg p-6 mb-12 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row mb-8">
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="mb-4 w-full max-w-xs">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <img
                src="/images/about.gif"
                alt="About demonstration"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-6">
          <h2 className="text-3xl font-bold mb-4 text-copper-100">
            About Jonathan Edward Lee & Hoop Snake Designs
          </h2>
          <p className="text-copper-300 mb-4">
            Hoop Snake Designs is owned and operated by Jonathan Edward Lee, a
            proud native Ozarkian. Born in Mountain Home, Arkansas, and now
            living in Springfield, Missouri, I bring over 20 years of personal
            passion and expertise to every project. With a deep connection to
            the Ozarks and a commitment to helping local businesses thrive, I
            offer specialized design services without the big agency
            approach—this is a one-man operation dedicated to delivering
            personalized, high-quality results.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-6">
          <h2 className="text-3xl font-bold mb-4 text-copper-100">
            Design Services in Springfield, Missouri
          </h2>
          <p className="text-copper-300">
            Hoop Snake Designs provides cutting-edge audio, graphic, and web
            design services tailored to businesses in Springfield and beyond. I
            understand the unique needs of local companies, offering my services
            across downtown Springfield, Commercial Street, Battlefield, and the
            surrounding areas. Whether you're based in Greene County or nearby
            in Christian, Webster, or Polk counties, my goal is to help your
            business stand out and succeed.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
          <div
            className="relative w-64 h-64"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src="/images/JonathanDarkBlue.png"
              alt="Jonathan Dark Blue"
              layout="fill"
              objectFit="cover"
              className={`transition-opacity duration-300 ${
                isHovered ? "opacity-0" : "opacity-100"
              }`}
            />
            <Image
              src="/images/JonathanLightBlue.png"
              alt="Jonathan Light Blue"
              layout="fill"
              objectFit="cover"
              className={`transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
