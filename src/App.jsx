import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Calendar from "./Component/Calendar";
import DoctorForm from "./Component/DoctorForm";
import AppointmentForm from "./Component/AppointmentForm";
import Login from "./Auth&Authantication/Login";
import SignIn from "./Auth&Authantication/SignIn";
import { AuthProvider, useAuth } from "./AuthContext";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [events, setEvents] = useState([]);

  // Fetch doctors from Firebase
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsCollection = collection(db, "doctors");
        const doctorsSnapshot = await getDocs(doctorsCollection);
        const doctorList = doctorsSnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title || "Unknown Doctor",
        }));

        setDoctors(doctorList);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch appointments (events) from Firebase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "appointments");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventList = eventsSnapshot.docs.map((doc) => {
          const eventData = doc.data();
          
          return {
            id: doc.id,
            title: eventData.title || "No Title",
            start: new Date(eventData.start).toISOString(), // ✅ Ensure ISO format
            end: new Date(eventData.end).toISOString(),     // ✅ Ensure ISO format
            resourceId: eventData.resourceId || "",
          };
        });
  
        console.log("✅ Final Formatted Events for Calendar:", eventList);
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  
    fetchEvents();
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
                <Calendar doctors={doctors} events={events} setEvents={setEvents} setDoctors={setDoctors} />
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
