import React, { useState } from "react";
import Calendar from "./Component/Calendar";
import DoctorForm from "./Component/DoctorForm";
import AppointmentForm from "./Component/AppointmentForm";

const App = () => {
  const [events, setEvents] = useState([]);
  const [doctors, setDoctors] = useState([]);

  return (
    <div className="container">
      <h1>Patient Appointment Booking System</h1>
      <div className="row">
        <div className="col-md-12">
          <Calendar events={events} setEvents={setEvents} doctors={doctors} setDoctors={setDoctors} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <DoctorForm doctors={doctors} setDoctors={setDoctors} />
        </div>
        <div className="col-md-6">
          <AppointmentForm events={events} setEvents={setEvents} doctors={doctors} />
        </div>
      </div>
    </div>
  );
};

export default App;
