import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Col, Popconfirm, Row, Table } from "antd";

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
    width: "28%",
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
    dataIndex: "actions",
    key: "actions",
    width: "7%",
    align: "center",
    render: () => {
      return (
        <Row>
          <Col span={12}>
            <Popconfirm
              okType="default"
              okText="Yes"
              okButtonProps={{ className: "p-1 text-xs" }}
              cancelText="No"
              cancelButtonProps={{ className: "p-1 text-xs" }}
              title="Edit this transaction?"
              placement="left"
              onConfirm={() => {}}
            >
              <EditTwoTone />
            </Popconfirm>
          </Col>
          <Col span={12}>
            <Popconfirm
              okType="default"
              okText="Yes"
              okButtonProps={{ className: "p-1 text-xs" }}
              cancelText="No"
              cancelButtonProps={{ className: "p-1 text-xs" }}
              title="Delete this transaction?"
              placement="left"
              onConfirm={() => {}}
            >
              <DeleteTwoTone />
            </Popconfirm>
          </Col>
        </Row>
      );
    },
  },
];

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
  });
}

const Ledger = () => {
  return (
    <div className="grid-cols-none m-5">
      <Table
        className="justify-items-center"
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{
          x: false,
          y: 500,
        }}
        bordered
      />
    </div>
  );
};

export default Ledger;
