import { Menu } from "antd";
import { useState } from "react";
import Ledger from "./Ledger";
import Master from "./Master";
import Pivot from "./Pivot";

const Navigator = () => {
  let selectedPage = null;
  const [page, setPage] = useState("ledger");

  if (page === "ledger") {
    selectedPage = <Ledger />;
  } else if (page === "pivot") {
    selectedPage = <Pivot />;
  } else if (page === "master") {
    selectedPage = <Master />;
  }

  return (
    <div className="grid">
      <Menu
        className="grid-cols-none justify-center font-bold"
        mode="horizontal"
        onClick={(e) => setPage(e.key)}
      >
        <Menu.Item key="ledger">Ledger</Menu.Item>
        <Menu.Item key="pivot">Pivot</Menu.Item>
        <Menu.Item key="master">Master</Menu.Item>
      </Menu>
      {selectedPage}
    </div>
  );
};

export default Navigator;
