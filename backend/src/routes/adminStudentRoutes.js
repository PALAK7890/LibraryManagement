const express = require("express");
const router = express.Router();
const { Student } = require("../../database_md/db");

// ================= GET ALL STUDENTS =================
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err });
  }
});

// ================= ADD NEW STUDENT =================
router.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json({ message: "Student created!", student: newStudent });
  } catch (err) {
    res.status(500).json({ message: "Error creating student", error: err });
  }
});

// ================= UPDATE STUDENT (Works with blank fields) =================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },       // ⭐ THIS IS THE FIX
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated!", student: updated });
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: "Error updating student", error: err });
  }
});

// ================= DELETE STUDENT =================
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error: err });
  }
});

module.exports = router;
