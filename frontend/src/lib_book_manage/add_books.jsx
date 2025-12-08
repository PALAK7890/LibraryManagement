import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../style/addbook.css"; // make sure CSS file is imported

export default function AddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    publishedYear: "",
    quantity: "",
    imageUrl: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true); // Show loading animation

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books`
, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      if (res.ok) {
        setLoading(false);
        setShowPopup(true); // Show popup

        setTimeout(() => {
          setShowPopup(false);
          navigate("/admin/books");
        }, 1800);
      }
    } catch (err) {
      setLoading(false);
      toast.error("Error adding book");
    }
  };

  return (
    <div className="add-book-page">

      {/* LOADING ANIMATION */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>📚 Book Uploaded!</h3>
            <p>Your book has been successfully added.</p>
          </div>
        </div>
      )}

      {/* ACTUAL FORM */}
      <div className="add-book-container">
        <h2>Add a New Book</h2>

        <form className="book-form" onSubmit={handleSubmit}>
          <input name="title" placeholder="Book Title" onChange={handleChange} required />
          <input name="author" placeholder="Author" onChange={handleChange} required />
          <input name="category" placeholder="Category" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
          <input name="publishedYear" placeholder="Published Year" onChange={handleChange} />
          <input name="quantity" placeholder="Quantity" onChange={handleChange} />
          <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />

          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
}
