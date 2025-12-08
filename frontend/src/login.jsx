import React, { useState } from 'react';
import './App.css';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

import loginImg from './assests/login_photu.png';
import googleLogo from './assests/ggl.png';
import facebookLogo from './assests/fb.png';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (res.ok) {
        toast.success("🎉 Login Successful!", { position: "top-right" });

        // Save login info
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("role", data.user.role);

        // ADMIN → Dashboard
        if (data.user.role === "admin") {
          setTimeout(() => navigate("/admin-dashboard"), 1200);
          return;
        }

        // STUDENT → Check if profile exists
        const checkRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/students/check?email=${data.user.email}`
        );
        const checkData = await checkRes.json();

        console.log("PROFILE CHECK:", checkData);

        setTimeout(() => {
          if (checkData.exists) {
            navigate("/home");            // Profile found → go home
          } else {
            navigate("/complete-profile"); // No profile → ask details once
          }
        }, 1200);
      } 
      else {
        toast.error(`⚠️ ${data.message}`, { position: "top-right" });
      }

    } catch (err) {
      toast.error("❌ Something went wrong!", { position: "top-right" });
      console.log(err.message);
    }
  };

  return (
    <div className="Login">

      <div className='Main-Login-Container'>
        <div className='login-main'>
          <div className='Login-title'>
            <h2>Hey! Log in</h2>
            <p>Hello Please Login to use This Application </p>
          </div>

          <div className='Login-boxes'>
            <form className='email&passowrd'>
              <input 
                type='email' 
                placeholder='Email'
                required
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <input 
                type='password'
                placeholder='Password'
                required
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </form>

            <button onClick={handleLogin}>Let's Start!</button>

            <a href='forgot-password'>Forgot Password?!</a>
            <p>Don't Have An Account <a href='/signin'>Please Sign in</a></p>

            <div className="social-login">
              <img src={googleLogo} alt="Google" className='social-icon'/>
              <img src={facebookLogo} alt="Facebook" className='social-icon'/>
            </div>

          </div>
        </div>
      </div>

      <div className='login-photu'>
        <img src={loginImg} alt='login-img'/>
      </div>

    </div>
  );
}

export default Login;
