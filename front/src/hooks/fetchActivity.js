import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function useFetchActivity() {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchActivities = async () => {
    setActivitiesLoading(true);
    try {
      const res = await axios.get("fetch-activities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setActivities(res.data.activities);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setActivitiesLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [refreshKey]);

  return {
    activities,
    activitiesLoading,
    activitiesRefresh: () => setRefreshKey((prev) => prev + 1),
  };
}

export default useFetchActivity;
