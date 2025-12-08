import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./redux/rtk/App";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./redux/rtk/api/apiSlice.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
