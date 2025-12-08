import { useState } from "react";
import "./style/forgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState(""); // success or error

  const handleReset = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, enrollment, newPassword }),
    });

    const data = await res.json();

    if (data.success) {
      setMsg("Password reset successful! You can now login.");
      setType("success");
      setEmail("");
      setEnrollment("");
      setNewPassword("");
    } else {
      setMsg(data.message);
      setType("error");
    }
  };

  return (
    <div className="forgot-container">
      <h2 className="forgot-title">Forgot Password?</h2>
      <p className="forgot-sub">Reset your password using your registered details.</p>

      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Enrollment No."
          value={enrollment}
          onChange={(e) => setEnrollment(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit" className="forgot-btn">Reset Password</button>
      </form>

      {msg && <p className={`forgot-msg ${type}`}>{msg}</p>}
    </div>
  );
}
