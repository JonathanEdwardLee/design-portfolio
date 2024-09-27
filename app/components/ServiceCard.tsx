import React from "react";
import Image from "next/image";
import { Card, Heading, Text } from "@radix-ui/themes";
import Button from "./Button";

interface ServiceCardProps {
  title: string;
  description: string;
  gifUrl: string;
  onOpenChat: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = React.memo(
  ({ title, description, gifUrl, onOpenChat }) => {
    return (
      <Card className="relative overflow-hidden">
        <div className="relative w-full h-64">
          <Image
            src={gifUrl}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <Heading as="h3" size="5" className="mb-2 text-copper-100">
            {title}
          </Heading>
          <Text as="p" size="3" className="mb-4 text-copper-300">
            {description}
          </Text>
          <Button onClick={onOpenChat}>Get a Quote</Button>
        </div>
      </Card>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
