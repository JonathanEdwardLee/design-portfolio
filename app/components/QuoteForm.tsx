import React, { useState } from "react";
import { Dialog, Flex, Text } from "@radix-ui/themes";
import { TextField, createTheme, ThemeProvider } from "@mui/material";
import { Close } from "@mui/icons-material";
import Button from "./Button";

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  openAIChat: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({
  isOpen,
  onClose,
  openAIChat,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/submit-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quote request");
      }

      // Reset form and close dialog on successful submission
      setFormData({ name: "", email: "", phone: "", description: "" });
      onClose();
    } catch (error) {
      console.error("Error submitting quote:", error);
      setSubmitError(
        "An error occurred while submitting your quote request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScheduleChat = () => {
    window.open(
      "https://calendly.com/hoopsnakedesigns/let-s-chat-about-your-project",
      "_blank"
    );
  };

  const privacyPolicy = `
    Privacy Policy: We respect your privacy and are committed to protecting your personal data. 
    The information you provide will be used solely for the purpose of processing your quote request 
    and communicating with you about your project. We will not share your information with third parties 
    without your consent, except as required by law. By submitting this form, you agree to our use of 
    your data in accordance with this policy.
  `;

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
    },
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Title>Get a Quote</Dialog.Title>
        <Text as="p">
          Enter your details for a quote! Jonathan will email you back as soon
          as possible. I recommend using the{" "}
          <span
            onClick={openAIChat}
            style={{
              cursor: "pointer",
              color: "#00FFFF",
              textDecoration: "underline",
            }}
          >
            AI Assistant
          </span>{" "}
          to discuss your project. You can copy and paste the project
          description it helps you write here for the quote.
        </Text>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <ThemeProvider theme={darkTheme}>
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                color="primary"
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                color="primary"
              />
              <TextField
                name="phone"
                label="Phone (optional)"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                color="primary"
              />
              <TextField
                name="description"
                label="Project Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                fullWidth
                color="primary"
              />
              <Text as="p" size="1">
                {privacyPolicy}
              </Text>
              <Button type="submit" disabled={isSubmitting} onClick={() => {}}>
                {isSubmitting ? "Submitting..." : "Submit Quote Request"}
              </Button>
              {submitError && <Text color="red">{submitError}</Text>}
            </ThemeProvider>
          </Flex>
        </form>
        <Flex direction="column" align="center" style={{ marginTop: "20px" }}>
          <Text as="p">Want to discuss your project in person?</Text>
          <Button onClick={handleScheduleChat} style={{ marginTop: "10px" }}>
            Schedule a chat with Jonathan
          </Button>
        </Flex>
        <Flex justify="end" style={{ marginTop: "20px" }}>
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
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default QuoteForm;
