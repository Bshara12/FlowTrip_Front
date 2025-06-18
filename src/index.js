import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./css/all.min.css";
import { BrowserRouter } from "react-router-dom";

import { colors } from "./Component/Color.js";

// إعداد المتغيرات داخل :root
const rootStyle = document.documentElement;
Object.entries(colors).forEach(([key, value]) => {
  rootStyle.style.setProperty(`--${key}`, value);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);