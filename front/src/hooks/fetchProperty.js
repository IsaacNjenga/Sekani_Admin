import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";

function useFetchProperty() {
  const { token } = useAuth();
  const openNotification = useNotification();
  const [propertyData, setPropertyData] = useState([]);
  const [propertyDataLoading, setPropertyDataLoading] = useState(false);

  const fetchProperty = async (id) => {
    if (!id) return;
    setPropertyDataLoading(true);
    try {
      const res = await axios.get(`fetch-property?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setPropertyData(res.data.property);
        //console.log(res.data.property);
      }
    } catch (error) {
      console.error("Error in fetching property:", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again later.";
      openNotification("warning", errorMessage, "Error");
    } finally {
      setPropertyDataLoading(false);
    }
  };

  return {
    propertyData,
    propertyDataLoading,
    fetchProperty,
  };
}

export default useFetchProperty;
