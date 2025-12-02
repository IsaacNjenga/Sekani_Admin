import {
  EyeOutlined,
  HomeOutlined,
  LikeFilled,
  LinkOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useFetchClients from "../hooks/fetchClients";
import useFetchAllProperties from "../hooks/fetchAllProperties";
import useFetchAllEmails from "../hooks/fetchAllEmails";
import useFetchAnalytics from "../hooks/fetchAnalytics";
import CountUp from "react-countup";

function DashUtils() {
  const { clients } = useFetchClients(); //clientsLoading
  const { properties } = useFetchAllProperties(); //propertiesLoading
  const { emails } = useFetchAllEmails(); //emailsLoading
  const { summary } = useFetchAnalytics(); //summaryLoading

  const unreadMessages = emails?.filter((email) => email.read === false);

  const formatter = (value) => <CountUp end={value} separator="," />;

  return {
    stats: [
      {
        title: "Total Users",
        //value: formatter(clients.length),
        value: clients.length.toLocaleString(),
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
        icon: <LikeFilled style={{ color: "red" }} />,
        color: "#cf2626",
        trend: "down",
        loading: !true,
      },
      {
        title: "Total Clicks",
        value: summary?.totalClicks?.toLocaleString(),
        icon: <LinkOutlined />,
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
