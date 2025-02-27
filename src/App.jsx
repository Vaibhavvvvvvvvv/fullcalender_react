import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Calendar from "./Component/Calendar";
import DoctorForm from "./Component/DoctorForm";
import AppointmentForm from "./Component/AppointmentForm";
import Login from "./Auth&Authantication/Login";
import SignIn from "./Auth&Authantication/SignIn";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState([]); // ✅ Defined events and setEvents
  const [doctors, setDoctors] = useState([]);

  // Check authentication state from localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(loggedIn);
  }, []);

  // Function to handle successful login/signup
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignIn />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Calendar events={events} setEvents={setEvents} /> : <Navigate to="/login" />}
        />
        <Route
          path="/doctors"
          element={isAuthenticated ? <DoctorForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/appointments"
          element={isAuthenticated ? <AppointmentForm /> : <Navigate to="/login" />}
        />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
