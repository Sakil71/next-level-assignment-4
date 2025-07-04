import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  useBorrowBookMutation,
  useGetBooksQuery,
} from "../redux/api/baseApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { closeModal } from "../redux/features/uiSlice";
import type { IBook } from "../types";

export const BorrowBookModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedBook, modalType, currentPage, limit } = useAppSelector(
    (state) => state.ui
  );

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const [borrowBook] = useBorrowBookMutation();
  const { data: books } = useGetBooksQuery({ page: currentPage, limit });

  const book = books?.data?.find((b : IBook) => b._id === selectedBook);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;

    if (quantity > book.copies) {
      alert("Quantity exceeds available copies");
      return;
    }

    try {
      await borrowBook({ book: book._id, quantity, dueDate }).unwrap();
      toast.success("Book borrowed successfully!");
      dispatch(closeModal());
      navigate("/borrow-book-summery");
    } catch (err) {
      alert("Failed to borrow book");
      console.error(err);
    }
  };

  const handleQuantityChange = (value: number) => {
    if (book && value > book.copies) {
      setQuantity(book.copies); 
    } else {
      setQuantity(value);
    }
  };

  return (
    <Transition appear show={modalType === "borrow"} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => dispatch(closeModal())}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-bold mb-4">
              Borrow - {book?.title ?? ""}
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  max={book?.copies ?? 1}
                  onChange={(e) =>
                    handleQuantityChange(Number(e.target.value))
                  }
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                {book && quantity > book.copies && (
                  <p className="text-red-600 text-sm">
                    Quantity exceeds available copies
                  </p>
                )}
              </div>
              <div>
                <label>Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => dispatch(closeModal())}
                  className="border px-4 py-2 cursor-pointer rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};
