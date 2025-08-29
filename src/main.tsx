import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppPan } from "../AppPan";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppPan />
  </StrictMode>
);
