import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { Provider } from "react-redux";
import appStore from "./redux/store.js";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
    <Provider store={appStore}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
    </HelmetProvider>
  </StrictMode>
);
