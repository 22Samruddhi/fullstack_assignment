
import { useState } from "react";
import StudentForm from "./StudentForm";
import StudentDetails from "./StudentDetails";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const addStudent = (student) => {
    setStudents((previousStudents) => [
      ...previousStudents,
      student,
    ]);
  };

  return (
    <div className="container">
      <h1>Student Information Application</h1>

      <StudentForm onAddStudent={addStudent} />

      <StudentDetails students={students} />
    </div>
  );
}

export default App;
