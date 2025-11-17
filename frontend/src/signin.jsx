import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from './assests/login_photu.png';
import googleLogo from './assests/ggl.png';
import facebookLogo from './assests/fb.png';

const Signin = () => {
     const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate(); 

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        mode: "cors"
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("Signup successful!")
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="Login">
     
      <div className='Main-Login-Container'>
        <div className='login-main'>
          <div className='Login-title'>
            <h2>Welcome! Sign Up</h2>
            <p>Create your account to get started</p>
          </div>

          <div className='Login-boxes'>
            <form className='email&passowrd' onSubmit={handleSubmit}>
              <input type='text' placeholder='Full Name' required onChange={(e) =>
          setFormData({ ...formData, username: e.target.value })
        }/>
              <input type='email' placeholder='Email' required  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input type='password' placeholder='Password' required onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }/>
        <button type="submit">Sign Up</button>
            </form>

            
            <p>Already have an account? <a href='/'>Login here</a></p>

            <div className='social-login'>
              <img src={googleLogo} alt='Google' className='social-icon' />
              <img src={facebookLogo} alt='Facebook' className='social-icon' />
            </div>
          </div>
        </div>
      </div>

      <div className='login-photu'>
        <img src={loginImg} alt='signup-img' />
      </div>
    </div>
  );
};

export default Signin;
