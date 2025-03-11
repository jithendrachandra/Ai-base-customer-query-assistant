import { apiRequest } from "./queryClient";
import { ChatRequest, ChatResponse } from "@shared/schema";

// Custom error class to handle API-specific errors
export class ApiError extends Error {
  status: number;
  errorType?: string;

  constructor(message: string, status: number, errorType?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errorType = errorType;
  }
}

export async function sendMessage(data: ChatRequest): Promise<ChatResponse> {
  const response = await apiRequest("POST", "/api/chat", data);
  
  // Check for API quota / rate limit errors
  if (response.status === 429) {
    try {
      const errorData = await response.json();
      throw new ApiError(
        errorData.message || "Service is temporarily unavailable", 
        429, 
        errorData.error
      );
    } catch (parseError) {
      // If JSON parsing fails, create a generic error
      throw new ApiError(
        "Service is temporarily unavailable", 
        429
      );
    }
  }
  
  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status
    );
  }
  
  return response.json();
}

export async function startNewChat(): Promise<{ sessionId: string }> {
  const response = await apiRequest("POST", "/api/chat/session", {});
  
  if (!response.ok) {
    throw new ApiError(
      `Failed to start new chat: ${response.status}`,
      response.status
    );
  }
  
  return response.json();
}

export async function getChatHistory(sessionId: string): Promise<{ messages: { role: string; content: string }[] }> {
  const response = await apiRequest("GET", `/api/chat/${sessionId}/history`, undefined);
  
  if (!response.ok) {
    throw new ApiError(
      `Failed to get chat history: ${response.status}`,
      response.status
    );
  }
  
  return response.json();
}
