# Library Management System

Live site : loading...

A minimal yet powerful full-stack Library Management System built with **React**, **Redux Toolkit Query**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**. This system allows users to manage books, borrow functionality, and track borrow summaries with a modern UI.

---

## Features

### Book Management

- View all books with table layout
- Add new book via form
- Edit book info in a modal
- Delete book with confirmation
- Toggle availability based on copies

### Borrow Books

- Borrow a book via modal form
- Validates quantity vs available copies
- Automatically marks book unavailable when out of stock
- Tracks due dates

### Borrow Summary

- Separate route `/borrow-summary`
- Aggregated list of borrowed books
- Columns: Book Title, ISBN, Total Quantity Borrowed

### UI & UX

- Tailwind CSS styling
- Modal forms using `@headlessui/react`
- Toaster notifications via `react-hot-toast`
- Responsive design

---

### Tech Stack

| Frontend                  | Backend                          |
| ------------------------- | -------------------------------- |
| React (Vite)              | Node.js + Express                |
| TypeScript                | TypeScript                       |
| Tailwind CSS              | MongoDB with Mongoose            |
| Redux Toolkit (RTK Query) | REST API with CRUD + Aggregation |
| react-hot-toast           | CORS, dotenv, validation         |
| React Router DOM          |                                  |

---

### Folder Structure

src/
├── components/ 
│ ├── EditBookModal.tsx
│ └── BorrowBookModal.tsx 

├── pages/
│ ├── Book.tsx
│ ├── AddBook.tsx 
│ └── BorrowSummary.tsx 

├── redux/
│ └── api/
│ └── baseApi.ts 

├── routes/
│ └── routes.ts 

└── App.tsx

### Purpose

**This project was designed to:**

- Learn and apply full-stack TypeScript development

- Practice CRUD operations with MongoDB

- Explore modern UI/UX patterns

- Demonstrate React + Redux Toolkit Query API integration

- Handle business logic like stock, due dates, availability toggling
