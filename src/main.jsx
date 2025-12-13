// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import WhatsAppButton from "./components/WhatsAppButton";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
