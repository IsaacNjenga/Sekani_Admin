// import React from "react";
// import {
//   Card,
//   Col,
//   Row,
//   Typography,
//   List,
//   Timeline,
//   Button,
//   Divider,
//   Spin,
// } from "antd";
// import {
//   MailOutlined,
//   StarOutlined,
//   SendOutlined,
//   HomeOutlined,
//   BarChartOutlined,
//   PlusOutlined,
// } from "@ant-design/icons";
// import { format, formatDistanceToNow } from "date-fns";
// import { Link, useNavigate } from "react-router-dom";
// import useFetchAvailableProperties from "../hooks/fetchAvailableProperty";
// import useFetchAllEmails from "../hooks/fetchAllEmails";
// import useFetchAllReplies from "../hooks/fetchAllReplies";
// import useFetchActivity from "../hooks/fetchActivity";

// const { Title, Text } = Typography;

// function Dash() {
//   const navigate = useNavigate();
//   const { properties, propertiesLoading } = useFetchAvailableProperties();
//   const { emails, emailsLoading } = useFetchAllEmails();
//   const { replies, repliesLoading } = useFetchAllReplies();
//   const { activities, activitiesLoading } = useFetchActivity();

//   const unreadMessages = emails?.filter((email) => email.read === false);
//   const starredMessages = emails?.filter((email) => email.starred === true);

//   const stats = [
//     {
//       title: "Unread Messages",
//       value: emailsLoading ? <Spin /> : unreadMessages.length,
//       icon: <MailOutlined />,
//       color: "#1890ff",
//     },
//     {
//       title: "Starred",
//       value: emailsLoading ? <Spin /> : starredMessages.length,
//       icon: <StarOutlined />,
//       color: "#faad14",
//     },
//     {
//       title: "Replies Sent",
//       value: repliesLoading ? <Spin /> : replies?.length,
//       icon: <SendOutlined />,
//       color: "#52c41a",
//     },
//     {
//       title: "Active Properties",
//       value: propertiesLoading ? <Spin /> : properties?.length,
//       icon: <HomeOutlined />,
//       color: "#722ed1",
//     },
//   ];

//   const activitiesDescriptions = activities.map((activity) => activity.title);

//   return (
//     <div style={{ padding: 0 }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <div></div>
//         <div>
//           <Title level={4} style={{ fontFamily: "Roboto" }}>
//             {format(new Date(), "EEEE, do MMMM")}
//           </Title>
//         </div>
//       </div>

//       <Divider />

//       {/* Stats Cards */}
//       <Row gutter={[16, 16]}>
//         {stats.map((item, i) => (
//           <Col xs={24} sm={12} md={6} key={i}>
//             <Card
//               style={{
//                 background: "#fff",
//                 borderRadius: 12,
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <div>
//                   <Text strong style={{ fontSize: 15, color: "#595959" }}>
//                     {item.title}
//                   </Text>
//                   <Title level={3} style={{ margin: 0 }}>
//                     {item.value}
//                   </Title>
//                 </div>
//                 <div
//                   style={{
//                     background: item.color,
//                     color: "#fff",
//                     borderRadius: "50%",
//                     padding: 10,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {item.icon}
//                 </div>
//               </div>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <Divider />

//       {/* Recent Messages & Quick Actions */}
//       <Row gutter={[16, 16]}>
//         <Col xs={24} md={16}>
//           <Card
//             title="Recent Messages"
//             extra={<Link to="/emails">View All</Link>}
//             style={{ borderRadius: 12 }}
//           >
//             {activitiesLoading ? (
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Spin size="large" />
//               </div>
//             ) : (
//               <List
//                 itemLayout="horizontal"
//                 dataSource={activities.filter(
//                   (activity) => activity.type === "mail"
//                 )}
//                 renderItem={(item) => (
//                   <List.Item>
//                     <List.Item.Meta
//                       title={<Text strong>{item.title}</Text>}
//                       description={item.description}
//                     />
//                     <Text type="secondary">
//                       {formatDistanceToNow(new Date(item.createdAt))} ago
//                     </Text>
//                   </List.Item>
//                 )}
//               />
//             )}
//           </Card>
//         </Col>

//         {/* Quick actions */}
//         <Col xs={24} md={8}>
//           <Card title="Quick Actions" style={{ borderRadius: 12 }}>
//             <div
//               style={{
//                 display: "grid",
//                 gap: 12,
//                 gridTemplateColumns: "1fr 1fr",
//               }}
//             >
//               <Button
//                 icon={<PlusOutlined />}
//                 type="primary"
//                 onClick={() => navigate("/create-property")}
//               >
//                 Add Property
//               </Button>
//               <Button
//                 icon={<MailOutlined />}
//                 onClick={() => navigate("/emails")}
//               >
//                 View Messages
//               </Button>
//               {/* <Button
//                 icon={<UserOutlined />}
//                 onClick={() => navigate("/create-property")}
//               >
//                 Manage Users
//               </Button>
//               <Button
//                 icon={<SettingOutlined />}
//                 onClick={() => navigate("/create-property")}
//               >
//                 Settings
//               </Button> */}
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       <Divider />

//       {/* Activity Timeline */}
//       <Card
//         title={
//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <BarChartOutlined /> <span>Recent Activity</span>
//           </div>
//         }
//         style={{ borderRadius: 12 }}
//       >
//         {activitiesLoading ? (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Spin size="large" />
//           </div>
//         ) : (
//           <Timeline
//             items={activitiesDescriptions.map((a) => ({ children: a }))}
//             size="large"
//           />
//         )}
//       </Card>
//     </div>
//   );
// }

// export default Dash;

import React from "react";
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
  MailOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  UserOutlined,
  CalendarOutlined,
  FireOutlined,
  BarChartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { mockData, stats } from "../assets/data/data";
import useFetchAvailableProperties from "../hooks/fetchAvailableProperty";

const { Title, Text } = Typography;

// Simple Chart Components
const MiniLineChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value));
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (d.value / max) * 80;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width="100%" height="100" style={{ display: "block" }}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            style={{ stopColor: "#52c41a", stopOpacity: 0.3 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#52c41a", stopOpacity: 0.05 }}
          />
        </linearGradient>
      </defs>
      <polyline
        points={`0,100 ${points} 100,100`}
        fill="url(#gradient)"
        stroke="none"
      />
      <polyline points={points} fill="none" stroke="#52c41a" strokeWidth="3" />
    </svg>
  );
};

const MiniBarChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value));
  const colors = ["#1890ff", "#52c41a", "#faad14", "#722ed1"];

  return (
    <svg width="100%" height="100" style={{ display: "block" }}>
      {data.map((d, i) => {
        const barWidth = 80 / data.length;
        const x = 10 + (i * 100) / data.length;
        const height = (d.value / max) * 80;
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
            style={{ color: "white", margin: 0, marginBottom: "8px" }}
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
                  }}
                >
                  {item.title}
                </Text>
                <Title level={2} style={{ margin: 0, marginBottom: 8 }}>
                  {item.value}
                </Title>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
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
                </div>
              </div>
              <div
                style={{
                  background: `${item.color}15`,
                  color: item.color,
                  borderRadius: 12,
                  padding: 16,
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
  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FireOutlined style={{ color: "#ff4d4f" }} />
          <span style={{ fontSize: 16, fontWeight: 600 }}>
            Top Performing Properties
          </span>
        </div>
      }
      extra={<Button type="link">View All</Button>}
      style={{
        borderRadius: 16,
        border: "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={mockData.topProperties}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: "16px 0",
              borderBottom: "1px solid #f0f0f0",
            }}
            actions={[
              <Tag color={item.status === "hot" ? "red" : "blue"}>
                {item.status === "hot" ? "🔥 Hot" : "Active"}
              </Tag>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #667eea30, #764ba230)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  {item.image}
                </div>
              }
              title={
                <Text strong style={{ fontSize: 15 }}>
                  {item.title}
                </Text>
              }
              description={
                <Space direction="vertical" size={4}>
                  <Text style={{ color: "#52c41a", fontWeight: 600 }}>
                    {item.price}
                  </Text>
                  <Space size={16}>
                    <span>
                      <EyeOutlined
                        style={{ color: "#8c8c8c", marginRight: 4 }}
                      />
                      <Text style={{ fontSize: 13, color: "#8c8c8c" }}>
                        {item.views}
                      </Text>
                    </span>
                    <span>
                      <MailOutlined
                        style={{ color: "#8c8c8c", marginRight: 4 }}
                      />
                      <Text style={{ fontSize: 13, color: "#8c8c8c" }}>
                        {item.inquiries}
                      </Text>
                    </span>
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
  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CalendarOutlined style={{ color: "#1890ff" }} />
          <span style={{ fontSize: 16, fontWeight: 600 }}>
            Upcoming Viewings
          </span>
          <Badge count={3} style={{ marginLeft: 8 }} />
        </div>
      }
      extra={<Button type="link">View All</Button>}
      style={{
        borderRadius: 16,
        border: "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={mockData.upcomingViewings}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: "16px 0",
              borderBottom: "1px solid #f0f0f0",
            }}
            actions={[
              <Tag color={item.status === "confirmed" ? "green" : "orange"}>
                {item.status === "confirmed" ? "✓ Confirmed" : "⏳ Pending"}
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
                  {item.client[0]}
                </Avatar>
              }
              title={
                <Text strong style={{ fontSize: 15 }}>
                  {item.property}
                </Text>
              }
              description={
                <Space direction="vertical" size={2}>
                  <Text style={{ fontSize: 14 }}>
                    <UserOutlined
                      style={{ marginRight: 4, color: "#8c8c8c" }}
                    />
                    {item.client}
                  </Text>
                  <Text style={{ fontSize: 13, color: "#1890ff" }}>
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
  );
};

const RecentActivity = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Card
          title={
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ClockCircleOutlined style={{ color: "#722ed1" }} />
              <span style={{ fontSize: 16, fontWeight: 600 }}>
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
          <Timeline
            items={mockData.recentActivities.map((activity, idx) => ({
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
                  {activity.icon}
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
                    }}
                  >
                    {activity.message}
                  </Text>
                  <Text style={{ fontSize: 13, color: "#8c8c8c" }}>
                    {activity.time}
                  </Text>
                </div>
              ),
            }))}
          />
        </Card>
      </Col>
    </Row>
  );
};

function Dash() {
  const loading = false;
  const { properties, propertiesLoading } = useFetchAvailableProperties();

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
        <Col xs={24} lg={14}>
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
        </Col>

        <Col xs={24} lg={10}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <BarChartOutlined style={{ color: "#1890ff" }} />
                <span style={{ fontSize: 16, fontWeight: 600 }}>
                  Properties by Type
                </span>
              </div>
            }
            style={{
              borderRadius: 16,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <MiniBarChart data={propertyTypes} />
            <div style={{ marginTop: 16 }}>
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
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          background: colors[i],
                        }}
                      />
                      <Text>{item.type}</Text>
                    </div>
                    <Text strong>{item.value}</Text>
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
        <Col xs={24} lg={12}>
          <TopProperties />
        </Col>

        {/* Upcoming Viewings */}
        <Col xs={24} lg={12}>
          <UpcomingViewings />
        </Col>
      </Row>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}

export default Dash;
