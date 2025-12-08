import "./style/studentContact.css";
import StudentNavbar from "./studentNav";

export default function StudentContact() {
  return (
    <>
      <StudentNavbar />

      <div className="contact-container">

        <h2 className="contact-title">📞 Contact Librarian & Library Info</h2>

        {/* LIBRARIAN INFO */}
        <div className="contact-card">
          <h3>👩‍🏫 Librarian Information</h3>
          <p><strong>Name:</strong> Mrs. Anjali Sharma</p>
          <p><strong>Email:</strong> librarysupport@university.edu</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Cabin:</strong> Library Block – Room 204</p>
        </div>

        {/* LIBRARY TIMINGS */}
        <div className="contact-card">
          <h3>⏰ Library Timings</h3>
          <p>Monday – Friday: <strong>9:00 AM – 7:00 PM</strong></p>
          <p>Saturday: <strong>10:00 AM – 5:00 PM</strong></p>
          <p>Sunday: <strong>Closed</strong></p>
        </div>

        {/* RULES SECTION */}
        <div className="contact-card rules-card">
          <h3>📘 Library Rules & Guidelines</h3>
          <ul>
            <li>Maintain silence inside the library.</li>
            <li>Keep your mobile phones on silent mode.</li>
            <li>Return borrowed books before the due date.</li>
            <li>₹20/day late fee will apply for overdue books.</li>
            <li>Handle books and library property with care.</li>
            <li>Do not eat or drink inside the library hall.</li>
            <li>Student ID card is mandatory for issuing books.</li>
            <li>No outside books allowed without permission.</li>
          </ul>
        </div>

        {/* CONTACT OFFICE */}
        <div className="contact-card">
          <h3>🏛 Library Office Contact</h3>
          <p><strong>Address:</strong></p>
          <p>University Central Library,  
             Main Academic Block,  
             Delhi – 110001</p>
          <p><strong>Email:</strong> libraryoffice@university.edu</p>
          <p><strong>Phone:</strong> +91 91234 56789</p>
        </div>
      </div>
    </>
  );
}
