import { pgTable, text, serial, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Chat session schema
export const chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sessionId: text("session_id").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).pick({
  userId: true,
  sessionId: true,
});

export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type ChatSession = typeof chatSessions.$inferSelect;

// Chat message schema
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().references(() => chatSessions.sessionId),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  sessionId: true,
  role: true,
  content: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

// Product schema for the demo inventory
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in cents
  category: text("category").notNull(),
  inStock: integer("in_stock").notNull().default(0),
  onSale: integer("on_sale").default(0), // discounted percentage, 0 means no discount
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  category: true,
  inStock: true,
  onSale: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Define message schemas for API communication
export const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

export const chatRequestSchema = z.object({
  message: z.string().min(1),
  sessionId: z.string().optional(),
});

export const chatResponseSchema = z.object({
  message: z.string(),
  sessionId: z.string(),
  error: z.enum(["API_QUOTA_EXCEEDED", "API_RATE_LIMIT"]).optional(),
});

// Error response types for better type safety
export const errorResponseSchema = z.object({
  message: z.string(),
  sessionId: z.string().optional(),
  error: z.enum(["API_QUOTA_EXCEEDED", "API_RATE_LIMIT"]).optional(),
});

export type Message = z.infer<typeof messageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;

// Define suggested questions
export const suggestedQuestions = [
  "What products are on sale?",
  "How do I track my order?",
  "What's your return policy?",
  "Do you offer free shipping?",
  "How can I contact customer support?"
];
