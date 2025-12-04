const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { connectDB } = require("../database_md/db");
const authRoutes = require("./auth/loginSignAuth");
const booksApi = require("./auth/lib_books.js");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);

app.use(booksApi);

app.get("/", (req, res) => res.send("Backend Running..."));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
