import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SaveOutlined,
} from "@ant-design/icons";
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
  Slider,
  Switch,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { useLayoutEffect, useState } from "react";

import { isNil } from "lodash";

const { Content, Header } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Search } = Input;

const AmountSlider = () => {
  return (
    <div className="grow px-3 bg-white border border-solid border-[#d9d9d9] rounded-md">
      <Flex className="h-[30px] justify-center items-center" gap="middle">
        <Tooltip title="Show all transactions" placement="top">
          <Switch size="small" />
        </Tooltip>
        <Divider type="vertical" className="h-5 m-0 p-0" />
        <Slider
          className="grow"
          range={{ draggableTrack: true }}
          defaultValue={[0, 10000]}
          tooltip={{
            formatter: (value) => (
              <Text className="text-xs text-white">{value}</Text>
            ),
          }}
          min={0}
          max={100000}
          step={1000}
        />
        <Divider type="vertical" className="h-5 m-0 p-0" />
        <Text className="text-[#000000] opacity-30">Amount</Text>
      </Flex>
    </div>
  );
};

const TransHeader = (props) => {
  const { onModalOpen } = props;
  return (
    <div className="w-full px-[2vh]">
      <Row className="h-1/2" align="middle">
        <Col span={6}>
          <Title className="!m-0 !p-0" level={3}>
            Transactions
          </Title>
        </Col>
        <Col span={18}>
          <Flex justify="end" gap="middle">
            <Button onClick={onModalOpen}>Add Transaction</Button>
            <Button>Import</Button>
            <Button>Export</Button>
          </Flex>
        </Col>
      </Row>
      <Row className="h-1/2" align="middle">
        <Col span={24}>
          <Flex gap="middle">
            <RangePicker className="w-1/5 h-8" />
            <Search className="w-1/5 h-8" placeholder="Search" />
            <Select className="w-1/6 h-8" placeholder="Account" />
            <Select className="w-1/6 h-8" placeholder="Category" />
            <AmountSlider />
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

const TransModal = (props) => {
  const { selectedRecord, onClose, onCreate, onUpdate, onDelete } = props;
  const reference = selectedRecord?.reference;
  const isNew = isNil(reference);

  const footer = isNew ? (
    <Button onClick={onCreate} icon={<SaveOutlined />}>
      Create
    </Button>
  ) : (
    [
      <Popconfirm
        okType="default"
        okText="Yes"
        okButtonProps={{ className: "p-1 text-xs" }}
        cancelText="No"
        cancelButtonProps={{ className: "p-1 text-xs" }}
        title={"Delete transaction - " + reference}
        placement="top"
        onConfirm={onDelete}
      >
        <Button icon={<DeleteOutlined />} danger>
          Delete
        </Button>
      </Popconfirm>,
      <Popconfirm
        okType="default"
        okText="Yes"
        okButtonProps={{ className: "p-1 text-xs" }}
        cancelText="No"
        cancelButtonProps={{ className: "p-1 text-xs" }}
        title={"Update transaction - " + reference}
        placement="top"
        onConfirm={onUpdate}
      >
        <Button icon={<EditOutlined />}>Update</Button>
      </Popconfirm>,
    ]
  );

  return (
    <Modal
      open={true}
      title={isNew ? "New transaction" : "Transaction - " + reference}
      footer={footer}
      onCancel={onClose}
      maskClosable={false}
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
        <Form.Item label="Debit" name="Debit" required={true}>
          <Select />
        </Form.Item>
        <Form.Item label="Credit" name="Credit" required={true}>
          <Select />
        </Form.Item>
        <Form.Item label="Amount" name="Amount" required={true}>
          <Input />
        </Form.Item>
      </Form>
      <Divider />
    </Modal>
  );
};

const mainColumns = [
  {
    title: "Reference",
    dataIndex: "reference",
    key: "reference",
    width: "12%",
    align: "center",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: "12%",
    align: "center",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "24%",
    align: "center",
  },
  {
    title: "Debit",
    dataIndex: "debit",
    key: "debit",
    width: "16%",
    align: "center",
  },
  {
    title: "Credit",
    dataIndex: "credit",
    key: "credit",
    width: "16%",
    align: "center",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: "16%",
    align: "center",
  },
];

const data = [];
const date = new Date();
for (let i = 1; i <= 25; i++) {
  data.push({
    key: i,
    reference:
      String(date.getFullYear()) +
      String(date.getMonth() + 1).padStart(2, "0") +
      String(date.getDate()).padStart(2, "0") +
      String(i).padStart(4, "0"),
    date:
      String(date.getDate()).padStart(2, "0") +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      date.getFullYear(),
    description: "Description " + i,
    amount: i * 100,
    debit: "Debit " + i,
    credit: "Credit " + i,
  });
}

const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useLayoutEffect(() => {
    setLoading(false);
  }, []);

  const columns = [
    ...mainColumns,
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "4%",
      align: "center",
      render: (_, record) => {
        return (
          <Button
            type="text"
            icon={<EllipsisOutlined />}
            size="small"
            onClick={() => onRecordSelect(record)}
          />
        );
      },
    },
  ];

  const onRecordSelect = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const onModalOpen = () => {
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  const onRecordCreate = () => {
    setShowModal(false);
  };

  const onRecordUpdate = () => {
    setShowModal(false);
  };

  const onRecordDelete = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <Header className="!sticky top-0 z-10 flex min-h-min h-[16vh] p-0">
        <TransHeader onModalOpen={onModalOpen} />
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
        {showModal && (
          <TransModal
            selectedRecord={selectedRecord}
            onClose={onModalClose}
            onCreate={onRecordCreate}
            onUpdate={onRecordUpdate}
            onDelete={onRecordDelete}
          />
        )}
      </Content>
    </Layout>
  );
};

export default Transactions;
