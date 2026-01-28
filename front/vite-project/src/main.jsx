import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UsersProvider } from "./context/UsersContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <UsersProvider>
        <App />
      </UsersProvider>
    </StrictMode>
    ,
  </BrowserRouter>,
);
