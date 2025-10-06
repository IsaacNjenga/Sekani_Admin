import { Button, Divider, Spin, Table, Tag, Typography } from "antd";
import { useMemo, useState } from "react";
import { emailData } from "../assets/data/data";
import { format } from "date-fns";
import ViewMessage from "../components/ViewMessage";

const { Title, Text } = Typography;

const miniBtns = [
  { key: 1, label: "Unread", color: "red" },
  { key: 2, label: "Read", color: "blue" },
  { key: 3, label: "Sent", color: "green" },
  { key: 4, label: "Starred", color: "gold" },
];

function Emails() {
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);

  const { readMessages, unreadMessages, starredMessages } = useMemo(() => {
    return {
      readMessages: emailData.filter((m) => m.read),
      unreadMessages: emailData.filter((m) => !m.read),
      starredMessages: emailData.filter((m) => m.starred),
    };
  }, []);

  const viewMessage = (message) => {
    setLoading(true);
    setContent(message);
    setOpenModal(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (text) => <Text style={{ fontFamily: "Raleway" }}>{text}</Text>,
    },
    {
      title: "Email Address",
      dataIndex: "email_address",
      key: "email_address",
      render: (text) => (
        <Text style={{ fontFamily: "Raleway", color: "#1677ff" }}>{text}</Text>
      ),
      //render: (text) => {
      // <a href={`mailto:${email}`} style={{ color: "#1677ff" }}>
      //{email}
      //</a>;
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text) => <Text style={{ fontFamily: "Raleway" }}>{text}</Text>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return (
          <Text style={{ fontFamily: "Raleway" }}>
            {format(new Date(text), "Pp")}
          </Text>
        );
      },
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "View",
      key: "action",
      render: (item) => (
        <Button
          type="primary"
          onClick={() => viewMessage(item)}
          style={{ fontFamily: "Raleway" }}
        >
          Open
        </Button>
      ),
    },
  ];

  const getFilteredData = () => {
    switch (selectedTab) {
      case 1:
        return unreadMessages;
      case 2:
        return readMessages;
      case 4:
        return starredMessages;
      default:
        return emailData;
    }
  };

  if (loading)
    return <Spin fullscreen tip="Loading. Please wait..." size="large" />;

  return (
    <>
      <Title style={{ marginTop: 15, fontFamily: "Raleway" }}>Emails</Title>
      <Divider />
      <div style={{ margin: 10, padding: 10 }}>
        <div
          style={{
            display: "flex",
            margin: "10px 0",
            marginTop: 0,
            gap: 8,
            alignItems: "center",
          }}
        >
          {miniBtns.map((btn) => (
            <Tag
              color={btn.color}
              key={btn.key}
              onClick={() => setSelectedTab(btn.key)}
              style={{
                fontSize: 14,
                padding: "6px 10px",
                cursor: "pointer",
                fontFamily: "Roboto",
                background: selectedTab === btn.key ? btn.color : "",
                color: selectedTab === btn.key ? "white" : "",
              }}
            >
              {btn.label}
            </Tag>
          ))}
        </div>
        <Table
          dataSource={getFilteredData()}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 6 }}
        />
      </div>
      <ViewMessage
        setOpenModal={setOpenModal}
        openModal={openModal}
        loading={loading}
        content={content}
      />
    </>
  );
}

export default Emails;
