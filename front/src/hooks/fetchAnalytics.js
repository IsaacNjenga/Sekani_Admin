import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import axios from "axios";

function useFetchAnalytics() {
  const { token } = useAuth();
  const openNotification = useNotification();
  const [summary, setSummary] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchAnalytics = async () => {
    setSummaryLoading(true);
    try {
      const res = await axios.get(`fetch-analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setSummary(res.data.summary);
      }
    } catch (error) {
      console.error("Error in fetching clients:", error);
      openNotification(
        "warning",
        "Try refreshing your page",
        "Something went wrong..."
      );
    } finally {
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    //eslint-disable-next-line
  }, [refreshKey]);

  return {
    summary,
    summaryLoading,
    summaryRefresh: () => setRefreshKey((prevKey) => prevKey + 1),
  };
}

export default useFetchAnalytics;
