"use client";

import React, { useState } from "react";
import FloatingChatButton from "./FloatingChatButton";
import AIChatWindow from "./AIChatWindow";

const ChatWrapper: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <>
      <FloatingChatButton onClick={handleOpenChat} />
      <AIChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ChatWrapper;
