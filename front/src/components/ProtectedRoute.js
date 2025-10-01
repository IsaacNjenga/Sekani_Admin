import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";
import Auth from "../pages/Auth";

function ProtectedRoutes({ children }) {
  const { isAuthenticated, logout } = useAuth();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !isAuthenticated) return;

    try {
      const decoded = jwtDecode(token);

      // Check expiration (exp is in seconds, convert to ms)
      const expiryTime = decoded.exp * 1000;

      if (Date.now() >= expiryTime) {
        logout();

        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
          confirmButtonColor: "#3085d6",
        });
      } else {
        // Optional: schedule auto logout just before expiry
        const timeout = expiryTime - Date.now();

        const timer = setTimeout(() => {
          logout();
          Swal.fire({
            icon: "warning",
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            confirmButtonColor: "#3085d6",
          });
        }, timeout);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
      Swal.fire({
        icon: "error",
        title: "Session Error",
        text: "Your session is invalid. Please log in again.",
        confirmButtonColor: "#d33",
      });
    }
  }, [token, isAuthenticated, logout]);

  if (!isAuthenticated || !token) {
    return <Auth />; // or redirect to login page
  }

  return children;
}

export default ProtectedRoutes;
