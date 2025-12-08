import { useEffect, useState } from "react";
import StudentNavbar from "./studentNav";
import "./style/studentInfo.css";

export default function StudentInfo() {
  const email = localStorage.getItem("email");

  const [profile, setProfile] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [fine, setFine] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/students/me?email=${email}`);
        const data = await res.json();

        // Backend should send profile, issuedBooks, fine
        setProfile(data.profile || null);
        setIssuedBooks(data.issuedBooks || []);
        setFine(data.totalFine || 0);
      } catch (err) {
        console.log("Error loading student info:", err);
      }
      setLoading(false);
    };

    loadData();
  }, [email]);

  if (loading) return <h3 style={{ padding: "20px" }}>Loading...</h3>;

  return (
    <>
      <StudentNavbar />

      <div className="info-container">
        <h2 className="info-title">📘 Student Profile</h2>

        {/* PROFILE CARD */}
        <div className="info-card">
          {profile ? (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Enrollment:</strong> {profile.enrollment}</p>
              <p><strong>Course:</strong> {profile.course}</p>
              <p><strong>Year:</strong> {profile.year}</p>
            </>
          ) : (
            <p>No profile found.</p>
          )}
        </div>

        {/* ISSUED BOOKS */}
        <h3 className="section-title">📚 Books Issued</h3>
        {issuedBooks.length === 0 ? (
          <p>No books issued yet.</p>
        ) : (
          <div className="books-list">
            {issuedBooks.map((book, i) => (
              <div key={i} className="book-item">
                <p><strong>{book.title}</strong></p>
                <p>Issued On: {book.issueDate}</p>
                <p>Due: {book.dueDate}</p>
              </div>
            ))}
          </div>
        )}

        {/* FINE */}
        <h3 className="section-title">💰 Pending Fine</h3>
        <div className="fine-box">
          ₹ {fine}
        </div>
      </div>
    </>
  );
}
