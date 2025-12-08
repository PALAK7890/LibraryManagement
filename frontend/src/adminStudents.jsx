import { useEffect, useState } from "react";
import "./style/adminStudents.css";
import AdminNavbar from "./adminNav";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  // FORM STATES
  const [form, setForm] = useState({
    name: "",
    enrollment: "",
    email: "",
    course: "",
    year: ""
  });

  const [editingId, setEditingId] = useState(null);

  // LOAD STUDENTS
  const loadStudents = async () => {
    const res = await fetch("http://localhost:8080/api/admin/students")
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // FILTERED LIST
  const filtered = students.filter((s) =>
    [s.name, s.enrollment, s.email]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // HANDLE SUBMIT (CREATE + UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      await fetch(`http://localhost:8080/api/admin/students/${editingId}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
    } else {
      // CREATE
      await fetch("http://localhost:8080/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setEditingId(null);
    setForm({ name: "", enrollment: "", email: "", course: "", year: "" });
    loadStudents();
  };

  // DELETE STUDENT
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    await fetch(`http://localhost:8080/api/admin/students/${id}`, {
      method: "DELETE",
    });

    loadStudents();
  };

  // FILL FORM ON EDIT
  const editStudent = (s) => {
    setEditingId(s._id);
    setForm({
      name: s.name,
      enrollment: s.enrollment,
      email: s.email,
      course: s.course,
      year: s.year
    });
  };

  return (
    <>
      <AdminNavbar />

      <div className="students-container">
        <h2 className="students-title">📚 Manage Students</h2>

        {/* SEARCH BAR */}
        <div className="students-search-box">
          <input
            type="text"
            placeholder="Search student by name, email or enrollment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ADD + EDIT FORM */}
        <div className="student-form-box">
          <h3>{editingId ? "✏️ Edit Student" : "➕ Add New Student"}</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              type="text"
              placeholder="Enrollment No."
              value={form.enrollment}
              onChange={(e) =>
                setForm({ ...form, enrollment: e.target.value })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <select
  value={form.course}
  onChange={(e) => setForm({ ...form, course: e.target.value })}
  required
>
  <option value="">Select Course</option>
  <option value="B.Tech CSE">B.Tech CSE (AI)</option>
  <option value="B.Tech IT">B.Tech CSE (DS)</option>
  <option value="B.Tech ECE">Bsc(psy)</option>
  <option value="B.Tech Mechanical">B.Des</option>
  <option value="MCA">MCA</option>
</select>

            <select
  value={form.year}
  onChange={(e) => setForm({ ...form, year: e.target.value })}
  required
>
  <option value="">2020</option>
  <option value="1">2021</option>
  <option value="2">2022</option>
  <option value="3">2023</option>
  <option value="4">2024</option>
  <option value="4">2025</option>
</select>


            <button type="submit" className="submit-btn">
              {editingId ? "Update Student" : "Add Student"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    name: "",
                    enrollment: "",
                    email: "",
                    course: "",
                    year: "",
                  });
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* STUDENTS TABLE */}
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Enrollment</th>
              <th>Email</th>
              <th>Course</th>
              <th>Year</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No students found.
                </td>
              </tr>
            ) : (
              filtered.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td>
                  <td>{s.enrollment}</td>
                  <td>{s.email}</td>
                  <td>{s.course}</td>
                  <td>{s.year}</td>
                  <td>{new Date(s.createdAt).toLocaleDateString()}</td>

                  <td>
                    <button className="edit-btn" onClick={() => editStudent(s)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteStudent(s._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
