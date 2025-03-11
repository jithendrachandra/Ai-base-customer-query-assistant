import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Info, Send, Smile } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="border-t border-neutral-200 p-3 bg-white">
      <div className="text-xs text-neutral-500 mb-1.5 px-2 flex items-center">
        <Info className="h-3 w-3 mr-1" />
        <p>Your conversation is processed by AI to provide personalized assistance.</p>
      </div>
      <form className="flex items-center" onSubmit={handleSubmit}>
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-neutral-300 rounded-full py-2.5 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            placeholder="Type your message here..."
            autoComplete="off"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-500 p-1 h-auto"
          >
            <Smile className="h-5 w-5" />
          </Button>
        </div>
        <Button
          type="submit"
          disabled={!message.trim()}
          size="icon"
          className="ml-2 bg-primary hover:bg-primary/90 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
