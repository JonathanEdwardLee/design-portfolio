import { useState, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    setIsLoading(true);
    setError(null);
    const newMessages = [...messages, { role: 'user', content }];

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to send message: ${errorData.error}. Details: ${errorData.details}`);
      }

      const data = await response.json();
      const assistantMessage = data.result;
      setMessages([...newMessages, assistantMessage]);

      // Check if the conversation is complete
      if (assistantMessage.content.toLowerCase().includes("thank you for providing all the necessary information")) {
        setIsComplete(true);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError(
        error instanceof Error ? error.message : 'An error occurred while sending the message. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return { messages, sendMessage, isLoading, error, isComplete };
}
