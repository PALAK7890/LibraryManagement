const { Student } = require("../../database_md/db");
const Book = require("../../lib_md/books");
const Issue = require("../../lib_md/issue_book");

exports.getAdminStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalBooks = await Book.countDocuments();
    const issuedBooks = await Issue.countDocuments({ returned: false });

    res.json({
      success: true,
      totalStudents,
      totalBooks,
      issuedBooks
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
 
exports.seedBooks = async (req, res) => {
  try {
    const sample = [];

    for (let i = 1; i <= 60; i++) {
      sample.push({
        title: `Sample Book ${i}`,
        author: `Author ${i}`,
        category: `Category ${(i % 5) + 1}`,
        isbn: `ISBN-${i}`,         // ⭐ UNIQUE ISBN
        quantity: 10
      });
    }

    await Book.insertMany(sample);

    res.json({ success: true, message: "60 books added successfully!" });
  } catch (err) {
    console.log("SEED ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to add books" });
  }
};

