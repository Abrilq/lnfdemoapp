import React from "react";
import { createRoot } from "react-dom/client";
import RolePickerDemo from "./demo_spa/role-picker-demo.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RolePickerDemo />
  </React.StrictMode>,
);
