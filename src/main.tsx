import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { HashRouter } from "react-router-dom";
import { toggleFullscreen } from "./lib/utils";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Provider } from "react-redux";
import { store } from "./redux/store";

document.addEventListener("keydown", (event) => {
  if (event.key === "F11") {
    toggleFullscreen();
  }
});

ChartJS.register(ArcElement, Tooltip);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
