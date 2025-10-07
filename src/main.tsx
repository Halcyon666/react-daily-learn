import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./challenge4.2/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
