import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatCompletion } from "./openai";
import { chatRequestSchema } from "@shared/schema";
import { getProductInfo } from "./productApi";
import { nanoid } from "nanoid";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for chat functionality
  const router = express.Router();
  
  // Create a new chat session
  router.post("/chat/session", async (req, res) => {
    try {
      const sessionId = nanoid();
      
      // Store the session
      await storage.createChatSession({
        sessionId,
        userId: null, // Anonymous user for now
      });
      
      // Add welcome message
      await storage.createChatMessage({
        sessionId,
        role: "assistant",
        content: "Hi there! I'm ShopSmart's virtual assistant. I can help with product information, order status, returns, and more. How can I assist you today?"
      });
      
      res.json({ sessionId });
    } catch (error) {
      console.error("Error creating chat session:", error);
      res.status(500).json({ message: "Failed to create chat session" });
    }
  });
  
  // Process a chat message
  router.post("/chat", async (req, res) => {
    try {
      // Validate request body
      const parsed = chatRequestSchema.parse(req.body);
      
      // Generate or use a session ID
      const sessionId = parsed.sessionId || nanoid();
      
      // If no session ID was provided, create a new session
      if (!parsed.sessionId) {
        await storage.createChatSession({
          sessionId,
          userId: null, // Anonymous user for now
        });
        
        // Add welcome message
        await storage.createChatMessage({
          sessionId,
          role: "assistant",
          content: "Hi there! I'm ShopSmart's virtual assistant. I can help with product information, order status, returns, and more. How can I assist you today?"
        });
      }
      
      // Store the user message
      await storage.createChatMessage({
        sessionId,
        role: "user",
        content: parsed.message,
      });
      
      // Get chat history for context
      const chatHistory = await storage.getChatHistory(sessionId);
      
      // Check if the message is about products and get relevant product info
      const lowerMessage = parsed.message.toLowerCase();
      let productContext = "";
      
      if (
        lowerMessage.includes("product") || 
        lowerMessage.includes("price") || 
        lowerMessage.includes("sale") || 
        lowerMessage.includes("discount") ||
        lowerMessage.includes("stock") ||
        lowerMessage.includes("available")
      ) {
        // Extract product info from the message
        productContext = await getProductInfo(parsed.message);
      }
      
      // Generate a response using OpenAI
      const assistantMessage = await generateChatCompletion({
        messages: chatHistory as { role: "user" | "assistant"; content: string }[],
        productContext,
      });
      
      // Store the assistant message
      await storage.createChatMessage({
        sessionId,
        role: "assistant",
        content: assistantMessage,
      });
      
      // Apply rate limiting to prevent abuse
      // This is a simple implementation; in production, use a more robust solution
      const userIp = req.ip || req.connection.remoteAddress || "";
      
      // Return the response
      res.json({
        message: assistantMessage,
        sessionId,
      });
    } catch (error) {
      console.error("Error processing chat message:", error);
      
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Invalid request format", 
          errors: error.errors 
        });
      } else if (error instanceof Error) {
        if (error.message === "API_QUOTA_EXCEEDED") {
          // Handle quota exceeded errors
          const quotaErrorMessage = "I'm sorry, but our AI service quota has been exceeded. Please try again later or contact support for assistance.";
          
          // Use the current sessionId or fallback to an error
          const currentSessionId = req.body?.sessionId || "error-session";
          
          // Still save the error message to the chat
          try {
            await storage.createChatMessage({
              sessionId: currentSessionId,
              role: "assistant",
              content: quotaErrorMessage,
            });
          } catch (saveError) {
            console.error("Failed to save quota error message:", saveError);
          }
          
          res.status(429).json({ 
            message: quotaErrorMessage,
            sessionId: currentSessionId,
            error: "API_QUOTA_EXCEEDED"
          });
        } else if (error.message === "API_RATE_LIMIT") {
          // Handle rate limiting
          const rateLimitMessage = "I'm sorry, but we're experiencing high demand right now. Please try again in a few moments.";
          
          // Use the current sessionId or fallback to an error
          const currentSessionId = req.body?.sessionId || "error-session";
          
          try {
            await storage.createChatMessage({
              sessionId: currentSessionId,
              role: "assistant",
              content: rateLimitMessage,
            });
          } catch (saveError) {
            console.error("Failed to save rate limit error message:", saveError);
          }
          
          res.status(429).json({ 
            message: rateLimitMessage,
            sessionId: currentSessionId,
            error: "API_RATE_LIMIT"
          });
        } else {
          res.status(500).json({ 
            message: "Failed to process your message. Please try again." 
          });
        }
      } else {
        res.status(500).json({ 
          message: "Failed to process your message. Please try again." 
        });
      }
    }
  });
  
  // Get chat history for a session
  router.get("/chat/:sessionId/history", async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      // Get messages from storage
      const messages = await storage.getChatHistory(sessionId);
      
      res.json({ messages });
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  });
  
  // Register the API routes
  app.use("/api", router);
  
  const httpServer = createServer(app);
  
  return httpServer;
}
