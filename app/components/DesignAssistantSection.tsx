import Image from "next/image";
import { AIDesignAssistant } from "./AIDesignAssistant";
import { useRouter } from "next/navigation";

export function DesignAssistantSection() {
  const router = useRouter();

  const handleSendMessage = async (message: string) => {
    router.push(`/project-blueprint?idea=${encodeURIComponent(message)}`);
  };

  return (
    <section className="bg-cyan-500 bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-lg overflow-hidden shadow-lg p-6 mb-12 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-6">
          <h2 className="text-3xl font-bold mb-4 text-copper-100">
            Design Assistant
          </h2>
          <p className="text-copper-300 mb-4">
            Ready to bring your vision to life? Use my AI-powered design
            assistant to streamline the process. Simply describe the type of
            service you need, and the assistant will guide you through refining
            the details of your project. Get an instant quote based on your
            budget and timeline. Whether it&apos;s graphic design, web design,
            or audio production, my AI assistant ensures your project stays on
            track. Try it now to explore your options and receive a personalized
            estimate!
          </p>
          <div className="mt-4">
            <AIDesignAssistant
              placeholder="What is your design idea?"
              onSend={handleSendMessage}
            />
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col items-center justify-center mt-6 md:mt-0">
          <div className="w-full h-full">
            <div className="relative w-full h-0 pb-[56.25%]">
              <Image
                src="/images/get_quote.gif"
                alt="Get a Quote demonstration"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
