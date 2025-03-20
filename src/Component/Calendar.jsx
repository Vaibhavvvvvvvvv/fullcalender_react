import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const Calendar = ({ events, doctors, setEvents, setDoctors }) => {
  const calendarRef = useRef(null);

  // 🔹 Fetch Doctors (Resources)
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsCollection = collection(db, "doctors");
        const doctorsSnapshot = await getDocs(doctorsCollection);

        const doctorList = doctorsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // Ensure this matches the resourceId in events
            title: data.name || data.title || "Unnamed Doctor",
          };
        });

        setDoctors(doctorList);
      } catch (error) {
        console.error("❌ Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []); // 🔥 Fetch only once when component mounts

  // 🔹 Fetch Appointments (Events)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "appointments");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventList = eventsSnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("Event Data from Firestore:", data); // Debugging Log

          return {
            id: doc.id,
            title: data.title || "No Title",
            start: new Date(data.start).toISOString(), // Ensure valid ISO string
            end: new Date(data.end).toISOString(), // Ensure valid ISO string
            resourceId: data.resourceId || "defaultDoctor", // Ensure resourceId matches a resource
          };
        });

        setEvents(eventList);
      } catch (error) {
        console.error("❌ Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []); // 🔥 Fetch only once when component mounts

  // 🔹 Handle Adding Events
  const handleEventAdd = async (eventInfo) => {
    try {
      const newEvent = {
        title: eventInfo.event.title || "New Appointment", // 🔥 Ensure title exists
        start: eventInfo.event.start.toISOString(),
        end: eventInfo.event.end.toISOString(),
        resourceId: eventInfo.event.extendedProps.resourceId || "defaultDoctor", // 🔥 Ensure doctorId is linked
      };

      const docRef = await addDoc(collection(db, "appointments"), newEvent);
      setEvents((prevEvents) => [...prevEvents, { ...newEvent, id: docRef.id }]); // 🔥 Correctly update events with Firestore ID
    } catch (error) {
      console.error("❌ Error adding event:", error);
    }
  };

  // 🔹 Handle View Change
  const changeView = (view) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(view);
  };

  return (
    <div className="container mt-3">
      {/* 🔹 View Change Buttons */}
      <div className="mb-3">
        <button className="btn btn-info me-2" onClick={() => changeView("dayGridMonth")}>
          Month View
        </button>
        <button className="btn btn-info me-2" onClick={() => changeView("timeGridWeek")}>
          Week View
        </button>
        <button className="btn btn-info" onClick={() => changeView("resourceTimeGridDay")}>
          Day View
        </button>
      </div>

      {/* 🔹 FullCalendar Component */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, resourceTimeGridPlugin, interactionPlugin]}
        initialView="resourceTimeGridDay" // 🔥 Default to Day View
        resources={doctors.length > 0 ? doctors : [{ id: "defaultDoctor", title: "General Doctor" }]} // 🔥 Ensure doctors list is not empty
        events={events} // 🔥 Events now have doctorId
        editable={true}
        nowIndicator={true}
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        eventBackgroundColor="#2ecc71"
        eventBorderColor="#27ae60"
        eventTextColor="#ffffff"
        height="auto"
        eventAdd={handleEventAdd} // 🔥 Added event handler
       timeZone="local"
      />
    </div>
  );
};

export default Calendar;