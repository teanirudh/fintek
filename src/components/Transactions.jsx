import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExportOutlined,
  FormOutlined,
  InboxOutlined,
  SaveOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Flex,
  Form,
  Input,
  InputNumber,
  Layout,
  Modal,
  Popconfirm,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Table,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import { useEffect, useState } from "react";

import { isNil } from "lodash";

const { Content, Header } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Item } = Form;
const { Dragger } = Upload;

const transTableColumns = [
  {
    title: "Reference",
    dataIndex: "reference",
    width: "12%",
    key: "reference",
    align: "center",
  },
  {
    title: "Date",
    dataIndex: "date",
    width: "12%",
    key: "date",
    align: "center",
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "30%",
    key: "description",
    align: "center",
    className: "!text-left",
  },
  {
    title: "Debit",
    dataIndex: "debit",
    width: "15%",
    key: "debit",
    align: "center",
  },
  {
    title: "Credit",
    dataIndex: "credit",
    width: "15%",
    key: "credit",
    align: "center",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: "12%",
    key: "amount",
    align: "center",
    className: "!text-right",
  },
  {
    title: <FormOutlined />,
    dataIndex: "action",
    width: "4%",
    key: "action",
    align: "center",
  },
];

const AmountSlider = () => {
  return (
    <div className="grow px-3 bg-white border border-solid border-[#d9d9d9] rounded-md">
      <Flex className="h-[30px] justify-center items-center" gap="middle">
        <Tooltip title="Show all transactions" placement="top">
          <Switch className="bg-[#d9d9d9]" size="small" />
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
          max={10000}
          step={1000}
        />
        <Divider type="vertical" className="h-5 m-0 p-0" />
        <Text className="text-[#000000] opacity-30">Amount</Text>
      </Flex>
    </div>
  );
};

const TransHeader = (props) => {
  const { onDrawerOpen, onModalOpen, setTransferMode } = props;
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
            <Button icon={<TransactionOutlined />} onClick={onModalOpen}>
              Add transaction
            </Button>
            <Button
              icon={<DownloadOutlined />}
              onClick={() => {
                setTransferMode("import");
                onDrawerOpen();
              }}
            >
              Import
            </Button>
            <Button
              icon={<ExportOutlined />}
              onClick={() => {
                setTransferMode("export");
                onDrawerOpen();
              }}
            >
              Export
            </Button>
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

const ImportDrawer = (props) => {
  return (
    <>
      <Row className="pb-4">
        <Text className="font-bold">Step-1: Upload source file</Text>
      </Row>
      <Row>
        <Col span={24}>
          <Dragger maxCount={1}>
            <Space direction="vertical" align="center">
              <InboxOutlined className="text-4xl" />
              <Text>Click or drag file to this area to upload</Text>
            </Space>
          </Dragger>
        </Col>
      </Row>
      <Row className="!h-8">
        <Col span={24} align="middle">
          {true && (
            <Text className="text-[#000000] opacity-30">
              Supported file types: .csv, .xls, .xlsx
            </Text>
          )}
        </Col>
      </Row>
      <Divider />
      <Row className="pb-6">
        <Text className="font-bold">Step-2: Map the fields</Text>
      </Row>
      <Row className="pb-4">
        <Col span={12}>
          <Select className="px-2 w-full" placeholder="Date" />
        </Col>
        <Col span={12}>
          <Select className="px-2 w-full" placeholder="Amount" />
        </Col>
      </Row>
      <Row className="pb-4">
        <Col span={12}>
          <Select className="px-2 w-full" placeholder="Debit" />
        </Col>
        <Col span={12}>
          <Select className="px-2 w-full" placeholder="Credit" />
        </Col>
      </Row>
      <Row className="pb-4">
        <Col span={12}>
          <Select className="px-2 w-full" placeholder="Description" />
        </Col>
      </Row>
      <Divider />
      <Row className="pb-4">
        <Text className="font-bold">Step-3: Start import process</Text>
      </Row>
      <Row>
        <Col span={24} align="middle">
          <Button>Import</Button>
        </Col>
      </Row>
      <Divider />
    </>
  );
};

const TransDrawer = (props) => {
  const { onClose, transferMode } = props;

  const drawerContent = transferMode === "import" ? <ImportDrawer /> : <></>;
  return (
    <Drawer
      open={true}
      title={
        (transferMode === "import" ? "Import" : "Export") + " transactions"
      }
      onClose={onClose}
      maskClosable={false}
      destroyOnClose={true}
    >
      {drawerContent}
    </Drawer>
  );
};

const NewTransModalFooter = (props) => {
  const { onCreate } = props;
  return [
    <Popconfirm
      key="create"
      okType="default"
      okText="Yes"
      okButtonProps={{ className: "p-1 text-xs" }}
      cancelText="No"
      cancelButtonProps={{ className: "p-1 text-xs" }}
      title={"Create new transaction"}
      placement="top"
      onConfirm={onCreate}
    >
      <Button icon={<SaveOutlined />}>Create</Button>
    </Popconfirm>,
  ];
};

const OldTransModalFooter = (props) => {
  const { onUpdate, onDelete, reference } = props;
  return [
    <Popconfirm
      key="delete"
      okType="default"
      okText="Yes"
      okButtonProps={{ className: "p-1 text-xs" }}
      cancelText="No"
      cancelButtonProps={{ className: "p-1 text-xs" }}
      title={"Delete transaction - " + reference}
      placement="top"
      onConfirm={onDelete}
    >
      <Button icon={<DeleteOutlined />}>Delete</Button>
    </Popconfirm>,
    <Popconfirm
      key="update"
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
  ];
};

const TransModal = (props) => {
  const { selectedRecord, onClose, onCreate, onUpdate, onDelete } = props;
  const reference = selectedRecord?.reference;
  const isNew = isNil(reference);

  const footer = isNew ? (
    <NewTransModalFooter onCreate={onCreate} />
  ) : (
    <OldTransModalFooter
      onUpdate={onUpdate}
      onDelete={onDelete}
      reference={reference}
    />
  );

  return (
    <Modal
      open={true}
      title={isNew ? "New transaction" : "Transaction - " + reference}
      footer={footer}
      onCancel={onClose}
      maskClosable={false}
      destroyOnClose={true}
      centered={true}
    >
      <Divider />
      <Form layout="vertical">
        <Row className="py-3">
          <Col span={12} className="px-3">
            <Item label="Date" name="date" required={true}>
              <DatePicker className="w-full" />
            </Item>
          </Col>
          <Col span={12} className="px-3">
            <Item label="Amount" name="amount" required={true}>
              <InputNumber
                className="w-full"
                placeholder="Enter amount"
                controls={false}
                decimalSeparator="."
              />
            </Item>
          </Col>
        </Row>
        <Row className="py-3">
          <Col span={12} className="px-3">
            <Item label="Debit" name="debit" required={true}>
              <Select placeholder="Debit from" />
            </Item>
          </Col>
          <Col span={12} className="px-3">
            <Item label="Credit" name="credit" required={true}>
              <Select placeholder="Credit to" />
            </Item>
          </Col>
        </Row>
        <Row className="py-3">
          <Col span={24} className="px-3">
            <Item label="Description" name="description" required={true}>
              <Input placeholder="Enter short description" />
            </Item>
          </Col>
        </Row>
      </Form>
      <Divider />
    </Modal>
  );
};

const TransTable = (props) => {
  const { columns, transactions, loading } = props;
  return (
    <div className="h-[80vh] m-[2vh] trans-table overflow-y-scroll">
      <Table
        className="!w-full"
        columns={columns}
        dataSource={transactions}
        loading={loading}
        pagination={false}
        sticky={true}
        bordered={true}
      />
    </div>
  );
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [transferMode, setTransferMode] = useState(null);

  useEffect(() => {
    window.api
      .getTransactions()
      .then((res) => {
        setTransactions(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    ...transTableColumns.slice(0, 6),
    {
      ...transTableColumns[6],
      render: (_, record) => {
        return (
          <EllipsisOutlined
            className="opacity-40  hover:opacity-100"
            onClick={() => onRecordSelect(record)}
          />
        );
      },
    },
  ];

  const onDrawerOpen = () => {
    setShowDrawer(true);
  };

  const onDrawerClose = () => {
    setShowDrawer(false);
  };

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
        <TransHeader
          onModalOpen={onModalOpen}
          onDrawerOpen={onDrawerOpen}
          transferMode={transferMode}
          setTransferMode={setTransferMode}
        />
      </Header>
      <Content className="!z-0">
        <TransTable
          columns={columns}
          transactions={transactions}
          loading={loading}
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
        {showDrawer && (
          <TransDrawer onClose={onDrawerClose} transferMode={transferMode} />
        )}
      </Content>
    </Layout>
  );
};

export default Transactions;
