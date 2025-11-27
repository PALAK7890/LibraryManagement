import React from 'react';
import Login from './login';
import Signin from './signin';
import Home from './home';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={2500} pauseOnHover={false}  hideProgressBar={false} theme="colored" closeOnClick
  newestOnTop
      />
      </>
    
  );
}

export default App;

