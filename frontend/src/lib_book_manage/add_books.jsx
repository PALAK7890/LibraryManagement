import { useState } from "react";
import { toast } from "react-toastify";

export default function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    isbn: "",
    quantity: 1,
    imageUrl: "",
    publishedYear: ""
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      if (res.ok) {
        toast.success("Book added!");
        setBook({
          title: "",
          author: "",
          category: "",
          description: "",
          isbn: "",
          quantity: 1,
          imageUrl: "",
          publishedYear: ""
        });
      }
    } catch (err) {
      toast.error("Error adding book");
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>

      <form onSubmit={handleSubmit} className="book-form">
        <input type="text" name="title" placeholder="Title" value={book.title} onChange={handleChange} required />

        <input type="text" name="author" placeholder="Author" value={book.author} onChange={handleChange} required />

        <input type="text" name="category" placeholder="Category" value={book.category} onChange={handleChange} required />

        <textarea name="description" placeholder="Description" value={book.description} onChange={handleChange} />

        <input type="text" name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} />

        <input type="number" name="quantity" placeholder="Quantity" value={book.quantity} onChange={handleChange} />

        <input type="text" name="imageUrl" placeholder="Image URL" value={book.imageUrl} onChange={handleChange} />

        <input type="number" name="publishedYear" placeholder="Published Year" value={book.publishedYear} onChange={handleChange} />

        <button>Add Book</button>
      </form>
    </div>
  );
}
