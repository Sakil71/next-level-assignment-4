import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import type { IBook } from "../types";
import { useUpdateBookMutation } from "../redux/api/baseApi";

interface EditBookModalProps {
  isOpen: boolean;
  closeModal: () => void;
  book: IBook;
}

const EditBookModal = ({ isOpen, closeModal, book }: EditBookModalProps) => {
  const [formData, setFormData] = useState({ ...book });
  const [updateBook] = useUpdateBookMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      available: formData.copies === 0 ? false : true,
    };
    await updateBook({ id: book._id, data: updatedData });
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl transition-all">
                <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4">
                  Edit Book
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      autoFocus
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="author"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Author
                    </label>
                    <input
                      name="author"
                      id="author"
                      value={formData.author}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="genre"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Genre
                    </label>
                    <input
                      name="genre"
                      id="genre"
                      value={formData.genre}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <input
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="copies"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Copies
                    </label>
                    <input
                      name="copies"
                      id="copies"
                      type="number"
                      min={0}
                      value={formData.copies}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 cursor-pointer rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 cursor-pointer rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditBookModal;
