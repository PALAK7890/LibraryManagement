const express = require("express");
const { addStudent } = require("../controllers/addStudent");
const { getAllStudents } = require("../controllers/getStudent");
const { Student } = require("../../database_md/db");   // ✔ IMPORT STUDENT MODEL

const router = express.Router();

// Add Student
router.post("/add", addStudent);

// Get All Students
router.get("/all", getAllStudents);

// Get Logged-in Student Profile
router.get("/me", async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const profile = await Student.findOne({ email });

    if (!profile) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      profile,
      issuedBooks: [],
      notifications: [],
      totalFine: 0
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/check", async (req, res) => {
  const email = req.query.email;

  const student = await Student.findOne({ email });
  res.json({ exists: !!student });
});

module.exports = router;   // ✔ EXPORT AFTER EVERYTHING
