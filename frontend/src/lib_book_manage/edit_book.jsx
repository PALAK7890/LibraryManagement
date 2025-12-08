import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/apibooks/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(() => toast.error("Failed to load book"));
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_API_URL}/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    toast.success("Book Updated!");
    navigate("/admin/books");
  };

  if (!book) return <h3>Loading...</h3>;

  return (
    <div className="edit-book-container">
      <h2>Edit Book</h2>

      <form className="book-form" onSubmit={handleSubmit}>
        <input name="title" value={book.title} onChange={handleChange} required />
        <input name="author" value={book.author} onChange={handleChange} required />
        <input name="category" value={book.category} onChange={handleChange} required />
        <textarea name="description" value={book.description} onChange={handleChange}></textarea>
        <input name="publishedYear" value={book.publishedYear} onChange={handleChange} />
        <input name="quantity" value={book.quantity} onChange={handleChange} />
        <input name="imageUrl" value={book.imageUrl} onChange={handleChange} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
