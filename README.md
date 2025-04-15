# 🚗 CarNexa - Car Store – Frontend (Assignment 4)

**Live Frontend**: https://carstore-client.vercel.app/
**Live Backend**: https://assignment2-car-store.vercel.app/

A professional **Car Store platform** with full-stack functionalities: user registration, login, car listing, order management, and admin control. Built with **React, TypeScript, Redux Toolkit, Ant Design, Tailwind CSS**, and connected to a powerful backend.

---

## 🔥 Core Features

### ✅ General Features (For All Users)

- View all available cars
- Responsive UI for all screen sizes
- Real-time page updates (no manual reload)
- Browse cars without login
- **Protected purchase**: Users must log in or sign up to place an order
- Register and log in as a new user
- Toast notifications for feedback (success/failure)

---

### 👤 User Features

- Register and login
- View all cars
- Place orders (after login)
- View their own orders
- Cancel their orders
- Real-time order status update

---

### 🧑‍💼 Admin Features

- Role-based access for Admins
- **User Management**:
  - View all users
  - Deactivate/Activate users
  - Admins cannot deactivate other admins
- **Car Management**:
  - Add new cars with image uploads (FormData)
  - Edit existing car details (prefilled form via URL param & dynamic state)
  - Delete cars (with confirmation modal)
- **Order Management**:
  - View all orders
  - Change order status
  - Real-time updates after actions

---

## 🧭 Routing & Access Control

- **React Router DOM** for client-side routing
- **Protected Routes**:
  - Any user can **browse cars** freely
  - To **place an order**, user must be logged in
  - Admin routes are protected and only accessible to Admins

---

## 📦 Tech Stack

| Frontend                  | Libraries & Tools           |
| ------------------------- | --------------------------- |
| React + TypeScript        | Ant Design UI, Tailwind CSS |
| Redux Toolkit + RTK Query | React Router DOM            |
| React Hook Form + Zod     | React Hot Toast             |
| Vite                      | Day.js (for dates)          |

---

## 🗂 Folder Structure

src/ │ ├── components/ # Reusable components (Button, Form, Modal, etc.) ├── layout/ # App & Dashboard layouts ├── pages/ # Page-level components (AddCar, AllUsers, Orders, etc.) ├── redux/ │ └── features/ # API slices (auth, car, order, user) ├── routes/ # Protected routing logic ├── types/ # Type definitions (TUser, TCar, etc.) ├── utils/ # Utilities (private routes, tokens, formatting) └── main.tsx # Entry point

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Th3At0nic/car-store-frontend-assignment4.git
cd car-store-frontend-assignment4

npm install
# or
bun install

```

## Run the App

```bash
npm run dev
# or
bun dev
```
