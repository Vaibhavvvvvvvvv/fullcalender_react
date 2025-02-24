import React, { useState } from "react";

const DoctorForm = ({ doctors, setDoctors }) => {
  const [drId, setDrId] = useState("");
  const [drName, setDrName] = useState("");

  const handleSubmit = () => {
    if (drId && drName) {
      const newDoctor = { id: drId, title: drName };
      const updatedDoctors = [...doctors, newDoctor];
      setDoctors(updatedDoctors);
      localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
      setDrId("");
      setDrName("");
    }
  };

  return (
    <div>
      <h1>Doctor Form</h1>
      <input
        type="text"
        className="form-control"
        placeholder="Enter Dr ID"
        value={drId}
        onChange={(e) => setDrId(e.target.value)}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Enter Dr Name"
        value={drName}
        onChange={(e) => setDrName(e.target.value)}
      />
      <button className="btn btn-success mt-2" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default DoctorForm;
