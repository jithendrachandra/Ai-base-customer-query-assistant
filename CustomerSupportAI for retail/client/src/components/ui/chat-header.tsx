import { Button } from "./button";
import { X, Minus, Headphones } from "lucide-react";

export function ChatHeader() {
  return (
    <div className="border-b border-neutral-200 p-4 flex justify-between items-center bg-white">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
          <Headphones size={20} />
        </div>
        <div>
          <h1 className="font-semibold text-neutral-800">ShopSmart Assistant</h1>
          <div className="flex items-center text-sm">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-neutral-500">Online now</span>
          </div>
        </div>
      </div>
      <div className="flex">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full" 
          aria-label="Minimize chat"
        >
          <Minus className="h-4 w-4 text-neutral-500" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full" 
          aria-label="Close chat"
        >
          <X className="h-4 w-4 text-neutral-500" />
        </Button>
      </div>
    </div>
  );
}
