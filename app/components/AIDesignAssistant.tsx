import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useChat } from "../hooks/useChat";

interface AIDesignAssistantProps {
  placeholder: string;
  onSend: (message: string) => Promise<void>;
}

export const AIDesignAssistant: React.FC<AIDesignAssistantProps> = ({
  placeholder,
  onSend,
}) => {
  const [inputValue, setInputValue] = useState("");
  const { messages, isLoading, error, isComplete } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputValue.trim()) {
      await onSend(inputValue.trim());
      setInputValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-cyan-500 bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-lg overflow-hidden shadow-lg p-4">
      <div className="mb-4 max-h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.role === "user"
                  ? "bg-copper-300 text-black"
                  : "bg-cyan-500 bg-opacity-5 text-copper-100"
              }`}
            >
              {message.content}
            </span>
          </div>
        ))}
      </div>
      {!isComplete && (
        <div className="relative flex items-center bg-cyan-500 bg-opacity-10 rounded-md">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            className="w-full border-none ring-0 bg-transparent text-copper-100 placeholder-copper-300/70 px-3 py-2 pr-12 resize-none overflow-hidden"
            style={{ minHeight: "2.5rem", height: "auto" }}
            disabled={isLoading}
            rows={1}
          />
          <Button
            variant="secondary"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-neon-cyan neon-glow bg-transparent p-1 hover:bg-transparent focus:bg-transparent"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <Send className="h-5 w-5 text-neon-cyan-800 transition-all duration-300 hover:text-neon-cyan hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.9)]" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      )}
      {isComplete && (
        <div className="text-center text-copper-100">
          <p>
            Thank you for providing all the necessary information. We'll review
            your project details and get back to you soon.
          </p>
        </div>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};
