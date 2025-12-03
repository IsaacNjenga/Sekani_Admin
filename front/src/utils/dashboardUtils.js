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
import useFetchActivity from "../hooks/fetchActivity";
import useFetchUpcomingViewings from "../hooks/fetchUpcomingViewings";

function DashUtils() {
  const { clients, clientsLoading } = useFetchClients();
  const { properties, propertiesLoading } = useFetchAllProperties();
  const { emails, emailsLoading } = useFetchAllEmails();
  const { summary, topViewed, summaryLoading } = useFetchAnalytics();
  const { activities, activitiesLoading } = useFetchActivity();
  const { schedules, schedulesRefresh, schedulesLoading } =
    useFetchUpcomingViewings();

  const unreadMessages = emails?.filter((email) => email.read === false);

  const cleanedActivities = activities.map((activity) => ({
    type: activity.type,
    message: activity.title,
    time: activity.createdAt,
  }));

  const cleanedPropertyTypes = properties.reduce((acc, property) => {
    const existingType = acc.find(
      (item) => item.type === property.propertyType
    );
    if (existingType) {
      existingType.value += 1;
    } else {
      acc.push({ type: property.propertyType, value: 1 });
    }
    return acc;
  }, []);

  return {
    stats: [
      {
        title: "Total Users",
        value: clients.length.toLocaleString(),
        icon: <UserOutlined />,
        color: "#52c41a",
        loading: clientsLoading,
      },
      {
        title: "Active Listings",
        value: properties.length.toLocaleString(),
        icon: <HomeOutlined />,
        color: "#1890ff",
        loading: propertiesLoading,
      },
      {
        title: "Total Views",
        value: summary?.totalViews?.toLocaleString(),
        icon: <EyeOutlined />,
        color: "#722ed1",
        trend: "down",
        loading: summaryLoading,
      },
      {
        title: "Total Likes",
        value: summary?.totalLikes?.toLocaleString(),
        icon: <LikeFilled style={{ color: "red" }} />,
        color: "#cf2626",
        trend: "down",
        loading: summaryLoading,
      },
      {
        title: "Total Clicks",
        value: summary?.totalClicks?.toLocaleString(),
        icon: <LinkOutlined />,
        color: "#1a80cf",
        trend: "down",
        loading: summaryLoading,
      },
      {
        title: "New Inquiries",
        value: unreadMessages.length.toLocaleString(),
        icon: <MailOutlined />,
        color: "#faad14",
        loading: emailsLoading,
      },
    ],
    topViewed: topViewed,
    upcomingViewings: schedules,
    schedulesRefresh: schedulesRefresh,
    recentActivities: cleanedActivities,
    activitiesLoading: activitiesLoading,
    propertyTypes: cleanedPropertyTypes,
    clientsLoading: clientsLoading,
    propertiesLoading: propertiesLoading,
    emailsLoading: emailsLoading,
    summaryLoading: summaryLoading,
    schedulesLoading: schedulesLoading,
  };
}
export default DashUtils;
