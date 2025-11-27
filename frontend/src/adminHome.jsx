import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './adminNav';
export default function adminHome() {
  return (
    <>
    <AdminNavbar/>
    <div style={{ padding: "40px" }}>
      <h1>📚 Admin Dashboard</h1>
      <p>Access all books, students, statistics here.</p>
    </div>
    </>
  );
}
