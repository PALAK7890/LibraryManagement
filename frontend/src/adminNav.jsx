import { useNavigate } from "react-router-dom";
import "./style/adminNav.css";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="admin-nav">
      <div className="admin-nav-left" onClick={() => navigate("/admin-dashboard")}>🏛 LibraTrack Admin</div>


      <div className="admin-nav-right">

        <button onClick={() => navigate("/admin-dashboard")} className="admin-btn">Dashboard</button>
        <button onClick={() => navigate("/admin/books")} className="admin-btn">Books</button>
        <button onClick={() => navigate("/admin/students")} className="admin-btn">Students</button>
        <button onClick={() => navigate("/admin/reports")} className="admin-btn">Reports</button>

        <button onClick={logout} className="admin-logout">
          Logout
        </button>

      </div>
    </nav>
  );
}
