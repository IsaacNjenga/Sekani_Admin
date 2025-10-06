import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dash from "./pages/Dash";
import Analytics from "./pages/Analytics";
import Properties from "./pages/Properties";
import axios from "axios";
import Auth from "./pages/Auth";
import { useAuth } from "./contexts/AuthContext";
import { Spin } from "antd";
import CreateProperty from "./pages/createProperty";
import UpdateProperty from "./pages/updateProperty";
import ProtectedRoutes from "./components/ProtectedRoute";
import Emails from "./pages/emails";

axios.defaults.baseURL = "http://localhost:3001/Sekani";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Spin fullscreen tip="Authenticating..." size="large" />;
  }
  return (
    <>
      {!isAuthenticated ? (
        <Auth />
      ) : (
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Navbar />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Dash />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/emails" element={<Emails />} />
            <Route path="/create-property" element={<CreateProperty />} />
            <Route path="/update-property/:id" element={<UpdateProperty />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
