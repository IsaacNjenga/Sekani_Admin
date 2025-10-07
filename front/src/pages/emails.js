import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import { useMemo, useState } from "react";
//import { emailData } from "../assets/data/data";
import { format } from "date-fns";
import ViewMessage from "../components/ViewMessage";
import {
  CarryOutFilled,
  CarryOutOutlined,
  CheckSquareFilled,
  CheckSquareOutlined,
  ClockCircleFilled,
  ClockCircleOutlined,
  MoreOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import useFetchAllEmails from "../hooks/fetchAllEmails";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const { Title, Text } = Typography;

const miniBtns = [
  {
    key: 1,
    label: "Unread",
    color: "red",
    icon: ClockCircleFilled,
    icon2: ClockCircleOutlined,
  },
  {
    key: 2,
    label: "Read",
    color: "blue",
    icon: CarryOutFilled,
    icon2: CarryOutOutlined,
  },
  {
    key: 3,
    label: "Sent",
    color: "green",
    icon: CheckSquareFilled,
    icon2: CheckSquareOutlined,
  },
  {
    key: 4,
    label: "Starred",
    color: "gold",
    icon: StarFilled,
    icon2: StarOutlined,
  },
];

const moreItems = [
  {
    label: "Mark as Read/Unread",
    key: "toggle-read",
  },
  {
    label: "Star / Unstar",
    key: "toggle-star",
  },
];

function Emails() {
  const { token } = useAuth();
  const { emails, emailsLoading, emailsRefresh } = useFetchAllEmails();
  const emailData = emails ? emails : [];
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const { readMessages, unreadMessages, starredMessages } = useMemo(() => {
    return {
      readMessages: emailData?.filter((m) => m.read),
      unreadMessages: emailData?.filter((m) => !m.read),
      starredMessages: emailData?.filter((m) => m.starred),
    };
  }, [emailData]);

  const viewMessage = (message) => {
    setLoading(true);
    setContent(message);
    setOpenModal(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  const updateEmailReadStatus = async (id, updateData) => {
    try {
      const res = await axios.put(`mail-read?id=${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        console.log("success");
      }
    } catch (error) {
      console.error("Failed to update mail", error);
    }
  };

  const updateEmailStarredStatus = async (id, updateData) => {
    try {
      const res = await axios.put(`mail-starred?id=${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        console.log("success");
      }
    } catch (error) {
      console.error("Failed to update mail", error);
    }
  };

  const handleMenuClick = async (e, record) => {
    const { key } = e;
    setActiveDropdownId(null); // close after click

    if (key === "toggle-read") {
      await updateEmailReadStatus(record._id, { read: !record.read });
    } else if (key === "toggle-star") {
      await updateEmailStarredStatus(record._id, { starred: !record.starred });
    }

    emailsRefresh(); // refresh the list
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "full_name",
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
          <Avatar style={{ background: "brown" }}>{text.charAt(0)}</Avatar>{" "}
          <Text style={{ fontFamily: "Raleway" }}>{text}</Text>
        </div>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email_address",
      key: "email_address",
      render: (text) => (
        <Text style={{ fontFamily: "Raleway", color: "#1677ff" }}>{text}</Text>
      ),
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
          <Text style={{ fontFamily: "Roboto" }}>
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
    {
      title: "Action",
      key: "item-action",
      render: (record) => (
        <Dropdown
          menu={{
            items: moreItems,
            onClick: (e) => handleMenuClick(e, record),
          }}
          trigger={["click"]}
          open={activeDropdownId === record._id}
          onOpenChange={(nextOpen) =>
            setActiveDropdownId(nextOpen ? record._id : null)
          }
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            onClick={(e) => e.stopPropagation()}
          />
        </Dropdown>
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

  if (loading || emailsLoading)
    return <Spin fullscreen tip="Loading. Please wait..." size="large" />;

  return (
    <>
      <Title style={{ marginTop: 15, fontFamily: "Raleway" }}>Emails</Title>
      <Divider />
      <div style={{ margin: 5, padding: 5 }}>
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
              {selectedTab === btn.key ? <btn.icon /> : <btn.icon2 />}
              <span>{btn.label}</span>
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
