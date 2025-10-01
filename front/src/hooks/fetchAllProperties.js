import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

function useFetchAllProperties() {
  const { token } = useAuth();
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchProperties = async (pageNum = 1, refresh = false) => {
    setPropertiesLoading(true);
    try {
      if (refresh) setRefreshing(true);

      const res = await axios.get(
        `/fetch-all-properties?page=${pageNum}&limit=8`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        const uniqueProperties =
          refresh || pageNum === 1
            ? res.data.properties
            : Array.from(
                new Set(
                  [...properties, ...res.data.properties].map(
                    (property) => property._id
                  )
                )
              ).map((id) =>
                [...properties, ...res.data.properties].find(
                  (property) => property._id === id
                )
              );

        setProperties(uniqueProperties);
        setHasMore(pageNum < res.data.totalPages);
        setPage(pageNum);
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
      setRefreshing(false);
      setPropertiesLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [refreshKey]);

  const handleLoadMore = async () => {
    if (hasMore && !propertiesLoading && !refreshing) {
      await fetchProperties(page + 1);
    }
  };

  return {
    properties,
    propertiesLoading,
    errorMessage,
    propertiesRefresh: () => setRefreshKey((prev) => prev + 1),
    handleLoadMore,
  };
}

export default useFetchAllProperties;
