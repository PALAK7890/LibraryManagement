const express = require("express");
const { addStudent } = require("../controllers/addStudent");
const { getAllStudents } = require("../controllers/getStudents");

const router = express.Router();

router.post("/add", addStudent);       // Add Student
router.get("/all", getAllStudents);    // Get All Students

module.exports = router;
