
import { useState } from "react";

function StudentForm({ onAddStudent }) {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [marks, setMarks] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const student = {
      name,
      rollNumber,
      department,
      marks,
    };

    onAddStudent(student);

    setName("");
    setRollNumber("");
    setDepartment("");
    setMarks("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter Student Details</h2>

      <label>Student Name:</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <label>Roll Number:</label>
      <input
        type="text"
        value={rollNumber}
        onChange={(event) => setRollNumber(event.target.value)}
        required
      />

      <label>Department:</label>
      <input
        type="text"
        value={department}
        onChange={(event) => setDepartment(event.target.value)}
        required
      />

      <label>Marks:</label>
      <input
        type="number"
        min="0"
        max="100"
        value={marks}
        onChange={(event) => setMarks(event.target.value)}
        required
      />

      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;
