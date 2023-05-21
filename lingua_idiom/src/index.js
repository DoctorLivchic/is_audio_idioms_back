import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./Main.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const app = ReactDOMClient.createRoot(document.getElementById("root"));

app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
