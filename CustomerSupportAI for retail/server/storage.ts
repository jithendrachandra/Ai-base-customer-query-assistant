import { users, type User, type InsertUser, 
  type ChatSession, type InsertChatSession, 
  type ChatMessage, type InsertChatMessage } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Chat session methods
  getChatSession(sessionId: string): Promise<ChatSession | undefined>;
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  
  // Chat message methods
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatHistory(sessionId: string): Promise<{ role: string; content: string }[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatSessions: Map<string, ChatSession>;
  private chatMessages: Map<string, ChatMessage[]>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.chatSessions = new Map();
    this.chatMessages = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Chat session methods
  async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
    return this.chatSessions.get(sessionId);
  }
  
  async createChatSession(session: InsertChatSession): Promise<ChatSession> {
    const newSession: ChatSession = {
      ...session,
      id: this.currentId++,
      createdAt: new Date(),
      userId: session.userId || null, // Ensure userId is not undefined
    };
    
    this.chatSessions.set(session.sessionId, newSession);
    
    // Initialize empty message array for this session
    if (!this.chatMessages.has(session.sessionId)) {
      this.chatMessages.set(session.sessionId, []);
    }
    
    return newSession;
  }
  
  // Chat message methods
  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return this.chatMessages.get(sessionId) || [];
  }
  
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const newMessage: ChatMessage = {
      ...message,
      id: this.currentId++,
      timestamp: new Date(),
    };
    
    // Get existing messages or create new array
    const messages = this.chatMessages.get(message.sessionId) || [];
    
    // Add the new message
    messages.push(newMessage);
    
    // Update the messages map
    this.chatMessages.set(message.sessionId, messages);
    
    return newMessage;
  }
  
  // Get formatted chat history for a session (for AI context)
  async getChatHistory(sessionId: string): Promise<{ role: "user" | "assistant"; content: string }[]> {
    const messages = await this.getChatMessages(sessionId);
    
    // Return messages in the format expected by OpenAI
    return messages.map(msg => ({
      role: msg.role as "user" | "assistant", // Ensure correct typing
      content: msg.content,
    }));
  }
}

export const storage = new MemStorage();
