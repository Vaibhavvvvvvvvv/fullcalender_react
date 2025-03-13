import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import { db } from "../firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore";
import {v4 as uuidv4} from "uuid"
const AppointmentForm = ({ events, setEvents, doctors = [] }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [errors, setErrors] = useState({});

  const handleAppointment = async () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!name) newErrors.name = "Name is required";
    if (!doctor) newErrors.doctor = "Please select a doctor";
    if (!appointmentTime) newErrors.appointmentTime = "Select date & time";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const newEvent = {
      id: uuidv4(),
      title: name,
      start: appointmentTime,
      end: appointmentTime,
      resourceId: doctor,
      email: email,
    };
    
    try {
      // Add appointment to Firebase Firestore
      const docRef = await addDoc(collection(db, "appointments"), newEvent);
      console.log("Appointment added with ID:", docRef.id);

      // Update local state and storage
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));

      // Reset form
      setEmail("");
      setName("");
      setDoctor("");
      setAppointmentTime("");
      setErrors({});
    } catch (error) {
      console.error("Error adding appointment: ", error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
        Book an Appointment
      </Typography>

      <TextField
        fullWidth
        label="Email"
        type="email"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        fullWidth
        label="Full Name"
        type="text"
        variant="outlined"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        select
        fullWidth
        label="Select Doctor"
        variant="outlined"
        margin="normal"
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
        error={!!errors.doctor}
        helperText={errors.doctor}
      >
        <MenuItem value="">Select a doctor</MenuItem>
        {doctors.map((doc) => (
          <MenuItem key={doc.id} value={doc.id}>
            {doc.title}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Appointment Date & Time"
        type="datetime-local"
        variant="outlined"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={appointmentTime}
        onChange={(e) => setAppointmentTime(e.target.value)}
        error={!!errors.appointmentTime}
        helperText={errors.appointmentTime}
      />

      <Button
        fullWidth
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        onClick={handleAppointment}
      >
        Book Appointment
      </Button>
    </Box>
  );
};

AppointmentForm.defaultProps = {
  doctors: [],
};

export default AppointmentForm;