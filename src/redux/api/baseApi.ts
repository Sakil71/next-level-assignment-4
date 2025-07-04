import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook } from "../../types";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-six-omega.vercel.app/api",
    // baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["Books", "BorrowSummary"],
  endpoints: (builder) => ({
    // Get all books
    getBooks: builder.query({
      query: ({ page = 1, limit = 2 }) => `/books?page=${page}&limit=${limit}`,
      providesTags: ["Books"],
    }),

    // edit book
    editBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: {
          ...data,
          available: data.copies === 0 ? false : true,
        },
      }),
      invalidatesTags: ["Books"],
    }),

    // Delete book
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    // Create a new book
    createBook: builder.mutation<IBook, Partial<IBook>>({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    // Book details
    getSingleBook: builder.query<
      { success: boolean; message: string; data: IBook },
      string
    >({
      query: (id) => `/books/${id}`,
      providesTags: ["Books"],
    }),

    // Borrow book
    borrowBook: builder.mutation<
      IBook,
      { book: string; quantity: number; dueDate: string }
    >({
      query: (data) => ({
        url: "/borrow",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books", "BorrowSummary"],
    }),

    // Borrow book summery
    getBorrowedSummary: builder.query<
      {
        summary: {
          book: { title: string; isbn: string };
          totalQuantity: number;
        }[];
      },
      void
    >({
      query: () => "/borrow",
      providesTags: ["BorrowSummary"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useEditBookMutation,
  useDeleteBookMutation,
  useCreateBookMutation,
  useBorrowBookMutation,
  useGetBorrowedSummaryQuery,
} = baseApi;
