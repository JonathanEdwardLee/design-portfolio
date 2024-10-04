import React from "react";
import { Flex } from "@radix-ui/themes";
import Button from "./Button";
import Image from "next/image";

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => (
  <Flex position="fixed" bottom="20px" right="20px" style={{ zIndex: 1000 }}>
    <Button onClick={onClick}>
      <Image
        src="/images/cyan-person-icon.svg"
        alt="Chat Icon"
        width={24}
        height={24}
      />
      Chat Now
    </Button>
  </Flex>
);

export default FloatingChatButton;
