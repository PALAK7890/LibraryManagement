import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './adminNav';
import "./style/adminHome.css";

export default function AdminHome() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalBooks: 0,
    totalIssued: 0,
    totalFine: 0,
    recentStudents: [],
    recentBooks: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.log("Error loading admin stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="admin-home-container">
        <h1 className="admin-title">📚 Admin Dashboard</h1>
        <p className="admin-subtitle">Manage students, books & library activity</p>

        {/* LIVE STAT CARDS */}
        <div className="admin-stat-grid">

          <div className="stat-card purple">
            <h2>{stats.totalStudents}</h2>
            <p>Total Students</p>
          </div>

          <div className="stat-card blue">
            <h2>{stats.totalBooks}</h2>
            <p>Total Books</p>
          </div>

          <div className="stat-card pink">
            <h2>{stats.totalIssued}</h2>
            <p>Books Issued</p>
          </div>

          <div className="stat-card orange">
            <h2>₹ {stats.totalFine}</h2>
            <p>Total Fines</p>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <h2 className="section-title">⚡ Quick Actions</h2>
        <div className="quick-action-grid">
          <button onClick={() => navigate("/admin/students")} className="action-btn">👩‍🎓 Manage Students</button>
          <button onClick={() => navigate("/admin/books")} className="action-btn">📘 Manage Books</button>
          <button onClick={() => navigate("/admin/books/add")} className="action-btn">➕ Add Book</button>
         
        </div>

        {/* RECENT STUDENTS */}
        <h2 className="section-title">🧑‍🎓 Recently Added Students</h2>
        <div className="recent-box">
          {stats?.recentStudents?.length > 0 ? (
            stats.recentStudents.map((s, i) => (
              <p key={i}>• {s.name} ({s.enrollment})</p>
            ))
          ) : (
            <p>No recent students.</p>
          )}
        </div>

        {/* RECENT BOOKS */}
        <h2 className="section-title">📕 Recently Added Books</h2>
        <div className="recent-box">
          {stats?.recentBooks?.length > 0 ? (
            stats.recentBooks.map((b, i) => (
              <p key={i}>• {b.title}</p>
            ))
          ) : (
            <p>No recent books.</p>
          )}
        </div>

      </div>
    </>
  );
}
