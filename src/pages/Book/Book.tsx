import { MdDelete, MdEdit, MdLibraryBooks } from "react-icons/md";
import type { IBook } from "../../types";
import EditBookModal from "../../components/EditBookModal";
import { BorrowBookModal } from "../../components/BorrowBookModal";
import { Pagination } from "../../components/Pagination";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "../../redux/api/baseApi";
import {
  openEditModal,
  closeEditModal,
  openBorrowModal,
  closeBorrowModal,
} from "../../redux/features/uiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

export const Book = () => {
  const dispatch = useAppDispatch();
  const {
    isEditModalOpen,
    selectedBook,
    isBorrowModalOpen,
    borrowTarget,
    currentPage,
    limit,
  } = useAppSelector((state) => state.ui);

  const [deleteBook] = useDeleteBookMutation();
  const {
    data: books,
    isLoading,
    isError,
  } = useGetBooksQuery({
    page: currentPage,
    limit,
  });

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

  const selected = books?.data?.find((b: IBook) => b._id === selectedBook);
  const borrow = books?.data?.find((b: IBook) => b._id === borrowTarget);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-medium text-center mb-5">All Book</h1>
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-700">
              Title
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">
              Author
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">
              Genre
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">
              ISBN
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">
              Copies
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">
              Availability
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">
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
              <td className="px-4 py-2">
                <div className="flex gap-4">
                  <button
                    onClick={() => dispatch(openEditModal(book._id))}
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
                    onClick={() => dispatch(openBorrowModal(book._id))}
                    title="Borrow"
                    className="cursor-pointer"
                  >
                    <MdLibraryBooks className="text-green-600 text-xl" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination />

      {selected && (
        <EditBookModal
          isOpen={isEditModalOpen}
          closeModal={() => dispatch(closeEditModal())}
          book={selected}
        />
      )}

      {borrow && (
        <BorrowBookModal
          isOpen={isBorrowModalOpen}
          closeModal={() => dispatch(closeBorrowModal())}
          book={borrow}
        />
      )}
    </div>
  );
};
