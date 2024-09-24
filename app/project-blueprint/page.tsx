"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useChat } from "../hooks/useChat";
import { AIDesignAssistant } from "../components/AIDesignAssistant";
import Link from "next/link";

export default function ProjectBlueprint() {
  const searchParams = useSearchParams();
  const idea = searchParams.get("idea");
  const { messages, sendMessage, isLoading, error } = useChat();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showEstimation, setShowEstimation] = useState(false);

  const questions = [
    "What specific features or functionalities are you looking for in this project?",
    "What is your target audience or market?",
    "What is your desired timeline for this project?",
    "Do you have a budget range in mind for this project?",
  ];

  useEffect(() => {
    if (idea && messages.length === 0) {
      const designArea = getDesignArea(idea);
      const initialQuestion = getInitialQuestion(designArea);
      sendMessage(`User's idea: ${idea}\n\nAI: ${initialQuestion}`);
    }
  }, [idea, messages]);

  const getDesignArea = (idea: string): "audio" | "graphic" | "web" => {
    if (idea.toLowerCase().includes("audio")) return "audio";
    if (idea.toLowerCase().includes("graphic")) return "graphic";
    return "web";
  };

  const getInitialQuestion = (
    designArea: "audio" | "graphic" | "web"
  ): string => {
    switch (designArea) {
      case "audio":
        return "That sounds like an interesting audio project. What kind of audio elements are you looking to incorporate?";
      case "graphic":
        return "Great idea for a graphic design project. What style or visual elements are you envisioning?";
      case "web":
        return "Exciting web design concept. What key features or pages do you want to include in your website?";
    }
  };

  const handleSendMessage = useCallback(
    async (content: string) => {
      try {
        await sendMessage(content);
        setCurrentQuestion((prev) => {
          if (prev < questions.length) {
            return prev + 1;
          }
          return prev;
        });
      } catch (error) {
        console.error("Error in handleSendMessage:", error);
        // You can add additional error handling here if needed
      }
    },
    [sendMessage, questions.length]
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
          {currentQuestion < questions.length &&
            !isLoading &&
            !showEstimation && (
              <div className="mb-4">
                <p className="text-copper-100 mb-2">
                  {questions[currentQuestion]}
                </p>
                <AIDesignAssistant
                  placeholder="Type your answer here..."
                  onSend={handleSendMessage}
                />
              </div>
            )}
          {currentQuestion >= questions.length &&
            !isLoading &&
            !showEstimation && (
              <div className="text-center">
                <p className="text-copper-100 mb-4">
                  Would you like to answer more questions for a detailed
                  estimate, or get a general AI estimation?
                </p>
                <button
                  className="btn-copper mr-4"
                  onClick={() => setCurrentQuestion(0)}
                >
                  More Questions
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
