import { useNavigate } from "react-router-dom";
import "./style/studentNav.css";

export default function StudentNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="student-nav">

    
      <div className="nav-left" onClick={() => navigate("/home")}>
        📚 LibraTrack
      </div>

      
      <div className="nav-right">
        
        
        <input 
          type="text" 
          className="search-box" 
          placeholder="Search books..."
        />

        <button onClick={() => navigate("/about")} className="nav-btn">About</button>
        <button onClick={() => navigate("/contact")} className="nav-btn">Contact</button>
        <button onClick={logout} className="logout-btn">Logout</button>

      </div>
    </nav>
  );
}
