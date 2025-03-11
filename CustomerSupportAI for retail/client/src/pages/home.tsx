import { ChatAssistant } from "@/components/ui/chat-assistant";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-50 p-8">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to ShopSmart Customer Service
          </h1>
          <p className="text-gray-700 mb-6">
            Our AI-powered assistant is here to help with your questions about products, orders, returns, and more.
          </p>
        </div>
      </div>
      
      <div className="w-full max-w-4xl">
        <ChatAssistant />
      </div>
    </div>
  );
}
