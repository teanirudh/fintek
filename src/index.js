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
        },
        components: {
          Layout: {
            bodyBg: "#f5f6fa",
            headerBg: "#f5f6fa",
            siderBg: "#f5f6fa",
            footerBg: "#f5f6fa",
          },
          Menu: {
            itemBg: "#f5f6fa",
            activeBarBorderWidth: 0,
          },
          Table: {
            headerBorderRadius: 24,
            stickyScrollBarBorderRadius: 50,
          },
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
