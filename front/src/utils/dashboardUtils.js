import {
  EyeOutlined,
  HeartFilled,
  HomeOutlined,
  MailOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useFetchClients from "../hooks/fetchClients";
import useFetchAllProperties from "../hooks/fetchAllProperties";
import useFetchAllEmails from "../hooks/fetchAllEmails";
import useFetchAnalytics from "../hooks/fetchAnalytics";

function DashUtils() {
  const { clients } = useFetchClients(); //clientsLoading
  const { properties } = useFetchAllProperties(); //propertiesLoading
  const { emails } = useFetchAllEmails(); //emailsLoading
  const { summary } = useFetchAnalytics(); //summaryLoading

  const unreadMessages = emails?.filter((email) => email.read === false);

  return {
    stats: [
      {
        title: "Total Users",
        value: clients.length.toLocaleString(),
        //change: 2,
        icon: <UserOutlined />,
        color: "#52c41a",
        loading: !true,
      },
      {
        title: "Active Listings",
        value: properties.length.toLocaleString(),
        icon: <HomeOutlined />,
        color: "#1890ff",
        loading: !true,
      },
      {
        title: "Total Views",
        value: summary?.totalViews?.toLocaleString(),
        icon: <EyeOutlined />,
        color: "#722ed1",
        trend: "down",
        loading: !true,
      },
      {
        title: "Total Likes",
        value: summary?.totalLikes?.toLocaleString(),
        icon: <HeartFilled style={{ color: "red" }} />,
        color: "#cf2626",
        trend: "down",
        loading: !true,
      },
      {
        title: "Total Clicks",
        value: summary?.totalClicks?.toLocaleString(),
        icon: <PlusCircleOutlined />,
        color: "#1a80cf",
        trend: "down",
        loading: !true,
      },
      {
        title: "New Inquiries",
        value: unreadMessages.length.toLocaleString(),
        icon: <MailOutlined />,
        color: "#faad14",
        loading: !true,
      },
    ],
  };
}
export default DashUtils;
