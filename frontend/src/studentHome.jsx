import StudentNavbar from "./studentNav";
import { useNavigate } from "react-router-dom";
import './style/studentHome.css'
export default function StudentHome() {
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

