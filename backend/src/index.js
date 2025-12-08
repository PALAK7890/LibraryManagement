const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const { connectDB } = require("../database_md/db");

const authRoutes = require("./auth/loginSignAuth");
const booksApi = require("./auth/lib_books.js");   
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminStudentRoutes = require("./routes/adminStudentRoutes");

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));



connectDB();


app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/books", booksApi); 


app.use("/api/admin", adminRoutes);
app.use("/api/admin/students", adminStudentRoutes);

app.get("/", (req, res) => res.send("Backend Running..."));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
