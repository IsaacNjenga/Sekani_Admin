import { Avatar, Button, Divider, Spin, Table, Typography } from "antd";
import React, { useState } from "react";
import useFetchAllReplies from "../hooks/fetchAllReplies";
import { format } from "date-fns";
import ViewReply from "../components/ViewReply";

const { Title, Text } = Typography;
function SentMails() {
  const { replies, repliesLoading, repliesRefresh } = useFetchAllReplies();
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(replies);
  const viewMessage = async (message, record) => {
    setLoading(true);
    setContent(message);
    setOpenModal(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
    repliesRefresh();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: ["original_message", "full_name"],
      key: "full_name",
      render: (text) => (
        <div
          style={{
            gap: 8,
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "Raleway" }}>{text}</Text>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email_address",
      key: "email_address",
      render: (_, record) => (
        <Text style={{ fontFamily: "Raleway", color: "#1677ff" }}>
          {record.original_message?.email_address}
        </Text>
      ),
    },
    {
      title: "Reply message",
      dataIndex: "message",
      key: "message",
      render: (text) => <Text style={{ fontFamily: "Raleway" }}>{text}</Text>,
      //ellipsis: true,
    },
    {
      title: "Sent",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return (
          <Text style={{ fontFamily: "Roboto" }}>
            {format(new Date(text), "LLL d")}
          </Text>
        );
      },
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "",
      key: "action",
      render: (item, record) => (
        <Button
          type="primary"
          onClick={() => viewMessage(item, record)}
          style={{ fontFamily: "Raleway", background: "green" }}
        >
          Open
        </Button>
      ),
    },
  ];

  if (repliesLoading)
    return <Spin fullscreen tip="Loading. Please wait..." size="large" />;

  return (
    <div>
      <Title style={{ marginTop: 15, fontFamily: "Raleway" }}>
        Sent emails
      </Title>
      <Divider />
      <div>
        <Table
          dataSource={replies}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          showHeader
          size="medium"
          style={{ fontFamily: "Raleway" }}
        />
      </div>
      <ViewReply
        setOpenModal={setOpenModal}
        openModal={openModal}
        loading={loading}
        content={content}
      />
    </div>
  );
}

export default SentMails;
