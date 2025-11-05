// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./index.css";
import App from "./App.jsx";

const paypalOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "",
  currency: "USD",
  intent: "capture",
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PayPalScriptProvider options={paypalOptions}>
        <App />
      </PayPalScriptProvider>
    </BrowserRouter>
  </StrictMode>
);
