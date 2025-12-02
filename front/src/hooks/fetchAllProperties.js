import { useEffect, useState } from "react";
import axios from "axios";
import { useNotification } from "../contexts/NotificationContext";

function useFetchAllProperties() {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const openNotification = useNotification();

  const fetchProperties = async (pageNum = 1, refresh = false) => {
    setPropertiesLoading(true);
    try {
      if (refresh) setRefreshing(true);

      const res = await axios.get(
        `/fetch-all-properties?page=${pageNum}&limit=8`
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
        openNotification("warning", res.data.message, "Error");
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
      openNotification("warning", errorMessage, "Error");
    } finally {
      setRefreshing(false);
      setPropertiesLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
