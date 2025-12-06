import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/completeProfile.css";

export default function CompleteProfile() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    enrollment: "",
    email: "",
    course: "",
    year: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/students/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert("Profile completed!");
      navigate("/home");
    }
  };

  return (
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

        <label>Email</label>
        <input 
          required 
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <label>Course</label>
        <input 
          required 
          onChange={(e) => setData({ ...data, course: e.target.value })}
        />

        <label>Year</label>
        <input 
          type="number" 
          required 
          onChange={(e) => setData({ ...data, year: e.target.value })}
        />

        <button className="profile-submit-btn" type="submit">
          Save Profile
        </button>
      </form>
    </div>
  );
}
