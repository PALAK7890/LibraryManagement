# 📚 LibraTrack – Library Management System  
A modern MERN-based library system where Admin can manage books and students, and students can browse e-books, issue books, and view their dashboard.

---

- Login / Sign-up  
- Dashboard with profile  
- View issued books  
- Fine calculator  
- Notifications  
- Explore E-Books by category  
- Search E-Books  
- Forgot Password (email + enrollment → set new password)  

- Admin login  
- Manage Students (Add / Edit / Delete / Search)  
- Manage Books (Add / Edit / Delete)  
- View library statistics  
- Add 60 demo books (seed API)  
- Dashboard with analytics  

---

Tech Stack

| Layer        | Technology           |
|-------------|-----------------------|
| Frontend    | React, React Router, CSS, Toastify |
| Backend     | Node.js, Express.js   |
| Database    | MongoDB + Mongoose    |
| Authentication | JWT (admin+student) |
| APIs        | OpenLibrary API (E-Books) |

---

Folder Structure

```
backend/
│── src/
│   ├── auth/
│   │   ├── loginSignAuth.js
│   │   └── lib_books.js
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   ├── adminRoutes.js
│   │   └── adminStudentRoutes.js
│   ├── controllers/
│   ├── index.js
│── database_md/
│   └── db.js
│── lib_md/
│   └── books.js
│
frontend/
│── src/
│   ├── login.jsx
│   ├── signin.jsx
│   ├── studentHome.jsx
│   ├── adminHome.jsx
│   ├── adminStudents.jsx
│   ├── lib_book_manage/
│   │   ├── add_books.jsx
│   │   ├── books.jsx
│   │   └── edit_book.jsx
│   ├── e_book.jsx
│   └── ...
```

---



Clone Repository
```bash
git clone https://github.com/yourusername/LibraTrack.git
cd LibraTrack
```

```bash
cd backend
npm install
```

Create **.env**

```
MONGO_URL=your_mongo_connection
JWT_SECRET=your_secret
PORT=8080
```

Run server:
```bash
npm start
```


```bash
cd frontend
npm install
npm run dev
```

---


| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login user/admin |
| POST | `/api/auth/signin` | Register student |
| POST | `/api/auth/forgot-password` | Reset password (email + enrollment + newPassword) |

---

students
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students/all` | Get all students |
| POST | `/api/admin/students` | Add student |
| PUT | `/api/admin/students/:id` | Update student |
| DELETE | `/api/admin/students/:id` | Delete student |
| GET | `/api/students/me?email=` | Student dashboard data |

---
book
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| POST | `/api/books` | Add new book |
| PUT | `/api/books/:id` | Update book |
| DELETE | `/api/books/:id` | Delete book |

---

Admin Stats
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/seed-books` | Insert 60 demo books |


- Dark Mode  
- PDF Reader  
- Online Issuing System  
- Admin Notifications  
- Student Attendance Integration  

Made with 💜 by palak
