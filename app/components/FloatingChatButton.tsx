import React from "react";
import { Flex, Avatar } from "@radix-ui/themes";
import Button from "./Button";

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => (
  <Flex position="fixed" bottom="20px" right="20px" style={{ zIndex: 1000 }}>
    <Button onClick={onClick}>
      <Avatar src="/images/radix-person-icon.svg" fallback="AI" size="2" />
      Chat Now
    </Button>
  </Flex>
);

export default FloatingChatButton;
