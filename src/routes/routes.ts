import { createBrowserRouter } from "react-router";
import { Layout } from "../layout/Layout";
import { Book } from "../pages/Book/Book";
import { AddBook } from "../pages/AddBook/AddBook";
import { BorrowSummary } from "../pages/BorrowSummary/BorrowSummary";
import { Error } from "../components/Error";
import { BookDetails } from "../pages/BookDetails/BookDetails";

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
        path: "book/:id",
        Component: BookDetails,
      },
      {
        path: "add-book",
        Component: AddBook,
      },
      {
        path: "borrow-book-summery",
        Component: BorrowSummary,
      },
      {
    path: "*",
    Component: Error,
  },
    ],
  },
]);
