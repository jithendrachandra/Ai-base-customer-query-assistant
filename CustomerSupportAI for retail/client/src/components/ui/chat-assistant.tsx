import { useState, useEffect } from "react";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { useToast } from "@/hooks/use-toast";
import { ApiError, startNewChat, sendMessage, getChatHistory } from "@/lib/api";
import { suggestedQuestions } from "@shared/schema";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [apiError, setApiError] = useState<{ title: string; message: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize a new chat session when the component mounts
    const initChat = async () => {
      try {
        const { sessionId } = await startNewChat();
        setSessionId(sessionId);
        setApiError(null);
        
        // Add welcome message
        setMessages([{
          role: "assistant",
          content: "Hi there! I'm ShopSmart's virtual assistant. I can help with product information, order status, returns, and more. How can I assist you today?"
        }]);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        toast({
          title: "Connection Error",
          description: "Could not connect to the chat service. Please try again later.",
          variant: "destructive"
        });
      }
    };

    initChat();
  }, [toast]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !sessionId) return;

    // Clear any existing API errors
    setApiError(null);

    // Add user message to state immediately
    setMessages(prev => [...prev, { role: "user", content }]);
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Send message to API
      const response = await sendMessage({
        message: content,
        sessionId
      });
      
      // Add response to messages
      setMessages(prev => [...prev, { role: "assistant", content: response.message }]);
    } catch (error) {
      console.error("Failed to send message:", error);
      
      // Default error message for any error type
      const defaultErrorMessage = "I'm sorry, but our AI service is currently unavailable. Please try again later or contact support.";
      
      // Always show the error in the chat for better visibility
      setMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: error instanceof ApiError ? error.message : defaultErrorMessage
        }
      ]);
      
      // For API-specific errors, show the alert box with more details
      if (error instanceof ApiError) {
        if (error.status === 429) {
          if (error.errorType === "API_QUOTA_EXCEEDED") {
            setApiError({
              title: "AI Service Quota Exceeded",
              message: "Our AI service has reached its usage limit. Please try again later or contact support."
            });
          } else if (error.errorType === "API_RATE_LIMIT") {
            setApiError({
              title: "Service Busy",
              message: "We're experiencing high demand right now. Please try again in a few moments."
            });
          } else {
            setApiError({
              title: "Service Temporarily Unavailable",
              message: "The AI service is currently unavailable. Please try again later."
            });
          }
        } else {
          // For other API errors
          setApiError({
            title: "Message Error",
            message: error.message || "Failed to send your message. Please try again."
          });
        }
      } else {
        // For non-API errors
        setApiError({
          title: "Connection Error",
          message: "There was a problem connecting to the service. Please check your connection and try again."
        });
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto shadow-lg bg-white rounded-lg overflow-hidden">
      <ChatHeader />
      
      {apiError && (
        <Alert variant="destructive" className="m-4 mb-0">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{apiError.title}</AlertTitle>
          <AlertDescription>
            {apiError.message}
          </AlertDescription>
        </Alert>
      )}
      
      <ChatMessages 
        messages={messages} 
        isTyping={isTyping} 
        suggestedQuestions={suggestedQuestions}
        onSuggestedQuestionClick={handleSuggestedQuestion}
      />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
