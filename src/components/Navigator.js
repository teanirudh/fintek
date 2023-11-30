import {
  AccountBookOutlined,
  DashboardOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import { useState } from "react";
import Accounts from "./Accounts";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Transactions from "./Transactions";

const { Content, Sider } = Layout;

const siderItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined className="pr-2" />,
  },
  {
    key: "transactions",
    label: "Transactions",
    icon: <MoneyCollectOutlined className="pr-2" />,
  },
  {
    key: "accounts",
    label: "Accounts",
    icon: <AccountBookOutlined className="pr-2" />,
  },
  {
    key: "settings",
    label: "Settings",
    icon: <SettingOutlined className="pr-2" />,
  },
];

const Navigator = () => {
  let selectedPage = null;
  const [page, setPage] = useState("ledger");

  switch (page) {
    case "dashboard":
      selectedPage = <Dashboard />;
      break;
    case "transactions":
      selectedPage = <Transactions />;
      break;
    case "accounts":
      selectedPage = <Accounts />;
      break;
    case "settings":
      selectedPage = <Settings />;
      break;
    default:
      selectedPage = <Dashboard />;
  }

  return (
    <Layout hasSider={true}>
      <Sider
        className="overflow-auto h-screen top-0 left-0 !sticky"
        theme="light"
      >
        <Menu
          mode="inline"
          items={siderItems}
          onClick={(e) => setPage(e.key)}
        />
      </Sider>
      <Layout>
        <Content style={{ overflow: "initial" }}>
          <div>{selectedPage}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Navigator;
