import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface AIDesignAssistantProps {
  placeholder: string;
  onSend: (content: string) => void;
}

export function AIDesignAssistant({
  placeholder,
  onSend,
}: AIDesignAssistantProps) {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSend(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative flex items-center bg-cyan-500 bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-lg overflow-hidden shadow-lg">
      <textarea
        ref={textareaRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress} // Changed from onKeyPress to onKeyDown
        placeholder={placeholder}
        className="w-full !border-none !ring-0 !bg-transparent !text-copper-100 !placeholder-copper-300/70 !px-4 !py-2 !pr-16 resize-none overflow-hidden"
        rows={1}
        style={{ minHeight: "2.5rem" }}
      />
      <Button
        variant="secondary"
        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-neon-cyan neon-glow bg-transparent p-2 hover:bg-transparent focus:bg-transparent"
        onClick={handleSubmit}
      >
        <Search className="h-6 w-6 text-neon-cyan-800 transition-all duration-300 hover:text-neon-cyan hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.9)]" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  );
}
