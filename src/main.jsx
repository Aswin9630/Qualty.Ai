import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { Provider } from "react-redux";
import appStore from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </StrictMode>
);
