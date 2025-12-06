const { Student } = require("../database_md/db");

exports.checkProfile = async (req, res) => {
  try {
    const email = req.user.email;  // email from token after login

    const student = await Student.findOne({ email });

    if (!student) {
      return res.json({ completed: false });
    }

    return res.json({ completed: true, student });
    
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
