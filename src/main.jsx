import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Clarity from "@microsoft/clarity";

import "./index.css";
import App from "./App.jsx";

//
// Make sure to add your actual project id instead of "yourProjectId".
const projectId = "qijs7amxw9";

Clarity.init(projectId);
//

//
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
