import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/auth/AdminLogin";
import DashboardLayout from "./layouts/DashboardLayout"; 
import "./App.css";
import Announcements from "./pages/dashboard/announcements/Announcements";
import UserManagement from "./pages/dashboard/userManagement/UserManagement";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AdminLogin />
            )
          }
        />

        {/* Dashboard Route */}
        <Route
          path="/dashboard/*"
          element={<DashboardLayout onLogout={handleLogout} />}
        >
          <Route index element={<Navigate to="announcements" replace />} />
           <Route path="announcements" element={<Announcements />} />
           <Route path="user_management" element={<UserManagement />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;