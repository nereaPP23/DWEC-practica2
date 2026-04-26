import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ValidationProvider } from "./context/ValidationContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ValidationProvider>
        <App />
      </ValidationProvider>
    </BrowserRouter>
  </StrictMode>,
);
