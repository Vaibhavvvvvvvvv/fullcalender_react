import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { db } from "../firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore";

const DoctorForm = ({ doctors = [], setDoctors }) => {
  const [drId, setDrId] = useState("");
  const [drName, setDrName] = useState("");

  const handleSubmit = async () => {
    if (drId && drName) {
      const newDoctor = { id: drId, title: drName };

      try {
        // Add doctor to Firestore
        const docRef = await addDoc(collection(db, "doctors"), newDoctor);
        console.log("Doctor added with ID:", docRef.id);

        // Update local state and storage
        const updatedDoctors = [...doctors, newDoctor];
        setDoctors(updatedDoctors);
        localStorage.setItem("doctors", JSON.stringify(updatedDoctors));

        // Reset form
        setDrId("");
        setDrName("");
      } catch (error) {
        console.error("Error adding doctor: ", error);
      }
    }
  };


  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        bgcolor: "white",
        boxShadow: 3,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
        Doctor Form
      </Typography>
      
      <TextField
        fullWidth
        label="Enter Dr ID"
        variant="outlined"
        margin="normal"
        value={drId}
        onChange={(e) => setDrId(e.target.value)}
      />
      
      <TextField
        fullWidth
        label="Enter Dr Name"
        variant="outlined"
        margin="normal"
        value={drName}
        onChange={(e) => setDrName(e.target.value)}
      />
      
      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

DoctorForm.defaultProps = {
  doctors: [],
};

export default DoctorForm;