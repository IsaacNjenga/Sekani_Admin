import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dash from "./pages/Dash";
import Analytics from "./pages/Analytics";
import Properties from "./pages/Properties";
import axios from "axios";
import Auth from "./pages/Auth";


axios.defaults.baseURL = "http://localhost:3001/Sekani";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  return (
    <>
      <Auth />
      {/* <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Dash />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes> */}
    </>
  );
}

export default App;
