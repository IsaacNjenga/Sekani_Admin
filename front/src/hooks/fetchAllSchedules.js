import { useEffect, useState } from "react";
import { useNotification } from "../contexts/NotificationContext";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function useFetchAllSchedules() {
  const [allSchedules, setAllSchedules] = useState([]);
  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const openNotification = useNotification();
  const { token } = useAuth();

  const fetchAllSchedules = async () => {
    setSchedulesLoading(true);
    try {
      const res = await axios.get("fetch-all-schedules", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setAllSchedules(res.data.schedules);
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
    fetchAllSchedules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return {
    allSchedules,
    schedulesLoading,
    schedulesRefresh: () => setRefreshKey((prev) => prev + 1),
  };
}

export default useFetchAllSchedules;
