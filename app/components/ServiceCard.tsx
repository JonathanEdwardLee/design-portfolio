import React from "react";
import Image from "next/image";
import { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  gifUrl: string;
  children: ReactNode;
}

const ServiceCard = React.memo(function ServiceCard({
  title,
  description,
  gifUrl,
  children,
}: ServiceCardProps) {
  return (
    <div className="mb-12 bg-cyan-500 bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-lg overflow-hidden shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col items-center justify-center">
          <div className="w-full h-full">
            <div className="relative w-full h-0 pb-[56.25%]">
              <Image
                src={gifUrl}
                alt={`${title} demonstration`}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-6">
          <h2 className="text-2xl font-semibold mb-4 text-copper-100">
            {title}
          </h2>
          <p className="text-copper-300 mb-4">{description}</p>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
});

export default ServiceCard;
