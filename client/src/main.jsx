import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

// import './scss/styles.scss'
import * as bootstrap from "bootstrap";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <App />
  </StrictMode>
);
