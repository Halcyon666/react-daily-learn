import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Chef Claude/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
