const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" }
});

const User = mongoose.model("User", userSchema);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enrollment: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  year: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Student = mongoose.model("Student", studentSchema);



module.exports = { User, connectDB ,Student};
