import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../style/book.css";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books`);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      toast.error("Error fetching books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Book deleted");
        fetchBooks();
      }
    } catch (err) {
      toast.error("Error deleting book");
    }
  };

  return (
    <div className="book-list-container">

      {/* TOP HEADER */}
      <div className="book-header">
        <h2>📚 Library Books</h2>
        <button className="add-btn" onClick={() => navigate("/admin/books/add")}>
          + Add Book
        </button>
      </div>

      {/* BOOK GRID */}
      <div className="books-grid">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <h3>{book.title}</h3>

            <p><b>Author:</b> {book.author}</p>
            <p><b>Category:</b> {book.category}</p>
            <p><b>Year:</b> {book.publishedYear}</p>

            <div className="card-buttons">
              <button
                className="edit-btn"
                onClick={() => navigate(`/admin/books/edit/${book._id}`)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteBook(book._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
