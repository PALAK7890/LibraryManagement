import React from 'react';
import Login from './login';
import Signin from './signin';
import Home from './adminHome';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import AdminHome from "./adminHome";
import StudentHome from "./studentHome";
import EbookLibrary from './e_book';
import About from './about';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin-dashboard" element={<AdminHome />} />
  <Route path="/home" element={<StudentHome />} />
  <Route path="/ebooks/:category" element={<EbookLibrary/>}/>
   <Route path="/about" element={<About/>}/>

      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={2500} pauseOnHover={false}  hideProgressBar={false} theme="colored" closeOnClick
  newestOnTop
      />
      </>
    
  );
}

export default App;

