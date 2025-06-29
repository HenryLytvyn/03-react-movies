import { StrictMode } from "react";
import "modern-normalize";
import { createRoot } from "react-dom/client";
import App from "./components/App/App.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
