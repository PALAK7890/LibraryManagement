import { useEffect, useState } from "react";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/students/all")
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="students-page">
      <h1>All Registered Students</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Enrollment</th>
            <th>Email</th>
            <th>Course</th>
            <th>Year</th>
            <th>Date Added</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.enrollment}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>{s.year}</td>
              <td>{new Date(s.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
