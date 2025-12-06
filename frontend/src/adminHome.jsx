import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './adminNav';

export default function adminHome() {
  const navigate = useNavigate();

  return (
    <>
    <AdminNavbar/>
    <div style={{ padding: "40px" }}>
      <h1>📚 Admin Dashboard</h1>
      <p>Access all books, students, statistics here.</p>

      <div style={{ marginTop: "30px" }}>
        <button 
          onClick={() => navigate("/admin/students")} 
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4A90E2",
            color: "white"
          }}
        >
          View All Students
        </button>
      </div>
    </div>
    </>
  );
}
