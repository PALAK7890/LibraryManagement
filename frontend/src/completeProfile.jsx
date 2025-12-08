import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style/completeProfile.css";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");   // ⭐ auto email

  const [data, setData] = useState({
    name: "",
    enrollment: "",
    email: userEmail || "",
    course: "",
    year: ""
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  // ⭐ Auto set email so student cannot edit
  useEffect(() => {
    setData((prev) => ({ ...prev, email: userEmail }));
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:8080/api/students/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    setLoading(false);

    if (res.ok) {
      setPopup(true);

      setTimeout(() => {
        setPopup(false);
        navigate("/home");  // ⭐ will go to dashboard without asking again
      }, 2000);
    }
  };

  return (
    <div className="profile-page">

      {/* POPUP */}
      {popup && (
        <div className="popup">
          <div className="popup-box">
            🎉 Congrats! Your profile is saved.
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="profile-container">
        <h2 className="profile-title">Complete Your Profile</h2>

        <form className="profile-form" onSubmit={handleSubmit}>

          <label>Name</label>
          <input
            required
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />

          <label>Enrollment</label>
          <input
            required
            onChange={(e) => setData({ ...data, enrollment: e.target.value })}
          />

          {/* ⭐ Auto-filled Email Field (READ-ONLY) */}
          <label>Email</label>
          <input
            required
            value={data.email}
            readOnly                 // ← student cannot change
            className="read-only"
          />

          <label>Course</label>
          <select
            required
            onChange={(e) => setData({ ...data, course: e.target.value })}
          >
            <option value="">Select Course</option>
            <option value="B.Tech CSE (AI)">B.Tech CSE (AI)</option>
            <option value="B.Tech CSE (DS)">B.Tech CSE (DS)</option>
            <option value="B.Com">B.Com</option>
            <option value="B.Des">B.Des</option>
            <option value="B.Sc">B.Sc</option>
          </select>

          <label>Year</label>
          <select
            required
            onChange={(e) => setData({ ...data, year: e.target.value })}
          >
            <option value="">Select Year</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>

          <button className="profile-submit-btn" type="submit">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
