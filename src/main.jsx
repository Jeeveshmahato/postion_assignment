import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import DarkModeToggle from "./components/DarkModeToggle";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeToggle />
    <App />
  </React.StrictMode>
); 