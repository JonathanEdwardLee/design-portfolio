"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isComplete: boolean;
  showEstimation: boolean;
  setShowEstimation: (show: boolean) => void;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  resetChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showEstimation, setShowEstimation] = useState(false);
  const [currentStep, setCurrentStep] = useState("initial");

  const sendMessage = useCallback(
    async (content: string) => {
      setIsLoading(true);
      setError(null);
      const newMessages = [...messages, { role: "user", content }];

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to send message: ${errorData.error}. Details: ${errorData.details}`
          );
        }

        const data = await response.json();
        const assistantMessage = data.result;
        setMessages([...newMessages, assistantMessage]);

        if (data.showEstimation) {
          setShowEstimation(true);
          setCurrentStep("getQuote");
          console.log("Setting showEstimation to true");
        }

        if (
          assistantMessage.content
            .toLowerCase()
            .includes("thank you for providing all the necessary information")
        ) {
          setIsComplete(true);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setError(
          error instanceof Error
            ? error.message
            : "An error occurred while sending the message. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const resetChat = () => {
    setMessages([]);
    // Reset any other relevant state variables
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        isLoading,
        error,
        isComplete,
        showEstimation,
        setShowEstimation,
        currentStep,
        setCurrentStep,
        resetChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
