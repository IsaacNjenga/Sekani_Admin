import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Input,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import { useEffect, useMemo, useState } from "react";
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
  MailOutlined,
  MoreOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import useFetchAllEmails from "../hooks/fetchAllEmails";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const { Title, Text } = Typography;
const { Search } = Input;

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
    label: "Starred",
    color: "gold",
    icon: StarFilled,
    icon2: StarOutlined,
  },
];

function Emails() {
  const { token } = useAuth();
  const { emails, emailsRefresh } = useFetchAllEmails();
  const emailData = useMemo(() => (emails ? emails : []), [emails]);
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [mail, setMail] = useState([]);

  const { readMessages, unreadMessages, starredMessages } = useMemo(() => {
    return {
      readMessages: emailData?.filter((m) => m.read),
      unreadMessages: emailData?.filter((m) => !m.read),
      starredMessages: emailData?.filter((m) => m.starred),
    };
  }, [emailData]);

  const viewMessage = async (message, record) => {
    setLoading(true);
    await updateEmail(record._id, { read: true });
    setContent(message);
    setOpenModal(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
    emailsRefresh();
  };

  const updateEmail = async (id, updateData) => {
    try {
      const res = await axios.put(`mail-update?id=${id}`, updateData, {
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
      await updateEmail(record._id, { read: !record.read });
    } else if (key === "toggle-star") {
      await updateEmail(record._id, { starred: !record.starred });
    }

    emailsRefresh(); // refresh the list
  };

  const columns = [
    {
      title: "",
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
      title: "",
      dataIndex: "email_address",
      key: "email_address",
      render: (text) => (
        <Text style={{ fontFamily: "Raleway", color: "#1677ff" }}>{text}</Text>
      ),
    },
    {
      title: "",
      dataIndex: "message",
      key: "message",
      render: (text) => <Text style={{ fontFamily: "Raleway" }}>{text}</Text>,
      //ellipsis: true,
    },
    {
      title: "",
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
      title: "",
      key: "action",
      render: (item, record) => (
        <Button
          type="primary"
          onClick={() => viewMessage(item, record)}
          style={{ fontFamily: "Raleway" }}
        >
          Open
        </Button>
      ),
    },
    {
      title: "",
      key: "item-action",
      render: (record) => (
        <Dropdown
          menu={{
            items: [
              {
                label: record.read ? (
                  <span style={{ color: "red" }}>
                    <MailOutlined style={{ color: "red" }} /> Mark as Unread
                  </span>
                ) : (
                  <span style={{ color: "green" }}>
                    <CarryOutOutlined style={{ color: "green" }} /> Mark as Read
                  </span>
                ),
                key: "toggle-read",
              },
              {
                label: record.starred ? (
                  <span style={{ color: "gold", fontWeight: 500 }}>
                    <StarOutlined style={{ color: "gold", fontWeight: 500 }} />{" "}
                    Unstar
                  </span>
                ) : (
                  <span style={{ color: "gold", fontWeight: 500 }}>
                    <StarFilled style={{ color: "gold" }} /> Star this mail
                  </span>
                ),
                key: "toggle-star",
              },
            ],
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

  useEffect(() => {
    emailsRefresh();
  }, [selectedTab]);

  const getFilteredData = () => {
    switch (selectedTab) {
      case 1:
        return unreadMessages;
      case 2:
        return readMessages;
      case 3:
        return starredMessages;
      default:
        return emailData;
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setSearchValue(value);

    if (!value) {
      setMail([]);
      return;
    }

    const filteredSearchData = emailData.filter((item) =>
      Object.values(item).some(
        (val) => typeof val === "string" && val.toLowerCase().includes(value)
      )
    );
    setMail(filteredSearchData);
  };

  if (loading)
    return <Spin fullscreen tip="Loading. Please wait..." size="large" />;

  return (
    <>
      <Title style={{ marginTop: 15, fontFamily: "Raleway" }}>Emails</Title>
      <Divider />
      <div style={{ margin: 5, padding: 5 }}>
        <div style={{ margin: "10px 0" }}>
          <Search
            placeholder="Search..."
            size="large"
            loading={loading}
            enterButton
            onChange={handleSearch}
            style={{ width: "100%", height: 50 }}
          />
        </div>
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

        <div>
          {searchValue && (
            <div style={{ marginBottom: 20, marginTop: 0 }}>
              <Title level={5} style={{ fontFamily: "Roboto" }}>
                Results for "{searchValue}"
              </Title>
            </div>
          )}
        </div>
        <Table
          dataSource={searchValue ? mail : getFilteredData()}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 15 }}
          showHeader
          size="small"
          style={{ fontFamily: "Raleway" }}
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
