import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Tooltip } from "react-tooltip";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Tooltip id="my-tooltip" />
  </React.StrictMode>
);
