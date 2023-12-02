import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Layout,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import { useLayoutEffect, useState } from "react";

const { Content, Header } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

const TransHeader = () => {
  return (
    <div className="w-full px-[2vh]">
      <Row className="h-1/2" align="middle">
        <Col span={24}>
          <Title className="!m-0 !p-0" level={3}>
            Transactions
          </Title>
        </Col>
      </Row>
      <Row className="h-1/2" align="middle">
        <Col span={12}>
          <Flex justify="start" gap="middle">
            <Button>All</Button>
            <Button>Income</Button>
            <Button>Expenses</Button>
            <Button>Filters</Button>
          </Flex>
        </Col>
        <Col span={12}>
          <Flex justify="end" gap="middle">
            <RangePicker />
            <Button>Add Transaction</Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

const InputModal = (props) => {
  const { isEdit, onOk, onCancel } = props;
  return (
    <Modal
      open={true}
      title={isEdit ? "Edit Transaction" : "Add Transaction"}
      okType="default"
      okText="Save"
      okButtonProps={{ className: "p-1 text-xs" }}
      cancelText="Discard"
      cancelButtonProps={{ className: "p-1 text-xs" }}
      onOk={onOk}
      onCancel={onCancel}
      maskClosable={false}
      closeIcon={null}
      destroyOnClose={true}
      centered
    >
      <Divider />
      <Form layout="vertical">
        <Form.Item label="Date" name="Date" required={true}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Description" name="Description" required={true}>
          <Input />
        </Form.Item>
        <Form.Item label="Amount" name="Amount" required={true}>
          <Input />
        </Form.Item>
        <Form.Item label="Debit" name="Debit" required={true}>
          <Select />
        </Form.Item>
        <Form.Item label="Credit" name="Credit" required={true}>
          <Select />
        </Form.Item>
      </Form>
      <Divider />
    </Modal>
  );
};

const EditButton = (props) => {
  const { onClick } = props;
  return <EditTwoTone onClick={onClick} />;
};

const DeleteButton = () => {
  return (
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
  );
};

const mainColumns = [
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
];

const data = [];

for (let i = 1; i <= 25; i++) {
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

const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useLayoutEffect(() => {
    setLoading(false);
  }, []);

  const columns = [
    ...mainColumns,
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
              <EditButton onClick={() => setShowEditModal(true)} />
            </Col>
            <Col span={12}>
              <DeleteButton />
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <Layout>
      <Header className="!sticky top-0 z-10 flex min-h-min h-[16vh] p-0">
        <TransHeader />
      </Header>
      <Content className="!z-0">
        <Table
          className="h-[84vh] p-[2vh]"
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={false}
          sticky={true}
          scroll={{ y: "calc(80vh - 55px)" }}
        />
        {showAddModal && (
          <InputModal
            isEdit={false}
            onOk={() => {
              setShowAddModal(false);
            }}
            onCancel={() => {
              setShowAddModal(false);
            }}
          />
        )}
        {showEditModal && (
          <InputModal
            isEdit={true}
            onOk={() => {
              setShowEditModal(false);
            }}
            onCancel={() => {
              setShowEditModal(false);
            }}
          />
        )}
      </Content>
    </Layout>
  );
};

export default Transactions;
