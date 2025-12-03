import StudentNavbar from "./studentNav";
import { useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react'
import './style/studentHome.css'

export default function StudentHome() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);
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

  const navigate = useNavigate();

  return (
    <>
    <StudentNavbar/>
    <div className="student-dashboard">
       <h2 className="welcome-text">Welcome {username} 👋</h2>
      
      {/* 📚 E-BOOKS SECTION */}
      <h2 className="section-heading">E-Books Library</h2>

      <div className="book-scroll">
        {categories.map(cat => (
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
    </div>
    </>
  );
}

