import * as React from "react";

export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1">
      <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
      <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
      <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></div>
    </div>
  );
}
