import { useEffect, useState } from "react";
import { useNotification } from "../contexts/NotificationContext";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function useFetchUpcomingViewings() {
  const [schedules, setSchedules] = useState([]);
  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const openNotification = useNotification();
  const { token } = useAuth();

  const fetchUpcomingViewings = async () => {
    setSchedulesLoading(true);
    try {
      const res = await axios.get("upcoming-viewings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setSchedules(res.data.upcomingViewings);
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again later.";
      openNotification("warning", errorMessage, "There was an error");
    } finally {
      setSchedulesLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingViewings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return {
    schedules,
    schedulesLoading,
    schedulesRefresh: () => setRefreshKey((prev) => prev + 1),
  };
}

export default useFetchUpcomingViewings;
