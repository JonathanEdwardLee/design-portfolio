import { Card, Heading, Text } from "@radix-ui/themes";
import Button from "./Button";

interface DesignAssistantSectionProps {
  onOpenChat: () => void;
}

export function DesignAssistantSection({
  onOpenChat,
}: DesignAssistantSectionProps) {
  return (
    <Card className="mb-12 max-w-4xl mx-auto">
      <Heading as="h2" size="6" className="mb-4 text-copper-100 font-gruppo">
        AI Design Assistant
      </Heading>
      <Text as="p" size="3" className="mb-4 text-copper-300 font-gruppo">
        Ready to bring your vision to life? Use my AI-powered design assistant
        to streamline the process. Simply describe the type of service you need,
        and the assistant will guide you through refining the details of your
        project. Get an instant estimated quote based project idea. Whether
        it&apos;s graphic design, web design, or audio production, my AI
        assistant trained to answer your questions. Try it now to explore your
        options and receive a personalized estimate!
      </Text>
      <div className="mt-4">
        <Button onClick={onOpenChat}>Chat with AI Assistant</Button>
      </div>
    </Card>
  );
}
