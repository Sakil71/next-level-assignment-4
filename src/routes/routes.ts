import { createBrowserRouter } from "react-router";
import { Layout } from "../layout/Layout";
import { Book } from "../pages/Book/Book";
import { AddBook } from "../pages/AddBook/AddBook";
import { BorrowSummary } from "../pages/BorrowSummary/BorrowSummary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Book,
      },
      {
        path: "book",
        Component: Book,
      },
      {
        path: "add-book",
        Component: AddBook,
      },
      {
        path: "borrow-book-summery",
        Component: BorrowSummary,
      },
    ],
  },
]);
