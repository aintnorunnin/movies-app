import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { MoviesContextProvider } from "./context/MoviesContext";

ReactDOM.render(
  <MoviesContextProvider>
    <App />
  </MoviesContextProvider>,
  document.getElementById("root")
);
