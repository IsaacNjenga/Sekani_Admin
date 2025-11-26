import {
  EyeOutlined,
  HomeOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useFetchClients from "../hooks/fetchClients";

function DashUtils() {
  const { clients } = useFetchClients();

  return {
    stats: [
      {
        title: "Total Users",
        value: clients.length,
        //change: 2,
        icon: <UserOutlined />,
        color: "#52c41a",
        trend: "up",
      },
      {
        title: "Active Listings",
        value: 24,
        change: 12.5,
        icon: <HomeOutlined />,
        color: "#1890ff",
        trend: "up",
      },
      {
        title: "Total Views",
        value: "3.2K",
        change: -5.2,
        icon: <EyeOutlined />,
        color: "#722ed1",
        trend: "down",
      },
      {
        title: "New Inquiries",
        value: 18,
        change: 8.3,
        icon: <MailOutlined />,
        color: "#faad14",
        trend: "up",
      },
    ],
  };
}
export default DashUtils;
