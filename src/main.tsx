import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./chef-claude/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
