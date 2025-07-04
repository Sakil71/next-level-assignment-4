import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import type { IBook } from "../types";
import { useNavigate } from "react-router";
import { useBorrowBookMutation } from "../redux/api/baseApi";
import toast from "react-hot-toast";

interface BorrowBookModalProps {
  isOpen: boolean;
  closeModal: () => void;
  book: IBook;
}

export const BorrowBookModal = ({ isOpen, closeModal, book }: BorrowBookModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [borrowBook] = useBorrowBookMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity > book.copies) {
      alert("Quantity exceeds available copies");
      return;
    }

    try {
      await borrowBook({ book: book._id, quantity, dueDate }).unwrap();
      toast.success("Book borrowed successfully!");
      closeModal();
      navigate("/borrow-book-summery");
    } catch (err) {
      alert("Failed to borrow book");
      console.error(err);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-bold mb-4">
              Borrow - {book.title}
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                {
                    book.copies < quantity ? <p className="text-red-600">Quantity exceeds available copies</p> : ""
                }
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
                  onClick={closeModal}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
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

