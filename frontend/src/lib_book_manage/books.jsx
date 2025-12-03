import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BookList() {
  const [books, setBooks] = useState([]);

  // GET ALL BOOKS
  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      toast.error("Error fetching books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // DELETE BOOK
  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Book deleted successfully");
        fetchBooks();
      }
    } catch (err) {
      toast.error("Error deleting book");
    }
  };

  return (
    <div className="book-list">
      <h2>📚 All Books</h2>

      <div className="books-container">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <h3>{book.title}</h3>
            <p><b>Author:</b> {book.author}</p>
            <p><b>Category:</b> {book.category}</p>
            <p><b>Year:</b> {book.publishedYear}</p>

            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
