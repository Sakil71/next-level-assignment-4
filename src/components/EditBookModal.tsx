import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { Genre, type IBook } from "../types";
import {
  useEditBookMutation,
  useGetBooksQuery,
} from "../redux/api/baseApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { closeModal } from "../redux/features/uiSlice";
import { addBook, resetForm, setFullForm } from "../redux/features/formSlice";

const EditBookModal = () => {
  const dispatch = useAppDispatch();
  const { selectedBook, modalType, currentPage, limit } = useAppSelector(
    (state) => state.ui
  );

  const { data: books } = useGetBooksQuery({ page: currentPage, limit });
  const formData = useAppSelector((state) => state.addBookForm);

  const [editBook] = useEditBookMutation();

  const book = books?.data?.find((b: IBook) => b._id === selectedBook);

  useEffect(() => {
    if (book && modalType === "edit") {
      dispatch(setFullForm(book));
    }
  }, [book, modalType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = name === "copies" ? parseInt(value) : value;
    dispatch(addBook({ field: name as keyof IBook, value: parsedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;

    const updatedData = {
      ...formData,
      available: formData.copies === 0 ? false : true,
    };

    await editBook({ id: book._id, data: updatedData });
    dispatch(resetForm());
    dispatch(closeModal());
  };

  return (
    <Transition appear show={modalType === "edit"} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => dispatch(closeModal())}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment}>
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl transition-all">
                <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4">
                  Edit Book
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="title"
                    value={formData.title || ""}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />

                  <input
                    name="author"
                    value={formData.author || ""}
                    onChange={handleChange}
                    placeholder="Author"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />

                  <select
                    name="genre"
                    value={formData.genre || ""}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="" disabled>
                      Select genre
                    </option>
                    {Object.values(Genre).map((g) => (
                      <option key={g} value={g}>
                        {g.charAt(0) + g.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>

                  <input
                    name="isbn"
                    value={formData.isbn || ""}
                    onChange={handleChange}
                    placeholder="ISBN"
                    className="w-full border px-3 py-2 rounded"
                  />

                  <input
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />

                  <input
                    type="number"
                    name="copies"
                    value={formData.copies ?? 0}
                    onChange={handleChange}
                    placeholder="Copies"
                    className="w-full border px-3 py-2 rounded"
                    min={0}
                    required
                  />

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(resetForm());
                        dispatch(closeModal());
                      }}
                      className="px-4 py-2 cursor-pointer border rounded bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded"
                    >
                      Save
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
