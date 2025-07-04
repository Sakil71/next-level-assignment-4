import { MdDelete, MdEdit, MdLibraryBooks } from "react-icons/md";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "../../redux/api/baseApi";
import type { IBook } from "../../types";
import { useState } from "react";
import EditBookModal from "../../components/EditBookModal";
import { BorrowBookModal } from "../../components/BorrowBookModal";

export const Book = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery(undefined);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBorrowOpen, setIsBorrowOpen] = useState(false);
  const [borrowTarget, setBorrowTarget] = useState<IBook | null>(null);
  const [deleteBook] = useDeleteBookMutation();

  const openModal = (book: IBook) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const openBorrowModal = (book: IBook) => {
    setBorrowTarget(book);
    setIsBorrowOpen(true);
  };

  const closeBorrowModal = () => {
    setBorrowTarget(null);
    setIsBorrowOpen(false);
  };

  const handleDelete = async (book: IBook) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${book.title}"?`
    );
    if (confirmDelete) {
      try {
        await deleteBook(book._id).unwrap();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Title
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Author
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Genre
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              ISBN
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Copies
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Availability
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {books?.data?.map((book: IBook) => (
            <tr key={book._id}>
              <td className="px-4 py-2 font-semibold">{book.title}</td>
              <td className="px-4 py-2">{book.author}</td>
              <td className="px-4 py-2">{book.genre}</td>
              <td className="px-4 py-2">{book.isbn}</td>
              <td className="px-4 py-2">{book.copies}</td>
              <td className="px-4 py-2">
                {book.available ? (
                  <span className="text-green-600 font-medium">available</span>
                ) : (
                  <span className="text-red-600 font-medium">unavailable</span>
                )}
              </td>
              <td className="px-4 py-2 flex gap-4">
                <button
                  onClick={() => openModal(book)}
                  title="Edit"
                  className="cursor-pointer"
                >
                  <MdEdit className="text-xl" />
                </button>
                <button
                  onClick={() => handleDelete(book)}
                  title="Delete"
                  className="cursor-pointer"
                >
                  <MdDelete className="text-red-600 text-xl" />
                </button>
                <button
                  onClick={() => openBorrowModal(book)}
                  title="Borrow"
                  className="cursor-pointer"
                >
                  <MdLibraryBooks className="text-green-600 text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBook && (
        <EditBookModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          book={selectedBook}
        />
      )}

      {borrowTarget && (
        <BorrowBookModal
          isOpen={isBorrowOpen}
          closeModal={closeBorrowModal}
          book={borrowTarget}
        />
      )}
    </div>
  );
};
