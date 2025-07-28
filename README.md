# 📦 Book-Club Library Management System (Backend)

This is the **backend** service for the Book-Club Library Management System. It provides RESTful APIs for managing books, readers, lending operations, and overdue notifications.

> 📍 Built with **Node.js**, **Express**, and **MongoDB**

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Secure login for staff members
- JWT-based authentication
- Role-based access control

### 📖 Reader Management
- Create, update, delete readers
- Retrieve reader details

### 📚 Book Management
- Add, update, delete books
- Get all or individual book details

### 🔄 Lending Management
- Lend books to readers
- Track book return status
- View lending history by book or reader

### ⏰ Overdue Management
- Identify overdue books
- Send automated email reminders

### 🛠️ Utility
- Input validation
- Error handling middleware
- CORS and environment config support

---

## 🧰 Tech Stack

| Layer       | Technology           |
|-------------|----------------------|
| Runtime     | Node.js              |
| Server      | Express.js           |
| Database    | MongoDB              |
| Auth        | JWT                  |
| Email       | Nodemailer|
| Validation  | express-validator    |
| Env Config  | dotenv               |

---


---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/RasanduniLakmali/Library_Management_System_Backend.git

```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a .env file in the root folder and add
```bash
PORT=3002
MONGO_URI=mongodb://localhost:1573/book-club
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

```

### 4.  Run the server
```bash
npm run dev

