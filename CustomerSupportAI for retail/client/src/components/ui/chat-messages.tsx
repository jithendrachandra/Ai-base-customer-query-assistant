import { useEffect, useRef } from "react";
import { TypingIndicator } from "./typing-indicator";
import { Button } from "./button";
import { Headphones } from "lucide-react";
import type { Message } from "./chat-assistant";

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  suggestedQuestions: string[];
  onSuggestedQuestionClick: (question: string) => void;
}

export function ChatMessages({ 
  messages, 
  isTyping, 
  suggestedQuestions,
  onSuggestedQuestionClick 
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 chat-container bg-white">
      {messages.map((message, index) => (
        message.role === "assistant" ? (
          // Assistant messages
          <div key={index} className="flex mb-4 items-start message-appear">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-2 flex-shrink-0">
              <Headphones size={16} />
            </div>
            <div className="bg-neutral-100 rounded-lg rounded-tl-none p-3 max-w-[80%]">
              <p className="text-sm text-neutral-800 whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
          </div>
        ) : (
          // User messages
          <div key={index} className="flex mb-4 justify-end message-appear">
            <div className="bg-primary text-white rounded-lg rounded-tr-none p-3 max-w-[80%]">
              <p className="text-sm whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
          </div>
        )
      ))}

      {/* Show suggested questions after first message */}
      {messages.length === 1 && (
        <div className="mb-6 pl-10 message-appear">
          <div className="text-xs text-neutral-500 mb-2">Suggested questions:</div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.slice(0, 3).map((question, index) => (
              <Button 
                key={index}
                variant="outline" 
                size="sm"
                className="bg-neutral-50 hover:bg-neutral-100 text-primary text-sm border border-neutral-200 rounded-full px-3 py-1.5 transition-colors h-auto"
                onClick={() => onSuggestedQuestionClick(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Typing indicator */}
      {isTyping && (
        <div className="flex mb-4 items-start">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-2 flex-shrink-0">
            <Headphones size={16} />
          </div>
          <div className="bg-neutral-100 rounded-lg rounded-tl-none p-3">
            <TypingIndicator />
          </div>
        </div>
      )}

      {/* Invisible element for scrolling to the end */}
      <div ref={messagesEndRef} />
    </div>
  );
}
