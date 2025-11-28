// AboutLibrary.jsx
import React from "react";
import "./style/about.css";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate= useNavigate()
  return (
    <div className="about-page">
         <button className="go-back" onClick={() => navigate(-1)}>
        ← Go Back
      </button>
  
      <section className="about-hero">
        <div className="about-hero-text">
          <span className="badge">Library Management System</span>
          <h1>Smart Digital Library for Every Student 📚</h1>
          <p>
            Our Library Management Portal helps students easily search, issue,
            and track books – anytime, anywhere. No more long queues, no more
            confusion, just smooth access to knowledge.
          </p>

          <div className="about-hero-actions">
            <button className="primary-btn">Browse Books</button>
            <button className="ghost-btn">View Your Issued Books</button>
          </div>

          <div className="about-hero-stats">
            <div className="stat-card">
              <h3>5,000+</h3>
              <p>Books & Resources</p>
            </div>
            <div className="stat-card">
              <h3>1,200+</h3>
              <p>Active Students</p>
            </div>
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Portal Access</p>
            </div>
          </div>
        </div>

        <div className="about-hero-illustration">
          <div className="card glass-card">
            <h3>Quick Actions</h3>
            <ul>
              <li>🔍 Search by Title / Author</li>
              <li>📥 Check Issue Status</li>
              <li>⏳ See Due Dates</li>
              <li>⭐ Add Feedback</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="about-section">
        <h2>What You Can Do As a Student</h2>
        <p className="section-subtitle">
          Sare important kaam ek hi jagah – simple, fast aur student-friendly.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🔍 Smart Book Search</h3>
            <p>
              Title, author, ya subject se books search karo. Filtering se
              easily apni required book tak reach ho jaoge.
            </p>
          </div>

          <div className="feature-card">
            <h3>📥 Track Issued Books</h3>
            <p>
              Konsi books issue ki hui hain, due date kya hai, aur fine lagega
              ya nahi – sab clearly visible rahega.
            </p>
          </div>

          <div className="feature-card">
            <h3>⏳ Reserve Unavailable Books</h3>
            <p>
              Agar book currently kisi aur ke paas hai, to aap usko reserve
              kar sakte ho, jisse available होते ही aapko mil jaaye.
            </p>
          </div>

          <div className="feature-card">
            <h3>📝 Give Feedback</h3>
            <p>
              New books suggest kar sakte ho, system ke liye feedback de sakte
              ho, taaki portal aur better ban sake.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="about-section alt">
        <h2>How to Use the Portal?</h2>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Login / Sign Up</h3>
            <p>
              College ID ka use karke login karo. Agar account nahi hai, to
              signup option se easily account bana sakte ho.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Explore & Search</h3>
            <p>
              Dashboard se categories browse karo, search bar ka use karo, aur
              apni required book find karo.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Issue / Reserve</h3>
            <p>
              Jo book available hai usse issue karo, warna reserve request
              submit kar do – admin aage process karega.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">4</span>
            <h3>Track & Return</h3>
            <p>
              Issued Books section me jaake due dates dekho, time pe return
              karo aur unnecessary fine se bach jao.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT ADMIN SECTION */}
      <section className="about-section contact-section">
        <h2>Need Help? Contact Library Admin</h2>
        <p className="section-subtitle">
          Account issue ho, fine doubt ho, ya new books suggest karni ho – feel
          free to reach out.
        </p>

        <div className="contact-grid">
          <div className="contact-card">
            <h3>📧 Email</h3>
            <p>library.admin@university.edu</p>
          </div>
          <div className="contact-card">
            <h3>📱 Phone</h3>
            <p>+91 98765 43210</p>
          </div>
          <div className="contact-card">
            <h3>🏢 Office Hours</h3>
            <p>Mon – Fri, 10:00 AM – 4:00 PM</p>
          </div>
          <div className="contact-card">
            <h3>📍 Location</h3>
            <p>Central Library Building, 1st Floor</p>
          </div>
        </div>
      </section>

      
      <footer className="about-footer">
        <p>
          Together, let's make learning easier, smarter and more accessible for
          everyone. 🚀
        </p>
      </footer>
    </div>
  );
}
