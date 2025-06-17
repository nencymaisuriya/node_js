# 🛍️ Product Management System

This is a full-stack web application built using **Node.js**, **Express.js**, **MongoDB**, and **EJS**, with full support for:
- Admin login/logout
- OTP-based password reset
- Product CRUD with multiple image uploads
- Category & sub-category management
- Flash messaging and session handling

---

## 📁 Features

- 🔐 Admin authentication system (login, session, password reset with OTP via email)
- 📦 CRUD operations on products (Add, Edit, View, Delete)
- 🖼️ Upload and display multiple product images
- 🗃️ Category, Subcategory, and Extra Category support
- ⚡ Flash messages for actions and errors
- 📱 Responsive UI with Bootstrap

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, HTML, CSS, Bootstrap
- **Database**: MongoDB (with Mongoose)
- **File Upload**: Multer
- **Email Service**: Nodemailer
- **Session Management**: express-session, cookies

---

## 📂 Folder Structure

├── controllers/
│ ├── adminController.js
│ └── productController.js
├── models/
│ ├── adminModel.js
│ ├── categoryModel.js
│ ├── productModel.js
├── routes/
│ ├── adminRoutes.js
│ └── productRoutes.js
├── views/
│ ├── products/
│ ├── admins/
│ └── partials/
├── public/
│ ├── css/
│ ├── js/
│ └── uploads/
├── .env
├── app.js
└── package.json

---

## 🖼️ Screenshots

### 🔐 Admin Login
![Login](./screenshots/login.png)

---

### 🧑‍💼 Admin Dashboard
![Dashboard](./screenshots/dashboard.png)

---

### ➕ Add Product Page
![Add Product](./screenshots/add-product.png)

---

### 📋 View Products Page
![View Products](./screenshots/view-products.png)

---

### ✏️ Edit Product Page
![Edit Product](./screenshots/edit-product.png)

---







