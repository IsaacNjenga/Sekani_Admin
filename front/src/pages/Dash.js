import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  List,
  Avatar,
  Tag,
  Button,
  Space,
  Badge,
  Timeline,
  Spin,
} from "antd";
import {
  PlusOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  UserOutlined,
  CalendarOutlined,
  BarChartOutlined,
  FireFilled,
  CheckCircleOutlined,
  ClockCircleFilled,
  LinkOutlined,
  LikeFilled,
  MailOutlined,
  HomeOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
//import { mockData } from "../assets/data/data";
import DashUtils from "../utils/dashboardUtils";
import { format, formatDistanceToNow } from "date-fns";
import ScheduleDetails from "../components/ScheduleDetails";

const { Title, Text } = Typography;

// Simple Chart Components
// const MiniLineChart = ({ data }) => {
//   const max = Math.max(...data.map((d) => d.value));
//   const points = data
//     .map((d, i) => {
//       const x = (i / (data.length - 1)) * 100;
//       const y = 100 - (d.value / max) * 80;
//       return `${x},${y}`;
//     })
//     .join(" ");

//   return (
//     <svg width="100%" height="100" style={{ display: "block" }}>
//       <defs>
//         <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
//           <stop
//             offset="0%"
//             style={{ stopColor: "#52c41a", stopOpacity: 0.3 }}
//           />
//           <stop
//             offset="100%"
//             style={{ stopColor: "#52c41a", stopOpacity: 0.05 }}
//           />
//         </linearGradient>
//       </defs>
//       <polyline
//         points={`0,100 ${points} 100,100`}
//         fill="url(#gradient)"
//         stroke="none"
//       />
//       <polyline points={points} fill="none" stroke="#52c41a" strokeWidth="3" />
//     </svg>
//   );
// };

const MiniBarChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value));
  const colors = ["#1890ff", "#52c41a", "#faad14", "#722ed1"];

  return (
    <svg width="100%" height="100" style={{ display: "block" }}>
      {data.map((d, i) => {
        const barWidth = 80 / data.length;
        const x = 10 + (i * 100) / data.length;
        const height = (d.value / max) * 100;
        const y = 90 - height;

        return (
          <rect
            key={i}
            x={`${x}%`}
            y={y}
            width={`${barWidth}%`}
            height={height}
            fill={colors[i % colors.length]}
            rx="4"
          />
        );
      })}
    </svg>
  );
};

const Header = () => {
  const currentDate = new Date();
  const navigate = useNavigate();
  const dateString = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "32px",
        borderRadius: "16px",
        marginBottom: "10px",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <Title
            level={3}
            style={{
              color: "white",
              margin: 0,
              marginBottom: "8px",
              fontFamily: "Raleway",
            }}
          >
            {dateString}
          </Title>
        </div>
        <Space>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => navigate("/create-property")}
            style={{
              background: "white",
              color: "#667eea",
              borderRadius: "8px",
              fontWeight: 600,
              border: "none",
            }}
          >
            Add Property
          </Button>
        </Space>
      </div>
    </div>
  );
};

const QuickStats = () => {
  const { stats } = DashUtils();
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
      {stats.map((item, i) => (
        <Col xs={24} sm={12} lg={6} key={i}>
          <Card
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "none",
            }}
            bodyStyle={{ padding: "24px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#8c8c8c",
                    display: "block",
                    marginBottom: 8,
                    fontFamily: "Raleway",
                  }}
                >
                  {item.title}
                </Text>
                <Title
                  level={2}
                  style={{ margin: 0, marginBottom: 8, fontFamily: "Raleway" }}
                >
                  {item.loading ? <Spin size="large" /> : item.value}
                </Title>
                {/* <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {item.trend === "up" ? (
                    <ArrowUpOutlined
                      style={{ color: "#52c41a", fontSize: 12 }}
                    />
                  ) : (
                    <ArrowDownOutlined
                      style={{ color: "#ff4d4f", fontSize: 12 }}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: 14,
                      color: item.trend === "up" ? "#52c41a" : "#ff4d4f",
                      fontWeight: 600,
                    }}
                  >
                    {Math.abs(item.change)}%
                  </Text>
                  <Text style={{ fontSize: 14, color: "#8c8c8c" }}>
                    vs last month
                  </Text>
                </div> */}
              </div>
              <div
                style={{
                  background: `${item.color}15`,
                  color: item.color,
                  borderRadius: 12,
                  padding: 14,
                  fontSize: 24,
                }}
              >
                {item.icon}
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const TopProperties = () => {
  const { topViewed } = DashUtils();

  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FireFilled style={{ color: "#ff4d4f" }} />
          <span
            style={{ fontSize: 16, fontWeight: 600, fontFamily: "Raleway" }}
          >
            Top Performing Properties
          </span>
        </div>
      }
      extra={
        <Button type="link" style={{ fontFamily: "Raleway" }}>
          <Link to="/properties">View All</Link>
        </Button>
      }
      style={{
        borderRadius: 16,
        border: "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={topViewed.slice(0, 3)}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: "16px 0",
              borderBottom: "1px solid #f0f0f0",
            }}
            // actions={[
            //   <Tag color={item.status === "hot" ? "red" : "blue"}>
            //     {item.status === "hot" ? "🔥 Hot" : "Active"}
            //   </Tag>,
            // ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  size={70}
                  src={item.propertyId.img[0]}
                  style={{ width: 58, height: 58, borderRadius: 8 }}
                />
              }
              title={
                <Text strong style={{ fontSize: 16, fontFamily: "Raleway" }}>
                  {item.propertyId.address}
                </Text>
              }
              description={
                <Space direction="vertical" size={4}>
                  <Text
                    style={{
                      color: "#52c41a",
                      fontWeight: 600,
                      fontSize: 14,
                      fontFamily: "Raleway",
                    }}
                  >
                    KES {item.propertyId.price.toLocaleString()}
                  </Text>
                  <Space size={16}>
                    <span>
                      <EyeOutlined
                        style={{ color: "#8c8c8c", marginRight: 4 }}
                      />
                      <Text
                        style={{
                          fontSize: 13,
                          color: "#8c8c8c",
                          fontFamily: "Raleway",
                        }}
                      >
                        {item.views.toLocaleString()}
                      </Text>
                    </span>
                    <span>
                      <LinkOutlined
                        style={{ color: "#8c8c8c", marginRight: 4 }}
                      />
                      <Text
                        style={{
                          fontSize: 13,
                          color: "#8c8c8c",
                          fontFamily: "Raleway",
                        }}
                      >
                        {item.clicks.toLocaleString()}
                      </Text>
                    </span>
                    {/* <span>
                      <MailOutlined
                        style={{ color: "#8c8c8c", marginRight: 4 }}
                      />
                      <Text style={{ fontSize: 13, color: "#8c8c8c" }}>
                        {item.inquiries}
                      </Text>
                    </span> */}
                  </Space>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

const UpcomingViewings = () => {
  const { upcomingViewings, schedulesRefresh } = DashUtils();
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);

  const viewScheduleDetails = (payload) => {
    setLoading(true);
    setContent(payload);
    setOpenScheduleModal(true);
    setTimeout(() => setLoading(false), 120);
  };

  return (
    <>
      <Card
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CalendarOutlined style={{ color: "#1890ff" }} />
            <span
              style={{ fontSize: 16, fontWeight: 600, fontFamily: "Raleway" }}
            >
              Upcoming Viewings
            </span>
            <Badge count={upcomingViewings.length} style={{ marginLeft: 8 }} />
          </div>
        }
        extra={
          <Button type="link" style={{ fontFamily: "Raleway" }}>
            <Link to="/schedules">View All</Link>
          </Button>
        }
        style={{
          borderRadius: 16,
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={upcomingViewings}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: "16px 0",
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer",
              }}
              onClick={() => viewScheduleDetails(item)}
              actions={[
                <Tag
                  color="white"
                  style={{
                    fontFamily: "Raleway",
                    backgroundColor:
                      item.status === "confirmed" ? "green" : "orange",
                    padding: "6px 12px",
                    borderRadius: 8,
                    color: "white",
                  }}
                >
                  {" "}
                  <span>
                    {item.status === "confirmed" ? "Confirmed" : "Pending"}
                  </span>
                  {item.status === "confirmed" ? (
                    <CheckCircleOutlined />
                  ) : (
                    <ClockCircleOutlined />
                  )}{" "}
                </Tag>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={48}
                    style={{
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                    }}
                  >
                    {item.name[0]}
                  </Avatar>
                }
                title={
                  <Text strong style={{ fontSize: 15, fontFamily: "Raleway" }}>
                    {item.propertyId.address}, {item.propertyId.city}
                  </Text>
                }
                description={
                  <Space direction="vertical" size={2}>
                    <Text style={{ fontSize: 14, fontFamily: "Raleway" }}>
                      <UserOutlined
                        style={{ marginRight: 4, color: "#8c8c8c" }}
                      />
                      {item.name}
                    </Text>{" "}
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#401c37ff",
                        fontFamily: "Raleway",
                      }}
                    >
                      <CalendarOutlined style={{ marginRight: 4 }} />
                      {format(new Date(item.date), "MMM dd, yyyy")}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#1890ff",
                        fontFamily: "Raleway",
                      }}
                    >
                      <ClockCircleOutlined style={{ marginRight: 4 }} />
                      {item.time}
                    </Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>
      <ScheduleDetails
        content={content}
        openScheduleModal={openScheduleModal}
        setOpenScheduleModal={setOpenScheduleModal}
        schedulesRefresh={schedulesRefresh}
        loading={loading}
      />
    </>
  );
};

const RecentActivity = () => {
  const { recentActivities, activitiesLoading } = DashUtils();

  console.log(recentActivities);

  const IconRender = (type) => {
    switch (type) {
      case "schedule":
        return <CalendarOutlined style={{ color: "#1890ff" }} />;
      case "reply":
        return <MailOutlined style={{ color: "#faad14" }} />;
      case "mail":
        return <MailOutlined style={{ color: "#faad14" }} />;
      case "review":
        return <LikeFilled style={{ color: "red" }} />;
      case "property":
        return <HomeOutlined style={{ color: "#52c41a" }} />;

      default:
        return <StarOutlined style={{ color: "#8c8c8c" }} />;
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Card
          title={
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ClockCircleFilled style={{ color: "#2ea0d1ff" }} />
              <span
                style={{ fontSize: 16, fontWeight: 600, fontFamily: "Raleway" }}
              >
                Recent Activity
              </span>
            </div>
          }
          style={{
            borderRadius: 16,
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          {activitiesLoading ? (
            <Spin
              size="large"
              style={{ margin: "auto", width: "100%", padding: 20 }}
            />
          ) : (
            <Timeline
              items={recentActivities.map((activity, idx) => ({
                dot: (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background:
                        idx === 0
                          ? "linear-gradient(135deg, #667eea, #764ba2)"
                          : "#f0f0f0",
                      color: idx === 0 ? "white" : "#8c8c8c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                    }}
                  >
                    {IconRender(activity.type)}
                  </div>
                ),
                children: (
                  <div style={{ paddingBottom: 16 }}>
                    <Text
                      strong
                      style={{
                        display: "block",
                        fontSize: 15,
                        marginBottom: 4,
                        fontFamily: "Raleway",
                      }}
                    >
                      {activity.message}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#8c8c8c",
                        fontFamily: "Roboto",
                      }}
                    >
                      {formatDistanceToNow(new Date(activity.time))} ago
                    </Text>
                  </div>
                ),
              }))}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
};

function Dash() {
  const loading = false;

  const propertyTypes = [
    { type: "Houses", value: 45 },
    { type: "Apartments", value: 38 },
    { type: "Land", value: 12 },
    { type: "Commercial", value: 5 },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 0 }}>
      {/* Header */}
      <Header />

      {/* Stats Cards */}
      <QuickStats />

      {/* Charts Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        {/* <Col xs={24} lg={14}>
          <Card
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <LineChartOutlined style={{ color: "#52c41a" }} />
                  <span style={{ fontSize: 16, fontWeight: 600 }}>
                    Revenue Overview
                  </span>
                </div>
                <Tag color="green">+23.7% this month</Tag>
              </div>
            }
            style={{
              borderRadius: 16,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              height: "100%",
            }}
          >
            <MiniLineChart data={mockData.revenue.chartData} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: 16,
              }}
            >
              {mockData.revenue.chartData.map((item, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <Text
                    style={{ fontSize: 12, color: "#8c8c8c", display: "block" }}
                  >
                    {item.month}
                  </Text>
                  <Text strong style={{ fontSize: 14 }}>
                    {item.value}K
                  </Text>
                </div>
              ))}
            </div>
          </Card>
        </Col> */}

        <Col xs={24} lg={14}>
          <TopProperties />
        </Col>

        <Col xs={24} lg={10}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <BarChartOutlined style={{ color: "#1890ff" }} />
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Raleway",
                  }}
                >
                  Properties by Type
                </span>
              </div>
            }
            style={{
              borderRadius: 16,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              height: "100%",
            }}
          >
            <MiniBarChart data={propertyTypes} />
            <div style={{ marginTop: 10 }}>
              {propertyTypes.map((item, i) => {
                const colors = ["#1890ff", "#52c41a", "#faad14", "#722ed1"];
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: colors[i],
                        }}
                      />
                      <Text style={{ fontFamily: "Raleway" }}>{item.type}</Text>
                    </div>
                    <Text strong style={{ fontFamily: "Raleway" }}>
                      {item.value}
                    </Text>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Content Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        {/* Top Performing Properties */}

        {/* Upcoming Viewings */}
        <Col xs={24} lg={24}>
          <UpcomingViewings />
        </Col>
      </Row>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}

export default Dash;
