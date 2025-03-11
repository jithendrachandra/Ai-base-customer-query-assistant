import OpenAI from "openai";
import { Message } from "@shared/schema";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// Log whether the API key is available (but don't show the actual key)
console.log("OpenAI API Key available:", !!process.env.OPENAI_API_KEY);
console.log("OpenAI API Key length:", process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);
console.log("Using local AI simulation mode for testing purposes");

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// System prompt for the chatbot
const SYSTEM_PROMPT = `You are a helpful and friendly customer service assistant for ShopSmart, an online retail store.
You help customers with questions about products, order status, returns, shipping, and store policies.

Guidelines:
1. Be professional, friendly, and concise in your responses.
2. When you don't have enough information to fully answer a question, ask for clarification.
3. For order tracking, returns, or account-specific questions, explain the general process and ask for specific details when needed.
4. When referring to prices, always use dollars ($) as the currency.

Store Policies:
- Return Policy: Items can be returned within 30 days of purchase with a receipt for a full refund. Without a receipt, store credit at the current selling price is offered. All items must be unused and in original packaging.
- Shipping Policy: Standard shipping (5-7 business days) is free for orders over $50. Express shipping (2-3 business days) costs $9.99. Overnight shipping is available for $24.99.
- Price Match: ShopSmart matches competitors' prices within 14 days of purchase if the same item is found at a lower price.

Current Promotions:
- Summer Sale: Up to 40% off selected outdoor furniture, garden accessories, and seasonal clothing.
- Free shipping on all orders over $50.
- Buy one, get one 50% off on select electronics.
`;

// Interface for the chat completion options
interface ChatCompletionOptions {
  messages: Message[];
  productContext?: string;
}

// Simulation responses for testing without using OpenAI API
const simulationResponses: Record<string, string> = {
  "default": "Thank you for contacting ShopSmart customer service. How can I help you today?",
  "hello": "Hello! Welcome to ShopSmart customer service. How can I assist you today?",
  "hi": "Hi there! Thanks for reaching out to ShopSmart customer service. What can I help you with?",
  "return policy": "Our return policy allows for returns within 30 days of purchase with a receipt for a full refund. Without a receipt, we offer store credit at the current selling price. All items must be unused and in their original packaging.",
  "shipping": "We offer several shipping options: Standard shipping (5-7 business days) is free for orders over $50. Express shipping (2-3 business days) costs $9.99. Overnight shipping is available for $24.99.",
  "order status": "To check your order status, please provide your order number. Once I have that information, I can look up the current status of your order.",
  "price match": "ShopSmart matches competitors' prices within 14 days of purchase if the same item is found at a lower price. To request a price match, please provide details of the competitor's offer.",
  "promotions": "We're currently running several promotions: Summer Sale with up to 40% off selected outdoor furniture, garden accessories, and seasonal clothing. Free shipping on all orders over $50. Buy one, get one 50% off on select electronics.",
  "product": "We have a wide range of products available. Could you please specify which product or category you're interested in?",
  "electronics": "Our electronics department features the latest smartphones, laptops, tablets, smart home devices, and gaming consoles. Many electronics items are currently part of our buy one, get one 50% off promotion.",
  "furniture": "Our furniture collection includes living room, bedroom, dining room, and outdoor furniture. We're currently offering up to 40% off selected outdoor furniture as part of our Summer Sale.",
  "clothing": "We carry a variety of clothing options for men, women, and children, including casual wear, formal attire, and seasonal collections. Selected seasonal clothing is currently on sale as part of our Summer Sale with up to 40% off.",
  "refund": "Refunds are processed in the original form of payment and typically take 5-7 business days to appear in your account after we receive and process your return.",
  "hours": "Our customer service team is available Monday through Friday from 8 AM to 8 PM, and Saturday and Sunday from 9 AM to 6 PM Eastern Time.",
  "contact": "You can contact us through this chat assistant, by phone at 1-800-SHOPSMART, or by email at support@shopsmart.example.com.",
  "sale": "Our Summer Sale is currently running with up to 40% off selected outdoor furniture, garden accessories, and seasonal clothing.",
  "discount": "We offer various discounts throughout the year. Currently, we have our Summer Sale with up to 40% off selected items and buy one, get one 50% off on select electronics.",
};

export async function generateChatCompletion({ 
  messages, 
  productContext 
}: ChatCompletionOptions): Promise<string> {
  try {
    // For testing without API key, use a simulated response
    const USE_SIMULATION = true; // Set to true to use simulation instead of real API
    
    if (USE_SIMULATION) {
      console.log("Using simulated AI response");
      
      // Get the last user message
      const lastUserMsg = messages.filter(m => m.role === "user").pop();
      
      if (!lastUserMsg) {
        return simulationResponses["default"];
      }
      
      const userInput = lastUserMsg.content.toLowerCase();
      
      // Find a suitable response based on keywords in the user message
      for (const [keyword, response] of Object.entries(simulationResponses)) {
        if (userInput.includes(keyword.toLowerCase())) {
          // Add a slight delay to simulate thinking
          await new Promise(resolve => setTimeout(resolve, 500));
          return response;
        }
      }
      
      // If no keyword match, use a generic response
      return "Thank you for your question. I'm happy to help with your inquiry about " + 
        userInput.substring(0, 20) + 
        "... To provide you with the most accurate information, could you please provide more specific details?";
    }
    
    // If not using simulation, proceed with OpenAI API
    // Add product context to the system prompt if available
    let systemMessage = SYSTEM_PROMPT;
    if (productContext) {
      systemMessage += `\nProduct Information:\n${productContext}`;
    }

    // Properly typed messages for OpenAI API
    const formattedMessages: ChatCompletionMessageParam[] = [
      { role: "system", content: systemMessage },
      ...messages.map(msg => ({ 
        role: msg.role === "user" ? "user" : "assistant", 
        content: msg.content 
      })) as ChatCompletionMessageParam[]
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error: any) {
    console.error("Error generating chat completion:", error);
    
    // Check for quota or rate limit issues
    if (error.error?.type === 'insufficient_quota' || error.code === 'insufficient_quota') {
      throw new Error("API_QUOTA_EXCEEDED");
    } else if (error.status === 429) {
      throw new Error("API_RATE_LIMIT");
    } 
    
    throw new Error("Failed to generate a response. Please try again later.");
  }
}
