import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});

  // Load book details
  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`http://localhost:8080/api/books/${id}`);
      const data = await res.json();
      setBook(data);
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8080/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    toast.success("Book updated!");
    navigate("/admin/books");
  };

  return (
    <div>
      <h2>Edit Book</h2>

      <form onSubmit={handleSubmit} className="book-form">
        <input type="text" name="title" value={book.title} onChange={handleChange} />

        <input type="text" name="author" value={book.author} onChange={handleChange} />

        <input type="text" name="category" value={book.category} onChange={handleChange} />

        <textarea name="description" value={book.description} onChange={handleChange} />

        <input type="text" name="isbn" value={book.isbn} onChange={handleChange} />

        <input type="number" name="quantity" value={book.quantity} onChange={handleChange} />

        <input type="text" name="imageUrl" value={book.imageUrl} onChange={handleChange} />

        <input type="number" name="publishedYear" value={book.publishedYear} onChange={handleChange} />

        <button>Update Book</button>
      </form>
    </div>
  );
}
