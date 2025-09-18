import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { RideProvider } from "./context/RideContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RideProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
        </RideProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
