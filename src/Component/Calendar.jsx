// import React, { useState, useEffect } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

// const Calendar = ({ events = [], doctors = [], setEvents, setDoctors }) => {
//   const [calendarView, setCalendarView] = useState("resourceTimeGridDay");

//   useEffect(() => {
//     try {
//       const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
//       const storedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
//       if (setEvents) setEvents(storedEvents);
//       if (setDoctors) setDoctors(storedDoctors);
//     } catch (error) {
//       console.error("Error parsing localStorage data:", error);
//     }
//   }, [setEvents, setDoctors]);

//   // Function to handle view change
//   const handleViewChange = (view) => {
//     setCalendarView(view);
//   };

//   return (
//     <div className="container mt-3">
//       {/* View Change Buttons */}
//       <div className="mb-3">
//         <button className="btn btn-info me-2" onClick={() => handleViewChange("dayGridMonth")}>
//           Month View
//         </button>
//         <button className="btn btn-info me-2" onClick={() => handleViewChange("timeGridWeek")}>
//           Week View
//         </button>
//         <button className="btn btn-info" onClick={() => handleViewChange("resourceTimeGridDay")}>
//           Day View
//         </button>
//       </div>

//       <FullCalendar
//         key={calendarView} // Ensures re-render when view changes
//         plugins={[dayGridPlugin, timeGridPlugin, resourceTimeGridPlugin, interactionPlugin]}
//         initialView={calendarView}
//         resources={doctors}
//         events={events}
//         editable={true}
//         nowIndicator={true}
//         schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
//         slotMinTime="08:00:00"
//         slotMaxTime="20:00:00"
//         eventBackgroundColor="#2ecc71"
//         eventBorderColor="#27ae60"
//         eventTextColor="#ffffff"
//         eventOverlap={false}
//         height="auto"
//       />
//     </div>
//   );
// };

// export default Calendar;


import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = ({ events = [], doctors = [], setEvents = () => {}, setDoctors = () => {} }) => {
  const [calendarView, setCalendarView] = useState("resourceTimeGridDay");

  useEffect(() => {
    try {
      const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
      const storedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
      setEvents(storedEvents);
      setDoctors(storedDoctors);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }, [setEvents, setDoctors]);

  // Function to handle view change
  const handleViewChange = (view) => {
    setCalendarView(view);
  };

  return (
    <div className="container mt-3">
      {/* View Change Buttons */}
      <div className="mb-3">
        <button className="btn btn-info me-2" onClick={() => handleViewChange("dayGridMonth")}>
          Month View
        </button>
        <button className="btn btn-info me-2" onClick={() => handleViewChange("timeGridWeek")}>
          Week View
        </button>
        <button className="btn btn-info" onClick={() => handleViewChange("resourceTimeGridDay")}>
          Day View
        </button>
      </div>

      <FullCalendar
        key={calendarView} // Ensures re-render when view changes
        plugins={[dayGridPlugin, timeGridPlugin, resourceTimeGridPlugin, interactionPlugin]}
        initialView={calendarView}
        resources={doctors}
        events={events}
        editable={true}
        nowIndicator={true}
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        eventBackgroundColor="#2ecc71"
        eventBorderColor="#27ae60"
        eventTextColor="#ffffff"
        eventOverlap={false}
        height="auto"
      />
    </div>
  );
};

Calendar.defaultProps = {
  events: [],
  doctors: [],
  setEvents: () => {},
  setDoctors: () => {},
};

export default Calendar;