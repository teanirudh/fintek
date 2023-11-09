import { EditFilled } from "@ant-design/icons";
import { Table } from "antd";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "5%",
    align: "center",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: "10%",
    align: "center",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "30%",
    align: "center",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: "10%",
    align: "center",
  },
  {
    title: "Debit",
    dataIndex: "debit",
    key: "debit",
    width: "20%",
    align: "center",
  },
  {
    title: "Credit",
    dataIndex: "credit",
    key: "credit",
    width: "20%",
    align: "center",
  },
  {
    title: "",
    dataIndex: "edit",
    key: "edit",
    width: "5%",
    align: "center",
  },
];

const Ledger = () => {
  const data = [];

  for (let i = 1; i <= 100; i++) {
    data.push({
      key: i,
      id: i,
      date:
        new Date().getDate() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getFullYear(),
      description: "Description " + i,
      amount: i * 100,
      debit: "Debit " + i,
      credit: "Credit " + i,
      edit: (
        <button>
          <EditFilled />
        </button>
      ),
    });
  }

  return (
    <div className="grid-cols-none m-5">
      <Table
        className="justify-items-center"
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 600 }}
        bordered
      />
    </div>
  );
};

export default Ledger;
