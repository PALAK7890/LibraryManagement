const { Student } = require("../../database_md/db.js");

exports.addStudent = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);  
    const newStudent = await Student.create(req.body);
    console.log("CREATED STUDENT:", newStudent);  

    res.status(201).json({ message: "Student added", student: newStudent });

  } catch (error) {
    console.log("STUDENT SAVE ERROR:", error);    
    res.status(500).json({ message: error.message });
  }
};
