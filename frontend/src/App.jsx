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
import BookList from "./lib_book_manage/books";
import AddBook from "./lib_book_manage/add_books";
import EditBook from "./lib_book_manage/edit_book";
import AdminStudents from './adminStudents';
import ForgotPassword from './forgotPassword';
import CompleteProfile from './completeProfile';
import EbookLibrary from './e_book';
import About from './about';
import StudentContact from './studentContact';
import StudentInfo from './studentInfoAdmin';  

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Signin />} />

          {/* ADMIN */}
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin-dashboard" element={<AdminHome />} />
          <Route path="/admin/books" element={<BookList />} />
          <Route path="/admin/books/add" element={<AddBook />} />
          <Route path="/admin/books/edit/:id" element={<EditBook />} />
          <Route path="/ebooks/:category" element={<EbookLibrary />} />

          {/* STUDENT */}
          <Route path="/home" element={<StudentHome />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/student-contact" element={<StudentContact />} />

          {/* ⭐ ADD THIS -> Student Info Page */}
          <Route path="/student-info" element={<studentInfoAdmin />} />

          {/* OTHERS */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/ebooks" element={<EbookLibrary />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer 
        position="top-right" 
        autoClose={2500} 
        pauseOnHover={false}
        hideProgressBar={false} 
        theme="colored" 
        closeOnClick
        newestOnTop
      />
    </>
  );
}

export default App;
