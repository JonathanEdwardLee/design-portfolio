import { AIDesignAssistant } from "./AIDesignAssistant";

export function DesignAssistantSection() {
  return (
    <section className="bg-cyan-500 bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-lg overflow-hidden shadow-lg p-6 mb-12 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="mb-4 w-full max-w-xs">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <img
                src="/images/get_quote.gif"
                alt="Get a Quote demonstration"
                className="object-cover w-full h-full"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-6">
          <h2 className="text-3xl font-bold mb-4 text-copper-100">
            Design Assistant
          </h2>
          <p className="text-copper-300 mb-4">
            Our AI-powered design assistant helps you brainstorm and refine your
            design ideas. Whether you need inspiration for a new project or
            feedback on your current designs, our assistant is here to help.
          </p>
          <div className="mt-4">
            <AIDesignAssistant placeholder="What is your design idea?" />
          </div>
        </div>
      </div>
    </section>
  );
}
