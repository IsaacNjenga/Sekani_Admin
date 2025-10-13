import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
function useFetchAllReplies() {
  const { token } = useAuth();
  const [replies, setReplies] = useState([]);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchReplies = async () => {
    setRepliesLoading(true);
    try {
      const res = await axios.get(`fetch-replies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setReplies(res.data.replies);
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again later.";

      Swal.fire({
        icon: "warning",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setRepliesLoading(false);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [refreshKey]);

  return {
    replies,
    repliesLoading,
    repliesRefresh: () => setRefreshKey((prev) => prev + 1),
  };
}

export default useFetchAllReplies;
