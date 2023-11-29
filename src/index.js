import "./styles/index.css";

import { ConfigProvider, theme } from "antd";

import React from "react";
import ReactDOM from "react-dom/client";
import Navigator from "./components/Navigator";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          fontFamily: "Gilroy, sans-serif",
          fontSize: "1rem",
        },
      }}
    >
      <Navigator />
    </ConfigProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
