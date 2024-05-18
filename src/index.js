import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
