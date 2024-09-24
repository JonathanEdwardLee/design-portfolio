import { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  gifUrl: string;
  children: ReactNode;
}

export function ServiceCard({
  title,
  description,
  gifUrl,
  children,
}: ServiceCardProps) {
  return (
    <div className="mb-12 bg-cyan-500 bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-lg overflow-hidden shadow-lg p-6">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-6">
          <h2 className="text-2xl font-semibold mb-4 text-copper-100">
            {title}
          </h2>
          <p className="text-copper-300 mb-4">{description}</p>
        </div>
        <div className="md:w-1/2">
          <div className="mb-4">
            <img
              src={gifUrl}
              alt={`${title} demonstration`}
              className="w-full h-auto rounded-lg"
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
