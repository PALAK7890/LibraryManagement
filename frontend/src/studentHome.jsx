import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "./studentNav";
import "./style/studentHome.css";

export default function StudentHome() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [fine, setFine] = useState(0);

  const navigate = useNavigate();

  const categories = [
    { id: "computer_science", title: "Computer Science" },
    { id: "programming", title: "Programming" },
    { id: "science", title: "Science" },
    { id: "fantasy", title: "Fantasy" },
    { id: "children", title: "Kids Books" },
    { id: "history", title: "History" },
    { id: "romance", title: "Romance" },
    { id: "fiction", title: "Fiction" }
  ];

  // Load username
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  // Load real student dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/students/me?email=${localStorage.getItem("email")}`)

        const data = await res.json();

        setProfile(data.profile);
        setIssuedBooks(data.issuedBooks || []);
        setFine(data.totalFine || 0);
        setNotifications(data.notifications || []);
      } catch (err) {
        console.log("Error loading student data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <StudentNavbar />

      <div className="student-dashboard">
        <h2 className="welcome-text">Welcome {username} 👋</h2>

        {/* ⭐ SCROLL CATEGORY SECTION */}
        <h2 className="section-heading">Explore Books</h2>

        <div className="book-scroll">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="book-card clickable"
              onClick={() => navigate(`/ebooks/${cat.id}`)}
            >
              <h3>{cat.title}</h3>
              <p>Explore →</p>
            </div>
          ))}
        </div>

        {/* ⭐ DASHBOARD DATA BELOW */}
        {!profile ? (
          <h3>Loading your dashboard...</h3>
        ) : (
          <>
            {/* PROFILE */}
            <div className="profile-card">
              <h3>👤 Your Profile</h3>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Course:</strong> {profile.course}</p>
              <p><strong>Enrollment:</strong> {profile.enrollment}</p>
              <p><strong>Year:</strong> {profile.year}</p>
            </div>

            {/* ISSUED BOOKS */}
            <div className="section">
              <h2>📚 Your Issued Books</h2>

              {issuedBooks.length === 0 ? (
                <p>You have no issued books right now.</p>
              ) : (
                <div className="cards-row">
                  {issuedBooks.map((b, i) => (
                    <div key={i} className="card">
                      <h3>{b.title}</h3>
                      <p>Issued On: {b.issueDate}</p>
                      <p>Due Date: {b.dueDate}</p>
                      {b.overdue && <span className="tag overdue">Overdue</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* NOTIFICATIONS */}
            <div className="section">
              <h2>🔔 Notifications</h2>
              {notifications.length === 0 ? (
                <p>No notifications right now.</p>
              ) : (
                <ul className="notification-list">
                  {notifications.map((n, i) => (
                    <li key={i}>• {n}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* FINE */}
            <div className="section">
              <h2>💰 Your Current Fine</h2>
              <div className="fine-box">₹ {fine}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
