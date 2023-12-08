import {
  AccountBookOutlined,
  DashboardOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography } from "antd";

import { useState } from "react";
import Logo from "../assets/budget.png";
import Accounts from "./Accounts";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Transactions from "./Transactions";

const { Sider } = Layout;
const { Title } = Typography;

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
  const [page, setPage] = useState("transactions");

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
      <Sider className="overflow-auto h-screen top-0 left-0 !sticky">
        <div className="h-[16vh] flex flex-col justify-center items-center">
          <img src={Logo} alt="Logo" className="w-[8vh] h-[8vh]" />
          <Title level={5} className="!m-0 !p-0">
            FinTek
          </Title>
        </div>
        <Menu
          className="py-[2vh]"
          mode="inline"
          items={siderItems}
          onClick={(e) => setPage(e.key)}
        />
      </Sider>
      {selectedPage}
    </Layout>
  );
};

export default Navigator;
