const Student = require("../models/Student");

exports.addStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json({ message: "Student added", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
};
