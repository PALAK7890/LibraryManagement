const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  isbn: { type: String},
  quantity: { type: Number, default: 1 },
  imageUrl: { type: String },
  publishedYear: { type: Number }
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book; 
