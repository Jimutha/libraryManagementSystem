# 📚 Library Management System (LMS)

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Frontend](https://img.shields.io/badge/Frontend-Next.js_14-black)
![Backend](https://img.shields.io/badge/Backend-Spring_Boot_3-green)
![Database](https://img.shields.io/badge/Database-MySQL-orange)

A robust full-stack Library Management System designed to handle book inventory, user reservations, and administrative tasks. Built with a modern **Next.js** frontend and a secure **Spring Boot** backend.

## 🚀 Tech Stack

### Frontend
* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios (Centralized Instance)
* **State Management:** React Context API (Auth Context)
* **Notifications:** React Hot Toast

### Backend
* **Framework:** Spring Boot 3
* **Security:** Spring Security 6 & JWT (JSON Web Tokens)
* **Database:** MySQL (JPA / Hibernate)
* **Build Tool:** Maven
* **API Documentation:** RESTful Architecture

---

## ✨ Key Features

### 👤 User Features
* **Secure Authentication:** Register and Login with JWT-based sessions.
* **Dashboard:** Browse and filter books by Genre, Language, or Search term.
* **Book Details:** View full book information and status (Available/Borrowed).
* **Reservations:** Reserve books and track due dates.
* **User Profile:** View account stats, "Member Since" date, and **Change Password** securely.

### 🛡️ Admin Features (Librarian)
* **Admin Dashboard:** Overview of total users, books, and active loans.
* **Inventory Management:** Add, Edit, and Delete books.
* **User Management:** View registered users and manage roles.
* **CORS Configuration:** Secure communication between frontend and backend.

---



## 🛠️ Installation & Setup

### Prerequisites
* Node.js (v21)
* Java Development Kit (JDK 17+)
* MySQL Server

### 1. Database Configuration
Create a MySQL database named `library_db` (or whatever you configured in `application.properties`).

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd backend
