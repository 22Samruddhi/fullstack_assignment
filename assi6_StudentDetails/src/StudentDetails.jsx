
function StudentDetails({ students }) {
  return (
    <div>
      <h2>Student Details</h2>

      {students.length === 0 ? (
        <p>No student details added yet.</p>
      ) : (
        students.map((student, index) => (
          <div className="student-card" key={index}>
            <h3>Student {index + 1}</h3>
            <p>Name: {student.name}</p>
            <p>Roll Number: {student.rollNumber}</p>
            <p>Department: {student.department}</p>
            <p>Marks: {student.marks}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default StudentDetails;
