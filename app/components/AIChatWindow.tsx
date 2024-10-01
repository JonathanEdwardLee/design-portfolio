import React, { useState, Suspense } from "react";
import { Dialog, Flex, Text, Button } from "@radix-ui/themes";
import { TextField } from "@mui/material"; // Add this import at the top of the file
import { useChat } from "../components/ChatContext";
import { useSearchParams } from "next/navigation";
import { Close, Refresh } from "@mui/icons-material";
import { Link } from "@radix-ui/themes";
import NextLink from "next/link";
import { styled } from "@mui/system";

interface AIChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

// Custom styled TextField
const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.23)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "teal",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
});

const AIChatWindowContent: React.FC<AIChatWindowProps> = ({
  isOpen,
  onClose,
}) => {
  const { messages, sendMessage, showEstimation, resetChat } = useChat();
  const { isLoading } = useChat();
  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState("initial");
  const searchParams = useSearchParams();
  const idea = searchParams.get("idea");
  const service = searchParams.get("service");

  const [quoteData, setQuoteData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    projectDetails: "",
    quoteAmount: 0,
    description: "",
    projectDuration: "",
    revisions: "",
  });

  // Add this new state for the privacy policy modal
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  // Add this function to toggle the privacy policy modal
  const togglePolicyModal = () => setIsPolicyOpen(!isPolicyOpen);

  // Add this privacy policy text (you should replace this with your actual privacy policy)
  const privacyPolicyText = `
  Privacy Policy

  1. Information Collection: We collect personal information that you voluntarily provide to us when you use our AI Chat Assistant.

  2. Use of Information: We use the information to provide and improve our services, communicate with you, and generate project estimates.

  3. Data Protection: We implement security measures to protect your personal information against unauthorized access or disclosure.

  4. Third-Party Disclosure: We do not sell, trade, or otherwise transfer your personal information to outside parties.

  5. Your Rights: You have the right to access, correct, or delete your personal information at any time.

  6. Changes to Policy: We may update this policy from time to time. Please check this page periodically for changes.

  7. Contact Us: If you have any questions about this privacy policy, please contact us at 417-501-5588.
  `;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuoteData({ ...quoteData, [e.target.name]: e.target.value });
  };

  const handleInitialChoice = (choice: string) => {
    setCurrentStep(choice);
    if (choice === "getQuote") {
      sendMessage("I'd like to get a quote for a project.");
    } else if (choice === "learnServices") {
      sendMessage("Can you tell me about your services?");
    } else if (choice === "generalQuestions") {
      setCurrentStep("chat");
    } else if (choice === "scheduleConsultation") {
      setCurrentStep("scheduleConsultation");
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleSubmitQuote = async () => {
    try {
      const response = await fetch("/api/submit-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quote");
      }

      const estimatedPrice = calculateEstimatedPrice(quoteData);
      const aiMessage = `Thank you for submitting your quote request! Based on the information provided, here's an AI-powered estimate for your project:

Estimated Price Range: $${estimatedPrice.min} - $${estimatedPrice.max}

We'll review your request and get back to you soon with a more accurate quote.`;

      sendMessage(aiMessage);
      setCurrentStep("chat");
    } catch (error) {
      console.error("Error submitting quote:", error);
      sendMessage(
        "I'm sorry, there was an error submitting your quote. Please try again or contact us directly."
      );
    }
  };

  const calculateEstimatedPrice = (data: typeof quoteData) => {
    let basePrice = 0;
    let complexityPoints = 0;
    let durationFactor = 1;
    let revisionCost = 0;

    // Project type and basic pricing
    switch (data.projectType.toLowerCase()) {
      case "graphic design":
        basePrice = 150;
        if (data.projectDetails.toLowerCase().includes("logo")) {
          complexityPoints += 2;
          if (data.projectDetails.toLowerCase().includes("brand package")) {
            complexityPoints += 5;
          }
        } else if (
          data.projectDetails.toLowerCase().includes("t-shirt") ||
          data.projectDetails.toLowerCase().includes("flyer")
        ) {
          complexityPoints += 1;
        }
        break;
      case "web design":
        basePrice = 1000;
        if (data.projectDetails.toLowerCase().includes("e-commerce")) {
          complexityPoints += 10;
        } else if (data.projectDetails.toLowerCase().includes("blog")) {
          complexityPoints += 5;
        }
        break;
      case "audio production":
        basePrice = 200;
        if (data.projectDetails.toLowerCase().includes("full album")) {
          complexityPoints += 15;
        } else if (data.projectDetails.toLowerCase().includes("ep")) {
          complexityPoints += 8;
        }
        break;
      default:
        basePrice = 100;
    }

    // Complexity adjustments
    if (data.projectDetails.toLowerCase().includes("custom"))
      complexityPoints += 3;
    if (data.projectDetails.toLowerCase().includes("rush"))
      complexityPoints += 5;
    if (data.projectDetails.toLowerCase().includes("premium"))
      complexityPoints += 7;

    // Duration factor
    if (data.projectDetails.toLowerCase().includes("1 week"))
      durationFactor = 1.2;
    else if (data.projectDetails.toLowerCase().includes("1 month"))
      durationFactor = 1.5;
    else if (data.projectDetails.toLowerCase().includes("3 months"))
      durationFactor = 2;
    else if (data.projectDetails.toLowerCase().includes("6 months"))
      durationFactor = 2.5;

    // Revisions
    const revisionMatch = data.projectDetails
      .toLowerCase()
      .match(/(\d+)\s*revisions?/);
    if (revisionMatch) {
      const revisionCount = parseInt(revisionMatch[1]);
      revisionCost = Math.max(0, revisionCount - 3) * 50; // First 3 revisions free, then $50 each
    }

    // Calculate final price range
    let minPrice = Math.round(
      (basePrice + complexityPoints * 50) * durationFactor + revisionCost
    );
    let maxPrice = Math.round(minPrice * 1.5); // 50% more for max price

    // Maintenance adjustment
    if (data.projectDetails.toLowerCase().includes("maintenance")) {
      if (data.projectDetails.toLowerCase().includes("basic")) {
        minPrice += 100;
        maxPrice += 100;
      } else if (data.projectDetails.toLowerCase().includes("standard")) {
        minPrice += 200;
        maxPrice += 300;
      } else if (data.projectDetails.toLowerCase().includes("premium")) {
        minPrice += 500;
        maxPrice += 1000;
      }
    }

    return { min: minPrice, max: maxPrice };
  };

  const handleRestart = () => {
    resetChat();
    setCurrentStep("initial");
    setInput("");
    setQuoteData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      projectDetails: "",
      quoteAmount: 0,
      description: "",
      projectDuration: "",
      revisions: "",
    });
  };

  const renderContent = () => {
    switch (currentStep) {
      case "initial":
        return (
          <Flex direction="column" gap="2">
            <Button onClick={() => handleInitialChoice("getQuote")}>
              Get a Quote
            </Button>
            <Button onClick={() => handleInitialChoice("learnServices")}>
              Learn About Services
            </Button>
            <Button onClick={() => handleInitialChoice("generalQuestions")}>
              General Questions
            </Button>
            <Button onClick={() => handleInitialChoice("scheduleConsultation")}>
              Schedule a Chat!
            </Button>
          </Flex>
        );
      case "chat":
        return (
          <>
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
            <Button onClick={handleSend} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </>
        );
      case "getQuote":
        return showEstimation ? (
          <Flex direction="column" gap="2">
            <Text weight="bold" color="teal">
              Project Estimation
            </Text>
            {messages.length > 0 && (
              <Text color="teal">{messages[messages.length - 1].content}</Text>
            )}
            <StyledTextField
              name="name"
              label="Your Name"
              value={quoteData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <StyledTextField
              name="email"
              label="Your Email"
              value={quoteData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <StyledTextField
              name="phone"
              label="Your Phone (optional)"
              value={quoteData.phone}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <StyledTextField
              name="projectType"
              label="Project Type"
              value={quoteData.projectType}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              helperText="e.g., Graphic Design, Web Design, Audio Production"
            />
            <StyledTextField
              name="projectDetails"
              label="Project Details"
              value={quoteData.projectDetails}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              helperText="Include complexity, features, timeline, revisions needed"
            />
            <StyledTextField
              name="projectDuration"
              label="Estimated Project Duration"
              value={quoteData.projectDuration}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              helperText="e.g., 1 week, 1 month, 3 months"
            />
            <StyledTextField
              name="revisions"
              label="Number of Revisions Needed"
              value={quoteData.revisions}
              onChange={handleInputChange}
              type="number"
              fullWidth
              margin="normal"
            />
            <Text
              as="span"
              color="blue"
              style={{ cursor: "pointer" }}
              onClick={togglePolicyModal}
            >
              Privacy Policy
            </Text>
            <Button onClick={handleSubmitQuote}>Submit Quote</Button>

            {/* Privacy Policy Modal */}
            <Dialog.Root open={isPolicyOpen} onOpenChange={togglePolicyModal}>
              <Dialog.Content>
                <Dialog.Title>Privacy Policy</Dialog.Title>
                <Text style={{ whiteSpace: "pre-wrap" }}>
                  {privacyPolicyText}
                </Text>
                <Dialog.Close>
                  <Button onClick={togglePolicyModal}>Close</Button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Root>
          </Flex>
        ) : (
          <Flex direction="column" gap="2">
            <Text color="teal">
              Let's gather some information for your quote:
            </Text>
            <TextField
              fullWidth
              placeholder="Type your project details..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              InputProps={{
                style: {
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            />
            <Button onClick={handleSend} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </Flex>
        );
      case "scheduleConsultation":
        return (
          <Flex direction="column" gap="2">
            <Text color="teal">Choose a consultation option:</Text>
            <Link asChild>
              <NextLink
                href="https://calendly.com/hoopsnakedesigns/let-s-chat-about-your-project"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  Schedule a call, video chat, or in-person meet-up
                </Button>
              </NextLink>
            </Link>

            <Text color="teal">
              Or text/call 417-501-5588 Mon, Tue, Thur, Fri 4-8pm.
            </Text>
          </Flex>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Title>AI Design Assistant</Dialog.Title>
        <Flex
          direction="column"
          gap="3"
          style={{ position: "relative", minHeight: "300px" }}
        >
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
          {renderContent()}
          <Flex
            style={{
              position: "sticky",
              bottom: "10px",
              right: "10px",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <Button onClick={handleRestart}>
              <Refresh />
            </Button>
            <Button onClick={onClose}>
              <Close />
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

const AIChatWindow: React.FC<AIChatWindowProps> = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AIChatWindowContent {...props} />
    </Suspense>
  );
};

export default AIChatWindow;
