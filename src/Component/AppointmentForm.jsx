import React, { useState } from "react";

const AppointmentForm = ({ events, setEvents, doctors }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleAppointment = () => {
    if (email && name && doctor && appointmentTime) {
      const newEvent = {
        id: doctor,
        title: name,
        start: appointmentTime,
        end: appointmentTime,
        resourceId: doctor,
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));

      setEmail("");
      setName("");
      setDoctor("");
      setAppointmentTime("");
    }
  };

  return (
    <div>
      <h1>Appointment Form</h1>
      <input
        type="email"
        className="form-control"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select className="form-control" value={doctor} onChange={(e) => setDoctor(e.target.value)}>
        <option value="">Select Doctor</option>
        {doctors.map((doc) => (
          <option key={doc.id} value={doc.id}>
            {doc.title}
          </option>
        ))}
      </select>
      <input
        type="datetime-local"
        className="form-control"
        value={appointmentTime}
        onChange={(e) => setAppointmentTime(e.target.value)}
      />
      <button className="btn btn-success mt-2" onClick={handleAppointment}>
        Book Appointment
      </button>
    </div>
  );
};

export default AppointmentForm;
