import React, { useState, useEffect, useCallback } from "react";
import { Dialog, Flex, Text, Button } from "@radix-ui/themes";
import { TextField } from "@mui/material"; // Add this import at the top of the file
import { useChat } from "../components/ChatContext";
import { useSearchParams } from "next/navigation";

interface AIChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatWindow: React.FC<AIChatWindowProps> = ({ isOpen, onClose }) => {
  const {
    messages,
    sendMessage,
    isLoading,
    questionCount,
    setQuestionCount,
    showEstimation,
    setShowEstimation,
  } = useChat();
  const [input, setInput] = useState("");
  const searchParams = useSearchParams();
  const idea = searchParams.get("idea");
  const service = searchParams.get("service");

  const getDesignArea = useCallback(
    (idea: string): "audio" | "graphic" | "web" => {
      if (idea.toLowerCase().includes("audio")) return "audio";
      if (idea.toLowerCase().includes("graphic")) return "graphic";
      return "web";
    },
    []
  );

  const getFirstQuestion = useCallback((designArea: string): string => {
    switch (designArea) {
      case "audio":
        return "What kind of audio elements are you looking to incorporate in your project?";
      case "graphic":
        return "What style or visual elements are you envisioning for your graphic design project?";
      case "web":
      default:
        return "What key features or pages do you want to include in your website?";
    }
  }, []);

  const getInitialPrompt = useCallback(
    (designArea: string, idea: string): string => {
      return `User's idea for ${designArea} design: ${idea}\n\nAI: Thank you for sharing your ${designArea} design idea. I'm going to ask you a series of questions to better understand your project. Please provide detailed answers to help us create an accurate estimation.

First question: ${getFirstQuestion(designArea)}`;
    },
    [getFirstQuestion]
  );

  useEffect(() => {
    if (idea && messages.length === 0) {
      const designArea = service ? service.toLowerCase() : getDesignArea(idea);
      const initialPrompt = getInitialPrompt(designArea, idea);
      sendMessage(initialPrompt);
    }
  }, [idea, service, messages, sendMessage, getDesignArea, getInitialPrompt]);

  const handleSend = async () => {
    if (input.trim()) {
      await sendMessage(input.trim());
      setInput("");
      setQuestionCount(questionCount + 1);
    }
  };

  const handleGetEstimation = () => {
    sendMessage(
      "Based on our conversation, could you provide an estimation of the project's scope, timeline, and budget?"
    );
    setShowEstimation(true);
  };

  const handleEmailEstimation = () => {
    const estimationContent = messages[messages.length - 1].content;
    const subject = encodeURIComponent(
      "Project Estimation from Hoop Snake Designs"
    );
    const body = encodeURIComponent(
      `Here's your project estimation:\n\n${estimationContent}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content
        style={{
          maxWidth: 600,
          backgroundColor: "black",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "5px",
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <Dialog.Title>
          <Text color="teal">How can I help you?</Text>
        </Dialog.Title>
        <Flex direction="column" gap="3">
          {messages.map((msg, index) => (
            <Text
              key={index}
              as="p"
              color="teal"
              style={{
                fontWeight: msg.role === "assistant" ? "bold" : "normal",
              }}
            >
              {msg.content}
            </Text>
          ))}
          {!showEstimation && (
            <TextField
              fullWidth
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              InputProps={{
                style: {
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            />
          )}
          {!showEstimation && (
            <Button onClick={handleSend} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          )}
          {questionCount >= 4 && !isLoading && !showEstimation && (
            <Flex direction="column" gap="2">
              <Text color="teal">
                Would you like to provide more information or get an AI
                estimation?
              </Text>
              <Flex gap="2">
                <Button onClick={() => setQuestionCount(0)}>
                  Provide More Info
                </Button>
                <Button onClick={handleGetEstimation}>Get AI Estimation</Button>
              </Flex>
            </Flex>
          )}
          {showEstimation && !isLoading && (
            <Flex direction="column" gap="2">
              <Text weight="bold" color="teal">
                Project Estimation
              </Text>
              <Text color="teal">{messages[messages.length - 1].content}</Text>
              <Flex gap="2">
                <Button onClick={() => window.print()}>Save as PDF</Button>
                <Button onClick={handleEmailEstimation}>
                  Email Estimation
                </Button>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AIChatWindow;
