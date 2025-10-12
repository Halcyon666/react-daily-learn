import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./other-filed-in-form/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
