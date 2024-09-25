"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useChat } from "../hooks/useChat";
import { AIDesignAssistant } from "../components/AIDesignAssistant";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ProjectBlueprint() {
  const searchParams = useSearchParams();
  const idea = searchParams.get("idea");
  const service = searchParams.get("service");
  const { messages, sendMessage, isLoading, error } = useChat();
  const [questionCount, setQuestionCount] = useState(0);
  const [showEstimation, setShowEstimation] = useState(false);

  useEffect(() => {
    if (idea && messages.length === 0) {
      const designArea = service ? service.toLowerCase() : getDesignArea(idea);
      const initialPrompt = getInitialPrompt(designArea, idea);
      sendMessage(initialPrompt);
    }
  }, [idea, service, messages, sendMessage]);

  const getDesignArea = (idea: string): "audio" | "graphic" | "web" => {
    if (idea.toLowerCase().includes("audio")) return "audio";
    if (idea.toLowerCase().includes("graphic")) return "graphic";
    return "web";
  };

  const getInitialPrompt = (designArea: string, idea: string): string => {
    return `User's idea for ${designArea} design: ${idea}\n\nAI: Thank you for sharing your ${designArea} design idea. I'm going to ask you a series of questions to better understand your project. Please provide detailed answers to help us create an accurate estimation.

First question: ${getFirstQuestion(designArea)}`;
  };

  const getFirstQuestion = (designArea: string): string => {
    switch (designArea) {
      case "audio":
        return "What kind of audio elements are you looking to incorporate in your project?";
      case "graphic":
        return "What style or visual elements are you envisioning for your graphic design project?";
      case "web":
      default:
        return "What key features or pages do you want to include in your website?";
    }
  };

  const handleSendMessage = useCallback(
    async (content: string) => {
      try {
        await sendMessage(content);
        setQuestionCount((prev) => prev + 1);
      } catch (error) {
        console.error("Error in handleSendMessage:", error);
      }
    },
    [sendMessage]
  );

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button
            className="btn-copper mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-12 md:pt-16 lg:pt-20 pb-24 md:pb-28 lg:pb-32">
        <Link href="/">
          <h1 className="text-6xl font-bold text-center mb-20 neon-text cursor-pointer">
            Hoop Snake Designs
          </h1>
        </Link>

        <div className="max-w-4xl mx-auto bg-cyan-500 bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-lg overflow-hidden shadow-lg p-6 mb-12">
          <h2 className="text-4xl font-bold mb-8 text-center neon-text">
            Project Blueprint
          </h2>
          <div className="mb-8">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-copper-300 text-black"
                      : "bg-cyan-500 bg-opacity-5"
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </div>
          {isLoading && <div className="text-copper-100">Thinking...</div>}
          {!isLoading && !showEstimation && (
            <div className="mb-4">
              <AIDesignAssistant
                placeholder="Type your answer here..."
                onSend={handleSendMessage}
              />
            </div>
          )}
          {questionCount >= 4 && !isLoading && !showEstimation && (
            <div className="text-center mt-4">
              <p className="text-copper-100 mb-4">
                Would you like to provide more information or get an AI
                estimation?
              </p>
              <button
                className="btn-copper mr-4"
                onClick={() => setQuestionCount(0)}
              >
                Provide More Info
              </button>
              <button className="btn-copper" onClick={handleGetEstimation}>
                Get AI Estimation
              </button>
            </div>
          )}
          {showEstimation && !isLoading && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-copper-100">
                Project Estimation
              </h2>
              <div className="bg-cyan-500 bg-opacity-5 p-4 rounded-lg">
                <p className="text-copper-100">
                  {messages[messages.length - 1].content}
                </p>
              </div>
              <div className="mt-4 text-center">
                <button
                  className="btn-copper mr-4"
                  onClick={() => window.print()}
                >
                  Save as PDF
                </button>
                <button className="btn-copper" onClick={handleEmailEstimation}>
                  Email Estimation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
