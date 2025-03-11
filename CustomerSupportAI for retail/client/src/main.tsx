import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find root element");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log("Application successfully rendered");
  } catch (error) {
    console.error("Error rendering application:", error);
  }
}
