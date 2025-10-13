import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

function useFetchAvailableProperties() {
  const { token } = useAuth();
  const [properties, setProperties] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchProperties = async () => {
    setPropertiesLoading(true);
    try {
      const res = await axios.get(`/fetch-available-properties`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setProperties(res.data.availableProperty);
        setErrorMessage(null);
      } else {
        setErrorMessage(res.data.message || "Failed to fetch properties.");
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setPropertiesLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [refreshKey]);

  return {
    properties,
    propertiesLoading,
    errorMessage,
    propertiesRefresh: () => setRefreshKey((prev) => prev + 1),
  };
}

export default useFetchAvailableProperties;
