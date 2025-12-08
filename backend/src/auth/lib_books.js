const express = require("express");
const admin_books= express.Router();
const  Book  = require("../../lib_md/books.js");

// ADD BOOK
admin_books.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: "Book added successfully!", book });
  } catch (err) {
    res.status(500).json({ message: "Error adding book", error: err });
  }
});

// GET ALL BOOKS
admin_books.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.log("BOOKS FETCH ERROR:", err);   // 👈 ADD THIS
    res.status(500).json({ message: "Error fetching books", error: err });
  }
});

// GET ONE BOOK
admin_books.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    console.log("BOOKS FETCH ERROR:", err);   // 👈 ADD THIS
    res.status(500).json({ message: "Error fetching books", error: err });
  }
});

// UPDATE BOOK
admin_books.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Book updated successfully!", updatedBook });
  } catch (err) {
    res.status(500).json({ message: "Error updating book", error: err });
  }
});

// DELETE BOOK
admin_books.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting book", error: err });
  }
});

module.exports = admin_books;
