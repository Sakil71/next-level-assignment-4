import { MdDelete, MdEdit } from "react-icons/md";
import type { IBook } from "../../types";
import { Pagination } from "../../components/Pagination";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "../../redux/api/baseApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
import EditBookModal from "../../components/EditBookModal";
import { BorrowBookModal } from "../../components/BorrowBookModal";
import { openModal } from "../../redux/features/uiSlice";
import { Link } from "react-router";

export const Book = () => {
  const dispatch = useAppDispatch();
  const { modalType, currentPage, limit, searchTerm } = useAppSelector(
    (state) => state.ui
  );

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

  if (isLoading) return <Loading></Loading>;
  if (isError) return <Error message="Failed to load books." />;

  return (
    <div>
      <h1 className="text-2xl font-medium text-center mb-5">All Book</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th className="px-4 py-2 text-left font-bold text-gray-700">
                Title
              </th>
              <th className="px-4 py-2 text-left font-bold text-gray-700">
                Author
              </th>
              <th className="px-4 py-2 text-left font-bold text-gray-700">
                Genre
              </th>
              <th className="px-4 py-2 text-left font-bold text-gray-700">
                ISBN
              </th>
              <th className="px-4 py-2 text-left font-bold text-gray-700">
                Copies
              </th>
              <th className="px-4 py-2 text-left font-bold text-gray-700">
                Availability
              </th>
              <th className="px-4 py-2 text-left font-bold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books?.data
              ?.filter((book: IBook) =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((book: IBook, index: number) => (
                <tr key={book._id}>
                  <td className="px-4 py-4 font-semibold">
                    {(currentPage - 1) * limit + index + 1}.
                  </td>
                  <td className="px-4 py-4 font-semibold">{book.title}</td>
                  <td className="px-4 py-4">{book.author}</td>
                  <td className="px-4 py-4">{book.genre}</td>
                  <td className="px-4 py-4">{book.isbn}</td>
                  <td className="px-4 py-4">{book.copies}</td>
                  <td className="px-4 py-4">
                    {book.available ? (
                      <span className="text-green-600 font-medium">
                        available
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        unavailable
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          dispatch(openModal({ type: "edit", id: book._id }))
                        }
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
                        onClick={() =>
                          dispatch(openModal({ type: "borrow", id: book._id }))
                        }
                        title="Borrow"
                        className="cursor-pointer border p-1 rounded text-xs"
                      >
                        Borrow
                      </button>
                      <Link
                        to={`/book/${book._id}`}
                        className="text-blue-600 border p-1 rounded text-xs"
                      >Details</Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination />

        {modalType === "edit" && <EditBookModal />}

        {modalType === "borrow" && <BorrowBookModal />}
      </div>
    </div>
  );
};
