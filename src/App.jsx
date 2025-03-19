import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Calendar from "./Component/Calendar";
import DoctorForm from "./Component/DoctorForm";
import AppointmentForm from "./Component/AppointmentForm";
import Login from "./Auth&Authantication/Login";
import SignIn from "./Auth&Authantication/SignIn";
import { AuthProvider, useAuth } from "./AuthContext";

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [events, setEvents] = useState([]);

  // Load doctors from localStorage when the app starts
  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
    setDoctors(storedDoctors);

    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignIn />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Calendar doctors={doctors} events={events} setEvents={setEvents} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctors"
            element={
              <ProtectedRoute>
                <DoctorForm doctors={doctors} setDoctors={setDoctors} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <AppointmentForm doctors={doctors} events={events} setEvents={setEvents} />
              </ProtectedRoute>
            }
          />


          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

export default App;