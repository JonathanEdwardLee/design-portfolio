import React, { useState } from "react";
import { Dialog, Flex, Text } from "@radix-ui/themes";
import {
  TextField,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useChat } from "../hooks/useChat";
import { Close, Refresh } from "@mui/icons-material";
import QuoteForm from "./QuoteForm";
import Button from "./Button";

interface AIChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatWindow: React.FC<AIChatWindowProps> = ({ isOpen, onClose }) => {
  const { messages, sendMessage, isLoading, resetChat } = useChat(); // Add resetChat here
  const [input, setInput] = useState("");
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      await sendMessage(input);
      setInput("");
    }
  };

  const handleGetQuote = () => {
    setShowQuoteForm(true);
  };

  const handleScheduleConsultation = () => {
    window.open(
      "https://calendly.com/hoopsnakedesigns/let-s-chat-about-your-project",
      "_blank"
    );
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const handleResetChat = () => {
    resetChat();
    setInput("");
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#00FFFF", // Cyan color
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00FFFF",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00FFFF",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00FFFF",
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "#00FFFF",
            "&.Mui-focused": {
              color: "#00FFFF",
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            "& textarea": {
              overflow: "hidden",
              resize: "none",
            },
          },
        },
      },
    },
  });

  const promptStyles = {
    cursor: "pointer",
    color: "#00FFFF",
    "&:hover": {
      opacity: 0.8,
    },
  };

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Content style={{ position: "relative", paddingBottom: "60px" }}>
          <Dialog.Title>Chat with my AI Assistant</Dialog.Title>
          <Text as="p" style={{ marginBottom: "16px" }}>
            I trained this arifical intelligence chat bot to help with anything
            you need. Ask it ANY questions you have about Hoop Snakes Designs,
            myself, or a project you want done. Here are some ideas for prompts:
            <ul>
              <li>
                <span
                  onClick={() =>
                    handlePromptClick(
                      "Can you estimate the cost of my project based on my description?"
                    )
                  }
                  style={promptStyles}
                >
                  &ldquo;Can you estimate the cost of my project based on my
                  description?&rdquo;
                </span>
              </li>
              <li>
                <span
                  onClick={() =>
                    handlePromptClick(
                      "What services does Hoop Snakes Designs offer?"
                    )
                  }
                  style={promptStyles}
                >
                  &ldquo;What services does Hoop Snakes Designs offer?&rdquo;
                </span>
              </li>
              <li>
                <span
                  onClick={() =>
                    handlePromptClick(
                      "Can I text or call Jonathan? What is his number?"
                    )
                  }
                  style={promptStyles}
                >
                  &ldquo;Can I text or call Jonathan? What is his number?&rdquo;
                </span>
              </li>
              <li>
                <span
                  onClick={() =>
                    handlePromptClick(
                      "Help me write a 300-word project description for a quote by asking relevant questions."
                    )
                  }
                  style={promptStyles}
                >
                  &ldquo;Help me write a 300-word project description for a
                  quote by asking relevant questions.&rdquo;
                </span>
              </li>
            </ul>
          </Text>
          <Flex direction="column" gap="3">
            {messages.map((msg, index) => (
              <Text
                key={index}
                as="p"
                color={msg.role === "assistant" ? "cyan" : "gold"}
              >
                {msg.content}
              </Text>
            ))}
            <ThemeProvider theme={darkTheme}>
              <TextField
                fullWidth
                multiline
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                disabled={isLoading}
                color="primary"
                minRows={1}
                maxRows={5}
              />
            </ThemeProvider>
            <Button onClick={handleSend} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : "Send"}
            </Button>
            <Flex direction="column" gap="2" style={{ width: "100%" }}>
              <Flex gap="2" justify="center" style={{ width: "100%" }}>
                <Button onClick={handleGetQuote}>Get a Quote</Button>
                <Button onClick={handleScheduleConsultation}>
                  Schedule a Consultation
                </Button>
              </Flex>
              <Flex justify="end" gap="2">
                <Button
                  onClick={handleResetChat}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                >
                  <Refresh style={{ color: "white", opacity: 0.7 }} />
                </Button>
                <Button
                  onClick={onClose}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                >
                  <Close style={{ color: "white", opacity: 0.7 }} />
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      {showQuoteForm && (
        <QuoteForm
          isOpen={showQuoteForm}
          onClose={() => setShowQuoteForm(false)}
          openAIChat={() => {
            setShowQuoteForm(false);
            handlePromptClick(
              "Help me write a 300-word project description for a quote by asking relevant questions."
            );
          }}
        />
      )}
    </>
  );
};

export default AIChatWindow;
