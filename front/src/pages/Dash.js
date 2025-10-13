import React from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  List,
  Timeline,
  Button,
  Divider,
} from "antd";
import {
  MailOutlined,
  StarOutlined,
  SendOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";

const { Title, Text } = Typography;

function Dash() {
  const { user } = useAuth();

  // static placeholders for now
  const stats = [
    {
      title: "Unread Messages",
      value: 8,
      icon: <MailOutlined />,
      color: "#1890ff",
    },
    { title: "Starred", value: 3, icon: <StarOutlined />, color: "#faad14" },
    {
      title: "Replies Sent",
      value: 15,
      icon: <SendOutlined />,
      color: "#52c41a",
    },
    {
      title: "Active Properties",
      value: 12,
      icon: <HomeOutlined />,
      color: "#722ed1",
    },
  ];

  const recentMessages = [
    {
      name: "John Doe",
      message: "Is the apartment still available?",
      time: "5 mins ago",
    },
    {
      name: "Ayanna Freeman",
      message: "Can I schedule a visit?",
      time: "30 mins ago",
    },
    {
      name: "Michael Kim",
      message: "Price negotiation details",
      time: "1 hour ago",
    },
  ];

  const activities = [
    "New message from John Doe (5 mins ago)",
    "Property 'Modern Villa' updated (1 hour ago)",
    "Email reply sent to Ayanna Freeman (2 hours ago)",
    "Starred message from Sarah Johnson (Yesterday)",
  ];

  return (
    <div style={{ padding: 0 }}>
      {/* Greeting */}
      <Title level={3} style={{ fontFamily: "Raleway" }}>
        Hey there, 👋
      </Title>
      <Text type="secondary" style={{ fontFamily: "Roboto" }}>
        Here’s an overview...
      </Text>

      <Divider />

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        {stats.map((item, i) => (
          <Col xs={24} sm={12} md={6} key={i}>
            <Card
              bordered={false}
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Text strong style={{ fontSize: 15, color: "#595959" }}>
                    {item.title}
                  </Text>
                  <Title level={3} style={{ margin: 0 }}>
                    {item.value}
                  </Title>
                </div>
                <div
                  style={{
                    background: item.color,
                    color: "#fff",
                    borderRadius: "50%",
                    padding: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider />

      {/* Recent Messages & Quick Actions */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Card
            title="Recent Messages"
            extra={<a href="#">View All</a>}
            style={{ borderRadius: 12 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={recentMessages}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Text strong>{item.name}</Text>}
                    description={item.message}
                  />
                  <Text type="secondary">{item.time}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Quick Actions" style={{ borderRadius: 12 }}>
            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Button icon={<PlusOutlined />} type="primary">
                Add Property
              </Button>
              <Button icon={<MailOutlined />}>View Messages</Button>
              <Button icon={<UserOutlined />}>Manage Users</Button>
              <Button icon={<SettingOutlined />}>Settings</Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Activity Timeline */}
      <Card
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <BarChartOutlined /> <span>Recent Activity</span>
          </div>
        }
        style={{ borderRadius: 12 }}
      >
        <Timeline
          items={activities.map((a) => ({ children: a }))}
          size="large"
        />
      </Card>
    </div>
  );
}

export default Dash;
