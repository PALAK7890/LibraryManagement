const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returned: { type: Boolean, default: false },
  returnDate: { type: Date, default: null },
  fine: { type: Number, default: 0 },
});

module.exports = mongoose.model("Issue", issueSchema);
