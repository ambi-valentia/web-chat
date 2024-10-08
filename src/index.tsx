import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
